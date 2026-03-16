import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap, Timer, Cpu, X } from 'lucide-react';

interface ShopProps {
  points: number;
  upgrades: any;
  onPurchase: (id: string, cost: number) => void;
  onClose: () => void;
}

export function Shop({ points, upgrades, onPurchase, onClose }: ShopProps) {
  const items = [
    { id: 'autoReactor', name: 'Automatic Rod Control', cost: 500, icon: Cpu, desc: 'AI-driven reactivity management system.' },
    { id: 'timelapse', name: 'Time Compression', cost: 400, icon: Timer, desc: 'Accelerate simulation speed (2x/4x).' },
    { id: 'hydroPlant', name: 'Hydroelectric Expansion', cost: 1000, icon: Zap, desc: 'Unlock additional power management content.' },
    { id: 'autoRefuel', name: 'Auto-Refueling System', cost: 1500, icon: Cpu, desc: 'Automated fuel channel replacement.' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[300] p-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-[#0f0f0f] border border-white/10 p-8 space-y-8"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-500 flex items-center gap-3">
              <ShoppingCart size={24} />
              Modification Shop
            </h2>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Exchange generated energy for system upgrades</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-black/40 border border-white/5 p-6 space-y-4 group hover:border-yellow-500/30 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded group-hover:bg-yellow-500/10 transition-colors">
                  <item.icon size={20} className="text-white/40 group-hover:text-yellow-500" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/20 uppercase font-bold">Cost</div>
                  <div className="text-lg font-black text-yellow-500">{item.cost} <span className="text-[10px] font-normal">PTS</span></div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">{item.name}</h3>
                <p className="text-[10px] text-white/40 leading-relaxed">{item.desc}</p>
              </div>
              <button 
                disabled={points < item.cost || upgrades[item.id]}
                onClick={() => onPurchase(item.id, item.cost)}
                className={`w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  upgrades[item.id] 
                    ? 'bg-emerald-500/20 text-emerald-500 cursor-default' 
                    : points >= item.cost 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {upgrades[item.id] ? 'Installed' : 'Purchase Upgrade'}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] text-white/20 uppercase tracking-widest">Available Balance</div>
          <div className="text-xl font-black text-yellow-500">{Math.floor(points)} <span className="text-xs font-normal">PTS</span></div>
        </div>
      </motion.div>
    </div>
  );
}
