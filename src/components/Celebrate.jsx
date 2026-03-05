import { useRef } from 'react'

const DOTS = [
  { color: '#ff3cac', label: 'Gulabi'  },
  { color: '#ffdf00', label: 'Peela'   },
  { color: '#39ff14', label: 'Hara'    },
  { color: '#00f5d4', label: 'Neela'   },
  { color: '#a855f7', label: 'Baigani' },
  { color: '#ff6b35', label: 'Narangi' },
  { color: '#ff073a', label: 'Laal'    },
  { color: '#3a86ff', label: 'Nila'    },
]

export default function Celebrate({ onDotSplash }) {
  const dotRefs = useRef([])

  const handleDotClick = (color, index) => {
    const el = dotRefs.current[index]
    if (!el) return
    const rect = el.getBoundingClientRect()
    onDotSplash(rect.left + rect.width / 2, rect.top + rect.height / 2, color)
    el.style.transform = 'scale(1.5) rotate(-10deg)'
    setTimeout(() => { el.style.transform = '' }, 300)
  }

  return (
    <section className="celebrate-section reveal">
      <div className="rangoli">
        <div className="rangoli-inner" />
        <div className="rangoli-core">🌸</div>
      </div>
      <h2 className="big-wish">Rang Barse! 🌈</h2>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'1.5rem'}}>Click the colors to splash them!</p>
      <div className="color-dots">
        {DOTS.map((dot, i) => (
          <button
            key={dot.label}
            ref={el => dotRefs.current[i] = el}
            className="dot"
            style={{ background: dot.color }}
            title={dot.label}
            onClick={() => handleDotClick(dot.color, i)}
          />
        ))}
      </div>
    </section>
  )
}