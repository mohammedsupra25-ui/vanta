import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const proFeatures = [
  { label: 'Full wave count analysis',    value: 'Every post' },
  { label: 'Trade scenarios & targets',   value: 'Yes' },
  { label: 'Entry & exit levels',         value: 'Yes' },
  { label: 'Post-trade notes',            value: 'Yes' },
  { label: 'Market',                      value: 'XAUUSD' },
  { label: 'Methodology',                 value: 'NEoWave' },
]

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power3.out',
      duration: 0.5,
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 1,
      overwrite: 'auto'
    })
  }

  return (
    <section ref={sectionRef} id="plans" className="section-padding" style={{ background: '#000000' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-16 opacity-0">
          <span className="label-caps block mb-5">Subscription</span>
          <h2 className="section-title text-white font-display">
            Pro Access
          </h2>
        </div>

        <div className="flex justify-center">
          <div ref={cardRef} className="w-full max-w-[500px] opacity-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-card spotlight-card relative flex flex-col h-full !p-12 group overflow-hidden border border-white/[0.03] hover:border-luxury-gold/30 transition-all duration-700">
              {/* Ambient inner glow on hover */}
              <div className="absolute inset-0 bg-luxury-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <div className="absolute top-8 right-8 font-sans font-bold text-black bg-luxury-gold text-[8px] tracking-[2px] uppercase px-3 py-1.5 z-10 rounded-sm">
                Active
              </div>

              <div className="label-caps mb-6 z-10 text-white/40 font-bold" style={{ fontSize: '9px' }}>Subscription Tier</div>

              <div className="flex items-baseline gap-2 mb-4 z-10">
                <span
                  className="font-display font-semibold text-white"
                  style={{ fontSize: 'clamp(48px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  $49
                </span>
                <span className="font-sans text-white/30 text-xs tracking-[1px] uppercase">/ Monthly Access</span>
              </div>

              <p className="font-sans text-vanta-400 text-[14px] mb-10 leading-relaxed z-10 max-w-[360px]">
                Institutional-grade access to every wave count, trade scenario, and real-time market update.
              </p>

              <div className="h-px bg-white/[0.04] mb-10 z-10" />

              <ul className="flex flex-col flex-1 mb-12 z-10">
                {proFeatures.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-4 transition-colors duration-300"
                    style={{ borderBottom: i < proFeatures.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}
                  >
                    <span className="font-sans text-white/40 text-[12px] tracking-[0.5px]">{f.label}</span>
                    <span className="font-mono font-medium text-white/90 text-[12px]" style={{ fontFamily: "'IBM Plex Sans', monospace" }}>{f.value}</span>
                  </li>
                ))}
              </ul>

              <button className="btn-primary btn-gold w-full !py-5 !text-[10px] !tracking-[3px] z-10">
                Initiate Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
