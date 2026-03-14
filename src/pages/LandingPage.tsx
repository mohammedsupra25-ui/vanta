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

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Plans />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}
