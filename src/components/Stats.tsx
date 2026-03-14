import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHARS = '0123456789'

function scrambleThen(el: HTMLSpanElement, finalText: string, duration = 1800) {
  const start = performance.now()
  let frame: number

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const revealed = Math.floor(progress * finalText.length)
    let display = ''
    for (let i = 0; i < finalText.length; i++) {
      const char = finalText[i]
      if (i < revealed || !/\d/.test(char)) {
        display += char
      } else {
        display += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
    }
    el.textContent = display
    if (progress < 1) frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}

const stats = [
  { final: '87%',   label: 'Accuracy Rate' },
  { final: '3.2K+', label: 'Analyses Published' },
  { final: '12',    label: 'Markets Covered' },
  { final: '4.8K',  label: 'Active Subscribers' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([])

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

    numRefs.current.forEach((el, i) => {
      if (!el) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => scrambleThen(el, stats[i].final),
      })
      return () => st.kill()
    })

    const cards = sectionRef.current?.querySelectorAll('.stat-card')
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="section-padding" style={{ background: '#000000' }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        <div ref={titleRef} className="mb-20 opacity-0">
          <span className="label-caps">By the Numbers</span>
        </div>

        <div className="bento-grid">
          {stats.map((s, i) => (
            <div key={i} className="bento-card spotlight-card col-span-12 md:col-span-3 opacity-0 stat-card group">
              <div className="mb-8" style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.15)', transition: 'background 0.3s ease' }} />
              <div className="mini-stat-label">{s.label}</div>
              <div className="mini-stat-value mt-auto">
                <span ref={el => { numRefs.current[i] = el }}>{s.final}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
