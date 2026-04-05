import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/analysis', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter')
      return
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter')
      return
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number')
      return
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError('Password must contain at least one special character')
      return
    }

    setLoading(true)
    const { error } = await signup(email, password)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div
        style={{ background: '#000000', minHeight: '100vh' }}
        className="flex flex-col items-center justify-center px-6 text-center"
      >
        <Link to="/" className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none no-underline mb-16">
          VANTA
        </Link>
        <p className="font-sans text-white/30 text-[10px] tracking-[3px] uppercase mb-4">Account Created</p>
        <h1 className="font-display italic text-white mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300 }}>
          Check your email
        </h1>
        <p className="font-sans text-white/40 text-[14px] max-w-[360px] leading-relaxed">
          We sent a confirmation link to <span className="text-white">{email}</span>. Click it to activate your account.
        </p>
        <Link to="/login" className="mt-10 font-sans font-bold text-[11px] tracking-[2px] uppercase text-white/50 hover:text-white transition-colors no-underline">
          Back to Login →
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{ background: '#000000', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6"
    >
      {/* Wordmark */}
      <Link
        to="/"
        className="font-sans font-extrabold text-white tracking-[4px] text-[18px] select-none no-underline mb-16"
      >
        VANTA
      </Link>

      <div ref={cardRef} style={{ opacity: 0, width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-sans text-white/30 text-[10px] tracking-[3px] uppercase mb-4">
            Get Started
          </p>
          <h1
            className="font-display italic text-white"
            style={{ fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 300, lineHeight: 1 }}
          >
            Create account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-sans text-white/40 text-[10px] tracking-[2px] uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="font-sans text-white text-[14px] bg-transparent px-4 py-3 outline-none transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-white/40 text-[10px] tracking-[2px] uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="font-sans text-white text-[14px] bg-transparent px-4 py-3 outline-none transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              placeholder="Min. 8 chars, upper + lower + number + special"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-white/40 text-[10px] tracking-[2px] uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              className="font-sans text-white text-[14px] bg-transparent px-4 py-3 outline-none transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              placeholder="Repeat password"
            />
          </div>

          {error && (
            <p className="font-sans text-white/60 text-[12px] tracking-wide py-2 px-3"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 font-sans font-bold text-[11px] tracking-[2.5px] uppercase py-4 transition-all duration-300"
            style={{
              background: loading ? 'transparent' : '#ffffff',
              color: loading ? 'rgba(255,255,255,0.3)' : '#000000',
              border: loading ? '1px solid rgba(255,255,255,0.15)' : '1px solid #ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-sans text-white/20 text-[10px] tracking-[2px]">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Login link */}
        <p className="text-center font-sans text-white/30 text-[12px]">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-white/70 transition-colors duration-200 no-underline font-bold tracking-wide">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
