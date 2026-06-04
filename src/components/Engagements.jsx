import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const points = [
  { title: 'Devis gratuit et fixe', desc: 'Le prix annoncé est le prix final. Aucune ligne qui apparaît en fin de chantier.' },
  { title: 'Vu en 3D avant de fabriquer', desc: 'Vous voyez le résultat (formes, bois, finitions) avant la première planche coupée.' },
  { title: 'Garantie 5 ans', desc: 'Sur les assemblages et finitions. Si quelque chose bouge, je reviens le reprendre.' },
  { title: 'Bois français massif', desc: 'Choisi en scierie. Pas de panneaux de particules. Des pièces qui se transmettent.' },
]

const credentials = [
  { k: 'BMA', v: 'Ébéniste diplômé' },
  { k: 'DNMADE', v: 'Mobilier contemporain' },
  { k: '9 ans', v: "D'atelier" },
  { k: '+300', v: 'Pièces livrées' },
]

export default function Engagements() {
  return (
    <section style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="eng-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportSettings}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="eng-img" style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=82"
                alt="Artisan ébéniste au travail dans son atelier" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Texte */}
          <div>
            <motion.span className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportSettings} transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Pourquoi me confier votre projet
            </motion.span>
            <motion.h2 className="h2"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-8)', maxWidth: '18ch' }}>
              Du sur-mesure, sans mauvaise surprise.
            </motion.h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}>
              {points.map((p) => (
                <motion.div key={p.title} variants={staggerItem}
                  style={{ display: 'flex', gap: 'var(--sp-4)', padding: 'var(--sp-5) 0', borderTop: '1px solid var(--c-pierre)' }}>
                  <span style={{ color: 'var(--c-or-dim)', fontSize: '1.05rem', flexShrink: 0, lineHeight: 1.4 }} aria-hidden="true">✓</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)', fontWeight: 400, color: 'var(--c-texte)', marginBottom: '6px', lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--c-texte-2)', maxWidth: '46ch' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Crédibilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.8 }}
          className="eng-creds"
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-8)',
            borderTop: '1px solid var(--c-pierre)', marginTop: 'clamp(40px, 5vw, 72px)', paddingTop: 'clamp(32px, 4vw, 48px)' }}>
          {credentials.map((c) => (
            <div key={c.k}>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.01em' }}>{c.k}</div>
              <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>{c.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .eng-grid { grid-template-columns: 1fr !important; }
          .eng-img { max-width: 440px; }
        }
      `}</style>
    </section>
  )
}
