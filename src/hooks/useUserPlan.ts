import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

export type Plan = 'free' | 'pro'

export interface UserPlanState {
  user: User | null
  plan: Plan
  isLoading: boolean
  isPro: boolean
  isFree: boolean
}

// Module-level cache — shared across all hook instances, invalidated on auth change
let _cache: { userId: string; plan: Plan } | null = null

export function useUserPlan(): UserPlanState {
  const [state, setState] = useState<Omit<UserPlanState, 'isPro' | 'isFree'>>({
    user: null,
    plan: 'free',
    isLoading: true,
  })

  useEffect(() => {
    const fetchPlan = async (u: User | null) => {
      if (!u) {
        _cache = null
        setState({ user: null, plan: 'free', isLoading: false })
        return
      }

      // Return cached result if same user
      if (_cache?.userId === u.id) {
        setState({ user: u, plan: _cache.plan, isLoading: false })
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', u.id)
        .single()

      const plan: Plan = profile?.plan === 'pro' ? 'pro' : 'free'
      _cache = { userId: u.id, plan }
      setState({ user: u, plan, isLoading: false })
    }

    supabase.auth.getUser().then(({ data: { user } }) => fetchPlan(user ?? null))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      _cache = null // Invalidate on every auth change
      fetchPlan(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    ...state,
    isPro: state.plan === 'pro',
    isFree: state.plan === 'free',
  }
}
