import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from '@tsparticles/react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLenis } from '../hooks/useLenis'
import { mockAnalyses } from '../lib/mockData'
import { client, urlFor } from '../lib/sanityClient'
import { useUserPlan } from '../hooks/useUserPlan'
import type { AnalysisPost, AnalysisStatus } from '../types/analysis'


gsap.registerPlugin(ScrollTrigger)

// ─── Particle config (lighter than hero) ─────────────────────────────────────
const particlesOpts = {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 60 },
    color: { value: '#D4AF37' },
    opacity: { value: 0.3, random: { enable: true, minimumValue: 0.1 } },
    size: { value: { min: 0.4, max: 1.5 } },
    links: { enable: true, distance: 110, color: '#D4AF37', opacity: 0.15, width: 0.5 },
    move: { enable: true, speed: 0.4, random: true, outModes: { default: 'out' as const } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' as const } },
    modes: { grab: { distance: 150, links: { opacity: 0.2 } } },
  },
  detectRetina: true,
}

// ─── Chart SVG placeholders ───────────────────────────────────────────────────
function ChartPlaceholder({ variant }: { variant?: string }) {
  const paths: Record<string, string> = {
    uptrend:
      'M0,380 C60,370 80,360 120,340 C160,320 180,330 220,310 C260,290 280,295 320,270 C360,245 380,250 420,220 C460,190 480,195 520,165 C560,135 580,140 620,110 C660,80 680,75 720,55 C740,45 760,40 800,30',
    reversal:
      'M0,300 C40,280 80,260 120,230 C160,200 200,190 240,210 C280,230 300,260 340,240 C380,220 400,190 440,180 C460,175 480,178 500,200 C540,250 560,300 600,340 C640,380 680,400 720,420 C760,440 780,445 800,450',
    breakdown:
      'M0,120 C40,115 80,118 120,110 C160,102 180,108 220,115 C260,122 280,118 320,125 C360,132 380,128 420,130 C440,131 450,132 470,160 C500,200 520,260 560,310 C600,360 650,390 700,410 C740,425 770,430 800,440',
    sideways:
      'M0,220 C40,215 60,230 100,225 C140,220 160,235 200,225 C240,215 260,230 300,220 C340,210 360,228 400,222 C440,216 460,232 500,223 C540,214 560,228 600,218 C640,208 660,226 700,217 C740,208 770,222 800,215',
  }
  const d = paths[variant ?? 'uptrend']

  return (
    <svg
      viewBox="0 0 800 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid */}
      {[90, 180, 270, 360].map(y => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.04)" />
      ))}
      {[160, 320, 480, 640].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="450" stroke="rgba(255,255,255,0.04)" />
      ))}
      {/* Area fill */}
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L800,450 L0,450 Z`}
        fill={`url(#grad-${variant})`}
      />
      {/* Price line */}
      <path d={d} stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Watermark */}
      <text
        x="400"
        y="225"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.035)"
        fontSize="48"
        fontFamily="serif"
        fontStyle="italic"
      >
        VANTA
      </text>
    </svg>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, size = 'sm' }: { status: AnalysisStatus; size?: 'sm' | 'lg' }) {
  const styles: Record<AnalysisStatus, string> = {
    Active:       'border-white/60 text-white',
    'Target Hit': 'bg-white text-black border-white',
    Invalidated:  'border-white/20 text-vanta-600',
    Watching:     'border-dashed border-white/30 text-vanta-400',
  }
  const px = size === 'lg' ? 'px-4 py-2 text-[11px]' : 'px-2.5 py-1 text-[9px]'
  return (
    <span className={`font-sans font-bold tracking-[2px] uppercase border ${px} ${styles[status]}`}>
      {status}
    </span>
  )
}

// ─── Result badge ─────────────────────────────────────────────────────────────
function ResultBadge({ result }: { result: NonNullable<AnalysisPost['result']> }) {
  const styles: Record<string, string> = {
    Win:           'bg-white text-black',
    Loss:          'border border-white/20 text-vanta-600 line-through',
    Breakeven:     'border border-white/30 text-vanta-400',
    'Still Running': 'border border-dashed border-white/30 text-vanta-400',
  }
  return (
    <span className={`font-sans font-bold text-[9px] tracking-[2px] uppercase px-2.5 py-1 ${styles[result]}`}>
      {result}
    </span>
  )
}

// ─── Scenario probability bar ─────────────────────────────────────────────────
function ScenarioBar({
  label, probability, description, delay = 0,
}: {
  label: string; probability: number; description: string; delay?: number
}) {
  return (
    <div className="mb-6">
      <div className="flex items-end justify-between mb-2">
        <span className="label-caps" style={{ fontSize: '10px' }}>{label}</span>
        <span
          className="font-display font-light text-white"
          style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1 }}
        >
          {probability}%
        </span>
      </div>
      {/* Animated bar */}
      <div className="relative h-px bg-white/10 mb-3">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white"
          initial={{ width: 0 }}
          whileInView={{ width: `${probability}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
          viewport={{ once: true }}
        />
      </div>
      <p className="font-sans text-vanta-400 leading-relaxed" style={{ fontSize: '13px' }}>
        {description}
      </p>
    </div>
  )
}

// ─── Paywall overlay ──────────────────────────────────────────────────────────
function PaywallOverlay({ type, showLink = true }: { type: 'login' | 'upgrade'; showLink?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
    >
      {type === 'login' ? (
        <>
          <p className="font-sans text-white/40 text-[9px] tracking-[3px] uppercase mb-3">
            Members Only
          </p>
          {showLink && (
            <Link
              to="/login"
              className="font-sans font-bold text-white border border-white/40 px-6 py-3 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white no-underline"
            >
              Login to View
            </Link>
          )}
        </>
      ) : (
        <>
          <p className="font-sans text-white/40 text-[9px] tracking-[3px] uppercase mb-3">
            Pro Access Required
          </p>
          {showLink && (
            <Link
              to="/plans"
              className="font-sans font-bold text-white border border-white/40 px-6 py-3 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white no-underline"
            >
              Upgrade to Pro
            </Link>
          )}
        </>
      )}
    </div>
  )
}

// ─── Chart image resolver ─────────────────────────────────────────────────────
function AnalysisChart({ post, className = '', isPro = false, isLoggedIn = false, showPaywallLink = true }: { post: AnalysisPost; className?: string; isPro?: boolean; isLoggedIn?: boolean; showPaywallLink?: boolean }) {
  const overlayType: 'login' | 'upgrade' = !isLoggedIn ? 'login' : 'upgrade'
  const blurStyle = !isPro ? { filter: 'blur(12px)' } : undefined

  let inner: React.ReactNode
  if (post.chart) {
    const imgUrl = urlFor(post.chart as Parameters<typeof urlFor>[0])?.width(1200).url()
    if (imgUrl) {
      inner = <img src={imgUrl} alt={post.title} className={`w-full h-full object-cover ${className}`} style={blurStyle} />
    }
  }
  if (!inner) {
    inner = (
      <div className={`w-full h-full bg-vanta-800 ${className}`} style={blurStyle}>
        <ChartPlaceholder variant={post.chartSvg} />
      </div>
    )
  }
  return (
    <div className="relative w-full h-full">
      {inner}
      {!isPro && <PaywallOverlay type={overlayType} showLink={showPaywallLink} />}
    </div>
  )
}

// ─── Analysis grid card ───────────────────────────────────────────────────────
function AnalysisCard({ post, isPro = false, isLoggedIn = false }: { post: AnalysisPost; isPro?: boolean; isLoggedIn?: boolean }) {
  const canView = isPro
  const wc = post.waveCount ?? ''
  const preview = wc.slice(0, 110) + (wc.length > 110 ? '...' : '')
  const date = post.date
    ? new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  const cardTo = isPro ? `/analysis/${post.slug}` : isLoggedIn ? '/plans' : '/login'

  return (
    <Link
      to={cardTo}
      className="block group glassmorphism-card spotlight-card rounded-2xl overflow-hidden relative border border-white/5 hover:border-luxury-gold/50 transition-all duration-500"
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-0"></div>
      {/* Chart image */}
      <div className="relative z-10" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <AnalysisChart post={post} isPro={isPro} isLoggedIn={isLoggedIn} showPaywallLink={false} />
        {/* Status overlay */}
        <div className="absolute top-3 left-3 z-20">
          <StatusBadge status={post.status} size="sm" />
        </div>
        {post.result && (
          <div className="absolute top-3 right-3">
            <ResultBadge result={post.result} />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="label-caps mb-3" style={{ fontSize: '10px' }}>{date}</div>

        <h3
          className="font-display font-semibold text-white mb-3 group-hover:text-vanta-200 transition-colors duration-200"
          style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.1 }}
        >
          {post.title}
        </h3>

        {canView ? (
          <p className="font-sans text-vanta-400 mb-4 leading-relaxed" style={{ fontSize: '13px' }}>
            {preview}
          </p>
        ) : (
          <p className="font-sans text-vanta-600 mb-4 leading-relaxed select-none" style={{ fontSize: '13px', filter: 'blur(4px)' }}>
            {preview || 'Wave count analysis and trade thesis available to pro members only.'}
          </p>
        )}

        {/* Scenarios row — pro only */}
        {canView && (post.scenarios?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-3 mb-5">
            {post.scenarios.map(s => (
              <span key={s._key} className="font-sans font-bold text-vanta-600" style={{ fontSize: '10px', letterSpacing: '1.5px' }}>
                {s.label}: {s.probability}%
              </span>
            ))}
          </div>
        )}

        <div
          className="font-sans font-bold text-white group-hover:text-white/70 transition-colors duration-200 flex items-center gap-2"
          style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          View Analysis
          <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </div>
      </div>
    </Link>
  )
}

// ─── Main Analysis page ───────────────────────────────────────────────────────
const FILTERS: Array<AnalysisStatus | 'ALL'> = ['ALL', 'Active', 'Target Hit', 'Invalidated', 'Watching']

export default function Analysis() {
  useLenis()

  const { user, isPro } = useUserPlan()
  const isLoggedIn = !!user
  const [engineInit, setEngineInit] = useState(false)
  const [analyses, setAnalyses] = useState<AnalysisPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<AnalysisStatus | 'ALL'>('ALL')

  const heroLabelRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const heroSubRef   = useRef<HTMLParagraphElement>(null)
  const featuredRef  = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)
  const particlesContRef = useRef<HTMLDivElement>(null)

  // Init particles engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setEngineInit(true))
  }, [])

  // Fetch from Sanity, fall back to mock data
  useEffect(() => {
    const query = `*[_type == "analysis"] | order(date desc) {
      _id, title, date, status, chart, waveCount,
      scenarios, postTradeNotes, result, isFeatured,
      "slug": slug.current
    }`
    client.fetch<AnalysisPost[]>(query)
      .then(data => {
        console.log(data)
        setAnalyses(data?.length ? data : mockAnalyses)
      })
      .catch(() => {
        setAnalyses(mockAnalyses)
      })
      .finally(() => setLoading(false))
  }, [])

  // Hero animations
  useEffect(() => {
    if (particlesContRef.current) {
      gsap.fromTo(particlesContRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' })
    }
    const tl = gsap.timeline()
    if (heroLabelRef.current) tl.fromTo(heroLabelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
    if (heroTitleRef.current) tl.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.5)
    if (heroSubRef.current) tl.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.75)
  }, [])

  // Scroll animations
  useEffect(() => {
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 100%', once: true } }
      )
    }
    if (gridRef.current) {
      gsap.fromTo(gridRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 100%', once: true } }
      )
    }
  }, [analyses])

  const particlesLoaded = useCallback(async () => {}, [])

  const featured = analyses.find(a => a.isFeatured) ?? analyses[0]
  const filtered = analyses.filter(a => {
    if (filter === 'ALL') return a._id !== featured?._id
    return a.status === filter && a._id !== featured?._id
  })

  // Stats for ticker
  const total   = analyses.length
  const wins    = analyses.filter(a => a.result === 'Win').length
  const closed  = analyses.filter(a => a.result && a.result !== 'Still Running').length
  const winRate = closed > 0 ? Math.round((wins / closed) * 100) + '%' : 'N/A'
  const active  = analyses.filter(a => a.status === 'Active').length

  const latest = analyses[0]
  const latestDate = latest?.date
    ? new Date(latest.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  // ── Loading spinner ──────────────────────────────────────────────────────────
  const loadingUI = (
    <div className="flex items-center justify-center" style={{ minHeight: '40vh', background: '#000000' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-5 h-5 border border-white/20 border-t-white/80 rounded-full animate-spin"
          style={{ animationDuration: '0.9s' }}
        />
        <span className="font-sans text-vanta-600 text-[10px] tracking-[3px] uppercase">Loading</span>
      </div>
    </div>
  )

  return (
    <>
      <Nav />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: '50vh', background: '#000000', paddingTop: '72px' }}
        >
          <div ref={particlesContRef} className="absolute inset-0 opacity-0" style={{ zIndex: 0 }}>
            {engineInit && (
              <Particles id="analysis-particles" particlesLoaded={particlesLoaded} options={particlesOpts} />
            )}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">
            <div ref={heroLabelRef} className="label-caps mb-6 opacity-0 relative">
              <span className="absolute -inset-2 bg-luxury-gold/10 blur-xl rounded-full z-0"></span>
              <span className="relative z-10 text-luxury-gold">XAUUSD · NEoWave Analysis</span>
            </div>
            <h1
              ref={heroTitleRef}
              className="font-display italic text-white opacity-0 drop-shadow-lg"
              style={{ fontWeight: 300, fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              Market Analysis
            </h1>
            <p
              ref={heroSubRef}
              className="mt-6 font-sans text-vanta-400 max-w-[420px] leading-relaxed opacity-0"
              style={{ fontSize: '16px' }}
            >
              Wave-based trade analysis. Every setup documented.
            </p>
          </div>
        </section>

        {/* ── LIVE STATUS BANNER ──────────────────────────────── */}
        <div
          style={{
            background: '#0a0a0a',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 0',
          }}
        >
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between gap-6 flex-wrap">
            {/* Status */}
            <div className="flex items-center gap-3">
              {latest?.status === 'Active' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  <span className="font-sans font-bold text-white tracking-[3px] text-[11px] uppercase">
                    Active Trade
                  </span>
                </>
              ) : latest?.status === 'Watching' ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-vanta-400" />
                  <span className="font-sans font-bold text-vanta-400 tracking-[3px] text-[11px] uppercase">
                    Watching
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-vanta-700" />
                  <span className="font-sans font-bold text-vanta-600 tracking-[3px] text-[11px] uppercase">
                    No Active Setup
                  </span>
                </>
              )}
            </div>
            {/* Last updated */}
            <span className="font-sans text-vanta-600 tracking-[2px] text-[10px] uppercase">
              Last updated: <span className="text-vanta-400">{latestDate}</span>
            </span>
          </div>
        </div>

        {loading ? loadingUI : null}

        {/* ── FEATURED ANALYSIS ───────────────────────────────── */}
        {(!loading && featured) ? (
          <section className="section-padding" style={{ background: '#000000' }}>
            <div className="max-w-[1400px] mx-auto px-8 md:px-12">
              <div ref={featuredRef} style={{ opacity: 0 }}>
                <span className="label-caps block mb-8">Latest Analysis</span>
                <div
                  className="flex flex-col lg:flex-row glassmorphism-card spotlight-card rounded-2xl overflow-hidden group"
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                  }}
                  style={{
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}
                >
                  <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-0"></div>
                  {/* Chart — 60% */}
                  <div className="relative z-10 lg:w-[60%] flex-shrink-0" style={{ minHeight: '240px' }}>
                    <AnalysisChart post={featured} className="absolute inset-0" isPro={isPro} isLoggedIn={isLoggedIn} />
                    <div className="absolute top-5 left-5">
                      <StatusBadge status={featured.status} size="lg" />
                    </div>
                    {featured.result && (
                      <div className="absolute top-5 right-5">
                        <ResultBadge result={featured.result} />
                      </div>
                    )}
                  </div>

                  {/* Details — 40% */}
                  <div className="flex flex-col justify-between p-8 lg:p-10 flex-1 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                    <div>
                      <div className="label-caps mb-4" style={{ fontSize: '10px' }}>
                        {featured.date ? new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                      </div>

                      <h2
                        className="font-display font-semibold text-white mb-8"
                        style={{ fontSize: 'clamp(26px, 3vw, 44px)', lineHeight: 1.05 }}
                      >
                        {featured.title}
                      </h2>

                      {/* Wave count */}
                      {featured.waveCount && (
                      <div className="mb-8">
                        <div className="label-caps mb-3">Wave Count</div>
                        {isPro ? (
                          <p className="font-sans text-vanta-200 leading-relaxed" style={{ fontSize: '14px' }}>
                            {featured.waveCount}
                          </p>
                        ) : (
                          <p className="font-sans text-vanta-400 leading-relaxed select-none" style={{ fontSize: '14px', filter: 'blur(5px)' }}>
                            {featured.waveCount}
                          </p>
                        )}
                      </div>
                      )}

                      {/* Scenarios — pro only */}
                      {isPro && (featured.scenarios?.length ?? 0) > 0 && (
                      <div className="mb-6">
                        <div className="label-caps mb-5">Scenarios</div>
                        {featured.scenarios.map((s, i) => (
                          <ScenarioBar
                            key={s._key}
                            label={s.label}
                            probability={s.probability}
                            description={s.description}
                            delay={i * 0.2}
                          />
                        ))}
                      </div>
                      )}

                      {/* Post-trade notes */}
                      {featured.postTradeNotes && (
                        <div
                          className="mb-6 p-4"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <div className="label-caps mb-2" style={{ fontSize: '9px' }}>Post-Trade Notes</div>
                          <p
                            className="font-display italic text-vanta-200"
                            style={{ fontSize: '15px', lineHeight: 1.7 }}
                          >
                            {featured.postTradeNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/analysis/${featured.slug}`}
                      className="font-sans font-bold text-white border border-white/30 text-center py-4 text-[11px] tracking-[2.5px] uppercase hover:bg-white hover:text-black transition-all duration-300 mt-4 block"
                    >
                      Full Analysis →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* ── PAST ANALYSES GRID ──────────────────────────────── */}
        {!loading ? (
        <section className="section-padding" style={{ background: '#0a0a0a' }}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <span className="label-caps block mb-8">Past Analyses</span>

            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-1 mb-12 border-b border-white/[0.06] pb-6">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative font-sans font-bold text-[10px] tracking-[2px] uppercase px-4 py-2 transition-colors duration-200"
                  style={{ color: filter === f ? '#ffffff' : '#444444' }}
                >
                  {f}
                  {filter === f && (
                    <motion.div
                      layoutId="filter-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div ref={gridRef} style={{ opacity: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {filtered.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                      <p className="font-sans text-vanta-600 text-[13px] tracking-widest uppercase">
                        No analyses with this status yet
                      </p>
                    </div>
                  ) : (
                    filtered.map(post => (
                      <motion.div
                        key={post._id}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        <AnalysisCard post={post} isPro={isPro} isLoggedIn={isLoggedIn} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
        ) : null}

        {/* ── STATS TICKER ────────────────────────────────────── */}
        <div
          style={{
            background: '#000000',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 0',
            overflow: 'hidden',
          }}
        >
          <div className="ticker-track">
            {[0, 1, 2].map(i => (
              <span key={i} className="flex items-center shrink-0">
                {[
                  { label: 'Total Analyses', value: String(total) },
                  { label: 'Win Rate',        value: winRate },
                  { label: 'Active Trades',   value: String(active) },
                  { label: 'Methodology',     value: 'NEoWave' },
                  { label: 'Market',          value: 'XAUUSD' },
                  { label: 'Analyses',        value: `${total} Documented` },
                ].map((item, j) => (
                  <span key={j} className="flex items-center shrink-0">
                    <span className="font-sans font-medium text-vanta-400 uppercase tracking-[4px] text-[10px]">
                      {item.label}
                    </span>
                    <span className="font-sans font-bold text-luxury-gold uppercase tracking-[2px] text-[11px] ml-3" style={{ textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                      {item.value}
                    </span>
                    <span className="mx-12 text-luxury-gold/40 text-[8px]">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
