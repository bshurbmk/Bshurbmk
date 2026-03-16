import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronRight, X } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

export function Tutorial({ onClose }: TutorialProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome, Operator",
      content: "You are now in control of Unit 4 of the Chernobyl Nuclear Power Plant. Your goal is to maintain stable power output while managing the complex physics of the RBMK-1000 reactor.",
      image: "https://picsum.photos/seed/chernobyl1/800/400"
    },
    {
      title: "Reactivity Control",
      content: "Use the SUZ Rod Control to manage reactivity. Pulling rods out increases power, but be careful: the RBMK has a positive void coefficient, meaning steam bubbles can cause rapid power spikes.",
      image: "https://picsum.photos/seed/chernobyl2/800/400"
    },
    {
      title: "Cooling Systems",
      content: "Ensure the Main Circulation Pumps (GCN) are active. Without proper cooling, the core will overheat, leading to fuel damage and potential explosion.",
      image: "https://picsum.photos/seed/chernobyl3/800/400"
    },
    {
      title: "Power Generation",
      content: "Once pressure reaches 2.0 MPa, the turbine will begin to spin. Synchronize the generator to the grid to earn points and supply electricity to Pripyat.",
      image: "https://picsum.photos/seed/chernobyl4/800/400"
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[300] p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-[#111] border border-white/10 overflow-hidden flex flex-col"
      >
        <div className="relative h-48 bg-black">
          <img 
            src={steps[step].image} 
            alt="Tutorial" 
            className="w-full h-full object-cover opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Training Module {step + 1}/4</div>
            <h2 className="text-2xl font-black uppercase tracking-widest">{steps[step].title}</h2>
          </div>
          
          <p className="text-sm text-white/60 leading-relaxed">
            {steps[step].content}
          </p>

          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 w-8 rounded-full ${i === step ? 'bg-emerald-500' : 'bg-white/10'}`} />
              ))}
            </div>
            <button 
              onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onClose()}
              className="px-6 py-3 bg-emerald-500 text-black font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-emerald-400 transition-colors"
            >
              {step === steps.length - 1 ? "Finish" : "Next Step"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
