import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const woods = [
  { name: 'Chêne',    character: 'Dur, stable, marqué',    desc: 'Des veines franches. Pour tout ce qui doit durer sans entretien.', img: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=700&q=80' },
  { name: 'Noyer',    character: 'Foncé, rare, précieux',  desc: 'Presque chocolat. Pour les pièces où le bois est le sujet.',        img: 'https://images.unsplash.com/photo-1736506159893-22cca29b8018?auto=format&fit=crop&w=700&q=80' },
  { name: 'Frêne',    character: 'Clair, régulier, discret', desc: 'Léger et lumineux. S\'associe bien au métal et au béton.',         img: 'https://images.unsplash.com/photo-1611072337226-1140ab367200?auto=format&fit=crop&w=700&q=80' },
  { name: 'Merisier', character: 'Rosé, chaleureux',       desc: 'Vire à l\'or avec la lumière. Pour les espaces de vie.',            img: 'https://images.unsplash.com/photo-1632199495802-18f7d21f323b?auto=format&fit=crop&w=700&q=80' },
]

export default function Materiaux() {
  return (
    <section id="materiaux" style={{ background: 'var(--c-fond)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)', maxWidth: '40ch' }}>
          <motion.span className="eyebrow eyebrow--dark"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportSettings} transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
            <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
            Les matériaux
          </motion.span>
          <motion.h2 className="h2"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
            style={{ color: 'var(--c-texte)' }}>
            Des bois français, choisis en scierie.
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          className="wood-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px, 2vw, 28px)' }}>
          {woods.map((w) => (
            <motion.div key={w.name} variants={staggerItem}>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', marginBottom: 'var(--sp-4)' }}>
                <img src={w.img} alt={`Bois de ${w.name}`} loading="lazy" decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1, marginBottom: '4px' }}>{w.name}</h3>
              <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-or-dim)', marginBottom: '10px' }}>{w.character}</div>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--c-texte-2)' }}>{w.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .wood-grid { grid-template-columns: repeat(2, 1fr) !important; gap: clamp(20px, 4vw, 32px) !important; } }
        @media (max-width: 440px) { .wood-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  )
}
