import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 9.1: THE TIMEFRAME FUNNEL ---
export function TheTimeframeFunnel() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const levels = [
    { id: 1, label: "H4", color: "text-luxury-gold", title: "DIRECTION", sub: "Which way?", desc: "The big picture. Tells you bullish or bearish. Which wave of the cycle.", width: "w-[100%]" },
    { id: 2, label: "H1", color: "text-[#8a9bb5]", title: "STRUCTURE", sub: "What pattern?", desc: "The developing pattern. Confirms or denies the sub-structure.", width: "w-[80%]" },
    { id: 3, label: "m15", color: "text-[#8a9bb5]", title: "ZONE", sub: "Where specifically?", desc: "Narrows to the price area where your entry should appear.", width: "w-[60%]" },
    { id: 4, label: "m5", color: "text-white", title: "TRIGGER", sub: "What behaviour?", desc: "The exact candle or price behaviour that says GO.", width: "w-[40%]", bgHover: "hover:bg-luxury-gold/20 hover:border-luxury-gold/50" }
  ];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 9.1 — The Timeframe Funnel
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8 flex items-center justify-center">
          <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
            
            {levels.map((lvl) => {
              const isHovered = hoveredLevel === lvl.id;
              
              return (
                <div key={lvl.id} className="w-full flex flex-col items-center group">
                  <div
                    onMouseEnter={() => setHoveredLevel(lvl.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className={`${lvl.width} transition-all duration-300 relative border border-white/10 ${lvl.bgHover || 'hover:bg-white/5'} ${isHovered ? 'scale-105 shadow-xl z-20 ' + (lvl.id === 4 ? 'bg-luxury-gold/20 border-luxury-gold/50' : 'bg-white/10 border-white/30') : 'bg-vanta-900 border-white/10'} rounded-lg p-6 flex flex-col items-center cursor-default`}
                  >
                    <div className={`font-mono font-bold text-3xl opacity-20 absolute top-2 left-4 ${lvl.color}`}>{lvl.label}</div>
                    
                    <div className="text-center relative z-10">
                      <h3 className={`font-sans text-xl font-bold tracking-[3px] uppercase mb-1 ${isHovered && lvl.id === 4 ? 'text-luxury-gold' : 'text-white'}`}>{lvl.title}</h3>
                      <p className="font-sans text-sm text-vanta-400 font-mono flex items-center justify-center gap-2">
                         <span className={lvl.color}>{lvl.label}</span> — {lvl.sub}
                      </p>
                    </div>

                    {/* Expandable description */}
                    <div className={`overflow-hidden transition-all duration-500 max-w-[80%] mx-auto text-center ${isHovered ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                      <p className={`font-sans text-sm ${lvl.id === 4 ? 'text-luxury-gold' : 'text-vanta-200'} leading-relaxed`}>
                        {lvl.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrow pointing down (except last) */}
                  {lvl.id !== 4 && (
                    <div className="h-6 flex items-center justify-center text-vanta-600 transition-colors group-hover:text-luxury-gold">
                      ↓
                    </div>
                  )}
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 9.2: STOP PLACEMENT ---
export function StopPlacement() {
  const [triangleType, setTriangleType] = useState<'LIMITING' | 'NON_LIMITING'>('LIMITING');
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 9.2 — Stop Placement by Scenario
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5 bg-vanta-900">
          
          {/* Panel A: Correction Complete */}
          <div 
            className="p-8 relative flex flex-col items-center transition-colors bg-transparent hover:bg-white/[0.03]"
            onMouseEnter={() => setHoveredPanel('A')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <h4 className="font-mono text-sm text-luxury-gold mb-8 z-10 w-full text-center">After Correction</h4>
            
            <div className="w-[180px] h-[150px] relative mb-4">
              <svg width="180" height="150" className="overflow-visible">
                 <polyline points="20,20 80,110 120,50 160,130" fill="none" stroke="#8a9bb5" strokeWidth="3" />
                 
                 <text x="75" y="130" fill="#fff" fontSize="12" fontFamily="monospace">A</text>
                 <text x="125" y="45" fill="#fff" fontSize="12" fontFamily="monospace">B</text>
                 <text x="165" y="145" fill="#fff" fontSize="12" fontFamily="monospace">C</text>

                 {/* Entry */}
                 <polygon points="170,110 165,120 175,120" fill="#27ae60" />
                 <text x="175" y="115" fill="#27ae60" fontSize="10">ENTRY</text>

                 {/* Stop placement */}
                 <line x1="40" y1="130" x2="180" y2="130" stroke="#c0392b" strokeWidth="2" strokeDasharray="3 3" className={`transition-all duration-300 ${hoveredPanel === 'A' ? 'stroke-width-[3px]' : 'stroke-width-[2px]'}`} />
                 <text x="40" y="145" fill="#c0392b" fontSize="10" fontWeight="bold">STOP</text>
              </svg>
            </div>

            <div className="h-20 w-full flex items-center justify-center">
              <p className={`font-sans text-xs text-center leading-relaxed transition-colors ${hoveredPanel === 'A' ? 'text-red-400' : 'text-vanta-400'}`}>
                {hoveredPanel === 'A' ? "If price drops below Wave C terminus, the correction count is objectively wrong." : "Below Wave C terminus"}
              </p>
            </div>
          </div>

          {/* Panel B: Trend Continuation */}
          <div 
            className="p-8 relative flex flex-col items-center transition-colors bg-transparent hover:bg-white/[0.03]"
            onMouseEnter={() => setHoveredPanel('B')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <h4 className="font-mono text-sm text-[#8a9bb5] mb-8 z-10 w-full text-center">Trend Continuation</h4>
            
            <div className="w-[180px] h-[150px] relative mb-4">
              <svg width="180" height="150" className="overflow-visible">
                 <polyline points="20,130 50,60 80,80 140,20 160,60 190,0" fill="none" stroke="#e8e6e1" strokeWidth="3" opacity="0.4" />
                 <polyline points="190,0 205,30 220,10" fill="none" stroke="#8a9bb5" strokeWidth="3" />

                 <text x="215" y="30" fill="#fff" fontSize="12" fontFamily="monospace">abc</text>
                 <text x="160" y="75" fill="#c9a84c" fontSize="12" fontFamily="monospace" fontWeight="bold">4</text>

                 {/* Entry */}
                 <polygon points="230,0 225,10 235,10" fill="#27ae60" />
                 <text x="235" y="5" fill="#27ae60" fontSize="10">ENTRY</text>

                 {/* Stop placement */}
                 <line x1="140" y1="60" x2="230" y2="60" stroke="#c0392b" strokeWidth="2" strokeDasharray="3 3" className={`transition-all duration-300 ${hoveredPanel === 'B' ? 'stroke-width-[3px]' : 'stroke-width-[2px]'}`} />
                 <text x="140" y="75" fill="#c0392b" fontSize="10" fontWeight="bold">STOP</text>
              </svg>
            </div>

            <div className="h-20 w-full flex items-center justify-center">
              <p className={`font-sans text-xs text-center leading-relaxed transition-colors ${hoveredPanel === 'B' ? 'text-red-400' : 'text-vanta-400'}`}>
                {hoveredPanel === 'B' ? "If price drops below the Wave 4 terminus, the bullish impulse structure is invalidated." : "Below Wave 4 terminus"}
              </p>
            </div>
          </div>

          {/* Panel C: Triangle Thrust */}
          <div 
            className="p-8 relative flex flex-col items-center transition-colors bg-transparent hover:bg-white/[0.03]"
            onMouseEnter={() => setHoveredPanel('C')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <h4 className="font-mono text-sm text-vanta-400 mb-4 z-10 flex w-full justify-between items-center">
              <span>Triangle</span>
              <button 
                className="px-2 py-1 text-[9px] border border-white/20 rounded bg-white/5 hover:text-white"
                onClick={() => setTriangleType(prev => prev === 'LIMITING' ? 'NON_LIMITING' : 'LIMITING')}
              >
                SWAP TYPE
              </button>
            </h4>
            
            <div className="w-[180px] h-[150px] relative mb-4">
              <svg width="180" height="150" className="overflow-visible">
                 <line x1="20" y1="20" x2="160" y2="70" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                 <line x1="40" y1="130" x2="160" y2="90" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                 <polyline points="20,20 40,130 80,40 120,110 140,65 155,95" fill="none" stroke="#8a9bb5" strokeWidth="2" />
                 
                 <text x="160" y="110" fill="#fff" fontSize="12" fontFamily="monospace">e</text>

                 {/* Entry */}
                 <polygon points="170,70 165,80 175,80" fill="#27ae60" />
                 <text x="175" y="75" fill="#27ae60" fontSize="10">ENTRY</text>

                 {/* Stop placement changes based on state */}
                 <AnimatePresence mode="wait">
                   {triangleType === 'LIMITING' ? (
                     <motion.g key="limit" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                       <circle cx="160" cy="80" r="4" fill="#c0392b" opacity="0.5" />
                       <line x1="140" y1="80" x2="190" y2="80" stroke="#c0392b" strokeWidth="2" strokeDasharray="3 3" />
                       <text x="190" y="85" fill="#c0392b" fontSize="10" fontWeight="bold">STOP</text>
                     </motion.g>
                   ) : (
                     <motion.g key="nonl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                       <line x1="130" y1="95" x2="190" y2="95" stroke="#c0392b" strokeWidth="2" strokeDasharray="3 3" />
                       <text x="190" y="100" fill="#c0392b" fontSize="10" fontWeight="bold">STOP</text>
                     </motion.g>
                   )}
                 </AnimatePresence>
              </svg>
            </div>

            <div className="h-20 w-full flex items-center justify-center">
              <p className={`font-sans text-xs text-center leading-relaxed transition-colors ${hoveredPanel === 'C' ? 'text-red-400' : 'text-vanta-400'}`}>
                {triangleType === 'LIMITING' 
                  ? "Limiting: Stop placed at the APEX price level." 
                  : "Non-Limiting: Stop placed below Wave E's extreme."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
