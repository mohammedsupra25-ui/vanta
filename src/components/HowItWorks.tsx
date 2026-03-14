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

        <div className="bento-grid">
          {steps.map((step, i) => (
            <div key={i} ref={el => { stepsRef.current[i] = el }} className="bento-card spotlight-card col-span-12 md:col-span-4 opacity-0 relative group">
              <div className="flex flex-col h-full z-10">
                <div
                  className="font-display font-light text-vanta-700 select-none mb-6 transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.1)' }}
                >
                  {step.num}
                </div>
                <h3 className="font-sans font-bold text-white mb-3 mt-auto" style={{ fontSize: '18px' }}>{step.title}</h3>
                <p className="font-sans text-vanta-400 leading-relaxed" style={{ fontSize: '14px' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
