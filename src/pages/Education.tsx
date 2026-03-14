import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { neowaveModules, type Module } from '../lib/chapterData'

const DIFFICULTY_COLORS: Record<string, string> = {
  Foundation: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Intermediate: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  Advanced: 'text-luxury-gold border-luxury-gold/30 bg-luxury-gold/10',
}

const DIFFICULTY_GLOW: Record<string, string> = {
  Foundation: 'shadow-[0_0_25px_rgba(52,211,153,0.15)] group-hover:shadow-[0_0_40px_rgba(52,211,153,0.3)]',
  Intermediate: 'shadow-[0_0_25px_rgba(96,165,250,0.15)] group-hover:shadow-[0_0_40px_rgba(96,165,250,0.3)]',
  Advanced: 'shadow-[0_0_25px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]',
}


export default function Education() {
  const { isPro, loading } = useAuth()
  const navigate = useNavigate()
  const [activeModule, setActiveModule] = useState<Module | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  if (loading) return <div className="min-h-screen bg-black" />

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      
      <AnimatePresence mode="wait">
        {!activeModule ? (
          /* ─── CONSTELLATION MAP ─── */
          <motion.main
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-screen flex flex-col items-center justify-start pt-28 pb-20 overflow-hidden"
          >
            {/* Ambient background blobs */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-luxury-gold/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-luxury-gold/5 blur-[160px] rounded-full pointer-events-none" />

            <motion.div 
              className="text-center mb-16 z-10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="label-caps text-luxury-gold tracking-[4px] mb-4 block text-xs">Pro Curriculum</span>
              <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                NEoWave<br />
                <span className="text-vanta-400 font-light italic">Masterclass</span>
              </h1>
              <p className="font-sans text-vanta-400 text-sm max-w-sm mx-auto">
                Click any module to begin your deep dive into institutional-grade wave analysis.
              </p>
            </motion.div>

            {/* Interactive Node Grid — responsive card layout */}
            <div className="z-10 w-full max-w-[1100px] px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {neowaveModules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setActiveModule(mod)}
                  className={`group text-left glassmorphism-card p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/20 ${DIFFICULTY_GLOW[mod.difficulty]}`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-8">
                    <span className={`font-sans text-[10px] font-bold uppercase tracking-[2px] px-2 py-1 rounded-full border ${DIFFICULTY_COLORS[mod.difficulty]}`}>
                      {mod.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-vanta-400">
                      <Clock size={11} />
                      <span className="font-sans text-[11px]">{mod.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Module number + title */}
                  <div>
                    <div className="font-sans text-[11px] text-vanta-600 uppercase tracking-[3px] mb-2">
                      Module {String(i + 1).padStart(2, '0')}
                    </div>
                    <h2 className="font-display text-2xl text-white mb-2 group-hover:text-luxury-gold transition-colors">
                      {mod.title}
                    </h2>
                    <p className="font-sans text-vanta-400 text-sm leading-relaxed">
                      {mod.subtitle}
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
                    {completedIds.has(mod.id) ? (
                      <span className="font-sans text-[11px] text-emerald-400 uppercase tracking-widest">
                        ✓ Completed
                      </span>
                    ) : (
                      <span className="font-sans text-[11px] text-vanta-500 uppercase tracking-widest">
                        {mod.sections.length} sections
                      </span>
                    )}
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-luxury-gold group-hover:bg-luxury-gold/10 transition-all">
                      {!isPro ? (
                        <Lock size={12} className="text-vanta-400" />
                      ) : (
                        <ChevronRight size={14} className="text-vanta-400 group-hover:text-luxury-gold" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.main>
        ) : (
          /* ─── FULL SCREEN MODULE VIEW ─── */
          <motion.div
            key="module"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Fixed header inside module */}
            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
              <div className="max-w-[900px] mx-auto px-6 h-[70px] flex items-center justify-between">
                <button
                  onClick={() => setActiveModule(null)}
                  className="flex items-center gap-3 text-vanta-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-sans text-[11px] uppercase tracking-widest">Back to Curriculum</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className={`font-sans text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-widest ${DIFFICULTY_COLORS[activeModule.difficulty]}`}>
                    {activeModule.difficulty}
                  </span>
                  <span className="font-sans text-[11px] text-vanta-500 hidden sm:block">{activeModule.estimatedTime} read</span>
                </div>
              </div>
            </div>

            {!isPro ? (
              /* Pro Gate — full page lock */
              <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
                <div className="glassmorphism-card p-14 max-w-[500px] border-luxury-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.12)]">
                  <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mx-auto mb-8">
                    <Lock size={28} className="text-luxury-gold" />
                  </div>
                  <h2 className="font-display text-3xl text-white mb-4">Access Locked</h2>
                  <p className="font-sans text-vanta-400 text-sm mb-10 leading-relaxed">
                    The full NEoWave curriculum is reserved for Pro members. 
                    Gain access to all 6 deep-dive modules, daily analysis, and institutional setups.
                  </p>
                  <button
                    onClick={() => navigate('/#plans')}
                    className="w-full bg-luxury-gold text-black font-sans font-bold text-[11px] tracking-[3px] uppercase py-4 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                  >
                    Upgrade to Pro
                  </button>
                  <button
                    onClick={() => setActiveModule(null)}
                    className="mt-4 font-sans text-[11px] text-vanta-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    Return to Curriculum
                  </button>
                </div>
              </div>
            ) : (
              /* The actual module content */
              <div className="max-w-[900px] mx-auto px-6 pt-20 pb-32">
                {/* Hero block */}
                <div className="mb-20">
                  <div className="font-sans text-[10px] uppercase tracking-[4px] text-vanta-500 mb-6">
                    Module {String(neowaveModules.findIndex(m => m.id === activeModule.id) + 1).padStart(2, '0')} — NEoWave Masterclass
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl text-white font-bold tracking-tight mb-6 leading-tight">
                    {activeModule.title}
                  </h1>
                  <p className="font-sans text-xl text-vanta-400 leading-relaxed max-w-[600px]">
                    {activeModule.subtitle}
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-24">
                  {activeModule.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="relative"
                    >
                      {/* Section label */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-px bg-luxury-gold/40" />
                        <span className="font-sans text-[10px] uppercase tracking-[3px] text-luxury-gold">
                          {section.label}
                        </span>
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl text-white font-semibold mb-8 leading-snug">
                        {section.heading}
                      </h2>

                      <p className="font-sans text-lg text-vanta-200 leading-relaxed mb-10 max-w-[700px]">
                        {section.body}
                      </p>

                      {section.callout && (
                        <div className="glassmorphism-card p-8 border-luxury-gold/20 bg-luxury-gold/5">
                          <div className="flex gap-5">
                            <div className="w-1 bg-luxury-gold rounded-full shrink-0" />
                            <p className="font-display italic text-xl text-luxury-gold leading-relaxed">
                              {section.callout}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Module completion + next nav */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                  <button
                    onClick={() => {
                      setCompletedIds(prev => new Set(prev).add(activeModule.id))
                      setActiveModule(null)
                    }}
                    className="font-sans font-bold text-[11px] uppercase tracking-[3px] px-8 py-4 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all"
                  >
                    Mark Complete & Return
                  </button>

                  {/* Next module */}
                  {(() => {
                    const idx = neowaveModules.findIndex(m => m.id === activeModule.id)
                    const next = neowaveModules[idx + 1]
                    return next ? (
                      <button
                        onClick={() => setActiveModule(next)}
                        className="group flex items-center gap-5 text-right"
                      >
                        <div>
                          <div className="font-sans text-[10px] text-vanta-500 uppercase tracking-widest mb-1">Next Module</div>
                          <div className="font-display text-lg text-white group-hover:text-luxury-gold transition-colors">
                            {next.title}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-luxury-gold group-hover:bg-luxury-gold/10 transition-all shrink-0">
                          <ChevronRight size={18} className="text-white group-hover:text-luxury-gold" />
                        </div>
                      </button>
                    ) : null
                  })()}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeModule && <Footer />}
    </div>
  )
}
