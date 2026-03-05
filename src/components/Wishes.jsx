const WISHES = [
  { emoji:'🌸', color:'#ff3cac', text:'"May the colors of Holi fill your life with happiness and your heart with love. Wishing you a very colorful and joyful Holi!"', author:'— With Gulabi Love 💗' },
  { emoji:'🌻', color:'#ffdf00', text:'"As you splash colors, may God splash blessings, happiness, and prosperity all over you. Happy Holi to you and your family!"', author:'— Sunshine Wishes ☀️' },
  { emoji:'🎊', color:'#00f5d4', text:'"Let this Holi wash away all the negativity in your life and fill it with the vibrant colors of love, peace, and prosperity!"', author:'— Neela Aakash 🌊' },
  { emoji:'🦋', color:'#a855f7', text:'"May your life be as colorful as the colors you play with on Holi. Stay blessed, stay joyful, and keep spreading happiness!"', author:'— Purple Dreams 💜' },
  { emoji:'🔥', color:'#ff6b35', text:'"Holi is the day to forget all worries and celebrate life in full color. May every moment of today be magical and memorable!"', author:'— Narangi Spirit 🍊' },
  { emoji:'🌿', color:'#39ff14', text:'"Like the spring that brings new life, may this Holi bring new beginnings, fresh hopes, and beautiful memories to cherish forever!"', author:'— Hara Basant 🌱' },
]

export default function Wishes() {
  return (
    <section className="wishes-section" id="wishes">
      <h2 className="section-title reveal">🌺 Holi Wishes 🌺</h2>
      <p className="section-desc reveal">Heartfelt messages from heart to heart</p>
      <div className="wishes-grid">
        {WISHES.map((w, i) => (
          <div key={i} className="wish-card reveal" style={{'--card-color': w.color}}>
            <span className="wish-emoji">{w.emoji}</span>
            <p className="wish-text">{w.text}</p>
            <p className="wish-author">{w.author}</p>
          </div>
        ))}
      </div>
    </section>
  )
}