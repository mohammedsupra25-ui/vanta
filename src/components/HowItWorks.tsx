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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const el = stepsRef.current[index]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-20 opacity-0">
          <span className="label-caps block mb-5">Process</span>
          <h2 className="section-title font-display italic text-white">
            Three Steps to the Edge
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {steps.map((step, i) => (
            <div 
              key={i} 
              ref={el => { stepsRef.current[i] = el }} 
              onMouseMove={(e) => handleMouseMove(e, i)} 
              className="bento-card spotlight-card col-span-12 md:col-span-4 opacity-0 relative group p-10 transition-all duration-700"
            >
              <div className="flex flex-col h-full z-10 relative">
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-[10px] tracking-[3px] text-white/30 uppercase" style={{ fontFamily: "'IBM Plex Sans', monospace" }}>
                    Phase {step.num}
                  </span>
                  <div className="w-8 h-px bg-white/[0.08]" />
                </div>
                
                <h3 className="font-sans font-bold text-white mb-4 group-hover:text-luxury-gold transition-colors duration-300" style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h3>
                
                <p className="font-sans text-vanta-400 leading-relaxed mb-8" style={{ fontSize: '14px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {step.desc}
                </p>

                <div className="mt-auto pt-6 border-t border-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono text-[9px] tracking-[2px] text-luxury-gold uppercase">System Protocol Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
