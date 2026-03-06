import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "VANTA's analysis is the only thing I read before the New York open. The level of detail — structure, bias, key levels — is what I used to pay a hedge fund for.",
    name: 'James K.',
    meta: 'Forex trader · London',
  },
  {
    quote: "I've tried every service out there. Most are noise dressed up as signal. VANTA is the opposite — minimal, precise, and almost always right about direction before it moves.",
    name: 'Sofia R.',
    meta: 'Prop trader · Berlin',
  },
  {
    quote: "The Institutional tier paid for itself in the first week. One custom analysis on gold before NFP was all I needed. This is a different caliber of research.",
    name: 'Marcus T.',
    meta: 'Commodities trader · New York',
  },
  {
    quote: "Finally someone who treats analysis like a craft. No hype, no predictions dressed as certainty — just clean market structure and actionable levels.",
    name: 'Yuki O.',
    meta: 'Algo trader · Tokyo',
  },
  {
    quote: "The entry and exit framework VANTA provides is the backbone of my risk management now. I've been a subscriber for 14 months and I'm not going anywhere.",
    name: 'Amara N.',
    meta: 'Independent trader · Lagos',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

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

    const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: trackRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onDown  = (e: MouseEvent) => { isDragging.current = true; startX.current = e.pageX - track.offsetLeft; scrollLeft.current = track.scrollLeft; track.style.cursor = 'grabbing' }
    const onLeave = () => { isDragging.current = false; track.style.cursor = 'grab' }
    const onUp    = () => { isDragging.current = false; track.style.cursor = 'grab' }
    const onMove  = (e: MouseEvent) => { if (!isDragging.current) return; e.preventDefault(); track.scrollLeft = scrollLeft.current - (e.pageX - track.offsetLeft - startX.current) * 1.5 }

    track.addEventListener('mousedown', onDown)
    track.addEventListener('mouseleave', onLeave)
    track.addEventListener('mouseup', onUp)
    track.addEventListener('mousemove', onMove)
    return () => { track.removeEventListener('mousedown', onDown); track.removeEventListener('mouseleave', onLeave); track.removeEventListener('mouseup', onUp); track.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: '#000000' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 mb-14">
        <div ref={titleRef} className="opacity-0">
          <span className="label-caps block mb-5">Client Feedback</span>
          <h2 className="section-title font-display text-white">
            Traders Who Know
          </h2>
        </div>
      </div>

      <div ref={trackRef} className="no-scrollbar flex gap-5 overflow-x-auto px-8 md:px-12 pb-4" style={{ cursor: 'grab' }}>
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card p-8 flex flex-col justify-between opacity-0">
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ffffff' }} />
              ))}
            </div>

            <blockquote className="font-display italic text-vanta-200 flex-1 mb-8" style={{ fontSize: '18px', lineHeight: 1.6 }}>
              "{t.quote}"
            </blockquote>

            <div className="border-t border-white/[0.06] mb-5" />

            <div>
              <div className="font-sans font-bold text-white text-[13px]">{t.name}</div>
              <div className="font-sans text-vanta-400 text-[11px] mt-0.5 tracking-wide">{t.meta}</div>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-8" />
      </div>
    </section>
  )
}
