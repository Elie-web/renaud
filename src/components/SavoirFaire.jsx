import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const expertises = [
  {
    n: '01',
    title: 'Mobilier sur mesure',
    desc: 'Tables, bibliothèques, armoires, buffets. On part de vos mesures, de vos contraintes, et on trouve ce qui marche dans votre espace.',
  },
  {
    n: '02',
    title: 'Agencement cuisine',
    desc: 'Une cuisine sur mesure, c\'est six mois de vie quotidienne dessinés à l\'avance. Je prends le temps de comprendre comment vous l\'utilisez avant de tracer la première ligne.',
  },
  {
    n: '03',
    title: 'Escaliers & garde-corps',
    desc: 'L\'escalier structure la circulation dans une maison. Je le conçois pour qu\'il soit solide, stable, et qu\'il vieillisse sans bruit de craquement.',
  },
  {
    n: '04',
    title: 'Bibliothèques sur mesure',
    desc: 'Du sol au plafond ou en meuble indépendant. Je prends les cotes de votre pièce et je travaille à partir de là, en tenant compte de la lumière et des contraintes portantes.',
  },
  {
    n: '05',
    title: 'Portes & menuiseries',
    desc: 'Portes intérieures, encadrements, boiseries. Des éléments souvent négligés, qui changent l\'aspect d\'un intérieur quand ils sont bien faits.',
  },
]

export default function SavoirFaire() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="savoirfaire"
      style={{
        background: 'var(--c-brun)',
        padding: 'var(--section-py) var(--px)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 100px)',
        alignItems: 'start',
      }}
        className="sf-grid"
      >
        {/* Left — text */}
        <div>
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-8)' }}
          >
            <span className="gold-line" />
            Savoir-faire
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
              fontWeight: 400,
              color: 'var(--c-ivoire)',
              lineHeight: 1.1,
              marginBottom: 'var(--sp-12)',
              maxWidth: '18ch',
            }}
          >
            Ce que je fabrique,
            et comment je le fais.
          </motion.h2>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {expertises.map((e, i) => (
              <motion.li
                key={e.n}
                variants={staggerItem}
                onClick={() => setActive(active === i ? null : i)}
                data-cursor
                style={{
                  borderTop: '1px solid rgba(196,160,64,0.15)',
                  padding: 'var(--sp-6) 0',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--sp-6)',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--f-sc)',
                      fontSize: '0.65rem',
                      color: 'var(--c-or)',
                      letterSpacing: '0.1em',
                      marginTop: '4px',
                      minWidth: '24px',
                    }}>{e.n}</span>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--f-serif)',
                        fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                        fontWeight: 400,
                        color: active === i ? 'var(--c-or)' : 'var(--c-ivoire)',
                        transition: 'color 0.3s ease',
                        marginBottom: '0',
                      }}>{e.title}</h3>
                      <AnimatePresence>
                        {active === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '8px' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                              fontFamily: 'var(--f-sans)',
                              fontSize: '0.9rem',
                              fontWeight: 400,
                              color: 'rgba(245,249,247,0.65)',
                              lineHeight: 1.65,
                              overflow: 'hidden',
                            }}
                          >
                            {e.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: 'var(--c-or)',
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >+</motion.span>
                </div>
              </motion.li>
            ))}
            <li style={{ borderTop: '1px solid rgba(196,160,64,0.15)' }} />
          </motion.ul>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'relative' }}
          className="sf-image-wrap"
        >
          <div className="sf-deco-border" style={{
            position: 'absolute',
            inset: '-16px',
            border: '1px solid rgba(196,160,64,0.25)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            aspectRatio: '3/4',
            overflow: 'hidden',
          }}>
            <motion.img
              src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=80"
              alt="Artisan au travail dans son atelier"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '-24px',
              left: '-24px',
              background: 'var(--c-or)',
              color: 'var(--c-noir)',
              padding: 'var(--sp-6) var(--sp-8)',
              zIndex: 2,
            }}
          >
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}>20</div>
            <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8 }}>ans d'atelier</div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sf-grid { grid-template-columns: 1fr !important; }
          .sf-image-wrap { order: -1; max-height: 300px; overflow: hidden; }
          .sf-deco-border { display: none; }
        }
      `}</style>
    </section>
  )
}




