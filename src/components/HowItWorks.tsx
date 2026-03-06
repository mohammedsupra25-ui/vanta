import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Subscribe',
    desc: 'Choose your tier and gain immediate access to the dashboard. Your first analysis drops within the hour.',
  },
  {
    num: '02',
    title: 'Receive Analysis',
    desc: 'Detailed market breakdowns — structure, bias, key levels, entry zones, targets and invalidation — delivered before sessions open.',
  },
  {
    num: '03',
    title: 'Execute with Edge',
    desc: 'Apply institutional-grade insights to your own trading. The analysis is the weapon. The execution is yours.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<(HTMLDivElement | null)[]>([])
  const lineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )
    }

    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
    }

    stepsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-20 opacity-0">
          <span className="label-caps block mb-5">Process</span>
          <h2 className="section-title font-display italic text-white">
            Three Steps to the Edge
          </h2>
        </div>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden md:block absolute top-8 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)]"
            style={{ height: '1px', background: 'rgba(255,255,255,0.08)', zIndex: 0 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} ref={el => { stepsRef.current[i] = el }} className="relative opacity-0">
                <div
                  className="font-display font-light text-vanta-700 select-none mb-6"
                  style={{ fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {step.num}
                </div>
                <div
                  className="hidden md:block absolute"
                  style={{ top: '26px', left: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.25)', zIndex: 1 }}
                />
                <h3 className="font-sans font-bold text-white mb-4" style={{ fontSize: '18px' }}>{step.title}</h3>
                <p className="font-sans text-vanta-400 leading-relaxed" style={{ fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
