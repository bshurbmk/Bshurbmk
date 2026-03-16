import React from 'react';
import { TurbineState } from '../types';
import { motion } from 'motion/react';
import { Wind } from 'lucide-react';

interface TurbineHallProps {
  turbine: TurbineState;
}

export function TurbineHall({ turbine }: TurbineHallProps) {
  return (
    <div className="h-full bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center p-12">
      <div className="absolute top-8 left-8 text-[10px] text-white/20 uppercase tracking-widest font-bold">
        Turbine Hall // Machine Room // Unit 4
      </div>

      {/* Turbine Model */}
      <div className="relative w-full max-w-5xl h-64 bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
        {/* Main Shaft */}
        <div className="absolute w-full h-8 bg-gradient-to-b from-white/10 to-transparent border-y border-white/5" />
        
        {/* Turbine Blades (Visualized as rotating cylinders) */}
        <div className="flex gap-8 z-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i}
              className="w-24 h-48 bg-[#222] border-x border-white/10 relative"
              animate={{ 
                rotateX: turbine.rpm > 0 ? 360 : 0,
                scaleY: 1 + (turbine.vibration / 100)
              }}
              transition={{ 
                duration: turbine.rpm > 0 ? Math.max(0.1, 10 / (turbine.rpm / 100)) : 0, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />
            </motion.div>
          ))}
        </div>

        {/* Steam Effects */}
        {turbine.steamFlow > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-4 h-4 bg-white/10 rounded-full blur-xl"
                initial={{ x: -100, y: Math.random() * 200 - 100, opacity: 0 }}
                animate={{ 
                  x: 1000, 
                  opacity: [0, 0.5, 0],
                  scale: [1, 2, 4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Turbine Stats Bar */}
      <div className="mt-12 w-full max-w-5xl grid grid-cols-4 gap-6">
        <div className="bg-black/60 border border-white/5 p-4 space-y-2">
          <div className="text-[8px] text-white/20 uppercase tracking-widest">Rotor Speed</div>
          <div className="text-xl font-black text-yellow-500">{turbine.rpm.toFixed(0)} <span className="text-[10px] font-normal opacity-50">RPM</span></div>
        </div>
        <div className="bg-black/60 border border-white/5 p-4 space-y-2">
          <div className="text-[8px] text-white/20 uppercase tracking-widest">Steam Pressure</div>
          <div className="text-xl font-black text-blue-400">{(turbine.steamFlow / 10).toFixed(2)} <span className="text-[10px] font-normal opacity-50">MPa</span></div>
        </div>
        <div className="bg-black/60 border border-white/5 p-4 space-y-2">
          <div className="text-[8px] text-white/20 uppercase tracking-widest">Vibration</div>
          <div className={`text-xl font-black ${turbine.vibration > 10 ? 'text-red-500' : 'text-emerald-500'}`}>{turbine.vibration.toFixed(2)} <span className="text-[10px] font-normal opacity-50">mm/s</span></div>
        </div>
        <div className="bg-black/60 border border-white/5 p-4 space-y-2">
          <div className="text-[8px] text-white/20 uppercase tracking-widest">Generator Load</div>
          <div className="text-xl font-black text-emerald-500">{turbine.load.toFixed(1)} <span className="text-[10px] font-normal opacity-50">MW</span></div>
        </div>
      </div>
    </div>
  );
}
