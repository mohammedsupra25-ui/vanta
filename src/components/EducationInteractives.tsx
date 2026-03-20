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
