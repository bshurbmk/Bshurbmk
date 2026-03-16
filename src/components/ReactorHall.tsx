import React from 'react';
import { ReactorState } from '../types';
import { motion } from 'motion/react';

interface ReactorHallProps {
  reactor: ReactorState;
}

export function ReactorHall({ reactor }: ReactorHallProps) {
  // Heat map color based on power
  const heatColor = reactor.thermalPower > 3000 ? 'bg-red-500' : 
                    reactor.thermalPower > 1000 ? 'bg-orange-500' : 'bg-blue-500';

  return (
    <div className="h-full bg-[#050505] relative overflow-hidden flex items-center justify-center p-12">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Reactor Top View (Biological Shield) */}
      <div className="relative w-full max-w-4xl aspect-square border border-white/10 bg-[#111] shadow-2xl flex flex-col">
        <div className="absolute top-4 left-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">
          Reactor Hall // Unit 4 // Top View
        </div>

        {/* The Core Grid */}
        <div className="flex-1 grid grid-cols-20 grid-rows-20 gap-px p-8">
          {Array.from({ length: 400 }).map((_, i) => (
            <motion.div 
              key={i}
              className={`w-full h-full border border-white/5 transition-colors duration-1000`}
              animate={{ 
                backgroundColor: reactor.thermalPower > 0 ? `rgba(${reactor.thermalPower / 10}, 50, 50, ${0.1 + Math.random() * 0.2})` : 'rgba(20, 20, 20, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Heat Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          animate={{ 
            background: `radial-gradient(circle at 50% 50%, ${reactor.thermalPower > 2000 ? 'rgba(255, 50, 0, 0.15)' : 'rgba(0, 100, 255, 0.05)'} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Status Overlay */}
      <div className="absolute bottom-12 right-12 bg-black/80 border border-white/10 p-6 space-y-4 backdrop-blur-md">
        <div className="space-y-1">
          <div className="text-[9px] text-white/30 uppercase tracking-widest">Core Temperature</div>
          <div className="text-2xl font-black text-orange-500">{reactor.coolantTemp.toFixed(1)} °C</div>
        </div>
        <div className="space-y-1">
          <div className="text-[9px] text-white/30 uppercase tracking-widest">Neutron Flux Density</div>
          <div className="text-2xl font-black text-emerald-500">{reactor.neutronFlux.toFixed(2)} %</div>
        </div>
      </div>
    </div>
  );
}
