import { ReactorState, TurbineState, Difficulty } from '../types';

export const INITIAL_REACTOR_STATE: ReactorState = {
  thermalPower: 0,
  neutronFlux: 0,
  rodPosition: 0,
  coolantTemp: 40,
  pressure: 0.1,
  voidFraction: 0,
  xenonConcentration: 0,
  iodineConcentration: 0,
  pumpsActive: false,
  pumpSpeed: 0,
};

export const INITIAL_TURBINE_STATE: TurbineState = {
  rpm: 0,
  vibration: 0,
  load: 0,
  steamFlow: 0,
  active: false,
};

export function updateSimulation(
  reactor: ReactorState,
  turbine: TurbineState,
  difficulty: Difficulty,
  deltaTime: number // in seconds
): { reactor: ReactorState; turbine: TurbineState; event?: string } {
  const nextReactor = { ...reactor };
  const nextTurbine = { ...turbine };
  let event: string | undefined;

  // 1. Neutron Physics
  // Rod position affects reactivity. 0 is fully in (shutdown), 100 is fully out.
  // RBMK has positive void coefficient.
  const rodEffect = (nextReactor.rodPosition - 10) / 90; // Simplified reactivity
  const voidEffect = nextReactor.voidFraction * 0.5; // Positive void coefficient
  const xenonEffect = -nextReactor.xenonConcentration * 0.2;
  
  const reactivity = rodEffect + voidEffect + xenonEffect;
  
  // Power change based on reactivity
  const powerChange = reactivity * nextReactor.thermalPower * 0.1 + (reactivity > 0 ? 5 : 0);
  nextReactor.thermalPower = Math.max(0, nextReactor.thermalPower + powerChange * deltaTime);
  nextReactor.neutronFlux = Math.min(120, (nextReactor.thermalPower / 3200) * 100);

  // 2. Thermal Hydraulics
  // Heat transfer to water
  const targetTemp = 40 + (nextReactor.thermalPower / 3200) * 280;
  const coolingEffect = nextReactor.pumpsActive ? (nextReactor.pumpSpeed / 100) * 50 : 2;
  nextReactor.coolantTemp += (targetTemp - nextReactor.coolantTemp) * 0.05 * deltaTime;
  
  // Pressure depends on temperature and steam generation
  nextReactor.pressure = Math.max(0.1, (nextReactor.coolantTemp / 100) * 5);
  
  // Void fraction (steam bubbles) increases with temp and power
  nextReactor.voidFraction = Math.max(0, Math.min(1, (nextReactor.coolantTemp - 250) / 100));

  // 3. Xenon Poisoning (Simplified)
  // Iodine-135 decays to Xenon-135
  const iodineProduction = nextReactor.thermalPower * 0.0001;
  nextReactor.iodineConcentration += (iodineProduction - nextReactor.iodineConcentration * 0.01) * deltaTime;
  nextReactor.xenonConcentration += (nextReactor.iodineConcentration * 0.01 - nextReactor.xenonConcentration * 0.05) * deltaTime;

  // 4. Turbine & Generator
  if (nextReactor.pressure > 2) {
    nextTurbine.active = true;
    nextTurbine.steamFlow = (nextReactor.pressure - 2) * 10;
    const targetRPM = 3000;
    nextTurbine.rpm += (targetRPM - nextTurbine.rpm) * 0.01 * deltaTime;
    nextTurbine.load = (nextTurbine.rpm / 3000) * nextReactor.thermalPower * 0.3;
    nextTurbine.vibration = (nextTurbine.rpm / 3000) * 5 + (nextTurbine.load / 1000) * 2;
  } else {
    nextTurbine.rpm *= 0.99;
    nextTurbine.load *= 0.9;
    nextTurbine.steamFlow = 0;
    if (nextTurbine.rpm < 10) nextTurbine.active = false;
  }

  // 5. Safety Checks (Game Over conditions)
  if (nextReactor.thermalPower > 4000) event = 'EXPLOSION_POWER';
  if (nextReactor.pressure > 15) event = 'EXPLOSION_PRESSURE';
  if (nextTurbine.vibration > 50) event = 'TURBINE_FAILURE';

  return { reactor: nextReactor, turbine: nextTurbine, event };
}
