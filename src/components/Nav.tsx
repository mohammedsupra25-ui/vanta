import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const sectionLinks = [
  { label: 'Plans',        id: 'plans' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Stats',        id: 'stats' },
  { label: 'FAQ',          id: 'faq' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const isScrolled = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )

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

  // Scroll to section — if not on home page, navigate there first
  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      // After navigation React will re-render; use setTimeout to let DOM settle
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none no-underline"
          style={{ letterSpacing: '4px' }}
        >
          VANTA
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="nav-link bg-transparent border-0 p-0">
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/analysis"
              className="nav-link no-underline"
            >
              Analysis
            </Link>
          </li>
        </ul>

        {/* CTA / Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="font-sans text-white/30 text-[10px] tracking-[1px] truncate max-w-[160px]">
                {user.email}
              </span>
              <button
                onClick={() => logout()}
                className="font-sans font-bold text-white/50 border border-white/20 px-5 py-2.5 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:text-white hover:border-white/50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-sans font-bold text-white/60 text-[10px] tracking-[2px] uppercase transition-colors duration-200 hover:text-white no-underline px-4 py-2.5"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-sans font-bold text-white border border-white/40 px-6 py-2.5 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white no-underline"
              >
                Get Access
              </Link>
            </>
          )}
        </div>

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
