import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'What markets do you cover?',
    a: 'We cover 12 markets across major asset classes: Forex (majors and select minors), US and European equity indices, gold, silver, crude oil, and Bitcoin. Each analysis specifies the exact instrument, timeframe, and context so nothing is ambiguous.',
  },
  {
    q: 'How is the analysis delivered?',
    a: 'Analysis is published directly to your subscriber dashboard and pushed via Discord. Core and Edge plans receive scheduled reports; Institutional subscribers also receive real-time updates and direct messaging access when conditions change intraday.',
  },
  {
    q: 'What does your accuracy rate actually mean?',
    a: 'Our 87% accuracy rate measures directional bias — whether the market moved in the direction we identified before the session. We track this transparently with a public log. It is not a guarantee of profitability; execution, position sizing, and risk management remain your responsibility.',
  },
  {
    q: 'Do you provide specific entry and exit levels?',
    a: 'Yes. Every analysis includes a clear bias (bullish/bearish/neutral), key structural levels, entry zones, initial targets, and invalidation points. We do not give vague "watch this level" calls — each report is designed to be actionable.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. VANTA provides market analysis and educational research. We are not a licensed financial advisor and do not manage money. All trading decisions and their consequences are solely yours. Past analytical accuracy does not guarantee future results.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. Cancel anytime from your dashboard — no questions asked, no cancellation fees. Your access continues until the end of the billing period. We believe our work speaks for itself and have no interest in locking you in.',
  },
  {
    q: 'What is the Institutional tier for?',
    a: 'The Institutional tier is for serious traders who need more than a daily report. It includes real-time updates when market structure changes, two 1-on-1 sessions per month, unlimited custom analysis requests, and priority Discord access with sub-12-hour response times.',
  },
  {
    q: 'How long have you been doing this?',
    a: 'VANTA has been producing market analysis since 2017. Over eight years we have built and refined a methodology rooted in market structure, order flow, and institutional behaviour — the same framework used across all tiers, at every level of subscription.',
  },
]

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item">
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={() => setOpen(prev => !prev)}
      >
        <span
          className="font-sans font-medium text-white group-hover:text-vanta-200 transition-colors duration-200 pr-8"
          style={{ fontSize: '15px' }}
        >
          {faq.q}
        </span>
        <span className="shrink-0 text-vanta-400 transition-transform duration-300">
          {open ? <X size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-sans text-vanta-400 leading-relaxed pb-6"
              style={{ fontSize: '14px', lineHeight: 1.8 }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }

    if (listRef.current) {
      gsap.fromTo(listRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-padding"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[900px] mx-auto px-8 md:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-16 opacity-0">
          <span className="label-caps block mb-5">FAQ</span>
          <h2 className="section-title font-display text-white">
            Common Questions
          </h2>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="opacity-0">
          <div
            className="border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
