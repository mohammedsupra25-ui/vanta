import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Core',
    price: '$49',
    period: '/mo',
    featured: false,
    desc: 'Weekly deep-dive analysis for self-directed traders.',
    features: [
      { label: 'Analysis frequency', value: 'Weekly' },
      { label: 'Markets covered',    value: '3' },
      { label: 'Entry & exit levels', value: 'Yes' },
      { label: 'Discord access',     value: 'Community' },
      { label: 'Response time',      value: '48h' },
    ],
  },
  {
    name: 'Edge',
    price: '$149',
    period: '/mo',
    featured: true,
    desc: 'Daily analysis across all markets with full thesis.',
    features: [
      { label: 'Analysis frequency', value: 'Daily' },
      { label: 'Markets covered',    value: 'All 12' },
      { label: 'Entry & exit levels', value: 'Yes' },
      { label: 'Discord access',     value: 'Priority' },
      { label: 'Response time',      value: '12h' },
    ],
  },
  {
    name: 'Institutional',
    price: '$499',
    period: '/mo',
    featured: false,
    desc: 'Real-time updates, custom requests & 1-on-1 calls.',
    features: [
      { label: 'Analysis frequency', value: 'Real-time' },
      { label: 'Markets covered',    value: 'All 12' },
      { label: 'Entry & exit levels', value: 'Yes' },
      { label: 'Custom requests',    value: 'Unlimited' },
      { label: '1-on-1 calls',       value: '2× / month' },
    ],
  },
]

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)

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

    const cards = sectionRef.current?.querySelectorAll('.plan-card-wrapper')
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} id="plans" className="section-padding" style={{ background: '#000000' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-16 opacity-0">
          <span className="label-caps block mb-5">Subscription Plans</span>
          <h2 className="section-title text-white font-display">
            Choose Your Coverage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name} className="plan-card-wrapper opacity-0">
              <div className={`plan-card relative flex flex-col h-full p-8 md:p-10 ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && (
                  <div className="absolute top-6 right-6 font-sans font-bold text-black bg-white text-[9px] tracking-[2px] uppercase px-3 py-1.5">
                    Most Popular
                  </div>
                )}

                <div className="label-caps mb-4">{plan.name}</div>

                <div className="flex items-end gap-1 mb-2">
                  <span className="font-display font-semibold text-white" style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span className="font-sans text-vanta-400 text-sm mb-1">{plan.period}</span>
                </div>

                <p className="font-sans text-vanta-400 text-[13px] mb-8 mt-2 leading-relaxed">{plan.desc}</p>

                <div className="border-t border-white/[0.06] mb-8" />

                <ul className="flex flex-col flex-1 mb-10">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-3.5"
                      style={{ borderBottom: i < plan.features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                    >
                      <span className="font-sans text-vanta-400 text-[13px]">{f.label}</span>
                      <span className="font-sans font-semibold text-white text-[13px]">{f.value}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full font-sans font-bold text-[11px] tracking-[2.5px] uppercase py-4 border transition-all duration-300 ${
                    plan.featured
                      ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                      : 'bg-transparent text-white border-white/30 hover:bg-white hover:text-black hover:border-white'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
