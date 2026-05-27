import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { viewportSettings } from '../lib/motion'

const steps = [
  {
    n: '01',
    title: 'La rencontre',
    desc: "Une conversation chez vous ou à l'atelier. Je regarde l'espace, j'écoute ce que vous avez en tête. Je ne dessine rien avant d'avoir compris.",
  },
  {
    n: '02',
    title: 'La conception',
    desc: "Croquis d'abord, puis un rendu 3D pour que vous voyiez exactement ce que vous aurez. On choisit les essences ensemble. Rien n'est commandé avant votre accord.",
  },
  {
    n: '03',
    title: 'La fabrication',
    desc: "Tout se passe à l'atelier — à la main pour les assemblages, à la machine pour les débits. Je n'externalise pas. Aucune pièce ne part avant d'être juste.",
  },
  {
    n: '04',
    title: 'La livraison',
    desc: "Je livre et j'installe moi-même. Je vérifie l'aplomb, les jours, les finitions. Joignable si quelque chose n'est pas parfait après.",
  },
]

const POSITIONS = [
  { top: 20,  isLeft: true  },
  { top: 300, isLeft: false },
  { top: 580, isLeft: true  },
  { top: 860, isLeft: false },
]

const PATH  = 'M 78,48 C 220,48 470,328 578,328 C 578,468 78,468 78,608 C 78,748 578,748 578,888'
const NODES = [[78, 48], [578, 328], [78, 608], [578, 888]]

// scrollYProgress values when each step is centered in viewport (approx, 900px viewport)
// path fraction at each node: 0 / 0.33 / 0.66 / 1.0
const STEP_AT = [0.32, 0.43, 0.55, 0.66]

// Dot flash window: slightly after path arrives
const DOT_AT = [
  [0.30, 0.36],
  [0.41, 0.47],
  [0.53, 0.59],
  [0.64, 0.70],
]

// Reveal window: tight so the fade-in snaps quickly as the path arrives
const REVEAL_AT = [
  [0.26, 0.34],
  [0.38, 0.46],
  [0.50, 0.58],
  [0.61, 0.69],
]

export default function Processus() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Remap scroll → path: each node reached exactly when that step is centered
  const pathProgress = useTransform(
    scrollYProgress,
    [STEP_AT[0], STEP_AT[1], STEP_AT[2], STEP_AT[3]],
    [0,          0.33,       0.66,       1.0],
  )

  // Gold dots at each node
  const dot0 = useTransform(scrollYProgress, DOT_AT[0], [0, 0.8])
  const dot1 = useTransform(scrollYProgress, DOT_AT[1], [0, 0.8])
  const dot2 = useTransform(scrollYProgress, DOT_AT[2], [0, 0.8])
  const dot3 = useTransform(scrollYProgress, DOT_AT[3], [0, 0.8])
  const dotOpacities = [dot0, dot1, dot2, dot3]

  // Step opacity: invisible → fully visible as path arrives
  const sOp0 = useTransform(scrollYProgress, REVEAL_AT[0], [0, 1])
  const sOp1 = useTransform(scrollYProgress, REVEAL_AT[1], [0, 1])
  const sOp2 = useTransform(scrollYProgress, REVEAL_AT[2], [0, 1])
  const sOp3 = useTransform(scrollYProgress, REVEAL_AT[3], [0, 1])
  const stepOpacities = [sOp0, sOp1, sOp2, sOp3]

  // Step rise: gentle upward drift as each step appears
  const sY0 = useTransform(scrollYProgress, REVEAL_AT[0], [14, 0])
  const sY1 = useTransform(scrollYProgress, REVEAL_AT[1], [14, 0])
  const sY2 = useTransform(scrollYProgress, REVEAL_AT[2], [14, 0])
  const sY3 = useTransform(scrollYProgress, REVEAL_AT[3], [14, 0])
  const stepY = [sY0, sY1, sY2, sY3]

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--c-ivoire)',
        padding: 'var(--section-py) var(--px)',
        overflow: 'hidden',
      }}
    >
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
        <div className="process-desktop" style={{ position: 'relative', height: '1120px' }}>

          {/* SVG — scroll-driven path + dots */}
          <svg
            viewBox="0 0 1000 1120"
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
              opacity="0.5"
              style={{ pathLength: pathProgress }}
            />
            {NODES.map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r={5}
                fill="var(--c-or)"
                style={{ opacity: dotOpacities[i] }}
              />
            ))}
          </svg>

          {/* Decorative large numbers */}
          {steps.map((step, i) => (
            <div
              key={`d-${step.n}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: `${POSITIONS[i].top - 10}px`,
                ...(POSITIONS[i].isLeft
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
          ))}

          {/* Circles — scroll-driven reveal */}
          {steps.map((step, i) => (
            <motion.div
              key={`c-${step.n}`}
              style={{
                position: 'absolute',
                left: POSITIONS[i].isLeft ? '5%' : '55%',
                top: `${POSITIONS[i].top}px`,
                zIndex: 2,
                width: '56px', height: '56px',
                borderRadius: '50%',
                border: '1px solid var(--c-bleu)',
                background: 'linear-gradient(rgba(12,14,136,0.15),rgba(12,14,136,0.15)),var(--c-ivoire)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 8px rgba(12,14,136,0.05)',
                opacity: stepOpacities[i],
                y: stepY[i],
              }}
            >
              <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--c-bleu)' }}>
                {step.n}
              </span>
            </motion.div>
          ))}

          {/* Text cards — scroll-driven reveal */}
          {steps.map((step, i) => (
            <motion.div
              key={`t-${step.n}`}
              style={{
                position: 'absolute',
                left: POSITIONS[i].isLeft ? 'calc(5% + 68px)' : 'calc(55% + 68px)',
                top: `${POSITIONS[i].top}px`,
                maxWidth: '300px',
                zIndex: 1,
                opacity: stepOpacities[i],
                y: stepY[i],
              }}
            >
              <h3 style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(1.4rem, 2vw, 2.2rem)',
                fontWeight: 400,
                color: 'var(--c-texte)',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}>{step.title}</h3>
              <p style={{
                fontFamily: 'var(--f-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: 'var(--c-texte-2)',
              }}>{step.desc}</p>
            </motion.div>
          ))}
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
