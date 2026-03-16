/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameLoop } from './hooks/useGameLoop';
import { GameState, View, Difficulty } from './types';
import { BSHU } from './components/BSHU';
import { ReactorHall } from './components/ReactorHall';
import { TurbineHall } from './components/TurbineHall';
import { CityView } from './components/CityView';
import { MainMenu } from './components/MainMenu';
import { GameOver } from './components/GameOver';
import { Shop } from './components/Shop';
import { Tutorial } from './components/Tutorial';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Play, Info, ShoppingCart, Terminal } from 'lucide-react';

export default function App() {
  const { 
    gameData, 
    reactor, 
    turbine, 
    isMobile, 
    startGame, 
    setRodPosition, 
    togglePumps, 
    setView,
    setGameData
  } = useGameLoop();

  const [showShop, setShowShop] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handlePurchase = (id: string, cost: number) => {
    setGameData(prev => ({
      ...prev,
      points: prev.points - cost,
      upgrades: { ...prev.upgrades, [id]: true }
    }));
  };

  const renderView = () => {
    switch (gameData.currentView) {
      case View.BSHU:
        return <BSHU reactor={reactor} turbine={turbine} setRodPosition={setRodPosition} togglePumps={togglePumps} />;
      case View.REACTOR_HALL:
        return <ReactorHall reactor={reactor} />;
      case View.TURBINE_HALL:
        return <TurbineHall turbine={turbine} />;
      case View.CITY:
        return <CityView gameData={gameData} />;
      default:
        return <BSHU reactor={reactor} turbine={turbine} setRodPosition={setRodPosition} togglePumps={togglePumps} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#d1d1d1] font-mono selection:bg-emerald-500/30 overflow-hidden ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {/* CRT Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="crt-scanline" />
      
      <AnimatePresence mode="wait">
        {gameData.gameState === GameState.MENU && (
          <MainMenu onStart={(name, diff) => {
            startGame(name, diff);
            setShowTutorial(true);
          }} />
        )}

        {gameData.gameState === GameState.PLAYING && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-screen"
          >
            {/* Top Navigation Bar */}
            <div className="h-12 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between px-4 z-40">
              <div className="flex items-center gap-6">
                <h1 className="text-xs font-bold tracking-widest text-emerald-500 uppercase">RBMK-1000 // GHOST OF PRIPYAT</h1>
                <div className="flex gap-2">
                  {Object.values(View).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1 text-[10px] uppercase tracking-tighter transition-colors ${
                        gameData.currentView === v 
                          ? 'bg-emerald-500 text-black font-bold' 
                          : 'hover:bg-white/5 text-white/50'
                      }`}
                    >
                      {v.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px]">
                <button 
                  onClick={() => setShowShop(true)}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
                >
                  <ShoppingCart size={12} />
                  SHOP
                </button>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col items-end">
                  <span className="text-white/30 uppercase">Power Output</span>
                  <span className="text-emerald-400 font-bold">{(turbine.load).toFixed(1)} MW</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col items-end">
                  <span className="text-white/30 uppercase">Points</span>
                  <span className="text-yellow-500 font-bold">{Math.floor(gameData.points)}</span>
                </div>
                <button 
                  onClick={() => setShowTutorial(true)}
                  className="p-2 hover:bg-white/5 rounded transition-colors text-white/40"
                >
                  <Info size={14} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden">
              {renderView()}
            </div>

            {/* Bottom Status Bar */}
            <div className="h-6 bg-[#0f0f0f] border-t border-white/5 flex items-center justify-between px-4 text-[9px] text-white/30 uppercase tracking-widest">
              <div className="flex gap-4">
                <span>Status: <span className="text-emerald-500">Nominal</span></span>
                <span>Radiation: <span className="text-white/50">0.12 mR/h</span></span>
                <span>Time: {new Date(gameData.time * 1000).toISOString().substr(11, 8)}</span>
              </div>
              <div className="flex gap-4">
                <span>Operator: {gameData.playerName || 'Unknown'}</span>
                <span>Difficulty: {gameData.difficulty}</span>
              </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
              {showShop && (
                <Shop 
                  points={gameData.points} 
                  upgrades={gameData.upgrades} 
                  onPurchase={handlePurchase} 
                  onClose={() => setShowShop(false)} 
                />
              )}
              {showTutorial && (
                <Tutorial onClose={() => setShowTutorial(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameData.gameState === GameState.GAME_OVER && (
          <GameOver onRestart={() => setGameData(prev => ({ ...prev, gameState: GameState.MENU }))} />
        )}
      </AnimatePresence>
    </div>
  );
}
