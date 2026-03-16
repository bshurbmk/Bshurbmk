import React, { useState } from 'react';
import { ReactorState, TurbineState } from '../types';
import { motion } from 'motion/react';
import { Zap, Activity, Thermometer, Gauge, Search, Power, AlertCircle } from 'lucide-react';

interface BSHUProps {
  reactor: ReactorState;
  turbine: TurbineState;
  setRodPosition: (pos: number) => void;
  togglePumps: () => void;
}

export function BSHU({ reactor, turbine, setRodPosition, togglePumps }: BSHUProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const indicators = [
    { label: 'Thermal Power', value: `${reactor.thermalPower.toFixed(0)} MW`, color: 'text-emerald-500', icon: Zap },
    { label: 'Neutron Flux', value: `${reactor.neutronFlux.toFixed(1)} %`, color: 'text-emerald-400', icon: Activity },
    { label: 'Coolant Temp', value: `${reactor.coolantTemp.toFixed(1)} °C`, color: 'text-orange-500', icon: Thermometer },
    { label: 'Pressure', value: `${reactor.pressure.toFixed(2)} MPa`, color: 'text-blue-400', icon: Gauge },
    { label: 'Turbine RPM', value: `${turbine.rpm.toFixed(0)}`, color: 'text-yellow-500', icon: Activity },
    { label: 'Grid Load', value: `${turbine.load.toFixed(1)} MW`, color: 'text-emerald-600', icon: Zap },
  ];

  return (
    <div className="h-full bg-[#121212] p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Top Search & Global Controls */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input 
            type="text"
            placeholder="SEARCH CONTROL ELEMENT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/5 pl-10 pr-4 py-2 text-[10px] uppercase tracking-widest outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-900/40 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all flex items-center gap-2">
            <AlertCircle size={14} />
            AZ-5 Emergency
          </button>
        </div>
      </div>

      {/* Main Indicators Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {indicators.map((ind) => (
          <div key={ind.label} className="bg-black/40 border border-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between text-[9px] text-white/30 uppercase tracking-widest">
              <span>{ind.label}</span>
              <ind.icon size={10} />
            </div>
            <div className={`text-xl font-black ${ind.color} tabular-nums`}>{ind.value}</div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-current ${ind.color}`}
                initial={{ width: 0 }}
                animate={{ width: '60%' }} // Simulated fill
              />
            </div>
          </div>
        ))}
      </div>

      {/* Control Panels Section */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reactor Control (Left) */}
        <div className="lg:col-span-8 bg-[#1a1a1a] border border-white/10 p-6 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Reactor Core Control // S-1</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Rod Control Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Rod Position (SUZ)</label>
                <span className="text-xl font-black text-emerald-500">{reactor.rodPosition}%</span>
              </div>
              <div className="relative h-64 bg-black/60 border border-white/5 flex items-center justify-center">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={reactor.rodPosition}
                  onChange={(e) => setRodPosition(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  style={{ writingMode: 'bt-lr' } as any}
                />
                <div className="w-8 h-full bg-white/5 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-emerald-500/40 border-t-2 border-emerald-500"
                    animate={{ height: `${reactor.rodPosition}%` }}
                  />
                </div>
                {/* Scale markings */}
                <div className="absolute right-4 h-full flex flex-col justify-between py-2 text-[8px] text-white/20 font-bold">
                  <span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
                </div>
              </div>
            </div>

            {/* Pump Controls */}
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Main Circulation Pumps (GCN)</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={togglePumps}
                    className={`py-4 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      reactor.pumpsActive 
                        ? 'bg-emerald-500 border-emerald-500 text-black' 
                        : 'border-white/10 text-white/30 hover:bg-white/5'
                    }`}
                  >
                    {reactor.pumpsActive ? 'Active' : 'Standby'}
                  </button>
                  <div className="bg-black/40 border border-white/5 p-4 flex flex-col justify-center items-center">
                    <span className="text-[8px] text-white/20 uppercase mb-1">Flow Rate</span>
                    <span className="text-lg font-bold text-blue-400">{reactor.pumpsActive ? '48,000' : '0'} m³/h</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/60">Steam Separator Pressure</label>
                <div className="h-24 bg-black/40 border border-white/5 p-4 flex items-center justify-center">
                   <div className="text-3xl font-black text-blue-500 tabular-nums">{reactor.pressure.toFixed(2)} <span className="text-xs font-normal text-white/20">MPa</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Turbine Control (Right) */}
        <div className="lg:col-span-4 bg-[#1a1a1a] border border-white/10 p-6 space-y-6 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/30" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Turbine Hall // T-1</h3>
          
          <div className="space-y-6">
            <div className="bg-black/40 border border-white/5 p-4 space-y-4">
              <div className="flex justify-between text-[9px] text-white/30 uppercase">
                <span>Rotor Speed</span>
                <span>{turbine.rpm.toFixed(0)} RPM</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-500"
                  animate={{ width: `${(turbine.rpm / 3000) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 p-4 space-y-4">
              <div className="flex justify-between text-[9px] text-white/30 uppercase">
                <span>Vibration Level</span>
                <span className={turbine.vibration > 10 ? 'text-red-500' : 'text-emerald-500'}>
                  {turbine.vibration.toFixed(2)} mm/s
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${turbine.vibration > 10 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  animate={{ width: `${Math.min(100, turbine.vibration * 5)}%` }}
                />
              </div>
            </div>

            <button 
              className={`w-full py-4 border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                turbine.active 
                  ? 'bg-yellow-500 border-yellow-500 text-black' 
                  : 'border-white/10 text-white/30 hover:bg-white/5'
              }`}
            >
              <Power size={14} />
              {turbine.active ? 'Generator Online' : 'Generator Offline'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
