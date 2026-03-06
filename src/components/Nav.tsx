import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Plans',        id: 'plans' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Stats',        id: 'stats' },
  { label: 'FAQ',          id: 'faq' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const isScrolled = useRef(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Animate nav in on load
    gsap.fromTo(nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )

    // Scroll background effect
    const handleScroll = () => {
      if (!nav) return
      if (window.scrollY > 50 && !isScrolled.current) {
        isScrolled.current = true
        nav.style.background = 'rgba(0,0,0,0.85)'
        nav.style.backdropFilter = 'blur(20px)'
        ;(nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'blur(20px)'
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)'
      } else if (window.scrollY <= 50 && isScrolled.current) {
        isScrolled.current = false
        nav.style.background = 'transparent'
        nav.style.backdropFilter = 'none'
        ;(nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'none'
        nav.style.borderBottom = 'none'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <div
          className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none"
          style={{ letterSpacing: '4px' }}
        >
          VANTA
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="nav-link bg-transparent border-0 p-0">
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('plans')}
          className="hidden md:block font-sans font-bold text-white border border-white/40 px-7 py-3 text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
        >
          Get The Edge
        </button>

        {/* Mobile menu indicator */}
        <button className="md:hidden flex flex-col gap-[5px] p-2">
          <span className="block w-6 h-px bg-white/60" />
          <span className="block w-4 h-px bg-white/60" />
          <span className="block w-6 h-px bg-white/60" />
        </button>
      </div>
    </nav>
  )
}
