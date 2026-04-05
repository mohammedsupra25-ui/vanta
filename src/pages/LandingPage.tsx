import { useEffect, useState } from 'react'
import { useLenis } from '../hooks/useLenis'
import { useMagneticButtons } from '../hooks/useMagneticButtons'
import { useSpotlightEffect } from '../hooks/useSpotlightEffect'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Stats from '../components/Stats'
import Plans from '../components/Plans'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  useLenis()
  useMagneticButtons()
  useSpotlightEffect()

  const [showStickyCta, setShowStickyCta] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Plans />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />

      {/* Mobile sticky CTA — visible after scrolling past hero */}
      {showStickyCta && (
        <div className="mobile-sticky-cta md:hidden">
          <button
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full font-sans font-bold text-black bg-luxury-gold text-[10px] tracking-[2px] uppercase py-3.5 transition-all hover:bg-luxury-gold-light"
          >
            View Pro Access — $49/mo
          </button>
        </div>
      )}
    </>
  )
}
