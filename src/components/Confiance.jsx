import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const garanties = [
  {
    icon: '◎',
    title: '5 ans de garantie',
    desc: 'Sur tous les assemblages et finitions. Je reste responsable de ce que je crée.',
  },
  {
    icon: '◈',
    title: 'Devis précis, sans surprise',
    desc: 'Le prix convenu est le prix final. Aucune ligne cachée en fin de chantier.',
  },
  {
    icon: '◉',
    title: 'Bois français certifiés',
    desc: 'Chêne, noyer, frêne. Sélectionnés en scierie, pas dans un catalogue. Pas de panneaux de particules.',
  },
  {
    icon: '◐',
    title: 'Artisan diplômé',
    desc: 'BMA ébéniste (Lycée des Métiers d\'Art, Coarraze) et DNMADE Mobilier Contemporain (Lyon SEPR). Références disponibles.',
  },
]

const logos = [
  { label: 'BMA\nÉbéniste', sub: 'Lycée des Métiers d\'Art, Coarraze' },
  { label: 'DNMADE\nMobilier', sub: 'Lyon SEPR' },
  { label: 'Bois\nFrançais', sub: 'Sélectionnés en scierie' },
  { label: '20 ans\nd\'atelier', sub: 'Sur mesure & agencement' },
]

export default function Confiance() {
  return (
    <section style={{
      background: 'var(--c-brun)',
      padding: 'var(--section-py) var(--px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(48px, 7vw, 96px)',
        }}>
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
          >
            <span className="gold-line" />
            Engagements
            <span className="gold-line" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9 }}
            style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
              fontWeight: 400,
              color: 'var(--c-ivoire)',
              lineHeight: 1.1,
            }}
          >
            Ce que je garantis
            <br />
            <em style={{ color: 'var(--c-or)' }}>sur chaque projet.</em>
          </motion.h2>
        </div>

        {/* Garanties grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--sp-3)',
            marginBottom: 'clamp(48px, 7vw, 80px)',
          }}
          className="conf-grid"
        >
          {garanties.map((g) => (
            <motion.div
              key={g.title}
              variants={staggerItem}
              style={{
                padding: 'clamp(24px, 3vw, 40px)',
                border: '1px solid var(--or-15)',
                borderRadius: 'var(--r-sm)',
                background: 'rgba(196,160,64,0.03)',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              whileHover={{
                borderColor: 'rgba(196,160,64,0.3)',
                backgroundColor: 'rgba(196,160,64,0.07)',
              }}
            >
              <div style={{
                fontSize: '1.4rem',
                color: 'var(--c-or)',
                marginBottom: 'var(--sp-5)',
                display: 'block',
              }}>{g.icon}</div>
              <h3 style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                fontWeight: 400,
                color: 'var(--c-ivoire)',
                marginBottom: 'var(--sp-3)',
                lineHeight: 1.25,
              }}>{g.title}</h3>
              <p style={{
                fontFamily: 'var(--f-sans)',
                fontSize: '0.88rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(245,249,247,0.62)',
              }}>{g.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            borderTop: '1px solid var(--or-15)',
            borderBottom: '1px solid var(--or-15)',
            padding: 'var(--sp-8) 0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 'var(--sp-6)',
            flexWrap: 'wrap',
          }}
        >
          {logos.map((l) => (
            <div key={l.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
                fontWeight: 400,
                color: 'var(--c-or)',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
                marginBottom: '4px',
              }}>{l.label}</div>
              <div style={{
                fontFamily: 'var(--f-sc)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(245,249,247,0.42)',
                textTransform: 'uppercase',
              }}>{l.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .conf-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .conf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}




