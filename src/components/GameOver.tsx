import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface GameOverProps {
  onRestart: () => void;
}

export function GameOver({ onRestart }: GameOverProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-red-950/20 backdrop-blur-xl z-[200]"
    >
      <div className="w-full max-w-xl p-12 bg-black border-2 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center space-y-8 relative overflow-hidden">
        {/* Warning Stripes */}
        <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#000_10px,#000_20px)]" />
        <div className="absolute bottom-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#000_10px,#000_20px)]" />

        <div className="space-y-4">
          <AlertTriangle className="mx-auto text-red-500" size={64} />
          <h2 className="text-4xl font-black text-red-500 uppercase tracking-[0.2em]">Critical System Failure</h2>
          <p className="text-sm text-white/40 uppercase tracking-widest">Reactor Core Integrity Compromised // Unit 4 Destroyed</p>
        </div>

        <div className="py-8 border-y border-white/5 space-y-2">
          <div className="text-[10px] text-white/20 uppercase tracking-widest">Final Report</div>
          <p className="text-xs text-white/60 leading-relaxed italic">
            "At 01:23:45, a massive steam explosion destroyed the reactor core. The biological shield was blown off, releasing radioactive materials into the atmosphere. Pripyat must be evacuated immediately."
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-6 bg-red-500 text-black font-black uppercase tracking-[0.3em] hover:bg-red-400 transition-all flex items-center justify-center gap-4"
        >
          <RefreshCcw size={20} />
          Re-Initialize Simulation
        </button>
      </div>
    </motion.div>
  );
}
