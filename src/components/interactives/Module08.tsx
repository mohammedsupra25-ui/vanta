import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 8.1: BIG VS SUB SEPARATION (ENHANCED) ---
export function BigVsSubSeparation() {
  const [hoveredRule, setHoveredRule] = useState<number | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);

  const rules = [
    { id: 1, title: "Big = Direction. Sub = Timing." },
    { id: 2, title: "Never trade sub against big." },
    { id: 3, title: "Big says up → only look for longs in sub." }
  ];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 8.1 — Big vs Sub Separation
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center relative mb-12">
            
            {/* Center Connection Arrow */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-white/10 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
               </svg>
            </div>

            {/* Left Panel: Big Picture */}
            <div 
               className={`flex-1 relative border rounded-xl p-8 transition-all duration-500 overflow-hidden ${
                 hoveredPanel === 'left' ? 'border-luxury-gold/40 bg-luxury-gold/[0.03] shadow-[0_0_30px_rgba(201,168,76,0.1)]' : 'border-white/5 bg-vanta-900'
               }`}
               onMouseEnter={() => setHoveredPanel('left')}
               onMouseLeave={() => setHoveredPanel(null)}
            >
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-luxury-gold">H4 (BIG)</div>
              
              <AnimatePresence>
                {hoveredPanel === 'left' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded border border-luxury-gold/40 font-sans text-[10px] text-vanta-200 uppercase tracking-widest z-20"
                  >
                    The compass. Which way is the big trend?
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-center items-center h-[200px]">
                 <svg width="300" height="180" className="overflow-visible">
                    <polyline points="20,160 80,100 110,140 190,60" fill="none" stroke="#e8e6e1" strokeWidth="3" opacity="0.4" />
                    <text x="70" y="90" fill="white" fontSize="12" opacity="0.4">1</text>
                    <text x="110" y="155" fill="white" fontSize="12" opacity="0.4">2</text>
                    <text x="180" y="50" fill="white" fontSize="12" opacity="0.4">3</text>
                    
                    <polyline points="190,60 250,110" fill="none" stroke="#c9a84c" strokeWidth="4" />
                    <text x="250" y="125" fill="#c9a84c" fontSize="12" fontWeight="bold">4</text>
                    
                    <polyline points="250,110 290,20" fill="none" stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                    <text x="295" y="15" fill="#c9a84c" fontSize="12" opacity="0.5">5?</text>

                    {/* Highlight Box */}
                    <rect x="180" y="40" width="80" height="90" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="220" y="30" fill="#c9a84c" fontSize="10" textAnchor="middle">WE ARE HERE</text>
                 </svg>
              </div>
            </div>

            {/* Right Panel: Sub Picture */}
            <div 
               className={`flex-1 relative border rounded-xl p-8 transition-all duration-500 overflow-hidden ${
                 hoveredPanel === 'right' ? 'border-[#8a9bb5]/40 bg-[#8a9bb5]/[0.03] shadow-[0_0_30px_rgba(138,155,181,0.1)]' : 'border-white/5 bg-vanta-900'
               }`}
               onMouseEnter={() => setHoveredPanel('right')}
               onMouseLeave={() => setHoveredPanel(null)}
            >
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-[#8a9bb5]">H1 (SUB)</div>

              <AnimatePresence>
                {hoveredPanel === 'right' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded border border-[#8a9bb5]/40 font-sans text-[10px] text-vanta-200 uppercase tracking-widest z-20"
                  >
                    The map. What's developing inside?
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-center items-center h-[200px]">
                 <svg width="300" height="180" className="overflow-visible">
                    <polyline points="20,20 100,140 180,60" fill="none" stroke="#e8e6e1" strokeWidth="3" opacity="0.4" />
                    <text x="90" y="160" fill="white" fontSize="14" opacity="0.4">a</text>
                    <text x="185" y="75" fill="white" fontSize="14" opacity="0.4">b</text>

                    <polyline points="180,60 260,160" fill="none" stroke="#8a9bb5" strokeWidth="4" />
                    <text x="265" y="175" fill="#8a9bb5" fontSize="14" fontWeight="bold">c</text>

                    <rect x="230" y="140" width="60" height="40" fill="rgba(46,204,113,0.1)" stroke="#27ae60" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="260" y="195" fill="#27ae60" fontSize="10" textAnchor="middle">ENTRY ZONE</text>
                 </svg>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rules.map((rule) => {
               const isHovered = hoveredRule === rule.id;
               const isDimmed = hoveredRule !== null && hoveredRule !== rule.id;

               return (
                 <div 
                   key={rule.id}
                   className={`p-6 bg-black/40 border transition-all duration-300 rounded-lg flex items-center justify-center text-center cursor-default ${
                     isHovered ? 'border-luxury-gold bg-luxury-gold/5 shadow-[0_0_20px_rgba(201,168,76,0.15)] scale-105 z-10' : 
                     isDimmed ? 'border-white/5 opacity-40' : 'border-white/10 opacity-80'
                   }`}
                   onMouseEnter={() => setHoveredRule(rule.id)}
                   onMouseLeave={() => setHoveredRule(null)}
                 >
                   <span className={`font-sans text-sm font-bold ${isHovered ? 'text-luxury-gold' : 'text-vanta-200'}`}>
                     {rule.title}
                   </span>
                 </div>
               )
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
