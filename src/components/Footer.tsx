import { Twitter, Instagram, MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'Plans', id: 'plans' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Stats', id: 'stats' },
  { label: 'FAQ', id: 'faq' },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Main footer row */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Brand */}
          <div>
            <div
              className="font-sans font-extrabold text-white tracking-[4px] text-[18px] mb-2"
            >
              VANTA
            </div>
            <div className="font-sans text-vanta-600 text-[11px] tracking-[2px] uppercase">
              Trade Without Limits
            </div>
          </div>

          {/* Nav links */}
          <ul className="flex flex-wrap gap-8">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="nav-link text-vanta-600 hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-vanta-600 hover:text-white transition-colors duration-300"
              aria-label="Twitter / X"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="text-vanta-600 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="text-vanta-600 hover:text-white transition-colors duration-300"
              aria-label="Discord"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-sans text-vanta-600 text-[10px] tracking-[1.5px]">
            © {new Date().getFullYear()} VANTA TRADING LTD. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Risk Disclosure'].map(label => (
              <a
                key={label}
                href="#"
                className="font-sans text-vanta-600 hover:text-vanta-400 text-[10px] tracking-[1.5px] uppercase transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Risk disclosure */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 pb-8">
        <p className="font-sans text-vanta-700 text-[10px] leading-relaxed max-w-3xl">
          Risk Disclaimer: Trading financial instruments carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. VANTA does not provide investment advice. All challenges involve simulated trading environments.
        </p>
      </div>
    </footer>
  )
}
