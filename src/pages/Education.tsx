import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Lock, ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { useAuth } from '../context/AuthContext'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { neowaveModules as initialModules } from '../lib/chapterData'
import { getEducationModules, type SanityEducationModule } from '../lib/education'
import { urlFor } from '../lib/sanityClient'
import { ZoneMyth, FailureCycle, TwelveWeekJourney, MonowaveAtom, CandleVsLine, NeutralityRule, FractalZoom, MovementTypes, WaveDegrees, DegreeMismatch, ContextMeaning, AnalysisOrder, FoundationSummary, FiveOrThree, PatternInsidePattern, DegreeComparison, M0M1M2System, MarketCycle, WavePersonalitiesTour, WavePersonalitiesCards, ImpulsiveCorrectiveToggle, ZoomIntoWave, FullInternalStructure, FoundationSummaryDefinitive } from '../components/EducationInteractives'
import { CleanItUp, OneThirdTest, BigAndSub, FindTheWaves } from '../components/interactives/Module03'
import { SevenRules, SpotTheViolation, ExtensionTest, AlternationCheck, ThreeChannelTypes } from '../components/interactives/Module04'
import { TheZigzag, TheFlat, TheTriangle, ComplexBuilder } from '../components/interactives/Module05'
import { TrendingVsTerminal, SpotTheImpostor, PowerRatingScale } from '../components/interactives/Module06'
import { ImpulseConfirmation, LimitingVsNonLimiting } from '../components/interactives/Module07'
import { BigVsSubSeparation } from '../components/interactives/Module08'
import { TheTimeframeFunnel, StopPlacement } from '../components/interactives/Module09'
import { TheScenarioMatrix } from '../components/interactives/Module10'
import { GoodVsBadAI } from '../components/interactives/Module11'
import { CompletionCelebration } from '../components/interactives/Module12'

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

// PortableText components for custom rendering
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-16">
          <div className="rounded-xl overflow-hidden border border-white/5 bg-vanta-900 shadow-2xl">
            <img
              src={urlFor(value).url()}
              alt={value.alt || 'Education Figure'}
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-6 text-center font-sans text-xs text-vanta-400 tracking-widest uppercase opacity-60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }: any) => {
      const isDanger = value.type === 'danger'
      return (
        <div className={`mt-10 mb-14 p-10 border-l-2 relative overflow-hidden group ${
          isDanger ? 'border-red-500/50 bg-red-500/5' : 'border-luxury-gold bg-luxury-gold/5'
        }`}>
          <span className={`block font-sans text-[10px] uppercase tracking-[3px] mb-4 ${
            isDanger ? 'text-red-400/60' : 'text-luxury-gold/60'
          }`}>
            {value.type === 'truth' ? 'The Structural Truth' : value.type === 'danger' ? 'Critical Warning' : 'Key Note'}
          </span>
          <p className={`font-display italic text-2xl leading-relaxed ${
            isDanger ? 'text-red-200' : 'text-luxury-gold'
          }`}>
            "{value.text}"
          </p>
        </div>
      )
    },
    comparison: ({ value }: any) => {
      const isGoldLeft = value.left?.tag?.toLowerCase().includes('gold') || value.left?.tag?.toLowerCase().includes('vanta') || value.left?.tag?.toLowerCase().includes('evidence')
      const isGoldRight = value.right?.tag?.toLowerCase().includes('gold') || value.right?.tag?.toLowerCase().includes('vanta') || value.right?.tag?.toLowerCase().includes('evidence')
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
          {/* Left Card */}
          <div className={`p-8 glassmorphism-card transition-all relative overflow-hidden group ${
            isGoldLeft ? 'border-luxury-gold/20 bg-luxury-gold/2' : 'border-white/10 bg-white/2'
          }`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isGoldLeft ? 'bg-luxury-gold' : 'bg-vanta-600'}`} />
            <h4 className={`font-sans text-[10px] uppercase tracking-[3px] mb-6 ${isGoldLeft ? 'text-luxury-gold' : 'text-vanta-400'}`}>
              {value.left?.tag || 'Retail / Prediction'}
            </h4>
            <h5 className="font-display text-xl text-white mb-6 leading-tight">{value.left?.title}</h5>
            <ul className="space-y-3">
              {value.left?.bullets?.map((b: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`${isGoldLeft ? 'text-luxury-gold/40' : 'text-vanta-600/40'} text-xs translate-y-1`}>→</span>
                  <span className="font-sans text-xs text-vanta-400 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Right Card */}
          <div className={`p-8 glassmorphism-card transition-all relative overflow-hidden group ${
            isGoldRight ? 'border-luxury-gold/20 bg-luxury-gold/2' : 'border-white/10 bg-white/2'
          }`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isGoldRight ? 'bg-luxury-gold' : 'bg-vanta-600'}`} />
            <h4 className={`font-sans text-[10px] uppercase tracking-[3px] mb-6 ${isGoldRight ? 'text-luxury-gold' : 'text-vanta-400'}`}>
              {value.right?.tag || 'Evidence / VANTA'}
            </h4>
            <h5 className="font-display text-xl text-white mb-6 leading-tight">{value.right?.title}</h5>
            <ul className="space-y-3">
              {value.right?.bullets?.map((b: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`${isGoldRight ? 'text-luxury-gold/40' : 'text-vanta-600/40'} text-xs translate-y-1`}>→</span>
                  <span className="font-sans text-xs text-vanta-400 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    steps: ({ value }: any) => (
      <div className="my-16 border-y border-white/5 py-4">
        {value.items?.map((step: string, i: number) => (
          <div key={i} className="flex gap-8 py-8 border-b last:border-0 border-white/5 items-center group">
            <span className="font-sans text-xs font-bold text-luxury-gold/70 tracking-tighter group-hover:text-luxury-gold transition-colors">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-sans text-lg text-vanta-200 leading-snug group-hover:text-white transition-colors">
              {step}
            </p>
          </div>
        ))}
      </div>
    ),
    interactive: ({ value }: any) => {
      switch (value.type) {
        case 'zone-myth': return <ZoneMyth />
        case 'failure-cycle': return <FailureCycle />
        case 'journey': return <TwelveWeekJourney />
        case 'monowave-atom': return <MonowaveAtom />
        case 'candle-line': return <CandleVsLine />
        case 'neutrality-rule': return <NeutralityRule />
        case 'fractal-zoom': return <FractalZoom />
        case 'movement-types': return <MovementTypes />
        case 'wave-degrees': return <WaveDegrees />
        case 'degree-mismatch': return <DegreeMismatch />
        case 'context-meaning': return <ContextMeaning />
        case 'analysis-order': return <AnalysisOrder />
        case 'foundation-summary': return <FoundationSummary />
        case 'five-or-three': return <FiveOrThree />
        case 'pattern-inside-pattern': return <PatternInsidePattern />
        case 'degree-comparison': return <DegreeComparison />
        case 'm0-m1-m2-system': return <M0M1M2System />
        case 'market-cycle': return <MarketCycle />
        case 'market-cycle-rich': return <MarketCycle rich />
        case 'wave-personalities-tour': return <WavePersonalitiesTour />
        case 'wave-personalities-cards': return <WavePersonalitiesCards />
        case 'impulsive-corrective-toggle': return <ImpulsiveCorrectiveToggle />
        case 'zoom-wave-3': return <ZoomIntoWave waveType="impulsive" />
        case 'zoom-wave-2': return <ZoomIntoWave waveType="corrective" />
        case 'full-internal-structure': return <FullInternalStructure />
        case 'foundation-summary-definitive': return <FoundationSummaryDefinitive />
        
        // Module 3
        case 'figure-3-1': return <CleanItUp />
        case 'figure-3-2': return <OneThirdTest />
        case 'figure-3-3': return <BigAndSub />
        case 'figure-3-4': return <FindTheWaves />
        
        // Module 4
        case 'figure-4-1': return <SevenRules />
        case 'figure-4-2': return <SpotTheViolation />
        case 'figure-4-3': return <ExtensionTest />
        case 'figure-4-4': return <AlternationCheck />
        case 'figure-4-5': return <ThreeChannelTypes />
        
        // Module 5
        case 'figure-5-1': return <TheZigzag />
        case 'figure-5-2': return <TheFlat />
        case 'figure-5-3': return <TheTriangle />
        case 'figure-5-4': return <ComplexBuilder />
        
        // Module 6
        case 'figure-6-1': return <TrendingVsTerminal />
        case 'figure-6-2': return <SpotTheImpostor />
        case 'figure-6-3': return <PowerRatingScale />
        
        // Module 7
        case 'figure-7-1': return <ImpulseConfirmation />
        case 'figure-7-2': return <LimitingVsNonLimiting />
        
        // Module 8
        case 'figure-8-1':
        case 'figure-08-1': return <BigVsSubSeparation />
        
        // Module 9
        case 'figure-9-1':
        case 'figure-09-1': return <TheTimeframeFunnel />
        case 'figure-9-2':
        case 'figure-09-2': return <StopPlacement />
        
        // Module 10
        case 'figure-10-1': return <TheScenarioMatrix />
        
        // Module 11
        case 'figure-11-1': return <GoodVsBadAI />
        
        // Module 12
        case 'figure-12-1': return <CompletionCelebration />
        
        default: return null
      }
    },
    learningList: ({ value }: any) => {
      const isWill = value.type === 'will'
      const bgColor = isWill ? 'bg-luxury-gold/5' : 'bg-white/5'
      const textColor = isWill ? 'text-luxury-gold' : 'text-vanta-400'
      
      return (
        <div className={`my-12 p-10 glassmorphism-card border-white/5 ${bgColor}`}>
          <span className={`block font-sans text-[10px] uppercase tracking-[3px] mb-6 ${textColor}`}>
            {value.title || (isWill ? "WHAT YOU'LL LEARN" : "WHAT YOU WON'T LEARN")}
          </span>
          <ul className="space-y-4">
            {value.items?.map((item: string, i: number) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className={textColor}>
                  {isWill ? '→' : '→'}
                </span>
                <p className="font-sans text-lg text-vanta-200 leading-relaxed group-hover:text-white transition-colors">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  },
  block: {
    normal: ({ children }: any) => (
      <p className="font-sans text-lg text-vanta-200 leading-relaxed mb-6 last:mb-0 max-w-[750px] mx-auto">
        {children}
      </p>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-2xl text-white font-semibold mt-16 mb-8 group flex items-center gap-4 max-w-[750px] mx-auto">
        <div className="w-2 h-2 rounded-full bg-luxury-gold/50" />
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-luxury-gold/90">{children}</em>,
  },
}

export default function Education() {
  const { isPro, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [modules, setModules] = useState<any[] | SanityEducationModule[]>(initialModules)
  const [activeModule, setActiveModule] = useState<any | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedModules = await getEducationModules()
        if (fetchedModules && fetchedModules.length > 0) {
          // Map Sanity modules to local structure for backward compatibility if needed, 
          // or just use directly. Here we use them directly.
          setModules(fetchedModules.map(m => ({
            ...m,
            id: m._id, // Ensure id exists (sanity uses _id)
          })))
        }
      } catch (err) {
        console.error("Failed to fetch modules", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (authLoading || isLoading) return <div className="min-h-screen bg-black" />

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Nav />
      
      {/* Scroll Progress Bar - Global to the active module */}
      {activeModule && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-luxury-gold z-[100] origin-left shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          style={{ scaleX }}
        />
      )}

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
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id || mod._id}
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
                    {completedIds.has(mod.id || mod._id) ? (
                      <span className="font-sans text-[11px] text-emerald-400 uppercase tracking-widest">
                        ✓ Completed
                      </span>
                    ) : (
                      <span className="font-sans text-[11px] text-vanta-500 uppercase tracking-widest">
                        {mod.sections?.length || 0} sections
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
                    Gain access to all modules, daily analysis, and institutional setups.
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
              <div className="max-w-[1200px] mx-auto px-6">
                {/* Hero block */}
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center relative py-20 px-4">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="font-sans text-[10px] uppercase tracking-[5px] text-luxury-gold/60 mb-6">
                      {activeModule.phase || 'NEoWave Masterclass'} — Module {String(activeModule.moduleNumber || 0).padStart(2, '0')}
                    </div>
                    <h1 className="hero-headline text-white mb-8">
                      {activeModule.title}
                    </h1>
                    <p className="font-display italic text-2xl text-vanta-400 max-w-xl mx-auto leading-relaxed mb-10">
                    {activeModule.subtitle}
                  </p>
                  {activeModule.metaLine && (
                    <div className="font-sans text-[10px] text-vanta-600 uppercase tracking-[3px]">
                      {activeModule.metaLine}
                    </div>
                  )}
                </motion.div>

                {/* Pulsing Scroll Indicator */}
                <motion.div 
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    y: [0, 10, 0] 
                  }} 
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                >
                   <div className="w-[1px] h-20 bg-gradient-to-b from-luxury-gold/60 to-transparent" />
                </motion.div>
              </div>

                {/* Narrow content column (max 750px) */}
                <div className="max-w-[750px] mx-auto pb-32">
                  {/* Sections */}
                  <div className="space-y-40">
                    {activeModule.sections?.map((section: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                      >
                        {/* Section label */}
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-6 h-px bg-luxury-gold/30" />
                          <span className="font-sans text-[10px] uppercase tracking-[4px] text-luxury-gold/60">
                            {section.label}
                          </span>
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl text-white font-medium mb-12 leading-[1.1] tracking-tight">
                          {section.heading}
                        </h2>

                        {/* Content rendering */}
                        <div className="prose prose-invert prose-luxury max-w-none">
                          {typeof section.body === 'string' ? (
                            <p className="font-sans text-lg text-vanta-200 leading-relaxed mb-10">
                              {section.body}
                            </p>
                          ) : (
                            <PortableText value={section.content} components={ptComponents} />
                          )}
                        </div>

                        {section.callout && (
                          <div className="mt-16 glassmorphism-card p-12 border-luxury-gold/20 bg-luxury-gold/2 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-luxury-gold shadow-[2px_0_10px_rgba(212,175,55,0.3)]" />
                            <div className="relative z-10">
                              <span className="block font-sans text-[10px] uppercase tracking-[4px] text-luxury-gold/40 mb-6">Key Insight</span>
                              <p className="font-display italic text-3xl text-luxury-gold/90 leading-tight">
                                "{section.callout}"
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Module completion + next nav */}
                  <div className="mt-48 pt-20 border-t border-white/5 flex flex-col items-center text-center gap-12">
                     <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center bg-luxury-gold/5 group hover:border-luxury-gold transition-colors duration-500">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <ChevronRight size={24} className="text-luxury-gold rotate-90" />
                        </motion.div>
                     </div>
                     
                     <div>
                       <h3 className="font-display text-4xl text-white mb-4">Module Complete</h3>
                       <p className="font-sans text-vanta-500 max-w-sm mb-12">
                         You've finished the foundation. Ready to verify your understanding?
                       </p>
                       
                       <button
                        onClick={() => {
                          setCompletedIds(prev => new Set(prev).add(activeModule.id || activeModule._id))
                          setActiveModule(null)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="btn-secondary px-12 py-5 border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold hover:text-black hover:border-luxury-gold shadow-2xl"
                      >
                        Take the Quiz →
                      </button>
                    </div>

                    {/* Next module link */}
                    {(() => {
                      const currentId = activeModule.id || activeModule._id
                      const idx = modules.findIndex(m => (m.id || m._id) === currentId)
                      const next = modules[idx + 1]
                      return next ? (
                        <button
                          onClick={() => {
                            setActiveModule(next)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="group mt-20 opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <span className="font-sans text-[10px] text-vanta-500 uppercase tracking-widest block mb-2">Up Next</span>
                            <span className="font-display text-xl text-white group-hover:text-luxury-gold transition-colors">
                              {next.title}
                            </span>
                        </button>
                      ) : null
                    })()}
                  </div>
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
