import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const steps = [
  {
    n: '01',
    title: 'La rencontre',
    desc: "Une conversation, chez vous ou à l'atelier. Je regarde l'espace, j'écoute ce que vous avez en tête. Je ne dessine rien avant d'avoir compris.",
  },
  {
    n: '02',
    title: 'La conception',
    desc: "Croquis à la main d'abord, puis un rendu 3D réaliste pour que vous voyiez exactement ce que vous aurez. On choisit les essences ensemble, on arrête les finitions. Rien n'est commandé avant votre accord.",
  },
  {
    n: '03',
    title: 'La fabrication',
    desc: "Tout se passe à l'atelier. À la main pour les assemblages, à la machine pour les débits. Je n'externalise pas. Aucune pièce ne part avant d'être juste.",
  },
  {
    n: '04',
    title: 'La livraison',
    desc: "Je livre et j'installe moi-même. Je vérifie l'aplomb, les jours, les finitions. Et je suis joignable si quelque chose n'est pas parfait après.",
  },
]

// Desktop layout — container: 960px tall
// Even steps (01,03): left side  → circle at left:5%  → center x ≈ 78 in SVG 0-1000
// Odd  steps (02,04): right side → circle at left:55% → center x ≈ 578
// Row tops: 20, 260, 500, 740  → circle centers y: 48, 288, 528, 768

const POSITIONS = [
  { side: 'left',  top: 20,  delay: 0.3  },
  { side: 'right', top: 260, delay: 1.05 },
  { side: 'left',  top: 500, delay: 1.65 },
  { side: 'right', top: 740, delay: 2.2  },
]

// SVG smooth S-curve through all four circle centers
const PATH = 'M 78,48 C 220,48 470,288 578,288 C 578,408 78,408 78,528 C 78,648 578,648 578,768'
const NODES = [[78, 48], [578, 288], [78, 528], [578, 768]]

export default function Processus() {
  return (
    <section style={{
      background: 'var(--c-ivoire)',
      padding: 'var(--section-py) var(--px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 96px)' }}>
          <motion.span
            className="eyebrow eyebrow--dark"
            initial={{ opacity: 0, x: -20 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9 }}
            style={{ color: 'var(--c-texte)', maxWidth: '22ch' }}
          >
            De l'idée à la pièce finie.
          </motion.h2>
        </div>

        {/* ── Desktop ───────────────────────────────────────────── */}
        <div className="process-desktop" style={{ position: 'relative', height: '960px' }}>

          {/* Animated winding path */}
          <svg
            viewBox="0 0 1000 960"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none', overflow: 'visible',
            }}
          >
            <motion.path
              d={PATH}
              fill="none"
              stroke="var(--c-or-dim)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.45"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 3.2, ease: [0.4, 0, 0.2, 1] }}
            />
            {NODES.map(([cx, cy], i) => (
              <motion.circle
                key={i} cx={cx} cy={cy} r={5}
                fill="var(--c-or)"
                initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: POSITIONS[i].delay - 0.05 }}
              />
            ))}
          </svg>

          {/* Decorative large numbers (opposite side from content) */}
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={`d-${step.n}`}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: `${POSITIONS[i].top - 10}px`,
                  ...(isLeft
                    ? { right: '4%', textAlign: 'right' }
                    : { left: '4%',  textAlign: 'left'  }),
                  fontFamily: 'var(--f-serif)',
                  fontSize: 'clamp(80px, 10vw, 140px)',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: 'var(--c-bleu)',
                  opacity: 0.055,
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  width: '42%',
                  overflow: 'hidden',
                }}
              >
                {step.n}
              </div>
            )
          })}

          {/* Circles */}
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            const { top, delay } = POSITIONS[i]
            return (
              <motion.div
                key={`c-${step.n}`}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay, ease: [0.34, 1.4, 0.64, 1] }}
                style={{
                  position: 'absolute',
                  left: isLeft ? '5%' : '55%',
                  top: `${top}px`,
                  zIndex: 2,
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  border: '1px solid var(--c-bleu)',
                  background: 'linear-gradient(rgba(12,14,136,0.15),rgba(12,14,136,0.15)),var(--c-ivoire)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 8px rgba(12,14,136,0.05)',
                }}
              >
                <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--c-bleu)' }}>
                  {step.n}
                </span>
              </motion.div>
            )
          })}

          {/* Text cards */}
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            const { top, delay } = POSITIONS[i]
            return (
              <motion.div
                key={`t-${step.n}`}
                initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: delay + 0.15 }}
                style={{
                  position: 'absolute',
                  left: isLeft ? 'calc(5% + 68px)' : 'calc(55% + 68px)',
                  top: `${top}px`,
                  maxWidth: '260px',
                  zIndex: 1,
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--f-serif)',
                  fontSize: 'clamp(1.4rem, 1.9vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--c-texte)',
                  marginBottom: '10px',
                  lineHeight: 1.15,
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: 'var(--f-sans)',
                  fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                  lineHeight: 1.78,
                  color: 'var(--c-texte-2)',
                }}>{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* ── Mobile ────────────────────────────────────────────── */}
        <div className="process-mobile">
          {steps.map((step, i) => (
            <motion.div
              key={`m-${step.n}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ display: 'flex', gap: '20px', marginBottom: '40px', alignItems: 'flex-start' }}
            >
              <div style={{
                flexShrink: 0, width: '48px', height: '48px',
                borderRadius: '50%', border: '1px solid var(--c-bleu)',
                background: 'linear-gradient(rgba(12,14,136,0.15),rgba(12,14,136,0.15)),var(--c-ivoire)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 6px rgba(12,14,136,0.05)',
              }}>
                <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.64rem', letterSpacing: '0.14em', color: 'var(--c-bleu)' }}>
                  {step.n}
                </span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--c-texte)', marginBottom: '8px', lineHeight: 1.15 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.88rem', lineHeight: 1.78, color: 'var(--c-texte-2)' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-desktop { display: block; }
        .process-mobile  { display: none; }
        @media (max-width: 860px) {
          .process-desktop { display: none !important; }
          .process-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  )
}
