import { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Particles from '@tsparticles/react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import { ChevronDown } from 'lucide-react'
import FloatingSignal from './FloatingSignal'

const particlesOptions = {
  background: { color: { value: 'transparent' } },
  particles: {
    number: { value: 120, density: { enable: true } },
    color: { value: '#D4AF37' },
    opacity: {
      value: 0.45,
      random: { enable: true, minimumValue: 0.15 },
    },
    size: { value: { min: 0.5, max: 1.8 } },
    links: {
      enable: true,
      distance: 120,
      color: '#D4AF37',
      opacity: 0.15,
      width: 0.7,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'out' as const },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' as const },
      onClick: { enable: true, mode: 'push' as const },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.25 } },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
}

export default function Hero() {
  const [engineInit, setEngineInit] = useState(false)
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setEngineInit(true))
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    if (particlesRef.current) {
      gsap.fromTo(particlesRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.1, ease: 'power2.out' }
      )
    }
    if (labelRef.current) {
      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.4)
    }
    if (line1Ref.current) {
      tl.fromTo(line1Ref.current.querySelectorAll('.clip-reveal-inner'),
        { y: '110%', rotationX: -20, opacity: 0 }, { y: '0%', rotationX: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.1 }, 0.65)
    }
    if (line2Ref.current) {
      tl.fromTo(line2Ref.current.querySelectorAll('.clip-reveal-inner'),
        { y: '110%', rotationX: -20, opacity: 0 }, { y: '0%', rotationX: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.1 }, 0.75)
    }
    if (subRef.current) {
      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.2)
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.4)
    }
    if (scrollRef.current) {
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.7)
    }
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div ref={particlesRef} className="absolute inset-0 opacity-0" style={{ zIndex: 0 }}>
        <div className="ambient-glow"></div>
        {engineInit && (
          <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesOptions} />
        )}
      </div>

      {/* Floating Signals */}
      {/* Pushed further out to the edges and hidden on screens smaller than large (1024px) to prevent overlap */}
      <div className="hidden lg:block">
        <FloatingSignal
          asset="USTEC"
          signalType="LONG"
          entry="18,230.50"
          target="18,500.00"
          profit="+1.5%"
          delay={0.2}
          duration={7}
          position={{ top: '15%', left: '3%' }}
        />
        <FloatingSignal
          asset="EURUSD"
          signalType="SHORT"
          entry="1.0850"
          target="1.0720"
          profit="+1.2%"
          delay={1.5}
          duration={8}
          position={{ top: '25%', right: '3%' }}
        />
        <FloatingSignal
          asset="US30"
          signalType="LONG"
          entry="38,145.80"
          target="38,562.50"
          profit="+1.1%"
          delay={0.8}
          duration={6}
          position={{ bottom: '20%', left: '4%' }}
        />
        <FloatingSignal
          asset="XAUUSD"
          signalType="LONG"
          entry="2,340.10"
          target="2,385.00"
          profit="+1.9%"
          delay={2.1}
          duration={9}
          position={{ bottom: '25%', right: '4%' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: '-40px' }}>
        <div ref={labelRef} className="label-caps mb-10 opacity-0 relative">
          <span className="absolute -inset-2 bg-luxury-gold/10 blur-xl rounded-full z-0"></span>
          <span className="relative z-10 text-luxury-gold">Precision Market Analysis</span>
        </div>

        <div className="flex flex-col items-center">
          <div ref={line1Ref} className="overflow-hidden">
            <div className="hero-headline font-display font-light italic text-white">
              <span className="clip-reveal-inner">See What</span>
            </div>
          </div>
          <div
            ref={line2Ref}
            className="overflow-hidden"
            style={{ marginLeft: 'clamp(20px, 4vw, 80px)', marginTop: '-10px' }}
          >
            <div className="hero-headline font-display font-semibold text-white">
              <span className="clip-reveal-inner">Others</span>
              &nbsp;
              <span className="clip-reveal-inner">Miss</span>
            </div>
          </div>
        </div>

        <p
          ref={subRef}
          className="mt-10 font-sans font-normal text-vanta-400 max-w-[500px] leading-relaxed opacity-0"
          style={{ fontSize: '17px' }}
        >
          Institutional-grade market analysis. Delivered before the move. Built for traders who demand an edge.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center gap-4 opacity-0 relative z-20">
          <button
            className="btn-primary flex items-center gap-2 group transition-all duration-300 relative overflow-hidden"
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] translate-x-[-150%] animate-shimmer group-hover:animate-none"></span>
            <span className="relative z-10 flex items-center gap-2">
              Get The Edge
              <ChevronDown size={14} className="group-hover:translate-x-1 group-hover:text-black transition-transform" style={{ transform: 'rotate(-90deg)' }}/>
            </span>
          </button>
          <button
            className="btn-secondary group transition-all duration-300"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
          </button>
          <Link
            to="/analysis"
            className="font-sans text-white/40 text-[11px] tracking-[2px] uppercase hover:text-white transition-colors duration-300 no-underline"
          >
            Explore Analysis →
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2"
      >
        <span className="label-caps" style={{ fontSize: '9px', letterSpacing: '2px' }}>Scroll</span>
        <ChevronDown size={16} className="chevron-bounce text-vanta-600" />
      </div>
    </section>
  )
}
