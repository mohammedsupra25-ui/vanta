import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 5.1: THE ZIGZAG ---
export function TheZigzag() {
  const [hoveredWave, setHoveredWave] = useState<'A' | 'B' | 'C' | null>(null);

  const points = {
    start: { x: 50, y: 50 },
    a: { x: 150, y: 220 },
    b: { x: 250, y: 150 },
    c: { x: 350, y: 320 }
  };

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 5.1 — The Zigzag
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
          
          <div className="relative w-full max-w-[450px] h-[350px] bg-vanta-900 border border-white/5 rounded-xl overflow-hidden shadow-inset flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <svg width="400" height="350" className="overflow-visible z-10">
              {/* Wave A */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredWave('A')}
                onMouseLeave={() => setHoveredWave(null)}
              >
                 <line x1={points.start.x} y1={points.start.y} x2={points.a.x} y2={points.a.y} stroke="#c9a84c" strokeWidth="4" />
                 {/* Invisible wider line for easier hover */}
                 <line x1={points.start.x} y1={points.start.y} x2={points.a.x} y2={points.a.y} stroke="transparent" strokeWidth="20" />
                 <text x="80" y="140" fill={hoveredWave === 'A' || !hoveredWave ? '#c9a84c' : 'rgba(201,168,76,0.3)'} fontSize="16" fontFamily="monospace" fontWeight="bold">A</text>
                 <text x="100" y="140" fill={hoveredWave === 'A' || !hoveredWave ? 'white' : 'rgba(255,255,255,0.3)'} fontSize="10" fontFamily="sans-serif">:5</text>
              </g>

              {/* Wave B */}
              <g 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredWave('B')}
                onMouseLeave={() => setHoveredWave(null)}
              >
                 <line x1={points.a.x} y1={points.a.y} x2={points.b.x} y2={points.b.y} stroke="#8a9bb5" strokeWidth="4" />
                 <line x1={points.a.x} y1={points.a.y} x2={points.b.x} y2={points.b.y} stroke="transparent" strokeWidth="20" />
                 <text x="210" y="180" fill={hoveredWave === 'B' || !hoveredWave ? '#8a9bb5' : 'rgba(138,155,181,0.3)'} fontSize="16" fontFamily="monospace" fontWeight="bold">B</text>
                 <text x="225" y="180" fill={hoveredWave === 'B' || !hoveredWave ? 'white' : 'rgba(255,255,255,0.3)'} fontSize="10" fontFamily="sans-serif">:3</text>
              </g>

              {/* Wave C */}
              <g 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredWave('C')}
                onMouseLeave={() => setHoveredWave(null)}
              >
                 <line x1={points.b.x} y1={points.b.y} x2={points.c.x} y2={points.c.y} stroke="#c9a84c" strokeWidth="4" />
                 <line x1={points.b.x} y1={points.b.y} x2={points.c.x} y2={points.c.y} stroke="transparent" strokeWidth="20" />
                 <text x="310" y="240" fill={hoveredWave === 'C' || !hoveredWave ? '#c9a84c' : 'rgba(201,168,76,0.3)'} fontSize="16" fontFamily="monospace" fontWeight="bold">C</text>
                 <text x="325" y="240" fill={hoveredWave === 'C' || !hoveredWave ? 'white' : 'rgba(255,255,255,0.3)'} fontSize="10" fontFamily="sans-serif">:5</text>
              </g>
              
              {/* Markers */}
              <circle cx={points.start.x} cy={points.start.y} r="4" fill="#666" />
              <circle cx={points.a.x} cy={points.a.y} r="4" fill="#c9a84c" />
              <circle cx={points.b.x} cy={points.b.y} r="4" fill="#8a9bb5" />
              <circle cx={points.c.x} cy={points.c.y} r="4" fill="#c9a84c" />
            </svg>
          </div>

          <div className="w-full max-w-[300px] bg-black/50 p-6 rounded-lg border border-white/5 h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredWave || 'none'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {!hoveredWave && (
                  <p className="font-sans text-vanta-400 text-sm text-center">
                    Hover over any wave to inspect its properties.
                  </p>
                )}
                {hoveredWave === 'A' && (
                  <>
                    <div className="font-mono text-lg text-luxury-gold mb-2 border-b border-luxury-gold/30 pb-2">Wave A</div>
                    <p className="font-sans text-sm text-vanta-200">
                      Impulsive (:5). Sharp move against the main trend. Should not retrace more than 61.8% of the previous impulse.
                    </p>
                  </>
                )}
                {hoveredWave === 'B' && (
                  <>
                    <div className="font-mono text-lg text-[#8a9bb5] mb-2 border-b border-[#8a9bb5]/30 pb-2">Wave B</div>
                    <p className="font-sans text-sm text-vanta-200">
                      Corrective (:3). Retraces part of A. Maximum 61.8% of A.
                    </p>
                  </>
                )}
                {hoveredWave === 'C' && (
                  <>
                    <div className="font-mono text-lg text-luxury-gold mb-2 border-b border-luxury-gold/30 pb-2">Wave C</div>
                    <p className="font-sans text-sm text-vanta-200">
                      Impulsive (:5). Must move beyond the end of A. Typically 61.8% to 161.8% of A.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 5.2: THE FLAT AND ITS MANY FACES ---
export function TheFlat() {
  type Variation = 'COMMON' | 'IRREGULAR' | 'RUNNING' | 'C_FAILURE' | 'B_FAILURE';
  const [variation, setVariation] = useState<Variation>('COMMON');

  // Base coordinates
  const startY = 80;
  const startX = 50;
  const dx = 100;

  // Compute points based on variation
  let aY = 200; // Wave A goes down to 200 (a length of 120)
  const aLength = aY - startY;

  let bY = startY; // default 100% retrace
  let cY = aY; // default 100% of B

  let label = "";

  switch (variation) {
    case 'COMMON':
      bY = startY + (aLength * 0.1); // ~90% retrace
      cY = aY + 20; // slightly past A
      label = "B = ~90% of A. Most basic flat.";
      break;
    case 'IRREGULAR':
      bY = startY - (aLength * 0.2); // ~120% retrace (exceeds start)
      cY = aY + 40; // exceeds A
      label = "B = 120% of A. B goes beyond A's start.";
      break;
    case 'RUNNING':
      bY = startY - (aLength * 0.5); // ~150% retrace
      cY = startY + 20; // roughly equals A length, finishes well above A
      label = "B = 150% of A. Most powerful standard correction.";
      break;
    case 'C_FAILURE':
      bY = startY + (aLength * 0.1); // ~90% retrace
      cY = aY - 40; // fails to reach A
      label = "C fails to move beyond A. Weak correction.";
      break;
    case 'B_FAILURE':
      bY = startY + (aLength * 0.3); // ~70% retrace
      cY = aY + 30; // goes past A
      label = "B = 70% of A. B is weak.";
      break;
  }

  const p0 = `${startX},${startY}`;
  const pa = `${startX + dx},${aY}`;
  const pb = `${startX + dx*2},${bY}`;
  const pc = `${startX + dx*3},${cY}`;
  const pLine = `${p0} ${pa} ${pb} ${pc}`;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 5.2 — The Flat and Its Variations
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'COMMON', label: 'Common' },
              { id: 'IRREGULAR', label: 'Irregular' },
              { id: 'RUNNING', label: 'Running' },
              { id: 'C_FAILURE', label: 'C-Failure' },
              { id: 'B_FAILURE', label: 'B-Failure' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setVariation(v.id as Variation)}
                className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                  variation === v.id
                    ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30'
                    : 'text-vanta-400 hover:text-white border border-transparent hover:bg-white/5'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-[620px] h-[340px] mx-auto border border-white/5 rounded-xl bg-vanta-900 overflow-hidden flex items-center justify-center mb-8">
             <svg width="450" height="340" className="overflow-visible">
               {/* Reference lines */}
               <line x1="20" y1={startY} x2="430" y2={startY} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
               <line x1="20" y1={aY} x2="430" y2={aY} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
               <text x="20" y={startY - 6} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">Wave 1 Peak</text>
               <text x="20" y={aY + 12} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">Wave A Bottom</text>

               {/* The Wave */}
               <polyline points={pLine} fill="none" stroke="#8a9bb5" strokeWidth="4" className="transition-all duration-500 ease-in-out" />
               
               {/* Labels pinned to points */}
               <g className="transition-all duration-500 ease-in-out" style={{ transform: `translate(${startX+dx}px, ${aY}px)` }}>
                 <circle cx="0" cy="0" r="5" fill="#8a9bb5" />
                 <text x="15" y="-5" fill="white" fontSize="12" fontFamily="monospace">A :3</text>
               </g>
               <g className="transition-all duration-500 ease-in-out" style={{ transform: `translate(${startX+dx*2}px, ${bY}px)` }}>
                 <circle cx="0" cy="0" r="5" fill="#8a9bb5" />
                 <text x="-25" y="-10" fill="white" fontSize="12" fontFamily="monospace">B :3</text>
               </g>
               <g className="transition-all duration-500 ease-in-out" style={{ transform: `translate(${startX+dx*3}px, ${cY}px)` }}>
                 <circle cx="0" cy="0" r="5" fill="#c9a84c" />
                 <text x="15" y="10" fill="white" fontSize="12" fontFamily="monospace">C :5</text>
               </g>
             </svg>
          </div>

          <p className="font-sans text-lg font-bold text-luxury-gold text-center">
            {label}
          </p>
          <p className="font-sans text-sm text-vanta-400 text-center mt-4 italic max-w-lg mx-auto">
            "Same basic structure (3-3-5). Different Wave B sizes create completely different patterns."
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 5.3: THE TRIANGLE ---
export function TheTriangle() {
  const [showMistake, setShowMistake] = useState(false);

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 5.3 — The Triangle
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8 flex flex-col items-center">
          
          <div className="relative w-full max-w-[620px] h-[340px] bg-vanta-900 border border-white/10 rounded-xl overflow-hidden mb-8 flex justify-center items-center">
            <svg width="500" height="300" className="overflow-visible">
              {/* Pre-trend */}
              <polyline points="0,280 80,40" stroke="#c9a84c" strokeWidth="4" fill="none" opacity="0.5" />
              <text x="20" y="270" fill="#c9a84c" fontSize="11" fontFamily="sans-serif" opacity="0.6">PRE-TREND (UP)</text>

              {/* Triangle Trendlines */}
              <line x1="80" y1="40" x2="420" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="160" y1="230" x2="420" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />

              {/* The 5 internal waves (a,b,c,d,e) */}
              <polyline points="80,40 160,230 240,80 300,190 350,110 390,170" stroke="#8a9bb5" strokeWidth="3" fill="none" />
              
              <text x="110" y="150" fill="white" fontSize="12" fontFamily="monospace">a</text>
              <text x="200" y="140" fill="white" fontSize="12" fontFamily="monospace">b</text>
              <text x="270" y="140" fill="white" fontSize="12" fontFamily="monospace">c</text>
              <text x="335" y="140" fill="white" fontSize="12" fontFamily="monospace">d</text>
              <text x="380" y="130" fill="white" fontSize="12" fontFamily="monospace">e</text>

              {/* Correct Upward Thrust */}
              <g>
                <line x1="390" y1="170" x2="460" y2="20" stroke="#27ae60" strokeWidth="4" />
                <polygon points="460,20 450,25 465,35" fill="#27ae60" />
                <text x="470" y="50" fill="#27ae60" fontSize="18" fontWeight="bold">✓</text>
                <text x="360" y="30" fill="#27ae60" fontSize="11" fontFamily="sans-serif">Thrust follows pre-trend</text>
              </g>

              {/* Incorrect Mistake Thrust */}
              <AnimatePresence>
                {showMistake && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <line x1="390" y1="170" x2="440" y2="280" stroke="#c0392b" strokeWidth="4" />
                    <polygon points="440,280 430,270 445,265" fill="#c0392b" />
                    <text x="450" y="270" fill="#c0392b" fontSize="18" fontWeight="bold">✗</text>
                    <text x="320" y="280" fill="#c0392b" fontSize="11" fontFamily="sans-serif">Most people think it breaks down</text>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>

          <button
            onClick={() => setShowMistake(!showMistake)}
            className={`px-6 py-3 rounded uppercase font-sans text-xs font-bold tracking-[2px] border transition-colors ${
              showMistake 
                ? 'bg-red-500/10 text-red-400 border-red-500/40' 
                : 'bg-white/5 text-vanta-300 border-white/20 hover:bg-white/10 hover:text-white'
            }`}
          >
            {showMistake ? 'Hide Mistake' : 'Show Common Mistake'}
          </button>

          <p className="font-sans text-sm text-vanta-400 text-center mt-6 italic max-w-lg mx-auto">
             "When the B-D trendline breaks, thrust follows the pre-triangle trend — NOT wave E."
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 5.4: COMPLEX CORRECTIONS BUILDER ---
export function ComplexBuilder() {
  // state: 1 = Single, 2 = Double, 3 = Triple
  const [level, setLevel] = useState<1 | 2 | 3>(1);

  const getLabel = () => {
    switch (level) {
      case 1: return "Single Zigzag";
      case 2: return "Double Zigzag";
      case 3: return "Triple Zigzag (MAXIMUM)";
    }
  };

  const xOffset = (level - 1) * 160;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 5.5 — Complex Corrections Builder
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8 max-w-[700px] mx-auto">
            <h3 className="font-display text-2xl text-luxury-gold">{getLabel()}</h3>
            
            <div className="flex gap-4">
              {level > 1 && (
                <button 
                  onClick={() => setLevel(1)}
                  className="px-4 py-2 border border-white/10 rounded text-xs font-sans uppercase tracking-widest text-vanta-400 hover:text-white"
                >
                  Reset
                </button>
              )}
              <button 
                onClick={() => setLevel(prev => Math.min(3, prev + 1) as 1 | 2 | 3)}
                disabled={level === 3}
                className={`w-10 h-10 rounded-full flex justify-center items-center text-xl transition-all ${
                  level === 3 
                    ? 'border-2 border-red-500/40 text-red-500/40 cursor-not-allowed bg-red-500/5' 
                    : 'bg-luxury-gold text-black hover:scale-105 shadow-[0_0_15px_rgba(201,168,76,0.3)]'
                }`}
              >
                +
              </button>
            </div>
          </div>

          <div className="w-full max-w-[700px] mx-auto h-[260px] bg-vanta-900 border border-white/10 rounded-xl flex items-center justify-start p-8 overflow-hidden relative">
             <div className="flex items-center absolute" style={{ 
                transform: `translateX(calc(50% - ${xOffset/2}px - 100px))`,
                transition: 'transform 0.5s ease' 
             }}>
               {/* Base Zigzag (W) */}
               <div className="relative w-[140px] h-[160px]">
                 <svg width="140" height="160" className="overflow-visible">
                   <polyline points="0,20 60,140 100,80 140,160" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                   <text x="60" y="15" fill="white" fontSize="16" fontFamily="monospace" fontWeight="bold">W</text>
                 </svg>
               </div>

               {/* Second section (X + Y) */}
               <AnimatePresence>
                 {level >= 2 && (
                   <motion.div 
                     initial={{ opacity: 0, width: 0 }}
                     animate={{ opacity: 1, width: 160 }}
                     exit={{ opacity: 0, width: 0 }}
                     className="relative h-[160px] flex items-center"
                   >
                     {/* X wave connector */}
                     <svg width="40" height="160" className="absolute left-0 overflow-visible">
                       <line x1="0" y1="160" x2="40" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="4 4" />
                       <text x="15" y="30" fill="rgba(255,255,255,0.5)" fontSize="16" fontFamily="monospace">X</text>
                     </svg>
                     {/* Y wave Zigzag */}
                     <div className="absolute left-[40px] w-[140px] h-[160px]">
                       <svg width="140" height="160" className="overflow-visible">
                         <polyline points="0,40 60,160 100,100 140,180" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                         <text x="80" y="30" fill="white" fontSize="16" fontFamily="monospace" fontWeight="bold">Y</text>
                       </svg>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Third section (XX + Z) */}
               <AnimatePresence>
                 {level >= 3 && (
                   <motion.div 
                     initial={{ opacity: 0, width: 0 }}
                     animate={{ opacity: 1, width: 160 }}
                     exit={{ opacity: 0, width: 0 }}
                     className="relative h-[160px] flex items-center"
                   >
                     {/* X wave connector */}
                     <svg width="40" height="160" className="absolute left-0 overflow-visible">
                       <line x1="0" y1="180" x2="40" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="4 4" />
                       <text x="15" y="50" fill="rgba(255,255,255,0.5)" fontSize="16" fontFamily="monospace">X</text>
                     </svg>
                     {/* Z wave Zigzag */}
                     <div className="absolute left-[40px] w-[140px] h-[160px]">
                       <svg width="140" height="160" className="overflow-visible">
                         <polyline points="0,60 60,180 100,120 140,200" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                         <text x="80" y="45" fill="white" fontSize="16" fontFamily="monospace" fontWeight="bold">Z</text>
                       </svg>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>

             </div>
          </div>
          
          <AnimatePresence>
            {level === 3 && (
              <motion.p 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-center text-red-400 font-sans text-xs uppercase tracking-widest mt-6"
              >
                MAXIMUM REACHED — market cannot form more than a Triple Three
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
