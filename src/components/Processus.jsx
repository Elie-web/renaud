import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const steps = [
  {
    n: '01',
    title: 'La rencontre',
    desc: 'Une conversation, chez vous ou à l\'atelier. Je regarde l\'espace, j\'écoute ce que vous avez en tête. Je ne dessine rien avant d\'avoir compris.',
    icon: '◌',
  },
  {
    n: '02',
    title: 'La conception',
    desc: 'Croquis à la main d\'abord, puis un rendu 3D réaliste pour que vous voyiez exactement ce que vous aurez. On choisit les essences ensemble, on arrête les finitions. Rien n\'est commandé avant votre accord.',
    icon: '△',
  },
  {
    n: '03',
    title: 'La fabrication',
    desc: 'Tout se passe à l\'atelier. À la main pour les assemblages, à la machine pour les débits. Je n\'externalise pas. Aucune pièce ne part avant d\'être juste.',
    icon: '□',
  },
  {
    n: '04',
    title: 'La livraison',
    desc: 'Je livre et j\'installe moi-même. Je vérifie l\'aplomb, les jours, les finitions. Et je suis joignable si quelque chose n\'est pas parfait après.',
    icon: '◇',
  },
]

export default function Processus() {
  return (
    <section style={{
      background: 'var(--c-ivoire)',
      padding: 'var(--section-py) var(--px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(48px, 7vw, 96px)',
          flexWrap: 'wrap',
          gap: 'var(--sp-8)',
        }}>
          <div>
            <motion.span
              className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Comment je travaille
            </motion.span>
            <motion.h2
              className="h2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)', maxWidth: '20ch' }}
            >
              De l'idée à la pièce finie.
            </motion.h2>
          </div>
        </div>

        {/* Steps grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--sp-3)',
            position: 'relative',
          }}
          className="steps-grid"
        >
          {/* Connecting line */}
          <motion.div
            className="steps-connector"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'absolute',
              top: '28px',
              left: 'calc(12.5% + 24px)',
              right: 'calc(12.5% + 24px)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--c-or-dim), var(--c-bleu), var(--c-or-dim))',
              transformOrigin: 'left center',
              zIndex: 0,
            }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={staggerItem}
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Number circle */}
              <div style={{
                width: '56px',
                height: '56px',
                border: '1px solid var(--c-bleu)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bleu-15)',
                marginBottom: 'var(--sp-6)',
              }}>
                <span style={{
                  fontFamily: 'var(--f-sc)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--c-bleu)',
                }}>{s.n}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                fontWeight: 400,
                color: 'var(--c-texte)',
                marginBottom: 'var(--sp-4)',
                lineHeight: 1.2,
              }}>{s.title}</h3>

              <p style={{
                fontFamily: 'var(--f-sans)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--c-texte-2)',
              }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid > div:nth-child(1) { display: none; }
          .steps-connector { display: none; }
        }
        @media (max-width: 560px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

