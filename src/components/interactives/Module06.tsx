import { useState } from 'react';
import { motion } from 'framer-motion';

// --- COMPONENT 6.1: TRENDING VS TERMINAL ---
export function TrendingVsTerminal() {
  const [showOverlap, setShowOverlap] = useState(false);
  const [showInternal, setShowInternal] = useState(false);

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 6.1 — Trending vs Terminal
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setShowOverlap(!showOverlap)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                showOverlap 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                  : 'text-vanta-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Show Overlap
            </button>
            <button
              onClick={() => setShowInternal(!showInternal)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                showInternal 
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30' 
                  : 'text-vanta-400 hover:text-white border border-transparent hover:bg-white/5'
              }`}
            >
              Show Internal Structure
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Trending Impulse */}
            <div className="bg-vanta-900 border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col items-center">
              <h4 className="font-mono text-sm text-luxury-gold mb-8">Trending Impulse</h4>
              
              <div className="w-[200px] h-[200px] relative">
                 <svg width="200" height="200" className="overflow-visible">
                   {/* Normal 5-wave points */}
                   <polyline points="20,160 60,100 80,120 140,40 160,80 190,10" fill="none" stroke="#e8e6e1" strokeWidth="3" strokeLinejoin="round" />
                   
                   <text x="50" y="90" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">1</text>
                   <text x="80" y="135" fill="#8a9bb5" fontSize="11" fontFamily="sans-serif">2</text>
                   <text x="130" y="30" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">3</text>
                   <text x="160" y="95" fill="#8a9bb5" fontSize="11" fontFamily="sans-serif">4</text>
                   <text x="180" y="0" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">5</text>

                   {/* Wave 2 line and Wave 4 bottom difference */}
                   <g className="transition-opacity duration-300" opacity={showOverlap ? 1 : 0}>
                     <line x1="0" y1="100" x2="200" y2="100" stroke="#27ae60" strokeDasharray="3 3" />
                     <text x="100" y="115" fill="#27ae60" fontSize="10">No overlap</text>
                   </g>

                   <g className="transition-opacity duration-300" opacity={showInternal ? 1 : 0}>
                     <text x="40" y="140" fill="#c9a84c" fontSize="10">:5</text>
                     <text x="75" y="110" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="120" y="80" fill="#c9a84c" fontSize="10">:5</text>
                     <text x="155" y="60" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="180" y="45" fill="#c9a84c" fontSize="10">:5</text>
                   </g>
                 </svg>
              </div>
            </div>

            {/* Box 2: Terminal Impulse */}
            <div className="bg-vanta-900 border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col items-center">
              <h4 className="font-mono text-sm text-red-400 mb-8">Terminal Impulse</h4>
              
              <div className="w-[200px] h-[200px] relative">
                 <svg width="200" height="200" className="overflow-visible">
                   {/* Terminal 5-wave points (W4 overlaps W1) */}
                   <polyline points="20,160 60,60 90,110 140,20 160,80 190,10" fill="none" stroke="#e8e6e1" strokeWidth="3" strokeLinejoin="round" />
                   
                   <text x="50" y="50" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">1</text>
                   <text x="90" y="125" fill="#8a9bb5" fontSize="11" fontFamily="sans-serif">2</text>
                   <text x="130" y="10" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">3</text>
                   <text x="160" y="95" fill="#8a9bb5" fontSize="11" fontFamily="sans-serif">4</text>
                   <text x="180" y="0" fill="#c9a84c" fontSize="11" fontFamily="sans-serif">5</text>

                   <g className="transition-opacity duration-300" opacity={showOverlap ? 1 : 0}>
                     <rect x="0" y="60" width="200" height="20" fill="rgba(192,57,43,0.15)" />
                     <line x1="0" y1="60" x2="200" y2="60" stroke="#c0392b" strokeDasharray="3 3" />
                     <text x="100" y="75" fill="#c0392b" fontSize="10">OVERLAP (W4 in W1 territory)</text>
                   </g>

                   <g className="transition-opacity duration-300" opacity={showInternal ? 1 : 0}>
                     <text x="40" y="120" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="80" y="80" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="120" y="60" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="155" y="45" fill="#8a9bb5" fontSize="10">:3</text>
                     <text x="180" y="45" fill="#8a9bb5" fontSize="10">:3</text>
                   </g>

                   {/* Violent Reversal Arrow */}
                   <g className="animate-in fade-in duration-700 delay-500">
                     <path d="M 190,10 Q 210,10 210,140" fill="none" stroke="#c0392b" strokeWidth="3" />
                     <polygon points="210,140 205,130 215,130" fill="#c0392b" />
                     <text x="120" y="140" fill="#c0392b" fontSize="9" fontFamily="sans-serif">Violent reversal</text>
                   </g>
                 </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 6.2: SPOT THE IMPOSTOR ---
export function SpotTheImpostor() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const clues = [
    { id: 1, x: 250, y: 70, label: "TOO-PERFECT CHANNELING — All waves fit neatly between parallel lines. Real impulses have an extension that breaks the channel." },
    { id: 2, x: 190, y: 130, label: "NO EXTENSION — All three advancing waves are roughly equal. None reaches 161.8% of the others." },
    { id: 3, x: 260, y: 180, label: "NO ALTERNATION — Waves 2 and 4 look identical. Same depth, time, pattern." },
    { id: 4, x: 340, y: 220, label: "TOO MANY TOUCHPOINTS — 5 or 6 points touch the trendlines. In real impulses, only 4 should." },
    { id: 5, x: 120, y: 220, label: "BOTH SHOW WEAKNESS — Both corrective waves suggest the move is exhausted." }
  ];

  const handleReveal = (id: number) => {
    if (!revealed.includes(id)) setRevealed((prev: number[]) => [...prev, id]);
  };

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 6.2 — Spot the Impostor
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="flex flex-col lg:flex-row p-8 gap-8">
          
          <div className="flex-[2] relative bg-vanta-900 border border-white/5 rounded-xl h-[340px] flex items-center justify-center overflow-hidden">
             {/* Fake Impulse Diagram */}
             <svg width="450" height="280" className="overflow-visible">
               {/* Trendlines */}
               <line x1="50" y1="240" x2="350" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
               <line x1="120" y1="260" x2="420" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
               
               {/* Waves 1-5 (Equal length, perfect channel) */}
               <polyline points="50,240 130,120 170,180 250,60 290,120 370,0" fill="none" stroke="#e8e6e1" strokeWidth="4" strokeLinejoin="round" />

               {/* Hotspots */}
               {clues.map((clue) => {
                 const isRevealed = revealed.includes(clue.id);
                 return (
                   <g key={clue.id} 
                      className="cursor-pointer group" 
                      onClick={() => handleReveal(clue.id)}
                      transform={`translate(${clue.x}, ${clue.y})`}
                   >
                     {/* Pulse effect if not revealed */}
                     {!isRevealed && (
                       <motion.circle 
                         cx="0" cy="0" r="16" fill="rgba(201,168,76,0.2)" 
                         animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} 
                         transition={{ repeat: Infinity, duration: 2 }} 
                       />
                     )}
                     <circle cx="0" cy="0" r="12" fill={isRevealed ? '#27ae60' : '#c9a84c'} className="transition-colors" />
                     <text x="0" y="4" fill={isRevealed ? '#fff' : '#000'} fontSize="11" fontWeight="bold" textAnchor="middle">{clue.id}</text>
                   </g>
                 )
               })}
             </svg>
          </div>

          <div className="flex-[1] flex flex-col gap-3 h-[340px] overflow-y-auto pr-2 custom-scrollbar">
            <p className="font-sans text-xs text-vanta-400 uppercase tracking-widest mb-2">Click markers to reveal clues</p>
            {clues.map(clue => {
              const isRevealed = revealed.includes(clue.id);
              return (
                <div 
                  key={clue.id} 
                  className={`p-4 rounded-lg border transition-all duration-500 ${isRevealed ? 'border-luxury-gold/30 bg-luxury-gold/5' : 'border-white/5 bg-transparent opacity-50'}`}
                >
                  <div className="font-mono text-sm mb-1">
                    <span className={isRevealed ? 'text-luxury-gold' : 'text-vanta-600'}>Clue {clue.id}</span>
                  </div>
                  <div className={`font-sans text-sm ${isRevealed ? 'text-vanta-200' : 'text-transparent'}`}>
                    {isRevealed ? clue.label : '???'}
                  </div>
                </div>
              )
            })}
            
            {revealed.length === 5 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-lg text-red-400 font-sans text-sm font-bold text-center"
              >
                SUMMARY: 3+ of these clues = NOT an impulse. It's a correction in disguise.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 6.3: POWER RATING SCALE ---
export function PowerRatingScale() {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const ratings = [
    { value: 3, label: "+3", name: "Triple Zigzag, Triple Combo", desc: "Cannot be completely retraced. Massive move follows." },
    { value: 2, label: "+2", name: "Double Zigzag, Double Combo", desc: "Strong. Significant follow-through expected." },
    { value: 1, label: "+1", name: "Double Flat, Elongated Zigzag", desc: "Moderate strength." },
    { value: 0, label: "0", name: "Common Flat, B-Failure", desc: "Neutral. Standard post-correction behaviour." },
    { value: -1, label: "-1", name: "Irregular, C-Failure", desc: "Weak. Trend likely continues with force." },
    { value: -2, label: "-2", name: "Irregular Failure, Double Three", desc: "Very weak. Signals trend acceleration." },
    { value: -3, label: "-3", name: "Triple Three, Running Correction", desc: "Weakest. MINIMUM 261.8% advance of previous impulse." }
  ];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 6.3 — Power Ratings
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-12 flex items-center justify-center min-h-[460px]">
          
          <div className="relative flex w-full max-w-[600px]">
            {/* The Vertical Bar */}
            <div className="w-4 rounded-full bg-gradient-to-b from-luxury-gold via-vanta-600 to-red-600 absolute left-0 top-0 bottom-0" />

            <div className="flex flex-col w-full pl-12 justify-between">
              {ratings.map((rating, idx) => {
                const isHovered = hoveredRating === rating.value;
                const isDimmed = hoveredRating !== null && hoveredRating !== rating.value;

                return (
                  <div 
                    key={idx}
                    className={`flex items-center group cursor-pointer transition-all duration-300 py-3 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                    onMouseEnter={() => setHoveredRating(rating.value)}
                    onMouseLeave={() => setHoveredRating(null)}
                  >
                    {/* The number */}
                    <div className={`w-10 text-right font-mono font-bold text-lg mr-6 transition-colors ${
                      rating.value > 0 ? 'text-luxury-gold' : rating.value < 0 ? 'text-red-500' : 'text-vanta-400'
                    }`}>
                      {rating.label}
                    </div>

                    {/* The item name & description */}
                    <div className="flex flex-col flex-1">
                      <div className={`font-sans text-lg font-bold transition-colors ${isHovered ? 'text-white' : 'text-vanta-300'}`}>
                        {rating.name}
                      </div>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'h-auto opacity-100 mt-1' : 'h-0 opacity-0'}`}>
                        <p className="font-sans text-sm text-vanta-400">
                          {rating.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
