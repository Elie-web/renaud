import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const proof = [
  '9 ans d\'atelier',
  'Devis gratuit sous 5 jours',
  'Garantie 5 ans',
  'Bois français massif',
]

export default function Hero() {
  return (
    <section id="top" style={{
      background: 'var(--c-fond)', position: 'relative', overflow: 'hidden',
      padding: 'clamp(124px, 16vh, 188px) var(--px) clamp(48px, 7vh, 88px)',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center',
        }}>
          {/* Texte */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-6)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              <span className="eyebrow eyebrow--dark">Ébéniste · Île-de-France</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              style={{
                fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.9rem, 5.6vw, 5.4rem)', fontWeight: 400,
                lineHeight: 1.02, letterSpacing: '-0.022em', color: 'var(--c-texte)',
                marginBottom: 'var(--sp-6)', maxWidth: '15ch',
              }}
            >
              Le meuble que vous avez en tête, <em style={{ fontStyle: 'italic', color: 'var(--c-or-dim)' }}>fait pour durer.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="lead"
              style={{ maxWidth: '46ch', marginBottom: 'var(--sp-8)' }}
            >
              Mobilier, cuisines, bibliothèques et escaliers sur mesure. Je dessine
              votre projet, je vous le montre en 3D, et je ne commence à fabriquer
              qu'une fois que tout vous convient.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-6)', flexWrap: 'wrap', marginBottom: 'var(--sp-10)' }}
            >
              <a href="#contact" className="btn btn--gold">
                <span>Demander un devis gratuit</span><span className="arrow" />
              </a>
              <a href="#realisations" className="link-arrow" style={{ color: 'var(--c-texte-2)' }}>
                <span>Voir les réalisations</span><span className="arrow" />
              </a>
            </motion.div>

            {/* Preuves */}
            <motion.ul
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3) var(--sp-6)' }}
            >
              {proof.map((p) => (
                <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--c-or-dim)', fontSize: '0.85rem' }}>✓</span>
                  <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.85rem', color: 'var(--c-texte-2)' }}>{p}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="hero-img"
            style={{ position: 'relative' }}
          >
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?auto=format&fit=crop&w=1100&q=82"
                alt="Pièce de mobilier en bois massif en cours de fabrication à l'atelier"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Carte flottante - réassurance */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-badge"
              style={{
                position: 'absolute', bottom: '-22px', left: '-22px',
                background: 'var(--c-fond)', border: '1px solid var(--c-pierre)',
                padding: 'var(--sp-5) var(--sp-6)', boxShadow: 'var(--shadow-sm)', maxWidth: '230px',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: 'var(--c-or)', fontSize: '0.8rem' }}>★</span>)}
              </div>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--c-texte)' }}>
                « Un travail soigné, exactement ce qu'on imaginait. »
              </p>
              <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>
                Sophie L. · Paris 11e
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img { order: -1; max-width: 460px; }
        }
        @media (max-width: 480px) {
          .hero-badge { left: 0 !important; bottom: -16px !important; }
        }
      `}</style>
    </section>
  )
}
