import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- COMPONENT 12.1: COMPLETION CELEBRATION ---
export function CompletionCelebration() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 1. Draw circle border (1.5s)
    const t1 = setTimeout(() => setStage(1), 1500);
    // 2. Draw interior check (0.5s after that)
    const t2 = setTimeout(() => setStage(2), 2000);
    // 3. Reveal elements
    const t3 = setTimeout(() => setStage(3), 2600);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="my-24 w-full relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-luxury-gold/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Animated Circle Checkmark */}
        <div className="mb-10 w-24 h-24 relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Background faint circle */}
            <circle cx="48" cy="48" r="46" fill="transparent" stroke="rgba(201,168,76,0.1)" strokeWidth="4" />
            
            {/* Animated drawing circle */}
            <motion.circle
              cx="48" cy="48" r="46"
              fill="transparent"
              stroke="#c9a84c"
              strokeWidth="4"
              strokeDasharray={46 * 2 * Math.PI}
              initial={{ strokeDashoffset: 46 * 2 * Math.PI }}
              animate={{ strokeDashoffset: stage >= 1 ? 0 : 46 * 2 * Math.PI }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Internal Checkmark */}
          {stage >= 2 && (
            <motion.svg width="40" height="30" viewBox="0 0 40 30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <polyline points="5,15 15,25 35,5" fill="none" stroke="#27ae60" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </div>

        {/* Text */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 20 }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            All 12 Modules Complete
          </h2>
          <p className="font-sans text-vanta-400 text-base max-w-lg mx-auto mb-12 leading-relaxed">
            You've completed the full VANTA education. You now have the architectural framework to read the market accurately, every time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button className="group relative overflow-hidden btn-primary uppercase font-bold tracking-[3px] text-xs py-5 px-10 border-luxury-gold/50 text-luxury-gold shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all hover:bg-luxury-gold hover:text-black">
               <span className="relative z-10 flex items-center gap-3">
                 Enter the War Room
                 <span className="transition-transform group-hover:translate-x-2">→</span>
               </span>
             </button>
             
             <button onClick={() => window.scrollTo(0,0)} className="px-8 py-5 border border-white/10 rounded font-sans text-xs uppercase tracking-widest text-[#8a9bb5] hover:border-white/30 hover:text-white transition-all">
               Review Any Module
             </button>
          </div>

          <p className="font-display italic text-lg text-vanta-600 mt-16 max-w-sm mx-auto">
            "Trade like a fox. Clean entries. Clean profits. Evidence over hope. Always."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
