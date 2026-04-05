import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [mobileOpen, setMobileOpen] = useState(false)

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
        nav.style.background = 'rgba(0,0,0,0.8)'
        nav.style.backdropFilter = 'blur(24px)'
        ;(nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'blur(24px)'
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.03)'
        nav.style.height = '64px'
      } else if (window.scrollY <= 50 && isScrolled.current) {
        isScrolled.current = false
        nav.style.background = 'transparent'
        nav.style.backdropFilter = 'none'
        ;(nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'none'
        nav.style.borderBottom = 'none'
        nav.style.height = '72px'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/#' + id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location])

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link
            to="/"
            className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none no-underline"
            style={{ letterSpacing: '4px' }}
          >
            VANTA
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-10">
            {sectionLinks.map((link) => (
              <li key={link.id}>
                <button onClick={() => scrollTo(link.id)} className="nav-link bg-transparent border-0 p-0">
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link to="/analysis" className="nav-link no-underline">Analysis</Link>
            </li>
            <li>
              <Link to="/education" className="nav-link no-underline">Education</Link>
            </li>
          </ul>

          {/* Desktop CTA / Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="font-sans text-white/30 text-[10px] tracking-[1px] truncate max-w-[160px]">
                  {user.email}
                </span>
                <button
                  onClick={async () => { await logout(); navigate('/') }}
                  className="font-sans font-bold text-white/50 border border-white/20 px-5 py-2.5 text-[10px] tracking-[2px] uppercase transition-all duration-300 hover:text-luxury-gold hover:border-luxury-gold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-sans font-bold text-white/60 text-[10px] tracking-[2px] uppercase transition-colors duration-200 hover:text-luxury-gold no-underline px-4 py-2.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary btn-gold !px-6 !py-2.5 !text-[10px] no-underline"
                >
                  Get Access
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-white/60" />
            <span className="block w-4 h-px bg-white/60" />
            <span className="block w-6 h-px bg-white/60" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Sidebar Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] z-[200] bg-[#050505] border-l border-white/10 flex flex-col pt-8 pb-12 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] md:hidden"
            >
              {/* Header row in sidebar */}
              <div className="flex items-center justify-between mb-12 px-8">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-sans font-extrabold text-white tracking-[4px] text-[16px] no-underline"
                >
                  VANTA
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} className="text-white/60" />
                </button>
              </div>

              {/* Section links */}
              <nav className="flex flex-col gap-2 flex-1 px-8">
                {sectionLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left font-display text-2xl text-white/70 hover:text-luxury-gold transition-colors py-3 border-0 bg-transparent group flex items-center gap-3"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-luxury-gold transition-all duration-300"></span>
                    {link.label}
                  </button>
                ))}
                
                <div className="h-px bg-white/5 my-4" />

                <Link
                  to="/analysis"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-white/70 hover:text-luxury-gold transition-colors py-3 no-underline group flex items-center gap-3"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-luxury-gold transition-all duration-300"></span>
                  Analysis
                </Link>
                <Link
                  to="/education"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-white/70 hover:text-luxury-gold transition-colors py-3 no-underline group flex items-center gap-3"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-luxury-gold transition-all duration-300"></span>
                  Education
                </Link>
              </nav>

              {/* Auth section at bottom */}
              <div className="border-t border-white/10 pt-8 px-8">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span className="font-sans text-white/20 text-[9px] uppercase tracking-[2px] mb-1">Authenticated as</span>
                      <span className="font-sans text-white/60 text-[11px] tracking-[1px] truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={async () => { await logout(); navigate('/'); setMobileOpen(false) }}
                      className="font-sans font-bold text-white/40 border border-white/10 px-6 py-3 text-[10px] tracking-[2px] uppercase hover:text-luxury-gold hover:border-luxury-gold transition-all text-center rounded-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="font-sans font-bold text-white/60 text-[10px] tracking-[2px] uppercase no-underline py-4 text-center hover:text-luxury-gold transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="font-sans font-bold text-black border border-luxury-gold bg-luxury-gold px-6 py-4 text-[10px] tracking-[2px] uppercase no-underline text-center hover:bg-transparent hover:text-luxury-gold transition-all shadow-[0_4px_20px_rgba(212,175,55,0.2)] rounded-sm"
                    >
                      Get Pro Access
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

