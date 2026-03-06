import { useEffect } from 'react'

export function useMagneticButtons() {
  useEffect(() => {
    const RADIUS = 80   // px — how close cursor must be to activate
    const STRENGTH = 0.35 // how far the button moves (0 = none, 1 = full)

    const buttons = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary')

    const handlers: Array<{ el: HTMLElement; onMove: (e: MouseEvent) => void; onLeave: (e: MouseEvent) => void }> = []

    buttons.forEach(el => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < RADIUS) {
          const tx = dx * STRENGTH
          const ty = dy * STRENGTH
          el.style.transform = `translate(${tx}px, ${ty}px)`
          el.style.transition = 'transform 0.15s ease'
        }
      }

      const onLeave = () => {
        el.style.transform = 'translate(0,0)'
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }

      window.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      handlers.push({ el, onMove, onLeave })
    })

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        window.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])
}
