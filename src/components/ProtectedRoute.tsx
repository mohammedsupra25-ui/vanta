import { Navigate } from 'react-router-dom'
import { useUserPlan } from '../hooks/useUserPlan'

interface Props {
  requiredPlan: 'pro'
  children: React.ReactNode
}

export default function ProtectedRoute({ requiredPlan, children }: Props) {
  const { user, isLoading, isPro } = useUserPlan()

  if (isLoading) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            className="w-5 h-5 border border-white/20 border-t-white/80 rounded-full animate-spin"
            style={{ animationDuration: '0.9s' }}
          />
          <span className="font-sans text-white/30 text-[10px] tracking-[3px] uppercase">Loading</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredPlan === 'pro' && !isPro) {
    return (
      <Navigate
        to="/plans"
        state={{ message: 'This content requires a Pro subscription' }}
        replace
      />
    )
  }

  return <>{children}</>
}
