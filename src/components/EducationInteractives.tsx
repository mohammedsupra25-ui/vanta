import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Lock } from 'lucide-react'

/* ─────────────────────────────────────────────
   ZONE MYTH (Figure 1.1)
───────────────────────────────────────────── */
export const ZoneMyth = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 1.1 — The Zone Myth</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>
      
      <div 
        className="relative h-[300px] w-full p-8 cursor-crosshair"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* The Supply Zone */}
        <motion.div 
          className="absolute top-[20%] left-0 w-full h-[60px] bg-red-500/10 border-y border-dashed border-red-500/30 flex items-center justify-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-widest text-red-400 font-bold">Supply Zone</span>
        </motion.div>

        {/* The Price Line */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <motion.path
            d="M 0 250 L 100 230 L 200 245 L 300 180 L 400 200 L 500 80 L 600 95 L 700 30 L 900 10"
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute top-[10%] left-[60%] bg-black border border-white/20 p-3 rounded shadow-2xl z-20 pointer-events-none"
            >
              <p className="font-sans text-[11px] text-white">"Price didn't get the memo."</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          This is what prediction looks like. A zone drawn from historical price action, projected into the future, and completely ignored by the market.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FAILURE CYCLE
───────────────────────────────────────────── */
const CYCLE_STEPS = [
  { id: 1, title: 'Learn a new method', desc: 'SMC, ICT, harmonics — it promises you the edge.' },
  { id: 2, title: 'Blow an account', desc: 'The zones don\'t hold. The market doesn\'t follow the script.' },
  { id: 3, title: 'Blame the method', desc: '"SMC doesn\'t work. I need something better."' },
  { id: 4, title: 'Buy another course', desc: 'A different guru, same broken premise — predict where price is going.' },
  { id: 5, title: 'Blow another account', desc: 'Different zones, same result.' },
  { id: 6, title: 'Repeat', desc: 'The loop continues until you change the ship, not the seat.', isReset: true },
]

export const FailureCycle = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="my-20 relative p-8 glassmorphism-card border-white/5 bg-vanta-900/50">
      <div className="mb-12">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold mb-2 block">The Retail Trap</span>
        <h3 className="font-display text-3xl text-white">The Failure Cycle</h3>
      </div>

      <div className="space-y-4">
        {CYCLE_STEPS.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActiveIndex(i)}
            className={`w-full text-left p-6 transition-all duration-300 border rounded-lg flex items-center justify-between group ${
              activeIndex === i 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'bg-white/2 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-6">
              <span className={`font-sans text-xs font-bold ${activeIndex === i ? 'text-red-500' : 'text-vanta-600'}`}>
                {step.isReset ? <RotateCcw size={14} /> : String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className={`font-sans font-bold text-sm uppercase tracking-widest ${activeIndex === i ? 'text-white' : 'text-vanta-400'}`}>
                  {step.title}
                </h4>
                {activeIndex === i && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="font-sans text-xs text-vanta-400 mt-2 leading-relaxed max-w-[400px]"
                  >
                    {step.desc}
                  </motion.p>
                )}
              </div>
            </div>
            <ChevronRight size={16} className={`transition-transform duration-300 ${activeIndex === i ? 'text-red-500 translate-x-1' : 'text-vanta-600'}`} />
          </button>
        ))}
      </div>

      {/* Visual connection to start */}
      <div className="absolute left-[34px] top-[140px] bottom-[60px] w-px bg-gradient-to-b from-red-500/40 via-red-500/10 to-transparent -z-10" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   12-WEEK JOURNEY
───────────────────────────────────────────── */
const MODULES = [
  { id: 1, title: 'The Lie', phase: 'Foundation', status: 'current' },
  { id: 2, title: 'Monowaves', phase: 'Foundation', status: 'locked' },
  { id: 3, title: 'Retracements', phase: 'Foundation', status: 'locked' },
  { id: 4, title: 'Polywaves', phase: 'Intermediate', status: 'locked' },
  { id: 5, title: 'Complex', phase: 'Intermediate', status: 'locked' },
  { id: 6, title: 'Terminal', phase: 'Advanced', status: 'locked' },
]

export const TwelveWeekJourney = () => {
  return (
    <div className="my-24 p-10 glassmorphism-card border-white/5 bg-vanta-900 shadow-2xl">
      <div className="text-center mb-16">
        <h3 className="font-display text-4xl text-white mb-4">The 12-Week Journey</h3>
        <p className="font-sans text-sm text-vanta-400">One complete system. No shortcuts.</p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 md:px-4">
        {/* Connection Line */}
        <div className="absolute top-6 left-6 md:left-0 md:w-full h-[calc(100%-48px)] md:h-px bg-white/5 -z-10" />
        
        {MODULES.map((mod, i) => (
          <div key={i} className="flex md:flex-col items-center gap-6 md:gap-4 flex-1 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 relative ${
              mod.status === 'current' 
                ? 'border-luxury-gold bg-luxury-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                : 'border-white/10 bg-vanta-900 group-hover:border-white/30'
            }`}>
              {mod.status === 'locked' ? (
                <Lock size={14} className="text-vanta-600 group-hover:text-vanta-400 transition-colors" />
              ) : (
                <span className="font-sans text-xs font-bold text-luxury-gold">01</span>
              )}
              
              {mod.status === 'current' && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-luxury-gold"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>

            <div className="md:text-center">
              <span className={`block font-sans text-[8px] uppercase tracking-[2px] mb-1 ${
                mod.phase === 'Foundation' ? 'text-luxury-gold/60' : 'text-vanta-500'
              }`}>
                {mod.phase}
              </span>
              <h4 className={`font-display text-sm ${mod.status === 'locked' ? 'text-vanta-500' : 'text-white'}`}>
                {mod.title}
              </h4>
              {mod.status === 'locked' && (
                 <span className="block font-sans text-[9px] text-vanta-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   Unlocks Week {i + 1}
                 </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
/* ─────────────────────────────────────────────
   MONOWAVE ATOM (Figure 2.1)
───────────────────────────────────────────── */
export const MonowaveAtom = () => {
  const [hoveredWave, setHoveredWave] = useState<number | null>(null)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.1 — Your First Monowave</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>
      
      <div className="relative h-[300px] w-full p-12">
        {/* The Grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <svg className="absolute inset-0 w-full h-full p-12 overflow-visible" viewBox="0 0 400 200">
          {/* Wave 1 */}
          <motion.line
            x1="50" y1="150" x2="200" y2="50"
            stroke={hoveredWave === 1 ? "#D4AF37" : "rgba(255,255,255,0.4)"}
            strokeWidth={hoveredWave === 1 ? "4" : "2"}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredWave(1)}
            onMouseLeave={() => setHoveredWave(null)}
          />
          {/* Wave 2 */}
          <motion.line
            x1="200" y1="50" x2="350" y2="150"
            stroke={hoveredWave === 2 ? "#D4AF37" : "rgba(255,255,255,0.4)"}
            strokeWidth={hoveredWave === 2 ? "4" : "2"}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredWave(2)}
            onMouseLeave={() => setHoveredWave(null)}
          />

          {/* Turning Point Dots */}
          {[
            { x: 50, y: 150, id: 1 },
            { x: 200, y: 50, id: 2 },
            { x: 350, y: 150, id: 3 }
          ].map((dot) => (
            <motion.circle
              key={dot.id}
              cx={dot.x} cy={dot.y} r="6"
              fill={hoveredDot === dot.id ? "#D4AF37" : "#000"}
              stroke="#D4AF37"
              strokeWidth="2"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredDot(dot.id)}
              onMouseLeave={() => setHoveredDot(null)}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </svg>

        {/* Labels Overlay */}
        <div className="absolute inset-0 pointer-events-none p-12">
          <AnimatePresence>
            {hoveredWave === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[40%] left-[15%] bg-black/80 border border-luxury-gold/20 p-2 rounded">
                 <span className="font-sans text-[10px] text-white">Monowave 1 — Price moving up</span>
              </motion.div>
            )}
            {hoveredWave === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[40%] right-[15%] bg-black/80 border border-luxury-gold/20 p-2 rounded">
                 <span className="font-sans text-[10px] text-white">Monowave 2 — Price moving down</span>
              </motion.div>
            )}
            {hoveredDot && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute bg-luxury-gold p-2 rounded shadow-xl" style={{ left: [50, 200, 350][hoveredDot-1] - 40, top: [150, 50, 150][hoveredDot-1] - 40 }}>
                 <span className="font-sans text-[9px] text-black font-bold uppercase tracking-widest">Direction Change</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          That's a monowave. Two direction changes, two monowaves. Everything in this curriculum is built from these.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CANDLE VS LINE (Figure 2.2)
───────────────────────────────────────────── */
export const CandleVsLine = () => {
  const [view, setView] = useState<'candle' | 'line'>('candle')

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.2 — Same Price, Different Clarity</span>
        <div className="flex gap-2">
           <button onClick={() => setView('candle')} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${view === 'candle' ? 'bg-luxury-gold text-black' : 'text-vanta-400 hover:text-white'}`}>Candlestick</button>
           <button onClick={() => setView('line')} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${view === 'line' ? 'bg-luxury-gold text-black' : 'text-vanta-400 hover:text-white'}`}>Line Chart</button>
        </div>
      </div>

      <div className="relative h-[350px] w-full p-8 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'candle' ? (
            <motion.div key="candle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full h-full flex items-center justify-center relative">
               <svg viewBox="0 0 500 200" className="w-full h-full opacity-60">
                 {/* Dummy candles */}
                 {Array.from({ length: 15 }).map((_, i) => (
                   <g key={i}>
                     <line x1={40 + i * 30} y1={50 + Math.sin(i) * 30} x2={40 + i * 30} y2={100 + Math.sin(i) * 30} stroke="white" strokeWidth="1" />
                     <rect x={35 + i * 30} y={60 + Math.sin(i) * 30} width="10" height="20" fill={i % 3 === 0 ? "#ef4444" : "#22c55e"} opacity="0.4" />
                   </g>
                 ))}
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 border border-red-500/20 p-4 rounded backdrop-blur-sm text-center">
                     <span className="font-sans text-[10px] text-red-400 uppercase tracking-widest block mb-2">Subjectivity Loop</span>
                     <p className="font-sans text-vanta-400 text-[11px]">Wicks and varying bodies create ambiguity.<br/>"Where exactly does the wave end?"</p>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div key="line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full h-full flex items-center justify-center relative">
               <svg viewBox="0 0 500 200" className="w-full h-full">
                 <motion.path
                   d="M 50 150 L 150 50 L 250 120 L 350 30 L 450 100"
                   fill="none"
                   stroke="#D4AF37"
                   strokeWidth="3"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                 />
                 {[
                   { x: 50, y: 150, text: 'm1' },
                   { x: 150, y: 50, text: 'm2' },
                   { x: 250, y: 120, text: 'm3' },
                   { x: 350, y: 30, text: 'm4' },
                   { x: 450, y: 100, text: 'm5' }
                 ].map((dot, i) => (
                   <g key={i}>
                     <circle cx={dot.x} cy={dot.y} r="4" fill="black" stroke="#D4AF37" strokeWidth="2" />
                     <text x={dot.x} y={dot.y - 12} textAnchor="middle" fill="#D4AF37" className="font-sans text-[10px] font-bold">{dot.text}</text>
                   </g>
                 ))}
               </svg>
               <div className="absolute bottom-10 right-10">
                  <span className="font-sans text-[10px] text-luxury-gold uppercase tracking-widest font-bold">Zero Ambiguity</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          The candlestick chart creates confusion. The line chart eliminates it. Every analyst identifies the same monowaves.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FRACTAL ZOOM (Figure 2.4 — STAR FIGURE)
───────────────────────────────────────────── */
export const FractalZoom = () => {
  return (
    <div className="my-24 glassmorphism-card overflow-hidden border-luxury-gold/20 bg-vanta-900 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.4 — Waves Inside Waves</span>
          <h4 className="font-display text-lg text-white mt-1">Fractal Market Architecture</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="relative w-full flex items-center justify-center px-4 py-8 md:p-12 overflow-x-auto overflow-y-hidden bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]">
        <svg viewBox="0 0 920 260" className="w-full max-w-[920px] h-auto min-h-[220px]" preserveAspectRatio="xMidYMid meet">

          {/* ── STAGE 1: Simple Upward Move (H4) ── */}
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <motion.path
              d="M 30 210 L 90 110 L 140 160 L 200 40"
              fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinejoin="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            />
            <text x="115" y="245" fill="rgba(255,255,255,0.25)" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">H4</text>
          </motion.g>

          {/* ── ARROW 1: Zoom into last leg ── */}
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.4 }}>
            <line x1="220" y1="130" x2="288" y2="130" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" strokeDasharray="5 4" />
            <polygon points="288,126 302,130 288,134" fill="rgba(212,175,55,0.5)" />
          </motion.g>

          {/* ── STAGE 2: 5-Wave Impulse (H1) ── */}
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }}>
            <motion.path
              d="M 310 210 L 370 130 L 410 175 L 480 70 L 520 120 L 590 25"
              fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinejoin="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }}
            />
            {[
              { x: 370, y: 120, l: '(1)' },
              { x: 410, y: 192, l: '(2)' },
              { x: 480, y: 60, l: '(3)' },
              { x: 520, y: 138, l: '(4)' },
              { x: 590, y: 17, l: '(5)' }
            ].map((p, i) => (
              <motion.text key={i} x={p.x} y={p.y} fill="#D4AF37" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 + i * 0.12 }}
              >{p.l}</motion.text>
            ))}
            <text x="450" y="245" fill="rgba(255,255,255,0.25)" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">H1</text>
          </motion.g>

          {/* ── ARROW 2: Zoom into wave (5) ── */}
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.4 }}>
            <line x1="600" y1="45" x2="660" y2="45" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" strokeDasharray="5 4" />
            <polygon points="660,41 674,45 660,49" fill="rgba(212,175,55,0.5)" />
          </motion.g>

          {/* ── STAGE 3: Fractal Inside Wave (5) (M15) ── */}
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0, duration: 0.5 }}>
            <motion.path
              d="M 670 195 L 715 130 L 745 160 L 800 70 L 830 105 L 885 20"
              fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinejoin="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 2.0, duration: 1 }}
            />
            {[
              { x: 715, y: 120, l: '(1)' },
              { x: 745, y: 177, l: '(2)' },
              { x: 800, y: 60, l: '(3)' },
              { x: 830, y: 122, l: '(4)' },
              { x: 885, y: 12, l: '(5)' }
            ].map((p, i) => (
              <motion.text key={i} x={p.x} y={p.y} fill="#D4AF37" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.6 + i * 0.12 }}
              >{p.l}</motion.text>
            ))}
            <text x="778" y="245" fill="rgba(255,255,255,0.25)" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">M15</text>
          </motion.g>
        </svg>
      </div>
      
      <div className="p-8 bg-luxury-gold/5 flex items-center gap-6 border-t border-luxury-gold/10">
         <div className="w-12 h-12 rounded-full bg-luxury-gold flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-bold font-sans">∞</span>
         </div>
         <p className="font-sans text-xs text-vanta-300 italic leading-relaxed">
          Every wave contains smaller waves. Every wave is part of a bigger wave. The same 5-wave impulse repeats at every level of resolution.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MOVEMENT TYPES (Figure 2.5)
───────────────────────────────────────────── */
export const MovementTypes = () => {
  const [showImp, setShowImp] = useState(false)
  const [showCorr, setShowCorr] = useState(false)

  const impColor = "#D4AF37"
  const corrColor = "#718096"

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.5 — The Only Two Moves That Exist</span>
        <div className="flex gap-2">
           <button onClick={() => setShowImp(!showImp)} className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${showImp ? 'bg-luxury-gold text-black' : 'text-vanta-400 border border-white/10 hover:border-white/20'}`}>Show :5 Impulsions</button>
           <button onClick={() => setShowCorr(!showCorr)} className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${showCorr ? 'bg-slate-400 text-black' : 'text-vanta-400 border border-white/10 hover:border-white/20'}`}>Show :3 Corrections</button>
        </div>
      </div>

      <div className="relative h-[320px] w-full p-8 md:p-12">
        <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
          {/* Impulsion legs */}
          <motion.g animate={{ opacity: showImp || (!showImp && !showCorr) ? 1 : 0.15 }}>
            <motion.line x1="50" y1="200" x2="130" y2="90" stroke={showImp ? impColor : "rgba(255,255,255,0.25)"} strokeWidth={showImp ? "4" : "2"} />
            <motion.line x1="190" y1="130" x2="290" y2="50" stroke={showImp ? impColor : "rgba(255,255,255,0.25)"} strokeWidth={showImp ? "4" : "2"} />
            <motion.line x1="340" y1="80" x2="450" y2="15" stroke={showImp ? impColor : "rgba(255,255,255,0.25)"} strokeWidth={showImp ? "4" : "2"} />
          </motion.g>
          {/* Correction legs */}
          <motion.g animate={{ opacity: showCorr || (!showImp && !showCorr) ? 1 : 0.15 }}>
            <motion.line x1="130" y1="90" x2="190" y2="130" stroke={showCorr ? corrColor : "rgba(255,255,255,0.25)"} strokeWidth={showCorr ? "4" : "2"} />
            <motion.line x1="290" y1="50" x2="340" y2="80" stroke={showCorr ? corrColor : "rgba(255,255,255,0.25)"} strokeWidth={showCorr ? "4" : "2"} />
          </motion.g>
          {/* Wave labels */}
          <text x="85" y="155" fill={showImp ? impColor : "rgba(255,255,255,0.15)"} fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1</text>
          <text x="165" y="118" fill={showCorr ? corrColor : "rgba(255,255,255,0.15)"} fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2</text>
          <text x="240" y="82" fill={showImp ? impColor : "rgba(255,255,255,0.15)"} fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3</text>
          <text x="320" y="72" fill={showCorr ? corrColor : "rgba(255,255,255,0.15)"} fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4</text>
          <text x="400" y="40" fill={showImp ? impColor : "rgba(255,255,255,0.15)"} fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">5</text>
        </svg>
        {/* Toggle descriptions */}
        <div className="absolute bottom-4 left-8 right-8 flex gap-4 flex-wrap">
           {showImp && (
             <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-luxury-gold/10 border border-luxury-gold/20 px-4 py-2 rounded">
               <span className="font-sans text-[10px] text-luxury-gold">Impulsions — Waves 1, 3, 5 push price WITH the trend</span>
             </motion.div>
           )}
           {showCorr && (
             <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-500/10 border border-slate-500/20 px-4 py-2 rounded">
               <span className="font-sans text-[10px] text-slate-400">Corrections — Waves 2, 4 pull price AGAINST the trend</span>
             </motion.div>
           )}
        </div>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Three impulsions pushing forward, two corrections pulling back. That's all a trending market is. The trick is knowing which is which.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FOUNDATION SUMMARY STACK
───────────────────────────────────────────── */
export const FoundationSummary = () => {
  return (
    <div className="my-32 space-y-[-24px]">
      {[
        { id: "01", title: "Monowaves", desc: "Price moves in directional segments. The atom of all market structure." },
        { id: "02", title: "Fractal Structure", desc: "Every wave contains smaller waves. The same patterns repeat at every scale." },
        { id: "03", title: "Two Core Moves", desc: "Every move is either an impulsion (:5) or a correction (:3). No third option." },
        { id: "04", title: "Degree & Scale", desc: "Degree is relative. You can only compare and combine waves of the same scale." },
        { id: "05", title: "Indirect Detection", desc: "Structure Labels (:5 or :3) come first. Pattern labels come last. Context is everything." }
      ].map((brick, i) => (
        <motion.div 
          key={brick.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative group cursor-default"
        >
          <div className="glassmorphism-card border-luxury-gold/5 bg-vanta-900 md:group-hover:translate-x-4 transition-transform duration-500 overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-luxury-gold/20 group-hover:bg-luxury-gold transition-colors" />
             <div className="p-8 flex items-center gap-8">
                <span className="font-display text-4xl text-luxury-gold/20 group-hover:text-luxury-gold/90 transition-colors font-bold">{brick.id}</span>
                <div>
                   <h4 className="font-display text-2xl text-white group-hover:text-luxury-gold transition-colors">{brick.title}</h4>
                   <p className="font-sans text-sm text-vanta-400 mt-1 max-w-xl group-hover:text-vanta-200 transition-colors">{brick.desc}</p>
                </div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   NEUTRALITY RULE (Figure 2.3)
───────────────────────────────────────────── */
export const NeutralityRule = () => {
  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.3 — Rule of Neutrality</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Hover to Resolve</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12">
        {/* Opposite Directions */}
        <div 
          className="relative h-[200px] bg-black/40 border border-white/5 rounded-xl p-6 cursor-pointer overflow-hidden group"
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
        >
          <span className="font-display text-sm text-vanta-200 block mb-4">Opposite Directions</span>
          <svg viewBox="0 0 200 100" className="w-full h-full">
             <motion.path 
               d={hoverLeft ? "M 20 80 L 180 20" : "M 20 80 L 80 20 L 120 20 L 180 20"}
               fill="none" stroke="#D4AF37" strokeWidth="3"
               transition={{ duration: 0.5 }}
             />
             <AnimatePresence>
               {!hoverLeft && (
                <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} cx="80" cy="20" r="3" fill="white" />
               )}
             </AnimatePresence>
          </svg>
          <div className="absolute bottom-4 left-6">
             <p className="font-sans text-[10px] text-vanta-500">{hoverLeft ? "Flat belongs to wave 1." : "UP → FLAT → UP (Ambiguous)"}</p>
          </div>
        </div>

        {/* Same Direction */}
        <div 
          className="relative h-[200px] bg-black/40 border border-white/5 rounded-xl p-6 cursor-pointer overflow-hidden group"
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
        >
          <span className="font-display text-sm text-vanta-200 block mb-4">Same Direction</span>
          <svg viewBox="0 0 200 100" className="w-full h-full">
             <motion.path 
               d={hoverRight ? "M 20 80 L 70 30 L 130 70 L 180 20" : "M 20 80 L 180 20"}
               fill="none" stroke="#D4AF37" strokeWidth="3"
               transition={{ duration: 0.5 }}
             />
          </svg>
          <div className="absolute bottom-4 left-6">
             <p className="font-sans text-[10px] text-vanta-500">{hoverRight ? "Flat splits into three." : "UP → UP (Single line?)"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   WAVE DEGREES (Figure 2.6)
───────────────────────────────────────────── */
export const WaveDegrees = () => {
  const [level, setLevel] = useState<'high' | 'medium' | 'low' | 'all'>('all')

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.6 — Degrees: Big, Medium, Small</span>
        <div className="flex bg-black p-1 rounded-lg border border-white/10">
           {(['all', 'high', 'medium', 'low'] as const).map(l => (
             <button key={l} onClick={() => setLevel(l)} className={`px-3 py-1 rounded text-[8px] font-bold uppercase tracking-widest transition-all ${level === l ? 'bg-luxury-gold text-black' : 'text-vanta-500 hover:text-white'}`}>{l}</button>
           ))}
        </div>
      </div>
      
      <div className="relative h-[320px] w-full p-8 md:p-12">
        <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
           {/* High Degree - Thick bright gold */}
           <motion.path 
             d="M 40 200 L 460 20" 
             fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"
             animate={{ opacity: level === 'high' || level === 'all' ? 0.35 : 0.04 }}
           />
           {level === 'high' && <text x="250" y="125" fill="#D4AF37" fontSize="10" textAnchor="middle" fontFamily="sans-serif" opacity="0.6">HIGH DEGREE</text>}
           
           {/* Medium Degree - Dim gold */}
           <motion.path 
             d="M 40 200 L 150 80 L 230 140 L 460 20" 
             fill="none" stroke="#8B7355" strokeWidth="3" strokeLinejoin="round"
             animate={{ opacity: level === 'medium' || level === 'all' ? 0.7 : 0.04 }}
           />
           {level === 'medium' && <text x="200" y="150" fill="#8B7355" fontSize="10" textAnchor="middle" fontFamily="sans-serif" opacity="0.8">MEDIUM DEGREE</text>}
           
           {/* Low Degree - Grey/white */}
           <motion.path 
             d="M 40 200 L 70 165 L 100 180 L 150 80 L 175 100 L 195 115 L 230 140 L 310 85 L 350 105 L 460 20" 
             fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round"
             animate={{ opacity: level === 'low' || level === 'all' ? 1 : 0.04 }}
           />
           {level === 'low' && <text x="330" y="105" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="sans-serif" opacity="0.6">LOW DEGREE</text>}
        </svg>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Three degrees of waves coexisting on the same chart. Your analysis must always compare waves of the same degree — never mix scales.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   DEGREE MISMATCH (Figure 2.7)
───────────────────────────────────────────── */
export const DegreeMismatch = () => {
  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-red-500/20 bg-vanta-900 shadow-2xl relative">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.7 — This Is Not a Pattern</span>
        <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-sans text-[9px] font-bold uppercase tracking-widest border border-red-500/20">Warning</span>
      </div>
      
      <div className="relative h-[280px] w-full p-8 md:p-12">
        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
           {/* Big wave up */}
           <path d="M 40 180 L 190 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
           {/* Tiny pullback (mismatch!) */}
           <path d="M 190 50 L 210 58" fill="none" stroke="#ef4444" strokeWidth="3" />
           {/* Another big wave up */}
           <path d="M 210 58 L 440 10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
           
           {/* Dashed red circle around the mismatch */}
           <circle cx="200" cy="54" r="28" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
           
           {/* Labels */}
           <text x="110" y="130" fill="rgba(255,255,255,0.25)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">LARGE WAVE</text>
           <text x="200" y="95" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">TINY PULLBACK</text>
           <text x="350" y="45" fill="rgba(255,255,255,0.25)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">LARGE WAVE</text>
        </svg>
      </div>
      
      <div className="p-6 bg-red-500/5 border-t border-red-500/10">
        <div className="space-y-2">
          <p className="font-sans text-[11px] text-red-300">❌ <strong>Wrong:</strong> "Wave 1 → Wave 2 → Wave 3" — these are NOT the same degree.</p>
          <p className="font-sans text-[11px] text-vanta-400">✓ This pullback is internal structure of the larger wave — not a separate wave at the same level.</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONTEXT MEANING (Figure 2.8)
───────────────────────────────────────────── */
export const ContextMeaning = () => {
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.8 — Context Is Everything</span>
        <h4 className="font-display text-lg text-white mt-2">Same Wave, Different Meaning</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Impulsive context */}
        <div className="glassmorphism-card overflow-hidden border-luxury-gold/10 bg-vanta-900 shadow-2xl">
          <div className="px-5 py-3 border-b border-white/5 bg-luxury-gold/5 flex items-center justify-between">
             <span className="font-sans text-[9px] text-luxury-gold uppercase tracking-widest font-bold">This wave is impulsive (:5)</span>
             <span className="font-sans text-[9px] text-luxury-gold/50">In an uptrend</span>
          </div>
          <div className="h-[220px] p-8 relative">
             <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                {/* Surrounding uptrend */}
                <path d="M 10 100 L 50 55 L 70 70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                {/* THE wave */}
                <motion.path 
                  d="M 70 70 L 130 20" 
                  fill="none" stroke="#D4AF37" strokeWidth="4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                {/* Continuation */}
                <path d="M 130 20 L 150 35 L 190 5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <text x="100" y="50" fill="#D4AF37" fontSize="7" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">m1</text>
             </svg>
             <div className="absolute bottom-4 left-6 right-6 text-center">
                <p className="font-sans text-[10px] text-luxury-gold/70">Pushes WITH the trend → <strong className="text-luxury-gold">Impulsion</strong></p>
             </div>
          </div>
        </div>

        {/* RIGHT: Corrective context */}
        <div className="glassmorphism-card overflow-hidden border-slate-500/10 bg-vanta-900 shadow-2xl">
          <div className="px-5 py-3 border-b border-white/5 bg-slate-500/5 flex items-center justify-between">
             <span className="font-sans text-[9px] text-slate-400 uppercase tracking-widest font-bold">This wave is corrective (:3)</span>
             <span className="font-sans text-[9px] text-slate-500">In a downtrend</span>
          </div>
          <div className="h-[220px] p-8 relative">
             <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                {/* Surrounding downtrend */}
                <path d="M 10 20 L 50 65 L 70 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                {/* THE wave (same direction & size!) */}
                <motion.path 
                  d="M 70 50 L 130 0" 
                  fill="none" stroke="#718096" strokeWidth="4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                {/* Continuation of downtrend */}
                <path d="M 130 0 L 160 50 L 190 110" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <text x="100" y="30" fill="#718096" fontSize="7" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">m1</text>
             </svg>
             <div className="absolute bottom-4 left-6 right-6 text-center">
                <p className="font-sans text-[10px] text-slate-500">Pushes AGAINST the trend → <strong className="text-slate-300">Correction</strong></p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-6 glassmorphism-card bg-vanta-900 border-white/5 text-center">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          The exact same wave. Same size, same direction. But the waves around it completely change what it means. <strong className="text-white">You cannot classify a wave in isolation.</strong>
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANALYSIS ORDER (Figure 2.9)
───────────────────────────────────────────── */
export const AnalysisOrder = () => {
  const wrongSteps = ['Guess the pattern', 'Label the waves (1, 2, 3…)', 'Hope the structure confirms', 'Enter trade', 'Pray']
  const rightSteps = ['Identify monowaves', 'Determine Structure Labels (:5 / :3)', 'Identify pattern from labels', 'Confirm pattern completed', 'Evidence-based entry']
  
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.9 — The Right Order</span>
        <h4 className="font-display text-lg text-white mt-2">Analysis Order Matters</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Wrong way */}
        <div className="p-8 border border-red-500/10 bg-red-500/[0.02] rounded-xl">
           <span className="font-sans text-[10px] text-red-400 uppercase tracking-widest block mb-8 text-center font-bold">❌ How Everyone Else Does It</span>
           <div className="space-y-1">
              {wrongSteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-red-500/10 bg-red-500/[0.03]">
                     <div className="w-7 h-7 rounded-full border border-red-500/30 flex items-center justify-center text-[10px] text-red-500 shrink-0 font-bold">{i+1}</div>
                     <span className="font-sans text-xs text-vanta-400">{step}</span>
                  </div>
                  {i < wrongSteps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className="w-px h-3 bg-red-500/20" />
                    </div>
                  )}
                </motion.div>
              ))}
           </div>
        </div>

        {/* VANTA way */}
        <div className="p-8 border border-luxury-gold/20 bg-luxury-gold/[0.03] rounded-xl">
           <span className="font-sans text-[10px] text-luxury-gold uppercase tracking-widest block mb-8 text-center font-bold">✓ The VANTA Way</span>
           <div className="space-y-1">
              {rightSteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-luxury-gold/10 bg-luxury-gold/[0.03]">
                     <div className="w-7 h-7 rounded-full bg-luxury-gold flex items-center justify-center text-[10px] text-black font-bold shrink-0">{i+1}</div>
                     <span className="font-sans text-xs text-white">{step}</span>
                  </div>
                  {i < rightSteps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className="w-px h-3 bg-luxury-gold/20" />
                    </div>
                  )}
                </motion.div>
              ))}
           </div>
        </div>
      </div>
      
      <div className="mt-6 p-6 glassmorphism-card bg-vanta-900 border-white/5 text-center">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          The difference between guessing patterns and identifying them. One starts from hope. The other starts from measurement.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FIVE OR THREE (Figure 2.3 — Rebuilt)
───────────────────────────────────────────── */
export const FiveOrThree = () => {
  const [hoveredSeg, setHoveredSeg] = useState<string | null>(null)

  const impTooltips: Record<string, string> = {
    '1': 'Wave 1: First push with the trend',
    '2': 'Wave 2: First pullback',
    '3': 'Wave 3: Strongest push',
    '4': 'Wave 4: Second pullback',
    '5': 'Wave 5: Final push',
  }
  const corrTooltips: Record<string, string> = {
    'a': 'Wave a: First move',
    'b': 'Wave b: Retracement',
    'c': 'Wave c: Final move',
  }

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.3 — The Two Internal Structures</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-white/5">
        {/* 5 Segments */}
        <div className="bg-vanta-900 p-8 relative">
          <div className="text-center mb-4">
            <span className="font-display text-sm text-luxury-gold">5 Segments</span>
          </div>
          <svg viewBox="0 0 220 140" className="w-full h-auto">
            {[
              { id: '1', d: 'M 20 120 L 55 60', color: '#D4AF37', lx: 35, ly: 85 },
              { id: '2', d: 'M 55 60 L 75 85', color: '#718096', lx: 68, ly: 78 },
              { id: '3', d: 'M 75 85 L 125 25', color: '#D4AF37', lx: 98, ly: 48 },
              { id: '4', d: 'M 125 25 L 145 50', color: '#718096', lx: 138, ly: 42 },
              { id: '5', d: 'M 145 50 L 195 10', color: '#D4AF37', lx: 172, ly: 25 },
            ].map(seg => (
              <g key={seg.id} onMouseEnter={() => setHoveredSeg(seg.id)} onMouseLeave={() => setHoveredSeg(null)} style={{ cursor: 'pointer' }}>
                <motion.path d={seg.d} fill="none" stroke={hoveredSeg === seg.id ? '#fff' : seg.color} strokeWidth={hoveredSeg === seg.id ? '4' : '3'} strokeLinejoin="round" />
                <text x={seg.lx} y={seg.ly} fill={seg.color} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{seg.id}</text>
              </g>
            ))}
          </svg>
          <div className="text-center mt-4">
            <span className="font-sans text-[11px] text-luxury-gold font-bold">:5 — Impulsive</span>
          </div>
          {hoveredSeg && impTooltips[hoveredSeg] && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-3 left-4 right-4 bg-luxury-gold/10 border border-luxury-gold/20 px-3 py-2 rounded text-center">
              <span className="font-sans text-[10px] text-luxury-gold">{impTooltips[hoveredSeg]}</span>
            </motion.div>
          )}
        </div>

        {/* 3 Segments */}
        <div className="bg-vanta-900 p-8 relative">
          <div className="text-center mb-4">
            <span className="font-display text-sm text-slate-400">3 Segments</span>
          </div>
          <svg viewBox="0 0 220 140" className="w-full h-auto">
            {[
              { id: 'a', d: 'M 30 120 L 90 40', color: '#718096', lx: 55, ly: 75 },
              { id: 'b', d: 'M 90 40 L 130 80', color: '#718096', lx: 115, ly: 55 },
              { id: 'c', d: 'M 130 80 L 190 15', color: '#718096', lx: 165, ly: 42 },
            ].map(seg => (
              <g key={seg.id} onMouseEnter={() => setHoveredSeg(seg.id)} onMouseLeave={() => setHoveredSeg(null)} style={{ cursor: 'pointer' }}>
                <motion.path d={seg.d} fill="none" stroke={hoveredSeg === seg.id ? '#fff' : seg.color} strokeWidth={hoveredSeg === seg.id ? '4' : '3'} strokeLinejoin="round" />
                <text x={seg.lx} y={seg.ly} fill={seg.color} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{seg.id}</text>
              </g>
            ))}
          </svg>
          <div className="text-center mt-4">
            <span className="font-sans text-[11px] text-slate-400 font-bold">:3 — Corrective</span>
          </div>
          {hoveredSeg && corrTooltips[hoveredSeg] && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-3 left-4 right-4 bg-slate-500/10 border border-slate-500/20 px-3 py-2 rounded text-center">
              <span className="font-sans text-[10px] text-slate-400">{corrTooltips[hoveredSeg]}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Every wave with internal structure follows one of these two blueprints. Five segments or three. The entire framework is built on this distinction.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PATTERN INSIDE PATTERN (Figure 2.4 — Rebuilt)
───────────────────────────────────────────── */
export const PatternInsidePattern = () => {
  const [expanded, setExpanded] = useState(false)

  const segments = [
    { id: 1, label: ':5', color: '#D4AF37' },
    { id: 2, label: ':3', color: '#718096' },
    { id: 3, label: ':5', color: '#D4AF37' },
    { id: 4, label: ':3', color: '#718096' },
    { id: 5, label: ':5', color: '#D4AF37' },
  ]

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-luxury-gold/20 bg-vanta-900 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.4 — :5 and :3 All the Way Down</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="p-8 md:p-12">
        <svg viewBox="0 0 500 250" className="w-full h-auto overflow-visible">
          {/* Main impulse wave */}
          <motion.path
            d="M 30 220 L 100 120 L 140 160 L 260 40 L 310 80 L 430 10"
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinejoin="round"
          />
          
          {/* Segment lines with labels */}
          {[
            { d: 'M 30 220 L 100 120', lx: 60, ly: 165, ...segments[0] },
            { d: 'M 100 120 L 140 160', lx: 125, ly: 145, ...segments[1] },
            { d: 'M 140 160 L 260 40', lx: 195, ly: 92, ...segments[2] },
            { d: 'M 260 40 L 310 80', lx: 290, ly: 65, ...segments[3] },
            { d: 'M 310 80 L 430 10', lx: 375, ly: 38, ...segments[4] },
          ].map((seg) => (
            <g key={seg.id}
              onMouseEnter={() => seg.id === 3 && setExpanded(true)}
              onMouseLeave={() => seg.id === 3 && setExpanded(false)}
              style={{ cursor: seg.id === 3 ? 'pointer' : 'default' }}
            >
              <motion.path
                d={seg.d} fill="none" stroke={seg.color}
                strokeWidth={seg.id === 3 && expanded ? '4' : '3'}
                strokeLinejoin="round"
                animate={{ opacity: expanded && seg.id !== 3 ? 0.2 : 1 }}
              />
              <motion.text x={seg.lx} y={seg.ly} fill={seg.color} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif"
                animate={{ opacity: expanded && seg.id !== 3 ? 0.2 : 1 }}
              >{seg.label}</motion.text>
            </g>
          ))}

          {/* Expanded internal structure of wave 3 */}
          <AnimatePresence>
            {expanded && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Sub-waves inside wave 3 */}
                <motion.path
                  d="M 140 160 L 170 120 L 185 138 L 220 60 L 240 78 L 260 40"
                  fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 2"
                />
                {/* Sub-labels */}
                {[
                  { x: 152, y: 135, l: ':5', c: '#D4AF37' },
                  { x: 180, y: 135, l: ':3', c: '#718096' },
                  { x: 200, y: 92, l: ':5', c: '#D4AF37' },
                  { x: 233, y: 74, l: ':3', c: '#718096' },
                  { x: 253, y: 52, l: ':5', c: '#D4AF37' },
                ].map((p, i) => (
                  <text key={i} x={p.x} y={p.y} fill={p.c} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{p.l}</text>
                ))}
                {/* Label */}
                <text x="200" y="240" fill="#D4AF37" fontSize="9" textAnchor="middle" fontFamily="sans-serif" opacity="0.7">
                  Hover wave 3 — it has the same :5/:3 structure inside
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Hint text when not expanded */}
          {!expanded && (
            <text x="200" y="240" fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
              Hover over wave 3 to see its internal structure
            </text>
          )}
        </svg>
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          An impulsive wave is made of 5 segments: :5, :3, :5, :3, :5. And each of those :5 segments has the same structure inside it. Same pattern, every scale.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   DEGREE COMPARISON (Figure 2.6 — Rebuilt)
───────────────────────────────────────────── */
export const DegreeComparison = () => {
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.6 — Compare These Two Scenarios</span>
        <h4 className="font-display text-lg text-white mt-2">Same Degree vs Different Degree</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Same degree — green */}
        <div className="glassmorphism-card overflow-hidden border-green-500/20 bg-vanta-900">
          <div className="px-5 py-3 border-b border-white/5 bg-green-500/5">
            <span className="font-sans text-[9px] text-green-400 uppercase tracking-widest font-bold">✓ Same Degree</span>
          </div>
          <div className="h-[200px] p-8">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              <path d="M 15 85 L 65 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
              <path d="M 65 20 L 105 55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
              <path d="M 105 55 L 185 10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
              <text x="100" y="95" fill="rgba(74,222,128,0.5)" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Similar scale — can be combined</text>
            </svg>
          </div>
        </div>

        {/* Different degree — red */}
        <div className="glassmorphism-card overflow-hidden border-red-500/20 bg-vanta-900">
          <div className="px-5 py-3 border-b border-white/5 bg-red-500/5">
            <span className="font-sans text-[9px] text-red-400 uppercase tracking-widest font-bold">✗ Different Degree</span>
          </div>
          <div className="h-[200px] p-8">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              <path d="M 15 85 L 80 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
              <path d="M 80 20 L 88 24" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <path d="M 88 24 L 185 10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
              <circle cx="84" cy="22" r="12" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 3" />
              <text x="100" y="95" fill="rgba(248,113,113,0.5)" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Different scale — cannot be combined</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 glassmorphism-card bg-vanta-900 border-white/5 text-center">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Left: waves of the same degree — they can be compared and combined. Right: waves of different degrees — the tiny pullback is internal detail, not a same-level wave.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   M0 / M1 / M2 SYSTEM (Figure 2.8 — Rebuilt)
───────────────────────────────────────────── */
export const M0M1M2System = () => {
  const [hovered, setHovered] = useState<'m0' | 'm1' | 'm2' | null>(null)

  const tooltips = {
    m0: 'The wave before m1 — its size relative to m1 helps determine the classification.',
    m1: "You can't classify this wave alone. You need m0 and m2.",
    m2: 'The wave after m1 — how much it retraces m1 is the primary classification tool.',
  }

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.8 — How Waves Identify Each Other</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="relative p-8 md:p-12">
        <svg viewBox="0 0 460 220" className="w-full h-auto overflow-visible">
          {/* m0 */}
          <g onMouseEnter={() => setHovered('m0')} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <motion.path d="M 40 160 L 120 70" fill="none" stroke={hovered === 'm0' ? '#fff' : 'rgba(255,255,255,0.3)'} strokeWidth={hovered === 'm0' ? '4' : '2.5'} strokeLinejoin="round" />
            <text x="70" y="125" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">m0</text>
            <text x="70" y="138" fill="rgba(255,255,255,0.2)" fontSize="7" textAnchor="middle" fontFamily="sans-serif">The wave before</text>
          </g>

          {/* m1 */}
          <g onMouseEnter={() => setHovered('m1')} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <motion.path d="M 120 70 L 280 170" fill="none" stroke={hovered === 'm1' ? '#fff' : '#D4AF37'} strokeWidth={hovered === 'm1' ? '5' : '4'} strokeLinejoin="round" />
            <text x="200" y="108" fill="#D4AF37" fontSize="14" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">m1</text>
            <text x="200" y="124" fill="#D4AF37" fontSize="8" textAnchor="middle" fontFamily="sans-serif" opacity="0.6">The wave you're analyzing</text>
          </g>

          {/* m2 */}
          <g onMouseEnter={() => setHovered('m2')} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <motion.path d="M 280 170 L 400 90" fill="none" stroke={hovered === 'm2' ? '#fff' : 'rgba(255,255,255,0.3)'} strokeWidth={hovered === 'm2' ? '4' : '2.5'} strokeLinejoin="round" />
            <text x="345" y="120" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">m2</text>
            <text x="345" y="133" fill="rgba(255,255,255,0.2)" fontSize="7" textAnchor="middle" fontFamily="sans-serif">The wave after</text>
          </g>

          {/* Relationship arrows */}
          <line x1="340" y1="100" x2="240" y2="135" stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="298" y="112" fill="rgba(212,175,55,0.35)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">How much does m2 retrace m1?</text>

          <line x1="85" y1="100" x2="165" y2="100" stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="125" y="55" fill="rgba(212,175,55,0.35)" fontSize="6" textAnchor="middle" fontFamily="sans-serif">How does m0 compare to m1?</text>
        </svg>

        {/* Hover tooltip */}
        {hovered && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-4 left-8 right-8 bg-luxury-gold/10 border border-luxury-gold/20 px-4 py-3 rounded text-center">
            <span className="font-sans text-[10px] text-luxury-gold">{tooltips[hovered]}</span>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          m1 is the wave you're studying. m0 and m2 are its neighbours. The mathematical relationships between them reveal m1's structure. This is the foundation of Module 03.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MARKET CYCLE (Figure 2.1 & 2.4 — Definitive)
───────────────────────────────────────────── */
export const MarketCycle = ({ rich = false }: { rich?: boolean }) => {
  const [hovered, setHovered] = useState<string | null>(null)

  const waves = [
    { id: '1', label: '1', d: 'M 30 140 L 70 90', color: '#D4AF37', text: rich ? "The start. Quiet. Most miss it." : "The trend begins" },
    { id: '2', label: '2', d: 'M 70 90 L 90 115', color: '#718096', text: rich ? "The test. Scary pullback. Can't retrace all of Wave 1." : "First pullback" },
    { id: '3', label: '3', d: 'M 90 115 L 150 40', color: '#D4AF37', text: rich ? "The power move. Longest and strongest." : "The strongest move" },
    { id: '4', label: '4', d: 'M 150 40 L 175 70', color: '#718096', text: rich ? "The pause. Can't overlap Wave 2." : "Second pullback" },
    { id: '5', label: '5', d: 'M 175 70 L 230 20', color: '#D4AF37', text: rich ? "Final push. Trend is complete after this." : "The final push" },
    { id: 'A', label: 'A', d: 'M 230 20 L 255 75', color: '#4A5568', text: rich ? "Correction begins." : "Correction starts" },
    { id: 'B', label: 'B', d: 'M 255 75 L 275 55', color: '#4A5568', text: rich ? "The trap. Fakes people into thinking the trend is back." : "Temporary bounce" },
    { id: 'C', label: 'C', d: 'M 275 55 L 295 100', color: '#4A5568', text: rich ? "Correction complete. New cycle about to begin." : "Correction finishes" },
  ]

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-luxury-gold/20 bg-vanta-900 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.1 & 2.4 — The Market Cycle</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="p-8 md:p-16 relative min-h-[400px]">
        <svg viewBox="0 0 340 180" className="w-full h-auto overflow-visible">
          {/* Brackets */}
          <path d="M 30 155 L 30 165 L 230 165 L 230 155" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          <text x="130" y="176" fill="rgba(212,175,55,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">THE TREND — 5 WAVES</text>
          
          <path d="M 235 115 L 235 125 L 295 125 L 295 115" fill="none" stroke="rgba(113,128,150,0.2)" strokeWidth="1" />
          <text x="265" y="136" fill="rgba(113,128,150,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">CORRECTION</text>

          {/* New Cycle Arrow */}
          <motion.path d="M 300 105 L 330 65" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 2" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
          <motion.text x="320" y="55" fill="#D4AF37" fontSize="8" fontFamily="sans-serif" opacity="0.6" textAnchor="middle"
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2.5 }}>Next 1 →</motion.text>

          {/* Waves */}
          {waves.map((w, idx) => (
            <g key={w.id} onMouseEnter={() => setHovered(w.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
              <motion.path d={w.d} fill="none" 
                stroke={hovered === w.id ? '#fff' : w.color} 
                strokeWidth={hovered === w.id ? '5' : '3.5'} 
                strokeLinejoin="round" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: idx * 0.2, duration: 0.4 }}
              />
              <motion.text 
                x={idx === 0 ? 45 : idx === 1 ? 85 : idx === 2 ? 115 : idx === 3 ? 168 : idx === 4 ? 208 : idx === 5 ? 238 : idx === 6 ? 260 : 300} 
                y={idx === 0 ? 110 : idx === 1 ? 100 : idx === 2 ? 80 : idx === 3 ? 55 : idx === 4 ? 40 : idx === 5 ? 45 : idx === 6 ? 60 : 75}
                fill={hovered === w.id ? '#fff' : w.color} fontSize="14" fontWeight="bold" fontFamily="display" textAnchor="middle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.2 + 0.3 }}
              >
                {w.label}
              </motion.text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip - Positioned centered and higher for better visibility */}
        <AnimatePresence>
          {hovered && (() => {
            const hWave = waves.find(w => w.id === hovered);
            if (!hWave) return null;
            return (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-8 py-5 bg-vanta-950/95 border border-luxury-gold/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl text-center min-w-[280px]"
              >
                <span className="font-sans text-[11px] text-luxury-gold uppercase tracking-[4px] font-bold block mb-2">Wave {hovered} Identification</span>
                <span className="font-display text-lg text-white block mb-2 italic">
                  {hWave.id <= '5' ? `Impulsive — Job 0${hovered}` : `Corrective — Stage ${hovered}`}
                </span>
                <p className="font-sans text-xs text-vanta-300 max-w-[220px] mx-auto leading-relaxed">
                  {hWave.text}
                </p>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-[10px] text-luxury-gold/50 uppercase tracking-[2px] text-center mb-1">Observation Protocol 2.4</p>
        <p className="font-sans text-[11px] text-vanta-400 italic leading-relaxed text-center">
          5 waves forward. A-B-C correction. New cycle. This repeats forever, on every timeframe.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   WAVE PERSONALITIES TOUR (Figure 2.2 — Definitive)
───────────────────────────────────────────── */
export const WavePersonalitiesTour = () => {
  const [activeWave, setActiveWave] = useState('1')

  const waveData: Record<string, { title: string, sub: string, content: string }> = {
    '1': {
      title: "WAVE 1",
      sub: "The Start",
      content: "Wave 1 is where it all begins. The majority of traders still think the old trend is alive. Wave 1 is quiet — it's the move that nobody believes in yet."
    },
    '2': {
      title: "WAVE 2",
      sub: "The Test",
      content: "Wave 2 pulls back price, testing the new direction. It's often scary and deep, but it MUST NOT go past the starting point of Wave 1."
    },
    '3': {
      title: "WAVE 3",
      sub: "The Power Move",
      content: "The engine of the trend. Wave 3 is typically the longest and strongest. Volume and momentum increase as the crowd realizes the trend is real."
    },
    '4': {
      title: "WAVE 4",
      sub: "The Pause",
      content: "The market catches its breath. Wave 4 is often shallow, choppy, and complex. It must not enter the price territory of Wave 2."
    },
    '5': {
      title: "WAVE 5",
      sub: "The Final Push",
      content: "The last leg. Energy is often weaker than Wave 3. Most traders have spotted the trend now, just as it nears its final resolution."
    }
  }

  const cyclePts = [
    { id: '1', d: 'M 20 120 L 60 70' },
    { id: '2', d: 'M 60 70 L 90 100' },
    { id: '3', d: 'M 90 100 L 160 20' },
    { id: '4', d: 'M 160 20 L 190 55' },
    { id: '5', d: 'M 190 55 L 260 10' }
  ]

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.2 — Meet the Five Waves</span>
        <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold font-sans text-[9px] font-bold uppercase tracking-widest">Interactive</span>
      </div>

      <div className="p-8">
        <svg viewBox="0 0 280 140" className="w-full h-auto overflow-visible mb-8">
          {cyclePts.map(pt => (
            <motion.path key={pt.id} d={pt.d} fill="none" 
              stroke={activeWave === pt.id ? '#D4AF37' : 'rgba(255,255,255,0.1)'} 
              strokeWidth={activeWave === pt.id ? '5' : '3'} 
              strokeLinejoin="round" 
              animate={{ strokeWidth: activeWave === pt.id ? 5 : 3 }}
            />
          ))}
          {/* Labels */}
          {cyclePts.map((pt, i) => {
             const coords = pt.d.split('L')[1].split(' ')
             return (
               <text key={i} x={coords[1]} y={Number(coords[2]) - 10} 
                 fill={activeWave === pt.id ? '#D4AF37' : 'rgba(255,255,255,0.2)'} 
                 fontSize="14" fontWeight="bold" fontFamily="display" textAnchor="middle">{pt.id}</text>
             )
          })}
        </svg>

        <div className="flex justify-center gap-2 mb-8">
          {['1', '2', '3', '4', '5'].map(num => (
            <button key={num} onClick={() => setActiveWave(num)}
              className={`px-4 py-2 rounded-lg font-sans text-xs transition-all ${
                activeWave === num ? 'bg-luxury-gold text-black font-bold' : 'bg-white/5 text-vanta-400 hover:bg-white/10'
              }`}
            >
              WAVE {num}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeWave} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="bg-white/2 border border-white/5 p-6 rounded-xl"
          >
            <span className="font-sans text-[10px] uppercase tracking-[4px] text-luxury-gold mb-2 block">{waveData[activeWave].sub}</span>
            <h4 className="font-display text-2xl text-white mb-4 italic underline decoration-luxury-gold/30 underline-offset-8">{waveData[activeWave].title}</h4>
            <p className="font-sans text-vanta-200 leading-relaxed text-sm">
              {waveData[activeWave].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   WAVE PERSONALITIES CARDS (Figure 2.3 — Definitive)
───────────────────────────────────────────── */
export const WavePersonalitiesCards = () => {
  const waves = [
    { num: '1', name: '"The Start"', desc: "New trend begins. Most people miss it.", bar: 30, color: '#D4AF37' },
    { num: '2', name: '"The Test"', desc: "Scary pullback. Can't retrace all of Wave 1.", isArrow: true, color: '#718096' },
    { num: '3', name: '"The Power Move"', desc: "Longest and strongest. Can never be shortest.", bar: 100, color: '#D4AF37' },
    { num: '4', name: '"The Pause"', desc: "Choppy breather. Can't overlap Wave 2's territory.", isArrow: true, color: '#718096' },
    { num: '5', name: '"The Final Push"', desc: "Last leg before correction. Often weaker than Wave 3.", bar: 60, color: '#D4AF37' },
  ]

  return (
    <div className="my-16 space-y-4">
      {waves.map((wave) => (
        <div key={wave.num} className="glassmorphism-card p-6 flex flex-col md:flex-row items-center gap-6 border-white/5 bg-vanta-950 group hover:border-luxury-gold/20 transition-all duration-500">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/2 border border-white/5 flex items-center justify-center font-display text-3xl text-luxury-gold ring-0 group-hover:ring-4 ring-luxury-gold/10 transition-all">
            {wave.num}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h4 className="font-sans text-xs font-bold text-luxury-gold uppercase tracking-widest mb-1">{wave.name}</h4>
            <p className="font-sans text-vanta-400 text-xs">{wave.desc}</p>
          </div>
          <div className="flex-shrink-0 w-full md:w-32 h-2 bg-white/5 rounded-full overflow-hidden relative">
            {wave.isArrow ? (
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">PULLBACK ↘</span>
              </div>
            ) : (
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${wave.bar}%` }} 
                className="h-full bg-luxury-gold/60 group-hover:bg-luxury-gold transition-colors" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   IMPULSIVE VS CORRECTIVE (Figure 2.5 — Definitive)
───────────────────────────────────────────── */
export const ImpulsiveCorrectiveToggle = () => {
  const [view, setView] = useState<'both' | 'impulsive' | 'corrective'>('both')

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.5 — Two Jobs, One Trend</span>
        <div className="flex gap-2">
          <button onClick={() => setView('impulsive')} className={`px-2 py-1 rounded text-[9px] uppercase font-bold tracking-widest transition-all ${view === 'impulsive' ? 'bg-luxury-gold text-black' : 'bg-white/5 text-vanta-400'}`}>Impulsive</button>
          <button onClick={() => setView('corrective')} className={`px-2 py-1 rounded text-[9px] uppercase font-bold tracking-widest transition-all ${view === 'corrective' ? 'bg-slate-500 text-white' : 'bg-white/5 text-vanta-400'}`}>Corrective</button>
          <button onClick={() => setView('both')} className={`px-2 py-1 rounded text-[9px] uppercase font-bold tracking-widest transition-all ${view === 'both' ? 'bg-white/20 text-white' : 'bg-white/5 text-vanta-400'}`}>Both</button>
        </div>
      </div>

      <div className="p-12 relative">
        <svg viewBox="0 0 200 120" className="w-full h-auto overflow-visible">
          {/* Waves 1, 3, 5 (Impulsive) */}
          <motion.path d="M 20 100 L 50 60" fill="none" strokeWidth="4" strokeLinejoin="round" 
            animate={{ stroke: (view === 'both' || view === 'impulsive') ? '#D4AF37' : 'rgba(255,255,255,0.05)', opacity: (view === 'both' || view === 'impulsive') ? 1 : 0.2 }} />
          <motion.path d="M 70 80 L 120 20" fill="none" strokeWidth="4" strokeLinejoin="round" 
            animate={{ stroke: (view === 'both' || view === 'impulsive') ? '#D4AF37' : 'rgba(255,255,255,0.05)', opacity: (view === 'both' || view === 'impulsive') ? 1 : 0.2 }} />
          <motion.path d="M 140 45 L 180 10" fill="none" strokeWidth="4" strokeLinejoin="round" 
            animate={{ stroke: (view === 'both' || view === 'impulsive') ? '#D4AF37' : 'rgba(255,255,255,0.05)', opacity: (view === 'both' || view === 'impulsive') ? 1 : 0.2 }} />

          {/* Waves 2, 4 (Corrective) */}
          <motion.path d="M 50 60 L 70 80" fill="none" strokeWidth="4" strokeLinejoin="round" 
            animate={{ stroke: (view === 'both' || view === 'corrective') ? '#718096' : 'rgba(255,255,255,0.05)', opacity: (view === 'both' || view === 'corrective') ? 1 : 0.2 }} />
          <motion.path d="M 120 20 L 140 45" fill="none" strokeWidth="4" strokeLinejoin="round" 
            animate={{ stroke: (view === 'both' || view === 'corrective') ? '#718096' : 'rgba(255,255,255,0.05)', opacity: (view === 'both' || view === 'corrective') ? 1 : 0.2 }} />
          
          {/* Labels */}
          <text x="35" y="70" fill={view === 'corrective' ? 'rgba(255,255,255,0.1)' : '#D4AF37'} fontSize="10" fontWeight="bold" fontFamily="display" textAnchor="middle">1</text>
          <text x="60" y="65" fill={view === 'impulsive' ? 'rgba(255,255,255,0.1)' : '#718096'} fontSize="10" fontWeight="bold" fontFamily="display" textAnchor="middle">2</text>
          <text x="95" y="45" fill={view === 'corrective' ? 'rgba(255,255,255,0.1)' : '#D4AF37'} fontSize="10" fontWeight="bold" fontFamily="display" textAnchor="middle">3</text>
          <text x="135" y="28" fill={view === 'impulsive' ? 'rgba(255,255,255,0.1)' : '#718096'} fontSize="10" fontWeight="bold" fontFamily="display" textAnchor="middle">4</text>
          <text x="165" y="22" fill={view === 'corrective' ? 'rgba(255,255,255,0.1)' : '#D4AF37'} fontSize="10" fontWeight="bold" fontFamily="display" textAnchor="middle">5</text>
        </svg>

        <div className="mt-8 text-center min-h-[40px]">
          <AnimatePresence mode="wait">
            {view === 'impulsive' && (
              <motion.p key="imp" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-luxury-gold font-sans text-xs uppercase tracking-widest font-bold">Impulsive waves — pushing WITH the trend</motion.p>
            )}
            {view === 'corrective' && (
              <motion.p key="cor" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-slate-400 font-sans text-xs uppercase tracking-widest font-bold">Corrective waves — pulling back AGAINST the trend</motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ZOOM INTO WAVE (Figure 2.6 & 2.7 — Definitive)
───────────────────────────────────────────── */
export const ZoomIntoWave = ({ waveType = 'impulsive' }: { waveType?: 'impulsive' | 'corrective' }) => {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-luxury-gold/20 bg-vanta-900 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.{waveType === 'impulsive' ? '6' : '7'} — Zoom Into Wave {waveType === 'impulsive' ? '3' : '2'}</span>
        <button onClick={() => setZoomed(!zoomed)} 
          className="px-4 py-1.5 rounded-full bg-luxury-gold text-black font-sans text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          {zoomed ? 'ZOOM OUT' : 'ZOOM IN'}
        </button>
      </div>

      <div className="p-12 md:p-20 flex items-center justify-center min-h-[300px]">
        <svg viewBox="0 0 200 120" className="w-full h-auto overflow-visible">
          {/* Base Wave */}
          <motion.path 
            d={waveType === 'impulsive' ? "M 20 100 L 180 20" : "M 20 20 L 180 100"} 
            fill="none" strokeWidth="4" strokeLinecap="round"
            animate={{ 
              stroke: zoomed ? 'rgba(255,255,255,0.05)' : (waveType === 'impulsive' ? '#D4AF37' : '#718096'),
              opacity: zoomed ? 0.1 : 1
            }} 
          />

          {/* Internal Structure */}
          <AnimatePresence>
            {zoomed && (
              <g>
                {waveType === 'impulsive' ? (
                  // Internal 5 waves
                  <>
                    <motion.path d="M 20 100 L 50 85 L 65 95 L 110 40 L 130 60 L 180 20" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                    <text x="35" y="85" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="display">(i)</text>
                    <text x="58" y="105" fill="#718096" fontSize="8" fontWeight="bold" fontFamily="display">(ii)</text>
                    <text x="88" y="55" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="display">(iii)</text>
                    <text x="115" y="65" fill="#718096" fontSize="8" fontWeight="bold" fontFamily="display">(iv)</text>
                    <text x="155" y="35" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="display">(v)</text>
                  </>
                ) : (
                  // Internal 3 waves (a-b-c)
                  <>
                    <motion.path d="M 20 20 L 70 80 L 100 50 L 180 100" fill="none" stroke="#718096" strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                    <text x="45" y="60" fill="#718096" fontSize="8" fontWeight="bold" fontFamily="display">(a)</text>
                    <text x="85" y="45" fill="#718096" fontSize="8" fontWeight="bold" fontFamily="display">(b)</text>
                    <text x="140" y="85" fill="#718096" fontSize="8" fontWeight="bold" fontFamily="display">(c)</text>
                  </>
                )}
              </g>
            )}
          </AnimatePresence>

          {!zoomed && (
             <motion.text x="100" y="60" fill={waveType === 'impulsive' ? '#D4AF37' : '#718096'} fontSize="20" fontWeight="bold" fontFamily="display" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}>
               {waveType === 'impulsive' ? '3' : '2'}
             </motion.text>
          )}
        </svg>
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5 text-center">
        <p className="font-sans text-[11px] text-vanta-300 italic">
          {zoomed 
            ? (waveType === 'impulsive' ? "Wave 3 contains 5 smaller waves inside it. Same pattern. Smaller scale." : "Wave 2 contains 3 waves inside — a, b, c.")
            : `Zoom into Wave ${waveType === 'impulsive' ? '3' : '2'} to see its internal structure.`
          }
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FULL INTERNAL STRUCTURE (Figure 2.8 — Definitive)
───────────────────────────────────────────── */
export const FullInternalStructure = () => {
  const [isDetailed, setIsDetailed] = useState(false)

  return (
    <div className="my-16 glassmorphism-card overflow-hidden border-luxury-gold/30 bg-vanta-900 shadow-[0_0_80px_rgba(212,175,55,0.12)]">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.8 — Everything Inside the Trend</span>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button onClick={() => setIsDetailed(false)} className={`px-4 py-1.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-widest transition-all ${!isDetailed ? 'bg-luxury-gold text-black shadow-lg' : 'text-vanta-400'}`}>Simple</button>
          <button onClick={() => setIsDetailed(true)} className={`px-4 py-1.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-widest transition-all ${isDetailed ? 'bg-luxury-gold text-black shadow-lg' : 'text-vanta-400'}`}>Detailed</button>
        </div>
      </div>

      <div className="p-8 md:p-16 relative min-h-[400px]">
        <div className="absolute top-6 right-8 text-right">
           <AnimatePresence mode="wait">
             {isDetailed ? (
               <motion.div key="det" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                 <span className="font-display text-4xl text-luxury-gold block italic">21</span>
                 <span className="font-sans text-[9px] uppercase tracking-[2px] text-vanta-400">Total waves</span>
               </motion.div>
             ) : (
               <motion.div key="sim" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                 <span className="font-display text-4xl text-vanta-500 block italic">5</span>
                 <span className="font-sans text-[9px] uppercase tracking-[2px] text-vanta-400">Main waves</span>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <svg viewBox="0 0 300 160" className="w-full h-auto overflow-visible">
          {/* Simple View Path */}
          <motion.path 
            d="M 20 140 L 60 90 L 90 120 L 160 30 L 200 70 L 280 15" 
            fill="none" strokeWidth="4" strokeLinejoin="round"
            animate={{ 
              stroke: isDetailed ? 'rgba(212,175,55,0.05)' : '#D4AF37',
              strokeWidth: isDetailed ? 2 : 5
            }} 
          />

          {/* Detailed View Paths */}
          <AnimatePresence>
            {isDetailed && (
              <g>
                {/* Wave 1 (5 inside) */}
                <motion.path d="M 20 140 L 30 130 L 35 135 L 45 105 L 50 115 L 60 90" fill="none" stroke="#D4AF37" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                {/* Wave 2 (3 inside) */}
                <motion.path d="M 60 90 L 75 115 L 80 105 L 90 120" fill="none" stroke="#718096" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
                {/* Wave 3 (5 inside) */}
                <motion.path d="M 90 120 L 110 100 L 115 110 L 140 45 L 145 60 L 160 30" fill="none" stroke="#D4AF37" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.7 }} />
                {/* Wave 4 (3 inside) */}
                <motion.path d="M 160 30 L 180 65 L 185 55 L 200 70" fill="none" stroke="#718096" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
                {/* Wave 5 (5 inside) */}
                <motion.path d="M 200 70 L 220 50 L 225 60 L 255 25 L 265 35 L 280 15" fill="none" stroke="#D4AF37" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.6 }} />
              </g>
            )}
          </AnimatePresence>

          {/* Labels (always visible but styled differently) */}
          <text x="40" y={isDetailed ? 155 : 110} fill={isDetailed ? '#D4AF37' : '#D4AF37'} fontSize={isDetailed ? 8 : 14} fontWeight="bold" fontFamily="display" textAnchor="middle">1</text>
          <text x="75" y={isDetailed ? 135 : 100} fill={isDetailed ? '#718096' : '#D4AF37'} fontSize={isDetailed ? 8 : 14} fontWeight="bold" fontFamily="display" textAnchor="middle">2</text>
          <text x="125" y={isDetailed ? 85 : 60} fill={isDetailed ? '#D4AF37' : '#D4AF37'} fontSize={isDetailed ? 8 : 14} fontWeight="bold" fontFamily="display" textAnchor="middle">3</text>
          <text x="180" y={isDetailed ? 85 : 45} fill={isDetailed ? '#718096' : '#D4AF37'} fontSize={isDetailed ? 8 : 14} fontWeight="bold" fontFamily="display" textAnchor="middle">4</text>
          <text x="240" y={isDetailed ? 45 : 30} fill={isDetailed ? '#D4AF37' : '#D4AF37'} fontSize={isDetailed ? 8 : 14} fontWeight="bold" fontFamily="display" textAnchor="middle">5</text>
        </svg>

        <AnimatePresence>
           {isDetailed && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-12 text-center bg-black/40 border border-white/5 p-4 rounded-xl">
               <span className="font-sans text-[10px] text-vanta-400 uppercase tracking-widest block mb-1">Internal Calculation</span>
               <div className="font-display text-lg text-white">
                 <span className="text-luxury-gold">15</span> <span className="text-vanta-500 font-sans text-xs">Impulsive</span>
                 <span className="mx-4 text-vanta-600">+</span>
                 <span className="text-slate-400">6</span> <span className="text-vanta-500 font-sans text-xs">Corrective</span>
                 <span className="mx-4 text-vanta-600">=</span>
                 <span className="text-luxury-gold font-bold">21 Total</span>
               </div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FOUNDATION SUMMARY DEFINITIVE (Figure 2.9 — Definitive)
───────────────────────────────────────────── */
export const FoundationSummaryDefinitive = () => {
  const layers = [
    { id: '01', title: "Markets move in cycles", content: "5 waves in the trend direction, then a 3-wave correction (A-B-C), then a new cycle begins." },
    { id: '02', title: "Each wave has a personality", content: "Wave 1 starts, 2 tests, 3 powers, 4 pauses, 5 finishes. A-B-C corrects." },
    { id: '03', title: "Two types of waves", content: "Impulsive (1, 3, 5) push WITH trend. Corrective (2, 4, A-B-C) pull AGAINST it." },
    { id: '04', title: "Impulsive waves have 5 inside", content: "Zoom in and you'll see the same 1-2-3-4-5 pattern at a smaller scale." },
    { id: '05', title: "Corrective waves are built differently", content: "Corrective waves have 3-wave structures (a-b-c), not 5. They can be complex." }
  ]

  return (
    <div className="my-16 space-y-6 text-left">
      <h3 className="font-sans text-[10px] uppercase tracking-[4px] text-vanta-500 mb-8 text-center italic">The Five Layers of Understanding</h3>
      {layers.map((layer) => (
        <div key={layer.id} className="relative group">
          <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl" />
          <div className="relative glassmorphism-card p-8 border-luxury-gold/10 group-hover:border-luxury-gold/30 transition-all flex gap-8 items-start bg-vanta-950/50">
            <span className="font-display text-4xl text-luxury-gold/20 group-hover:text-luxury-gold/40 transition-colors italic leading-none">{layer.id}</span>
            <div>
              <h4 className="font-display text-xl text-white mb-2 leading-tight">{layer.title}</h4>
              <p className="font-sans text-sm text-vanta-400 leading-relaxed">{layer.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
