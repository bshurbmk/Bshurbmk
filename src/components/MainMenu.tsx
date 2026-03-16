import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Difficulty } from '../types';
import { Play, Shield, Zap, AlertTriangle, Radio } from 'lucide-react';

interface MainMenuProps {
  onStart: (name: string, difficulty: Difficulty) => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.NORMAL);
  const [platform, setPlatform] = useState<'PC' | 'PHONE' | null>(null);

  if (!platform) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-[100]">
        <div className="text-center space-y-8 max-w-md p-8 border border-white/10 bg-[#0a0a0a]">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-widest text-emerald-500 uppercase">System Initialization</h2>
            <p className="text-xs text-white/40 uppercase">Select operating environment</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPlatform('PC')}
              className="p-6 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <Zap className="mx-auto mb-4 text-white/20 group-hover:text-emerald-500" size={32} />
              <span className="text-xs font-bold uppercase tracking-widest">Computer</span>
            </button>
            <button 
              onClick={() => setPlatform('PHONE')}
              className="p-6 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <Radio className="mx-auto mb-4 text-white/20 group-hover:text-emerald-500" size={32} />
              <span className="text-xs font-bold uppercase tracking-widest">Phone</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black z-[90]"
    >
      <div className="w-full max-w-2xl p-12 space-y-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/20" />
        
        <div className="space-y-4 text-center">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl font-black tracking-[0.2em] text-white uppercase leading-none"
          >
            Chernobyl <span className="text-emerald-500">RBMK-1000</span>
          </motion.h1>
          <p className="text-sm tracking-[0.5em] text-white/30 uppercase">Ghost of Pripyat // Simulator</p>
        </div>

        <div className="space-y-8 bg-[#0f0f0f] p-8 border border-white/5 relative">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40">Operator Identification</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER NAME..."
              className="w-full bg-black border border-white/10 p-4 text-emerald-500 focus:border-emerald-500 outline-none transition-colors placeholder:text-white/10"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest text-white/40">Difficulty Level</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {Object.values(Difficulty).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`p-3 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                    difficulty === d 
                      ? 'bg-emerald-500 border-emerald-500 text-black' 
                      : 'border-white/10 text-white/40 hover:border-white/30'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!name}
            onClick={() => onStart(name, difficulty)}
            className="w-full py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.3em] hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-4 group"
          >
            <Play size={20} fill="currentColor" />
            Initialize Core
          </button>
        </div>

        <div className="flex justify-between text-[9px] text-white/20 uppercase tracking-widest">
          <span>Version 1.0.4-Stable</span>
          <span>© 1986-2026 Pripyat Systems</span>
        </div>
      </div>
    </motion.div>
  );
}
