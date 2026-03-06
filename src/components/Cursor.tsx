import { useEffect, useRef } from 'react'

export default function Cursor() {
  const hBarRef = useRef<HTMLDivElement>(null)
  const vBarRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const hBar = hBarRef.current
    const vBar = vBarRef.current
    const ring = ringRef.current
    if (!hBar || !vBar || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      hBar.style.left = `${e.clientX}px`
      hBar.style.top = `${e.clientY}px`
      vBar.style.left = `${e.clientX}px`
      vBar.style.top = `${e.clientY}px`
    }

    const enterInteractive = () => {
      hBar.style.width = '22px'
      vBar.style.height = '22px'
      hBar.style.opacity = '0.25'
      vBar.style.opacity = '0.25'
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(255,255,255,0.65)'
      ring.style.background = 'rgba(255,255,255,0.03)'
    }

    const leaveInteractive = () => {
      hBar.style.width = '14px'
      vBar.style.height = '14px'
      hBar.style.opacity = '1'
      vBar.style.opacity = '1'
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(255,255,255,0.35)'
      ring.style.background = 'transparent'
    }

    const animate = () => {
      const lerp = 0.09
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top = `${ringPos.current.y}px`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMouseMove)

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enterInteractive)
        el.addEventListener('mouseleave', leaveInteractive)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  const bar: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    background: '#ffffff',
    transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
    willChange: 'left, top',
  }

  return (
    <>
      {/* Horizontal bar */}
      <div
        ref={hBarRef}
        style={{ ...bar, width: '14px', height: '1px', transform: 'translate(-50%, -50%)' }}
      />
      {/* Vertical bar */}
      <div
        ref={vBarRef}
        style={{ ...bar, width: '1px', height: '14px', transform: 'translate(-50%, -50%)' }}
      />
      {/* Lagging outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.35)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
          willChange: 'left, top',
        }}
      />
    </>
  )
}
