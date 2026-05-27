import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const formation = [
  {
    diplome: 'CAP Ébéniste',
    lieu: 'Lycée des Métiers d\'Art, Coarraze',
  },
  {
    diplome: 'BMA Ébéniste',
    lieu: 'Lycée des Métiers d\'Art, Coarraze',
  },
  {
    diplome: 'DNMADE Mobilier Contemporain',
    lieu: 'École SEPR, Lyon',
  },
]

const qualites = [
  { label: 'Créatif avant tout',              desc: 'Chaque projet part d\'une feuille blanche et d\'une vraie écoute.' },
  { label: 'Minutieux et soucieux du détail', desc: 'Les assemblages, les finitions, les jours entre les portes. Rien n\'est laissé au hasard.' },
  { label: 'Connaisseur des essences',        desc: 'Chêne, noyer, frêne, merisier. Je conseille en fonction du projet, du budget, de la durée.' },
  { label: 'Du croquis au rendu 3D',          desc: 'Je modélise chaque pièce en 3D avant de commencer. Vous voyez exactement ce que vous aurez.' },
]

export default function Manifeste() {
  return (
    <section style={{
      background: 'var(--c-ivoire)',
      padding: 'var(--section-py) var(--px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="manifeste-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px, 7vw, 112px)',
          alignItems: 'start',
        }}>

          {/* Left */}
          <div>
            <motion.span
              className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-6)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Renaud Achard
            </motion.span>

            <motion.h2
              className="h2"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-8)', maxWidth: '22ch' }}
            >
              Ébéniste de formation,
              créateur de métier.
            </motion.h2>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ maxWidth: '46ch', marginBottom: 'var(--sp-10)' }}
            >
              J'ai appris le métier au Lycée des Métiers d'Art de Coarraze, avec un CAP puis un BMA ébéniste. Ensuite, un DNMADE mobilier contemporain à l'école SEPR de Lyon. Ce double parcours, technique et créatif, c'est ce qui me permet de concevoir des pièces justes : solides, bien faites, et qui ont une vraie tête.
            </motion.p>

            {/* Formation */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div style={{
                fontFamily: 'var(--f-sc)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--c-or-dim)',
                marginBottom: 'var(--sp-4)',
              }}>Formation</div>

              {formation.map((f) => (
                <motion.div
                  key={f.diplome}
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    gap: 'var(--sp-5)',
                    alignItems: 'flex-start',
                    paddingBottom: 'var(--sp-5)',
                    borderBottom: '1px solid var(--or-15)',
                    marginBottom: 'var(--sp-5)',
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--c-bois)',
                    flexShrink: 0,
                    marginTop: '7px',
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--f-serif)',
                      fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                      fontWeight: 400,
                      color: 'var(--c-texte)',
                      lineHeight: 1.2,
                      marginBottom: '3px',
                    }}>{f.diplome}</div>
                    <div style={{
                      fontFamily: 'var(--f-sc)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--c-texte-2)',
                    }}>{f.lieu}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — qualités */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{ paddingTop: 'clamp(0px, 4vw, 64px)' }}
          >
            {qualites.map((q) => (
              <motion.div
                key={q.label}
                variants={staggerItem}
                style={{
                  paddingBottom: 'var(--sp-8)',
                  marginBottom: 'var(--sp-8)',
                  borderBottom: '1px solid var(--or-15)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-4)',
                  marginBottom: 'var(--sp-3)',
                }}>
                  <span style={{
                    display: 'block',
                    width: '28px',
                    height: '1px',
                    background: 'var(--c-bois)',
                    flexShrink: 0,
                  }} />
                  <h3 style={{
                    fontFamily: 'var(--f-serif)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    fontWeight: 400,
                    color: 'var(--c-texte)',
                    lineHeight: 1.2,
                  }}>{q.label}</h3>
                </div>
                <p style={{
                  fontFamily: 'var(--f-sans)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'var(--c-texte-2)',
                  paddingLeft: 'calc(28px + var(--sp-4))',
                }}>{q.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .manifeste-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
