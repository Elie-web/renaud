import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const temoignages = [
  {
    stars: 5,
    text: "J'avais une idée floue, une photo Pinterest, et un espace bizarre. Renaud en a fait une bibliothèque que tout le monde remarque en premier en entrant. C'est exactement ça, travailler avec un vrai artisan.",
    name: 'Sophie L.',
    project: 'Bibliothèque sur mesure, Paris 11e',
    initial: 'S',
  },
  {
    stars: 5,
    text: "Notre cuisine a été entièrement repensée. Pas une seule chicane en 18 mois d'utilisation quotidienne. Les finitions sont impeccables, les tiroirs glissent parfaitement. On ne regrette pas une seconde.",
    name: 'Marc & Hélène D.',
    project: 'Cuisine en noyer, Versailles',
    initial: 'M',
  },
  {
    stars: 5,
    text: "L'escalier était notre grosse inquiétude pour la rénovation. Renaud a proposé une solution à laquelle on n'avait pas pensé, et le résultat dépasse tout ce qu'on imaginait. Il a changé l'âme de la maison.",
    name: 'Thomas R.',
    project: 'Escalier balancé, Maison de campagne',
    initial: 'T',
  },
]

function Stars({ n }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--sp-6)' }}>
      {Array(n).fill(0).map((_, i) => (
        <span key={i} style={{ color: 'var(--c-or)', fontSize: '0.85rem', lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

export default function Temoignages() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + temoignages.length) % temoignages.length)
  const next = () => setCurrent((c) => (c + 1) % temoignages.length)

  return (
    <section style={{ background: 'var(--c-fond)', padding: 'var(--section-py) var(--px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="temo-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center',
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
              Témoignages
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              className="h2"
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-10)' }}
            >
              Ce que disent
              <br />ceux qui vivent
              <br /><em style={{ color: 'var(--c-or-dim)', fontStyle: 'italic' }}>avec mes pièces.</em>
            </motion.h2>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <button onClick={prev} aria-label="Précédent" className="btn-circle">←</button>
              <button onClick={next} aria-label="Suivant" className="btn-circle">→</button>
            </div>

            <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-6)', alignItems: 'center' }}>
              {temoignages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Témoignage ${i + 1}`}
                  style={{
                    width: i === current ? '28px' : '6px',
                    height: '2px',
                    background: i === current ? 'var(--c-or)' : 'var(--c-pierre)',
                    border: 'none',
                    borderRadius: 'var(--r-pill)',
                    transition: 'all 0.4s var(--ease)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — card */}
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  background: 'var(--c-ivoire)',
                  border: '1px solid var(--c-pierre)',
                  borderRadius: 'var(--r-sm)',
                  padding: 'clamp(32px, 4vw, 52px)',
                  position: 'relative',
                }}
              >
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '40px',
                  fontFamily: 'var(--f-serif)',
                  fontSize: '5rem',
                  lineHeight: 1,
                  color: 'var(--c-or)',
                  opacity: 0.2,
                  userSelect: 'none',
                }}>"</div>

                <Stars n={temoignages[current].stars} />

                <p style={{
                  fontFamily: 'var(--f-serif)',
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--c-texte)',
                  marginBottom: 'var(--sp-8)',
                }}>
                  "{temoignages[current].text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                  <div style={{
                    width: '42px', height: '42px',
                    borderRadius: '50%',
                    background: 'var(--c-or)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--f-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--c-noir)',
                    flexShrink: 0,
                  }}>
                    {temoignages[current].initial}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--c-texte)' }}>
                      {temoignages[current].name}
                    </div>
                    <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--c-or-dim)', textTransform: 'uppercase' }}>
                      {temoignages[current].project}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .temo-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .btn-circle { width: 44px; height: 44px; }
        }
      `}</style>
    </section>
  )
}
