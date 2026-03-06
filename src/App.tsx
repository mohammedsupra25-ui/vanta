import { useLenis } from './hooks/useLenis'
import { useMagneticButtons } from './hooks/useMagneticButtons'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Stats from './components/Stats'
import Plans from './components/Plans'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FooterCTA from './components/FooterCTA'
import Footer from './components/Footer'

function App() {
  useLenis()
  useMagneticButtons()

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
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

export default App
