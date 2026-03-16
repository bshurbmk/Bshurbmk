export enum Difficulty {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
  VERY_HARD = 'Very Hard'
}

export enum GameState {
  MENU = 'MENU',
  TUTORIAL = 'TUTORIAL',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export enum View {
  BSHU = 'BSHU',
  REACTOR_HALL = 'REACTOR_HALL',
  TURBINE_HALL = 'TURBINE_HALL',
  CITY = 'CITY'
}

export interface ReactorState {
  thermalPower: number; // MW
  neutronFlux: number; // %
  rodPosition: number; // 0 to 100 (0 is fully in, 100 is fully out)
  coolantTemp: number; // Celsius
  pressure: number; // MPa
  voidFraction: number; // 0 to 1
  xenonConcentration: number; // Arbitrary units
  iodineConcentration: number; // Arbitrary units
  pumpsActive: boolean;
  pumpSpeed: number; // 0 to 100
}

export interface TurbineState {
  rpm: number;
  vibration: number;
  load: number; // MW
  steamFlow: number;
  active: boolean;
}

export interface GameData {
  points: number;
  playerName: string;
  difficulty: Difficulty;
  gameState: GameState;
  currentView: View;
  time: number; // Game time in seconds
  isDay: boolean;
  weather: 'clear' | 'rain' | 'fog';
  upgrades: {
    autoReactor: boolean;
    autoRefuel: boolean;
    timelapse: boolean;
    hydroPlant: boolean;
  };
  wear: {
    pumps: number; // 0 to 100 (100 is new)
    turbine: number;
    reactor: number;
  };
}
