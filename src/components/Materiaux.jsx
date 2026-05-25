import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const woods = [
  {
    name: 'Chêne',
    origin: 'France, Europe centrale',
    character: 'Dur, stable, marqué',
    desc: 'Le chêne est dur et stable. Ses veines sont prononcées : certains aiment ça, d\'autres moins. Il ne cherche pas à plaire, il est là. Pour tout ce qui doit tenir sans entretien particulier.',
    color: '#8B6A3E',
    img: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=600&q=80',
    uses: ['Tables', 'Bibliothèques', 'Armoires', 'Cuisines'],
  },
  {
    name: 'Noyer',
    origin: 'France, Amérique du Nord',
    character: 'Foncé, rare, exigeant',
    desc: 'Foncé, presque chocolat quand il est frais. Il s\'éclaircit légèrement avec la lumière. Rare, long à pousser, plus cher que le chêne. Pour les pièces où le bois est le sujet.',
    color: '#4A3728',
    img: 'https://images.unsplash.com/photo-1736506159893-22cca29b8018?auto=format&fit=crop&w=600&q=80',
    uses: ['Mobilier de salon', 'Cuisines', 'Bibliothèques'],
  },
  {
    name: 'Frêne',
    origin: 'Europe du Nord',
    character: 'Clair, régulier, discret',
    desc: 'Clair, aux fibres régulières, moins de présence que le chêne. Pour des intérieurs qui cherchent la légèreté plutôt que le caractère. S\'associe bien au métal et au béton.',
    color: '#C4A882',
    img: 'https://images.unsplash.com/photo-1611072337226-1140ab367200?auto=format&fit=crop&w=600&q=80',
    uses: ['Escaliers', 'Portes', 'Mobilier contemporain'],
  },
  {
    name: 'Merisier',
    origin: 'France',
    character: 'Rosé, chaleureux, évolutif',
    desc: 'Part rosé, vire à l\'or dans les premières années sous l\'effet de la lumière. Agréable à travailler, chaleureux en résultat. Pour les espaces de vie et les chambres.',
    color: '#C47D5E',
    img: 'https://images.unsplash.com/photo-1632199495802-18f7d21f323b?auto=format&fit=crop&w=600&q=80',
    uses: ['Chambre', 'Salon', 'Cuisine'],
  },
]

export default function Materiaux() {
  const [active, setActive] = useState(0)
  const wood = woods[active]

  return (
    <section
      id="materiaux"
      style={{
        background: 'var(--c-noir)',
        padding: 'var(--section-py) var(--px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
          >
            <span className="gold-line" />
            Les matériaux
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
            Les bois que j'utilise,
            <br />
            <em style={{ color: 'var(--c-or)', fontStyle: 'italic' }}>et pourquoi.</em>
          </motion.h2>
        </div>

        {/* Wood selector + detail */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'center',
        }} className="mat-grid">

          {/* Left: tabs + detail */}
          <div>
            {/* Wood tabs */}
            <div style={{
              display: 'flex',
              gap: 'var(--sp-2)',
              marginBottom: 'var(--sp-10)',
              borderBottom: '1px solid rgba(196,160,64,0.15)',
              paddingBottom: '0',
            }}>
              {woods.map((w, i) => (
                <button
                  key={w.name}
                  onClick={() => setActive(i)}
                  data-cursor
                  style={{
                    fontFamily: 'var(--f-sc)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: active === i ? 'var(--c-or)' : 'rgba(245,249,247,0.35)',
                    padding: '12px 20px 14px',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {w.name}
                  {active === i && (
                    <motion.div
                      layoutId="wood-underline"
                      style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--c-or)',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: wood.color,
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--f-serif)',
                      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                      fontWeight: 400,
                      color: 'var(--c-ivoire)',
                      lineHeight: 1,
                    }}>{wood.name}</div>
                    <div style={{
                      fontFamily: 'var(--f-sc)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      color: 'var(--c-or)',
                      textTransform: 'uppercase',
                    }}>{wood.character}</div>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--f-sans)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: 'rgba(245,249,247,0.72)',
                  marginBottom: 'var(--sp-8)',
                  maxWidth: '44ch',
                }}>
                  {wood.desc}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--sp-3)',
                  marginBottom: 'var(--sp-4)',
                }}>
                  <span className="gold-line" style={{ width: '20px' }} />
                  <span style={{
                    fontFamily: 'var(--f-sc)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(245,249,247,0.4)',
                    textTransform: 'uppercase',
                  }}>Utilisations</span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                  {wood.uses.map((u) => (
                    <span key={u} style={{
                      fontFamily: 'var(--f-sc)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--c-or)',
                      border: '1px solid rgba(196,160,64,0.3)',
                      padding: '5px 14px',
                    }}>{u}</span>
                  ))}
                </div>

                <div style={{ marginTop: 'var(--sp-6)', paddingTop: 'var(--sp-6)', borderTop: '1px solid rgba(196,160,64,0.12)' }}>
                  <span style={{
                    fontFamily: 'var(--f-sc)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    color: 'rgba(245,249,247,0.3)',
                    textTransform: 'uppercase',
                  }}>Origine · {wood.origin}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.6 }}
              style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative' }}
              className="mat-img"
            >
              <img
                src={wood.img}
                alt={`Bois de ${wood.name}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Color swatch overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${wood.color}33 0%, transparent 60%)`,
              }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mat-grid { grid-template-columns: 1fr !important; }
          .mat-img { display: none; }
        }
      `}</style>
    </section>
  )
}




