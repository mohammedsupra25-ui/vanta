import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { mockAnalyses } from '../lib/mockData'
import { client, urlFor } from '../lib/sanityClient'
import { useUserPlan } from '../hooks/useUserPlan'
import type { AnalysisPost, AnalysisStatus, AnalysisResult } from '../types/analysis'
import { useLenis } from '../hooks/useLenis'

// ─── SVG chart placeholders (same 4 variants as Analysis page) ───────────────
function ChartPlaceholder({ variant = 'uptrend' }: { variant?: string }) {
  if (variant === 'reversal') return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 160 L80 120 L140 90 L200 60 L250 45 L270 55 L290 80 L330 130 L380 170" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M20 160 L80 120 L140 90 L200 60 L250 45 L270 55 L290 80 L330 130 L380 170 L380 200 L20 200Z" fill="url(#rev-grad)" />
      <defs><linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.06" /><stop offset="100%" stopColor="white" stopOpacity="0" /></linearGradient></defs>
      <circle cx="250" cy="45" r="4" fill="white" opacity="0.8" />
      <line x1="250" y1="0" x2="250" y2="45" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
      <text x="256" y="18" fill="white" opacity="0.4" fontSize="9" fontFamily="monospace">PEAK</text>
    </svg>
  )
  if (variant === 'breakdown') return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 60 L80 70 L130 65 L170 68 L200 72 L220 100 L260 140 L320 170 L380 180" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M20 60 L80 70 L130 65 L170 68 L200 72 L220 100 L260 140 L320 170 L380 180 L380 200 L20 200Z" fill="url(#bd-grad)" />
      <defs><linearGradient id="bd-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.04" /><stop offset="100%" stopColor="white" stopOpacity="0" /></linearGradient></defs>
      <line x1="20" y1="72" x2="380" y2="72" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
      <text x="24" y="68" fill="white" opacity="0.35" fontSize="9" fontFamily="monospace">SUPPORT</text>
    </svg>
  )
  if (variant === 'sideways') return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 100 L60 80 L100 110 L140 85 L180 105 L220 82 L260 108 L300 86 L340 104 L380 88" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <line x1="20" y1="78" x2="380" y2="78" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />
      <line x1="20" y1="112" x2="380" y2="112" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />
      <text x="24" y="74" fill="white" opacity="0.35" fontSize="9" fontFamily="monospace">RESISTANCE</text>
      <text x="24" y="124" fill="white" opacity="0.35" fontSize="9" fontFamily="monospace">SUPPORT</text>
    </svg>
  )
  // default: uptrend
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 170 L70 145 L110 155 L150 120 L190 130 L230 95 L270 105 L310 70 L350 55 L380 40" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M20 170 L70 145 L110 155 L150 120 L190 130 L230 95 L270 105 L310 70 L350 55 L380 40 L380 200 L20 200Z" fill="url(#up-grad)" />
      <defs><linearGradient id="up-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.08" /><stop offset="100%" stopColor="white" stopOpacity="0" /></linearGradient></defs>
      {[1,2,3,4,5].map((w, i) => (
        <text key={w} x={70 + i * 65} y={[148, 158, 123, 98, 58][i] - 10} fill="white" opacity="0.35" fontSize="9" fontFamily="monospace">({w})</text>
      ))}
    </svg>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: AnalysisStatus }) {
  const cfg: Record<AnalysisStatus, { dot: string; label: string }> = {
    Active:       { dot: 'bg-white animate-pulse',      label: 'ACTIVE' },
    'Target Hit': { dot: 'bg-white',                    label: 'TARGET HIT' },
    Invalidated:  { dot: 'bg-white/30',                 label: 'INVALIDATED' },
    Watching:     { dot: 'bg-white/60',                 label: 'WATCHING' },
  }
  const { dot, label } = cfg[status]
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span className="font-sans text-[10px] tracking-[2px] text-white/60">{label}</span>
    </span>
  )
}

// ─── Result badge ─────────────────────────────────────────────────────────────
function ResultBadge({ result }: { result: AnalysisResult }) {
  const cfg: Record<AnalysisResult, string> = {
    Win:           'text-white border-white/40',
    Loss:          'text-white/40 border-white/20',
    Breakeven:     'text-white/60 border-white/30',
    'Still Running': 'text-white/70 border-white/35',
  }
  return (
    <span className={`inline-block font-sans text-[10px] tracking-[2px] border px-3 py-1 ${cfg[result]}`}>
      {result.toUpperCase()}
    </span>
  )
}

// ─── Scenario probability bar ─────────────────────────────────────────────────
function ScenarioBar({ label, probability, description }: { label: string; probability: number; description: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-sans font-bold text-white text-[12px] tracking-[1.5px] uppercase">{label}</span>
        <span className="font-display italic text-luxury-gold/80 text-[22px]">{probability}%</span>
      </div>
      <div className="h-px bg-luxury-gold/20 mb-4 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${probability}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      </div>
      <p className="font-sans text-white/50 text-[13px] leading-relaxed">{description}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AnalysisDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [analysis, setAnalysis] = useState<AnalysisPost | null>(null)
  const [loading, setLoading] = useState(true)
  const { user, isPro } = useUserPlan()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLenis()

  useEffect(() => {
    window.scrollTo(0, 0)

    async function load() {
      if (slug) {
        try {
          const query = `*[_type == "analysis" && slug.current == $slug][0] {
            _id, title, date, status, chart, waveCount, scenarios,
            postTradeNotes, result, isFeatured, "slug": slug.current
          }`
          const data = await client.fetch<AnalysisPost>(query, { slug })
          if (data) { setAnalysis(data); setLoading(false); return }
        } catch {
          // fall through to mock
        }
      }
      const found = mockAnalyses.find(a => a.slug === slug) ?? null
      setAnalysis(found)
      setLoading(false)
    }

    load()
  }, [slug])

  // Animate in once analysis loaded
  useEffect(() => {
    if (!analysis || !headerRef.current || !contentRef.current) return
    gsap.fromTo(
      [headerRef.current, contentRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
    )
  }, [analysis])

  const formattedDate = analysis?.date
    ? new Date(analysis.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const canView = isPro
  const overlayType: 'login' | 'upgrade' = !user ? 'login' : 'upgrade'

  // Resolve chart image URL or fall back to SVG
  const chartImageUrl = analysis?.chart ? urlFor(analysis.chart)?.width(1200).url() : null

  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      {/* ── Nav strip ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-[72px] flex items-center justify-between">
          <Link to="/" className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none no-underline">
            VANTA
          </Link>
          <Link
            to="/analysis"
            className="font-sans text-white/50 text-[11px] tracking-[2px] uppercase hover:text-white transition-colors duration-200 flex items-center gap-2 no-underline"
          >
            <span style={{ fontSize: '16px' }}>←</span> BACK TO ANALYSIS
          </Link>
        </div>
      </nav>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
          <span className="font-sans text-white/30 text-[11px] tracking-[3px] uppercase">Loading</span>
        </div>
      )}

      {/* Not found */}
      {!loading && !analysis && (
        <div className="flex flex-col items-center justify-center gap-6" style={{ minHeight: '100vh' }}>
          <p className="font-display italic text-white/30 text-[28px]">Analysis not found.</p>
          <Link to="/analysis" className="font-sans text-[11px] tracking-[2px] text-white/50 hover:text-white uppercase no-underline transition-colors duration-200">
            ← Back to Analysis
          </Link>
        </div>
      )}

      {/* Content */}
      {!loading && analysis && (
        <div className="pt-[72px]">

          {/* ── Chart ── full width */}
          <div
            className="w-full relative overflow-hidden"
            style={{ background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-16">
              <div
                className="w-full rounded-none overflow-hidden relative"
                style={{ aspectRatio: '16 / 6', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="w-full h-full" style={!canView ? { filter: 'blur(12px)' } : undefined}>
                  {chartImageUrl
                    ? <img src={chartImageUrl} alt={analysis.title} className="w-full h-full object-cover" />
                    : <ChartPlaceholder variant={analysis.chartSvg} />
                  }
                </div>
                {!canView && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}>
                    <p className="font-sans text-white/40 text-[9px] tracking-[3px] uppercase mb-3">
                      {overlayType === 'login' ? 'Members Only' : 'Pro Access Required'}
                    </p>
                    <Link
                      to={overlayType === 'login' ? '/login' : '/signup'}
                      className="font-sans font-bold text-white border border-white/40 px-6 py-3 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white no-underline"
                    >
                      {overlayType === 'login' ? 'Login to View' : 'Upgrade to Pro'}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle grid lines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }} />
          </div>

          {/* ── Header ── */}
          <div ref={headerRef} style={{ opacity: 0 }}>
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-14 border-b border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <StatusBadge status={analysis.status} />
                {analysis.result && <ResultBadge result={analysis.result} />}
                <span className="font-sans text-white/30 text-[11px] tracking-[1px]">{formattedDate}</span>
              </div>

              <h1
                className="font-display text-white mb-0"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.1, fontWeight: 600 }}
              >
                {analysis.title}
              </h1>
            </div>
          </div>

          {/* ── Body ── */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24">

                {/* Left: wave count + post-trade notes */}
                <div>
                  {/* Wave count */}
                  {analysis.waveCount && (
                  <div className="mb-14">
                    <span className="label-caps block mb-6">Wave Count</span>
                    {canView ? (
                      <p
                        className="font-display text-white/80"
                        style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.75 }}
                      >
                        {analysis.waveCount}
                      </p>
                    ) : (
                      <div>
                        <p
                          className="font-display text-white/50 select-none"
                          style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.75, filter: 'blur(6px)' }}
                        >
                          {analysis.waveCount}
                        </p>
                        <Link
                          to={overlayType === 'login' ? '/login' : '/signup'}
                          className="inline-block mt-4 font-sans font-bold text-white/50 border border-white/20 px-5 py-2.5 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:text-white hover:border-white/50 no-underline"
                        >
                          {overlayType === 'login' ? 'Login to Read' : 'Upgrade to Pro'}
                        </Link>
                      </div>
                    )}
                  </div>
                  )}

                  {/* Post-trade notes — pro only */}
                  {canView && analysis.postTradeNotes && (
                    <div
                      className="p-8 glassmorphism-card spotlight-card rounded-2xl relative overflow-hidden group"
                      onMouseMove={e => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                      }}
                      style={{ border: '1px solid rgba(212,175,55,0.15)' }}
                    >
                      <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-0"></div>
                      <span className="label-caps block mb-5 relative z-10 text-luxury-gold/80">Post-Trade Notes</span>
                      <p className="font-sans text-white/60 text-[14px] leading-relaxed relative z-10">
                        {analysis.postTradeNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: scenarios — pro only */}
                <div>
                  <span className="label-caps block mb-8">Scenarios</span>
                  {canView ? (analysis.scenarios ?? []).map(s => (
                    <ScenarioBar key={s._key} label={s.label} probability={s.probability} description={s.description} />
                  )) : (
                    <div className="py-8 border border-white/[0.06] text-center">
                      <p className="font-sans text-white/30 text-[10px] tracking-[2px] uppercase mb-4">Pro Content</p>
                      <Link
                        to={overlayType === 'login' ? '/login' : '/signup'}
                        className="font-sans font-bold text-white border border-white/40 px-6 py-3 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black no-underline"
                      >
                        {overlayType === 'login' ? 'Login to View' : 'Upgrade to Pro'}
                      </Link>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="font-sans text-white/20 text-[11px] leading-relaxed mt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                    This analysis is for educational purposes only and does not constitute financial advice. Trade your own plan.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Footer strip ── */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <Link
                  to="/analysis"
                  className="font-sans text-white/50 text-[11px] tracking-[2px] uppercase hover:text-white transition-colors duration-200 flex items-center gap-2 no-underline"
                >
                  <span style={{ fontSize: '16px' }}>←</span> BACK TO ANALYSIS
                </Link>

                <Link
                  to="/#plans"
                  className="bg-luxury-gold text-black font-sans font-bold text-[11px] tracking-[3px] uppercase px-7 py-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all relative group overflow-hidden no-underline rounded-sm"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] translate-x-[-150%] animate-shimmer group-hover:animate-none"></span>
                  <span className="relative z-10">Get The Edge</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
