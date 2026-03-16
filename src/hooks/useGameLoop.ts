import { useState, useEffect, useCallback, useRef } from 'react';
import { GameData, ReactorState, TurbineState, GameState, Difficulty, View } from '../types';
import { INITIAL_REACTOR_STATE, INITIAL_TURBINE_STATE, updateSimulation } from '../engine/simulation';

export function useGameLoop() {
  const [gameData, setGameData] = useState<GameData>({
    points: 0,
    playerName: '',
    difficulty: Difficulty.NORMAL,
    gameState: GameState.MENU,
    currentView: View.BSHU,
    time: 0,
    isDay: true,
    weather: 'clear',
    upgrades: {
      autoReactor: false,
      autoRefuel: false,
      timelapse: false,
      hydroPlant: false,
    },
    wear: {
      pumps: 100,
      turbine: 100,
      reactor: 100,
    },
  });

  const [reactor, setReactor] = useState<ReactorState>(INITIAL_REACTOR_STATE);
  const [turbine, setTurbine] = useState<TurbineState>(INITIAL_TURBINE_STATE);
  const [isMobile, setIsMobile] = useState(false);

  const lastUpdateRef = useRef<number>(performance.now());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < window.innerHeight);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tick = useCallback(() => {
    if (gameData.gameState !== GameState.PLAYING) return;

    const now = performance.now();
    const deltaTime = (now - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = now;

    const { reactor: nextReactor, turbine: nextTurbine, event } = updateSimulation(
      reactor,
      turbine,
      gameData.difficulty,
      deltaTime
    );

    setReactor(nextReactor);
    setTurbine(nextTurbine);
    
    setGameData(prev => ({
      ...prev,
      time: prev.time + deltaTime,
      isDay: (Math.floor(prev.time / 300) % 2 === 0), // Day/Night cycle every 5 mins
      points: prev.points + (nextTurbine.load > 0 ? (nextTurbine.load / 1000) * deltaTime * 10 : 0),
      gameState: event ? GameState.GAME_OVER : prev.gameState
    }));

    requestAnimationFrame(tick);
  }, [gameData.gameState, gameData.difficulty, reactor, turbine]);

  useEffect(() => {
    if (gameData.gameState === GameState.PLAYING) {
      lastUpdateRef.current = performance.now();
      const frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }
  }, [gameData.gameState, tick]);

  const startGame = (name: string, difficulty: Difficulty) => {
    setGameData(prev => ({
      ...prev,
      playerName: name,
      difficulty,
      gameState: GameState.PLAYING,
      time: 0,
      points: 0
    }));
    setReactor(INITIAL_REACTOR_STATE);
    setTurbine(INITIAL_TURBINE_STATE);
  };

  const setRodPosition = (pos: number) => {
    setReactor(prev => ({ ...prev, rodPosition: Math.max(0, Math.min(100, pos)) }));
  };

  const togglePumps = () => {
    setReactor(prev => ({ ...prev, pumpsActive: !prev.pumpsActive, pumpSpeed: !prev.pumpsActive ? 100 : 0 }));
  };

  return {
    gameData,
    reactor,
    turbine,
    isMobile,
    setGameData,
    startGame,
    setRodPosition,
    togglePumps,
    setView: (view: View) => setGameData(prev => ({ ...prev, currentView: view }))
  };
}
