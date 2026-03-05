import { useRef, useEffect } from 'react'
import { useParticles }  from './hooks/useParticles'
import Hero      from './components/Hero'
import Celebrate from './components/Celebrate'
import Wishes    from './components/Wishes'
import Footer    from './components/Footer'

export default function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const { burst, throwColors } = useParticles(canvasRef)

  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const click = e => {
      const tag = e.target.tagName.toLowerCase()
      if (tag === 'button' || tag === 'a') return
      burst(e.clientX, e.clientY, null, 20)
    }
    window.addEventListener('click', click)
    return () => window.removeEventListener('click', click)
  }, [burst])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const t = setTimeout(throwColors, 800)
    return () => clearTimeout(t)
  }, [throwColors])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <canvas id="particle-canvas" ref={canvasRef} />
      <Hero      onThrowColors={throwColors} />
      <Celebrate onDotSplash={burst} />
      <Wishes    />
      <Footer    onThrowColors={throwColors} />
    </>
  )
}