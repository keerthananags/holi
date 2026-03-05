export default function Footer({ onThrowColors }) {
  return (
    <>
      <section className="celebrate-section reveal" style={{paddingBottom:'2rem'}}>
        <h2 className="big-wish" style={{fontSize:'clamp(1.8rem,5vw,3.5rem)'}}>
          Bura Na Mano, Holi Hai! 🎭
        </h2>
        <p style={{color:'rgba(255,255,255,0.55)',maxWidth:500,margin:'0 auto 2rem',lineHeight:1.8}}>
          Share the love, share the colors. May every hue of life bring you closer to the people you love. 💕
        </p>
        <button className="btn btn-primary" onClick={onThrowColors} style={{fontSize:'1.1rem',padding:'1rem 2.5rem'}}>
          🎆 Celebrate Now!
        </button>
      </section>
      <footer>
        <p>Made with <span style={{color:'#ff3cac'}}>♥</span> and a lot of colors · Happy Holi 2025 🌈</p>
        <p style={{marginTop:'0.5rem',fontSize:'0.75rem'}}>Rang de Basanti · जीवन रंगीन हो</p>
      </footer>
    </>
  )
}