import React from 'react';
import { GameData } from '../types';
import { motion } from 'motion/react';
import { CloudRain, CloudFog, Sun, Moon } from 'lucide-react';

interface CityViewProps {
  gameData: GameData;
}

export function CityView({ gameData }: CityViewProps) {
  const { isDay, weather } = gameData;

  return (
    <div className={`h-full relative overflow-hidden transition-colors duration-[5000ms] ${isDay ? 'bg-sky-900/20' : 'bg-[#020205]'}`}>
      {/* Distant Pripyat Skyline (Simplified 2D) */}
      <div className="absolute bottom-0 w-full h-2/3 flex items-end justify-center gap-1 px-12">
        {Array.from({ length: 40 }).map((_, i) => {
          const height = 40 + Math.random() * 150;
          const width = 20 + Math.random() * 40;
          return (
            <div 
              key={i} 
              className={`relative transition-colors duration-[5000ms] ${isDay ? 'bg-[#1a1a1a]' : 'bg-[#0a0a0a]'} border-t border-x border-white/5`}
              style={{ height: `${height}px`, width: `${width}px` }}
            >
              {/* Windows */}
              <div className="grid grid-cols-2 gap-1 p-2">
                {Array.from({ length: Math.floor(height / 20) }).map((_, j) => (
                  <div 
                    key={j} 
                    className={`w-1 h-1 rounded-sm transition-colors duration-[2000ms] ${
                      !isDay && Math.random() > 0.7 ? 'bg-yellow-500/40 shadow-[0_0_5px_rgba(234,179,8,0.3)]' : 'bg-black/40'
                    }`} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weather Effects */}
      {weather === 'rain' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-px h-8 bg-blue-400/20"
              initial={{ y: -100, x: Math.random() * 2000 }}
              animate={{ y: 1200 }}
              transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* Atmosphere Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-[5000ms] ${isDay ? 'opacity-0' : 'opacity-60'} bg-gradient-to-t from-black via-transparent to-transparent`} />
      
      {/* UI Info */}
      <div className="absolute top-12 left-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-black/40 border border-white/10 rounded-full">
            {isDay ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-blue-400" size={24} />}
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Current Time</div>
            <div className="text-xl font-bold text-white">{isDay ? 'Day Shift' : 'Night Shift'}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-black/40 border border-white/10 rounded-full">
            {weather === 'rain' ? <CloudRain className="text-blue-400" size={24} /> : <CloudFog className="text-white/40" size={24} />}
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Weather Conditions</div>
            <div className="text-xl font-bold text-white uppercase tracking-widest">{weather}</div>
          </div>
        </div>
      </div>

      {/* Grainy Filter Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}
