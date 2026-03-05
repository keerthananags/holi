export default function Hero({ onThrowColors }) {
  return (
    <section className="hero">
      <div className="gulal-blob blob1" />
      <div className="gulal-blob blob2" />
      <div className="gulal-blob blob3" />
      <div className="gulal-blob blob4" />
      <div className="hero-badge">🌸 Festival of Colors 2025 🌸</div>
      <h1 className="hero-title">Happy Holi!</h1>
      <p className="hero-sub">
        Paint the world with <span style={{color:'#ffdf00',fontWeight:600}}>love &amp; colors</span>
      </p>
      <p className="hero-msg">
        May this Holi bring endless joy, vibrant colors, and beautiful moments into your life.
        Let every color tell a story of love, happiness, and togetherness. 🎨
      </p>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={onThrowColors}>🎨 Throw Colors!</button>
        <a className="btn btn-secondary" href="#wishes">✉️ View Wishes</a>
      </div>
    </section>
  )
}