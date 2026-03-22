import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 7.1: IMPULSE CONFIRMATION ---
export function ImpulseConfirmation() {
  const [extension, setExtension] = useState<'1ST' | '3RD' | '5TH' | 'FAILURE'>('3RD');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  // Restart animation when changing extension
  useEffect(() => {
    setIsPlaying(false);
    setTime(0);
  }, [extension]);

  // Handle animation timer
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setTime(prev => {
          if (prev >= 8) {
            clearInterval(interval);
            return 8;
          }
          return prev + 1;
        });
      }, 300); // 300ms per "hour"
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getStage2Desc = () => {
    switch (extension) {
      case '1ST': return "Must return to Wave 4 terminus, usually Wave 2 zone";
      case '3RD': return "Must return to Wave 4 zone. If >61.8% retracement → completed larger impulse";
      case '5TH': return "Must retrace ≥61.8% of Wave 5";
      case 'FAILURE': return "Must retrace entire impulse";
    }
  };

  const getBreakoutPoint = () => {
    // End of W5 is at x=250, y=40
    // Animated line starts at 250,40 and goes down
    switch (extension) {
      case '1ST': return "270,100 290,120"; // shallower
      case '3RD': return "270,120 300,160"; // deep into W4
      case '5TH': return "270,90 300,100"; // 61.8% of w5
      case 'FAILURE': return "270,160 300,280"; // massive drop
    }
  };

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 7.1 — Impulse Confirmation
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row gap-8">
          
          <div className="flex-[2] relative bg-vanta-900 border border-white/5 rounded-xl h-[360px] flex items-center justify-center overflow-hidden">
             
             {/* The timers */}
             <div className="absolute top-4 left-4 flex gap-4">
               <div className="bg-black/50 border border-white/10 px-3 py-2 rounded">
                 <div className="font-sans text-[10px] uppercase tracking-widest text-vanta-500 mb-1">Wave 5 Duration</div>
                 <div className="font-mono text-lg text-white">8H</div>
               </div>
               <div className={`bg-black/50 border px-3 py-2 rounded transition-colors ${
                 time >= 8 ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(46,204,113,0.2)]' : 'border-white/10'
               }`}>
                 <div className="font-sans text-[10px] uppercase tracking-widest text-vanta-500 mb-1">Trendline Break</div>
                 <div className={`font-mono text-lg ${time >= 8 ? 'text-emerald-400' : 'text-white'}`}>{time}H</div>
               </div>
             </div>

             <svg width="450" height="300" className="overflow-visible mt-10">
               {/* 2-4 Trendline */}
               <line x1="80" y1="220" x2="350" y2="120" stroke="#c9a84c" strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
               <text x="360" y="125" fill="#c9a84c" fontSize="10" opacity="0.6">2-4 Trendline</text>

               {/* Base 5-wave Impulse */}
               <polyline points="20,280 80,100 120,205 180,60 210,140 250,40" fill="none" stroke="#e8e6e1" strokeWidth="3" strokeLinejoin="round" />
               <circle cx="250" cy="40" r="4" fill="#e8e6e1" />
               
               {/* Animated breakout line */}
               {isPlaying && (
                 <motion.polyline 
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 2.4, ease: "linear" }} // 8 * 0.3s
                   points={`250,40 ${getBreakoutPoint()}`} 
                   fill="none" 
                   stroke={time >= 8 ? "#27ae60" : "#c0392b"} 
                   strokeWidth="4" 
                   strokeLinejoin="round" 
                 />
               )}

               {/* Stage 1 Confirmed Badge */}
               <AnimatePresence>
                 {time >= 8 && (
                   <motion.g
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                   >
                     <rect x="150" y="240" width="180" height="30" rx="4" fill="rgba(46,204,113,0.15)" stroke="#27ae60" strokeWidth="1" />
                     <text x="240" y="259" fill="#27ae60" fontSize="11" fontWeight="bold" textAnchor="middle">✓ STAGE 1 CONFIRMED</text>
                     <text x="240" y="280" fill="#27ae60" fontSize="9" textAnchor="middle" opacity="0.8">Broke in less time than Wave 5 took to form</text>
                   </motion.g>
                 )}
               </AnimatePresence>

             </svg>
          </div>

          <div className="flex-[1] flex flex-col gap-6">
            <button
               onClick={() => { setIsPlaying(true); setTime(0); }}
               disabled={isPlaying && time < 8}
               className="btn-primary w-full py-4 text-xs tracking-[3px] disabled:opacity-50"
            >
               {time >= 8 ? 'REPLAY' : isPlaying ? 'PLAYING...' : 'PLAY ANIMATION'}
            </button>

            <div className="border-t border-white/10 pt-6">
              <div className="font-sans text-[10px] uppercase tracking-widest text-vanta-500 mb-4">Select Extension Type</div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(['1ST', '3RD', '5TH', 'FAILURE'] as const).map(ext => (
                  <button
                    key={ext}
                    onClick={() => setExtension(ext)}
                    className={`py-2 rounded text-[10px] font-mono tracking-wider transition-all border ${
                      extension === ext 
                        ? 'bg-luxury-gold/10 text-luxury-gold border-luxury-gold/30' 
                        : 'bg-black/30 text-vanta-400 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {ext}
                  </button>
                ))}
              </div>

              <div className="bg-white/5 p-4 rounded border border-white/10">
                 <div className="font-sans text-[11px] font-bold text-luxury-gold mb-2 uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                   STAGE 2 REQUIREMENT
                 </div>
                 <div className="font-sans text-sm text-vanta-200 leading-relaxed">
                   {getStage2Desc()}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 7.2: LIMITING VS NON-LIMITING ---
export function LimitingVsNonLimiting() {
  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 7.2 — Limiting vs Non-Limiting
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          
          {/* Left Panel: Limiting */}
          <div className="group border-b lg:border-b-0 lg:border-r border-white/5 p-8 relative flex flex-col items-center bg-transparent transition-colors hover:bg-white/[0.02]">
            <h4 className="font-mono text-sm text-luxury-gold mb-8 z-10">Limiting</h4>
            
            <div className="absolute top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-vanta-900 border border-luxury-gold/30 p-3 rounded z-20 text-[10px] font-sans text-vanta-300 w-[80%] text-center shadow-2xl">
              <span className="text-luxury-gold font-bold">Limiting:</span> Wave 4 or B-wave position. Thrust is bounded. Post-thrust returns to breakout point.
            </div>

            <div className="relative w-full max-w-[300px] h-[220px] mb-6">
              <svg width="300" height="220" className="overflow-visible">
                 {/* Trendlines */}
                 <line x1="20" y1="20" x2="220" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3 3" />
                 <line x1="80" y1="200" x2="220" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3 3" />

                 {/* Internal a-e */}
                 <polyline points="20,20 80,200 120,60 160,165 190,88 210,135" fill="none" stroke="#8a9bb5" strokeWidth="3" strokeLinejoin="round" />

                 {/* Dotted bounding box for thrust */}
                 <rect x="210" y="10" width="80" height="180" fill="rgba(201,168,76,0.05)" stroke="#c9a84c" strokeWidth="1" strokeDasharray="4 4" />
                 <text x="250" y="115" fill="#c9a84c" fontSize="10" textAnchor="middle" opacity="0.8">75-125%</text>

                 {/* Thrust */}
                 <polyline points="210,135 250,50" fill="none" stroke="#27ae60" strokeWidth="4" />
                 <polygon points="250,50 240,55 255,60" fill="#27ae60" transform="rotate(-60 250 50)" />
              </svg>
            </div>

            <p className="font-sans text-sm text-vanta-400 text-center max-w-[250px]">
               Bounded. Defined target zone.
            </p>
          </div>

          {/* Right Panel: Non-Limiting */}
          <div className="group p-8 relative flex flex-col items-center bg-transparent transition-colors hover:bg-white/[0.02]">
            <h4 className="font-mono text-sm text-[#8a9bb5] mb-8 z-10 transition-colors group-hover:text-luxury-gold">Non-Limiting</h4>
            
            <div className="absolute top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-vanta-900 border border-luxury-gold/30 p-3 rounded z-20 text-[10px] font-sans text-vanta-300 w-[80%] text-center shadow-2xl">
              <span className="text-luxury-gold font-bold">Non-Limiting:</span> x-wave or last phase of complex correction. Thrust is unbounded. Will NOT return to apex.
            </div>

            <div className="relative w-full max-w-[300px] h-[220px] mb-6">
              <svg width="300" height="220" className="overflow-visible">
                 {/* Trendlines */}
                 <line x1="20" y1="20" x2="220" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3 3" />
                 <line x1="80" y1="200" x2="220" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3 3" />

                 {/* Internal a-e */}
                 <polyline points="20,20 80,200 120,60 160,165 190,88 210,135" fill="none" stroke="#8a9bb5" strokeWidth="3" strokeLinejoin="round" />

                 {/* Massive Thrust */}
                 <polyline points="210,135 290,-60" fill="none" stroke="#27ae60" strokeWidth="4" />
                 <polygon points="290,-60 280,-55 295,-50" fill="#27ae60" transform="rotate(-60 290 -60)" />

                 <text x="240" y="30" fill="#27ae60" fontSize="11" fontWeight="bold" transform="rotate(-65 240 30)">MASSIVE RUN</text>
              </svg>
            </div>

            <p className="font-sans text-sm text-vanta-400 text-center max-w-[250px]">
               Unbounded. Massive potential.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
