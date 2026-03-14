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

  return (
    <section ref={sectionRef} id="plans" className="section-padding" style={{ background: '#000000' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-16 opacity-0">
          <span className="label-caps block mb-5">Subscription</span>
          <h2 className="section-title text-white font-display">
            Pro Access
          </h2>
        </div>

        {/* Single centered Pro card */}
        <div className="flex justify-center">
          <div ref={cardRef} className="w-full max-w-[480px] opacity-0">
            <div className="glassmorphism-card relative flex flex-col h-full p-10 group overflow-hidden">
              {/* Ambient inner glow on hover */}
              <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="absolute top-6 right-6 font-sans font-bold text-black bg-luxury-gold text-[9px] tracking-[2px] uppercase px-3 py-1.5 z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-sm">
                Pro
              </div>

              <div className="label-caps mb-4 z-10 text-luxury-gold font-bold">Vanta Pro</div>

              <div className="flex items-end gap-1 mb-2 z-10">
                <span
                  className="font-display font-semibold text-white"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1 }}
                >
                  $49
                </span>
                <span className="font-sans text-vanta-400 text-sm mb-1">/mo</span>
              </div>

              <p className="font-sans text-vanta-400 text-[13px] mb-8 mt-2 leading-relaxed z-10">
                Full access to every analysis — wave counts, trade scenarios, entry & exit levels, and post-trade notes.
              </p>

              <div className="border-t border-white/[0.06] mb-8 z-10" />

              <ul className="flex flex-col flex-1 mb-10 z-10">
                {proFeatures.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-3.5 group-hover:border-luxury-gold/20 transition-colors duration-300"
                    style={{ borderBottom: i < proFeatures.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <span className="font-sans text-vanta-400 text-[13px]">{f.label}</span>
                    <span className="font-sans font-semibold text-white/90 text-[13px]">{f.value}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full font-sans font-bold text-[11px] tracking-[2.5px] uppercase py-4 border border-luxury-gold bg-luxury-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-transparent hover:text-luxury-gold transition-all duration-300 z-10 rounded-sm">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
