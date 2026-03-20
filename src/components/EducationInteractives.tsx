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
  const [zoomLevel, setZoomLevel] = useState(0) // 0: H4, 1: H1, 2: M15

  const layers = [
    { label: 'H4 (1 Wave)', desc: 'Large scale perspective.' },
    { label: 'H1 (5 Waves)', desc: 'Revealing internal structure.' },
    { label: 'M15 (Complex)', desc: 'Max resolution detail.' },
  ]

  return (
    <div className="my-24 glassmorphism-card overflow-hidden border-luxury-gold/20 bg-vanta-900 shadow-[0_0_50px_rgba(212,175,55,0.1)] group">
      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">Figure 2.4 — Waves Inside Waves</span>
          <h4 className="font-display text-lg text-white mt-1">Fractal Market Architecture</h4>
        </div>
        <div className="flex bg-black p-1 rounded-lg border border-white/10">
           {layers.map((l, i) => (
             <button 
               key={i} 
               onClick={() => setZoomLevel(i)}
               className={`px-4 py-2 rounded font-sans text-[9px] font-bold uppercase tracking-widest transition-all ${zoomLevel === i ? 'bg-luxury-gold text-black' : 'text-vanta-500 hover:text-white'}`}
             >
               {l.label.split(' ')[0]}
             </button>
           ))}
        </div>
      </div>

      <div className="relative h-[450px] w-full flex items-center justify-center p-12 overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]">
        {/* The Wave Container */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{ scale: zoomLevel === 0 ? 1 : zoomLevel === 1 ? 1.5 : 2.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 400 200" className="w-[800px] h-[400px] overflow-visible">
            {/* Base Wave (H4) */}
            <motion.path
              d="M 50 150 L 350 50"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="4"
              animate={{ opacity: zoomLevel === 0 ? 1 : 0.2 }}
            />

            {/* H1 Subwaves (revealed at level 1) */}
            <AnimatePresence>
              {zoomLevel >= 1 && (
                <motion.path
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  d="M 50 150 L 110 50 L 170 120 L 230 40 L 290 90 L 350 50"
                  fill="none"
                  stroke={zoomLevel === 1 ? "#D4AF37" : "rgba(212,175,55,0.3)"}
                  strokeWidth="3"
                />
              )}
            </AnimatePresence>

            {/* M15 Detail (revealed at level 2) */}
            <AnimatePresence>
              {zoomLevel === 2 && (
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  d="M 170 120 L 180 90 L 190 110 L 205 60 L 220 80 L 230 40"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              )}
            </AnimatePresence>
          </svg>
        </motion.div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
           <div className="max-w-[200px]">
             <span className="font-display text-2xl text-white italic">{layers[zoomLevel].label}</span>
             <p className="font-sans text-[11px] text-vanta-400 mt-1">{layers[zoomLevel].desc}</p>
           </div>
           <div className="bg-black/80 backdrop-blur rounded p-4 border border-white/5">
             <span className="font-sans text-[9px] uppercase tracking-[2px] text-vanta-600 block mb-2">Rule of Fractalism</span>
             <p className="font-sans text-[10px] text-vanta-400">Outer structure preserved at every level of resolution.</p>
           </div>
        </div>
      </div>
      
      <div className="p-8 bg-luxury-gold/5 flex items-center gap-6 border-t border-luxury-gold/10">
         <div className="w-12 h-12 rounded-full bg-luxury-gold flex items-center justify-center shrink-0">
            <span className="text-black text-xs font-bold font-sans">02</span>
         </div>
         <p className="font-sans text-xs text-vanta-300 italic leading-relaxed">
          The same analysis works on every timeframe. Every wave contains smaller waves. Every wave is part of a bigger wave.
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
           <button onClick={() => setShowImp(!showImp)} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${showImp ? 'bg-luxury-gold text-black' : 'text-vanta-400 border border-white/10 hover:border-white/20'}`}>Show :5 Impulsions</button>
           <button onClick={() => setShowCorr(!showCorr)} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${showCorr ? 'bg-slate-400 text-black' : 'text-vanta-400 border border-white/10 hover:border-white/20'}`}>Show :3 Corrections</button>
        </div>
      </div>

      <div className="relative h-[300px] w-full p-12">
        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
          {/* Waves 1, 3, 5 (Impulsions) */}
          {[
            { x1: 50, y1: 150, x2: 120, y2: 60, id: 1 },
            { x1: 170, y1: 90, x2: 240, y2: 30, id: 3 },
            { x1: 290, y1: 70, x2: 360, y2: 10, id: 5 }
          ].map(w => (
            <motion.line 
              key={w.id} x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} 
              stroke={showImp ? impColor : "rgba(255,255,255,0.2)"} 
              strokeWidth={showImp ? "4" : "1"} 
              animate={{ opacity: showImp || (!showImp && !showCorr) ? 1 : 0.2 }}
            />
          ))}
          {/* Waves 2, 4 (Corrections) */}
          {[
            { x1: 120, y1: 60, x2: 170, y2: 90, id: 2 },
            { x1: 240, y1: 30, x2: 290, y2: 70, id: 4 }
          ].map(w => (
            <motion.line 
              key={w.id} x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} 
              stroke={showCorr ? corrColor : "rgba(255,255,255,0.2)"} 
              strokeWidth={showCorr ? "4" : "1"}
              animate={{ opacity: showCorr || (!showImp && !showCorr) ? 1 : 0.2 }}
            />
          ))}
        </svg>

        {/* Dynamic Labels */}
        <div className="absolute top-10 left-10">
           {showImp && <span className="font-sans text-[10px] text-luxury-gold uppercase tracking-[2px] block mb-1">Impulsions (:5)</span>}
           {showCorr && <span className="font-sans text-[10px] text-slate-400 uppercase tracking-[2px] block">Corrections (:3)</span>}
        </div>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Three impulsions pushing forward, two corrections pulling back. That's all a trending market is.
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
             <button key={l} onClick={() => setLevel(l)} className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest transition-all ${level === l ? 'bg-luxury-gold text-black' : 'text-vanta-500 hover:text-white'}`}>{l}</button>
           ))}
        </div>
      </div>
      
      <div className="relative h-[300px] w-full p-12">
        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
           {/* High Degree */}
           <motion.path 
             d="M 50 180 L 450 20" 
             fill="none" stroke="#D4AF37" strokeWidth="8" 
             animate={{ opacity: level === 'high' || level === 'all' ? 0.3 : 0.05 }}
           />
           {/* Medium Degree */}
           <motion.path 
             d="M 50 180 L 150 60 L 250 120 L 450 20" 
             fill="none" stroke="#D4AF37" strokeWidth="3"
             animate={{ opacity: level === 'medium' || level === 'all' ? 0.6 : 0.05 }}
           />
           {/* Low Degree */}
           <motion.path 
             d="M 50 180 L 80 140 L 110 160 L 150 60 L 180 80 L 210 100 L 250 120 L 350 70 L 450 20" 
             fill="none" stroke="#D4AF37" strokeWidth="1"
             animate={{ opacity: level === 'low' || level === 'all' ? 1 : 0.05 }}
           />
        </svg>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <p className="font-sans text-xs text-vanta-400 italic leading-relaxed">
          Three degrees of waves coexisting on the same chart. Your analysis must always compare waves of the same degree.
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
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-sans text-[9px] font-bold uppercase tracking-widest border border-red-500/20">Warning</div>
      <div className="px-6 py-4 border-b border-white/5">
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-vanta-400">Figure 2.7 — Degree Mismatch</span>
      </div>
      
      <div className="relative h-[250px] w-full p-12">
        <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
           <path d="M 50 180 L 200 40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
           <path d="M 200 40 L 215 50" fill="none" stroke="#ef4444" strokeWidth="4" />
           <path d="M 215 50 L 400 10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
           
           <circle cx="207" cy="45" r="30" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <div className="absolute top-1/2 left-[55%] -translate-y-1/2 bg-red-500/10 border border-red-500/30 p-4 rounded text-center">
           <p className="font-sans text-[11px] text-red-200">❌ Wave 1 → Wave 2 → Wave 3<br/><strong>WRONG. Different Degrees.</strong></p>
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
    <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
          <div className="px-4 py-3 border-b border-white/5 bg-white/2 flex items-center justify-between">
             <span className="font-sans text-[9px] text-luxury-gold uppercase tracking-widest">Impulsive (:5)</span>
          </div>
          <div className="h-[200px] p-8 relative">
             <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
                <path d="M 10 90 L 50 40 L 70 60 L 130 10 L 150 30 L 190 -10" fill="none" stroke="white" strokeWidth="1" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                   <motion.path 
                     d="M 70 60 L 130 10" 
                     fill="none" stroke="#D4AF37" strokeWidth="4"
                     animate={{ opacity: [0.4, 1, 0.4] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                   />
                </svg>
             </div>
          </div>
       </div>

       <div className="glassmorphism-card overflow-hidden border-white/5 bg-vanta-900 shadow-2xl">
          <div className="px-4 py-3 border-b border-white/5 bg-white/2 flex items-center justify-between">
             <span className="font-sans text-[9px] text-luxury-gold uppercase tracking-widest">Corrective (:3)</span>
          </div>
          <div className="h-[200px] p-8 relative">
             <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
                <path d="M 10 30 L 70 90 L 130 40 L 190 100" fill="none" stroke="white" strokeWidth="1" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                   <motion.path 
                     d="M 70 90 L 130 40" 
                     fill="none" stroke="#718096" strokeWidth="4"
                     animate={{ opacity: [0.4, 1, 0.4] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                   />
                </svg>
             </div>
          </div>
       </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANALYSIS ORDER (Figure 2.9)
───────────────────────────────────────────── */
export const AnalysisOrder = () => {
  return (
    <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Wrong way */}
       <div className="p-8 border border-red-500/10 bg-red-500/2 rounded-xl">
          <span className="font-sans text-[10px] text-red-400 uppercase tracking-widest block mb-8">❌ THE WRONG WAY</span>
          <div className="space-y-4">
             {['Guess the pattern', 'Label the waves', 'Hope it confirms', 'Pray'].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-6 h-6 rounded-full border border-red-500/30 flex items-center justify-center text-[10px] text-red-500">{i+1}</div>
                   <span className="font-sans text-xs text-vanta-400">{step}</span>
                </div>
             ))}
          </div>
       </div>

       {/* VANTA way */}
       <div className="p-8 border border-luxury-gold/20 bg-luxury-gold/5 rounded-xl">
          <span className="font-sans text-[10px] text-luxury-gold uppercase tracking-widest block mb-8">✓ THE VANTA WAY</span>
          <div className="space-y-4">
             {['Identify monowaves', 'Determine Labels (:5/:3)', 'Verify Pattern', 'Evidence-based Entry'].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center text-[10px] text-black font-bold">{i+1}</div>
                   <span className="font-sans text-xs text-white uppercase tracking-tighter">{step}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  )
}
