import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll('.cta-animate')
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Giant background text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-extrabold text-white whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 20vw, 300px)',
            opacity: 0.028,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          VANTA
        </span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-8"
      >
        <div className="label-caps mb-8 cta-animate opacity-0">
          Ready for the Edge?
        </div>

        <h2
          className="font-display italic text-white mb-6 cta-animate opacity-0"
          style={{
            fontSize: 'clamp(52px, 8vw, 110px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontWeight: 300,
          }}
        >
          Your decisions.
          <br />
          Our intelligence.
        </h2>

        <p className="font-sans text-vanta-400 mb-12 cta-animate opacity-0" style={{ fontSize: '14px' }}>
          Trusted by 4,800+ active subscribers across 60 countries
        </p>

        <button
          className="cta-animate opacity-0 font-sans font-bold text-black bg-white border border-white text-[12px] tracking-[2.5px] uppercase transition-all duration-300 hover:bg-transparent hover:text-white"
          style={{ padding: '20px 64px' }}
          onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get The Edge
        </button>
      </div>
    </section>
  )
}
