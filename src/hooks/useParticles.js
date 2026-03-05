import { useEffect, useRef } from 'react'

const COLORS = ['#ff3cac','#ffdf00','#00f5d4','#a855f7','#ff6b35','#39ff14','#3a86ff','#ff073a']

class PowderParticle {
  constructor(x, y, color, vx, vy, W, H) {
    this.W = W; this.H = H
    this.x = x; this.y = y
    this.color = color || COLORS[Math.floor(Math.random() * COLORS.length)]

    // Random size — mix of tiny dust + chunky clumps
    this.r = Math.random() * 6 + 1

    this.vx = vx
    this.vy = vy

    // Gravity + air resistance
    this.gravity = 0.18
    this.drag    = 0.97

    this.alpha = 1
    this.decay = Math.random() * 0.012 + 0.008

    // Powder spreads and fades into a cloud
    this.blur = Math.random() * 4
    this.life = Math.random() * 120 + 80
  }

  update() {
    this.vx *= this.drag
    this.vy *= this.drag
    this.vy += this.gravity

    this.x += this.vx
    this.y += this.vy

    this.alpha -= this.decay
    this.r     += 0.15   // expands like a powder cloud
    this.life--
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.alpha)

    // Soft powder cloud effect using radial gradient
    const grad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.r
    )
    grad.addColorStop(0,   this.color + 'ff')
    grad.addColorStop(0.4, this.color + 'aa')
    grad.addColorStop(1,   this.color + '00')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export function useParticles(canvasRef) {
  const particlesRef = useRef([])
  const sizeRef      = useRef({ W: 0, H: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      sizeRef.current = { W: canvas.width, H: canvas.height }
    }
    resize()
    window.addEventListener('resize', resize)

    // Ambient floating powder dust
    const interval = setInterval(() => {
      const { W, H } = sizeRef.current
      if (particlesRef.current.length < 80) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        particlesRef.current.push(new PowderParticle(
          Math.random() * W, H + 10, color,
          (Math.random() - 0.5) * 0.8,
          -Math.random() * 1.5 - 0.3,
          W, H
        ))
      }
    }, 200)

    let animId
    const animate = () => {
      const { W, H } = sizeRef.current
      // Semi-transparent clear for motion trail
      ctx.clearRect(0, 0, W, H)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0 && p.alpha > 0)
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx) })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      clearInterval(interval)
      cancelAnimationFrame(animId)
    }
  }, [canvasRef])

  // Powder explosion burst — called on dot click or anywhere
  const burst = (x, y, color = null, count = 60) => {
    const { W, H } = sizeRef.current
    const baseColor = color || COLORS[Math.floor(Math.random() * COLORS.length)]

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const angle = (i / count) * Math.PI * 2
        const speed = Math.random() * 12 + 3

        // Main explosion particles
        particlesRef.current.push(new PowderParticle(
          x, y, baseColor,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 4,
          W, H
        ))

        // Extra dust cloud around explosion center
        if (i % 3 === 0) {
          particlesRef.current.push(new PowderParticle(
            x + (Math.random() - 0.5) * 20,
            y + (Math.random() - 0.5) * 20,
            baseColor,
            (Math.random() - 0.5) * 4,
            -Math.random() * 3,
            W, H
          ))
        }
      }, i * 8)
    }
  }

  // Big color throw — multiple powder explosions across screen
  const throwColors = () => {
    const { W, H } = sizeRef.current

    // Fire 6 powder bombs at random positions
    for (let b = 0; b < 6; b++) {
      setTimeout(() => {
        const x     = Math.random() * W
        const y     = Math.random() * H * 0.6
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]

        for (let i = 0; i < 80; i++) {
          setTimeout(() => {
            const angle = (i / 80) * Math.PI * 2
            const speed = Math.random() * 14 + 4
            particlesRef.current.push(new PowderParticle(
              x, y, color,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed - 5,
              W, H
            ))
          }, i * 6)
        }
      }, b * 200)
    }
  }

  return { burst, throwColors }
}