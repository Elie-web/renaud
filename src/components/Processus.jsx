import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import ProcessusMockup from './ProcessusMockups'

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    n: '01', id: 'rencontre', title: 'La rencontre',
    tagline: "Je ne dessine rien avant d'avoir compris.",
    desc: "Une conversation chez vous ou à l'atelier. Je regarde l'espace, j'écoute ce que vous avez en tête.",
    points: ['Visite & prise de mesures', 'Échange sans engagement'],
  },
  {
    n: '02', id: 'conception', title: 'La conception',
    tagline: 'On dessine votre pièce ensemble.',
    desc: "Croquis, plans et prise de cotes, choix des bois et des matériaux adaptés à l'usage. Rien n'est commandé avant votre accord.",
    points: ['Plans & prise de cotes', 'Choix des bois & finitions'],
  },
  {
    n: '03', id: 'rendu', title: 'Le rendu réaliste',
    tagline: 'Vous voyez la pièce avant qu\'elle existe.',
    desc: "Un rendu 3D fidèle, presque photo. On l'ajuste ensemble — teinte, proportions, détails — jusqu'à ce qu'il vous ressemble, avant la moindre découpe.",
    points: ['Rendu 3D photo-réaliste', 'Modifiable jusqu\'à validation'],
  },
  {
    n: '04', id: 'livraison', title: 'La livraison',
    tagline: 'Je livre et j\'installe moi-même.',
    desc: "Je vérifie l'aplomb, les jours, les finitions. Et je reste joignable après la pose.",
    points: ['Pose soignée sur place', 'Garantie 5 ans'],
  },
]

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-or-dim)"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

function Step({ step, flip }) {
  return (
    <div className={`proc-row ${flip ? 'proc-row--rev' : ''}`} style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(36px, 4.5vw, 80px)', alignItems: 'center',
    }}>
      {/* Visuel (mockup) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings} transition={{ duration: 0.9, ease }}
        className="proc-visual"
        style={{ gridColumn: flip ? 2 : 1, gridRow: 1, display: 'flex' }}
      >
        <ProcessusMockup id={step.id} />
      </motion.div>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.12, ease }}
        className="proc-txt"
        style={{ gridColumn: flip ? 1 : 2, gridRow: 1 }}
      >
        <span className="proc-kicker" style={{
          display: 'inline-flex', alignItems: 'center', gap: '12px',
          fontFamily: 'var(--f-sc)', fontWeight: 600, fontSize: '0.72rem',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-or-dim)',
          marginBottom: 'var(--sp-3)',
        }}>
          <span>Étape {step.n}</span>
          <span aria-hidden="true" style={{ width: '30px', height: '1px', background: 'var(--or-40)' }} />
        </span>

        <h3 style={{
          fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem, 3.4vw, 3rem)', fontWeight: 400,
          color: 'var(--c-texte)', lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 'var(--sp-4)',
        }}>{step.title}</h3>

        <p className="i-accent" style={{
          fontFamily: 'var(--f-serif)',
          fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.4,
          marginBottom: 'var(--sp-5)', maxWidth: '30ch',
        }}>{step.tagline}</p>

        <p style={{
          fontFamily: 'var(--f-sans)', fontSize: 'clamp(0.98rem, 1.15vw, 1.06rem)', lineHeight: 1.72,
          color: 'var(--c-texte-2)', marginBottom: 'var(--sp-6)', maxWidth: '42ch',
        }}>{step.desc}</p>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {step.points.map((pt) => (
            <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, background: 'var(--or-10)', border: '1px solid var(--or-20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check /></span>
              <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.95rem', color: 'var(--c-texte)' }}>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function Processus() {
  return (
    <section id="processus" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        <SectionHeader
          eyebrow="Comment je travaille"
          title={<>Votre projet, <Accent>pas à pas.</Accent></>}
          lead="Quatre temps, sans précipitation. Un seul interlocuteur du premier croquis à la pose chez vous."
          style={{ marginBottom: 'clamp(64px, 9vw, 130px)' }}
        />

        <div className="proc-list" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(72px, 11vw, 150px)' }}>
          {steps.map((step, i) => (
            <Step key={step.n} step={step} flip={i % 2 === 1} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.7, ease }}
          style={{
            marginTop: 'clamp(72px, 10vw, 140px)', textAlign: 'center',
            fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 400,
            color: 'var(--c-texte)', lineHeight: 1.45, maxWidth: '24ch', margin: 'clamp(72px, 10vw, 140px) auto 0',
            letterSpacing: '-0.01em',
          }}
        >
          Votre projet reste le vôtre, <em className="i-accent">du croquis à la pose.</em>
        </motion.p>
      </div>

      <style>{`
        .proc-txt { max-width: 46ch; }

        /* image et texte se rapprochent du centre → paire image+texte, jamais collée aux bords */
        .proc-row .proc-visual { justify-content: flex-end; }
        .proc-row .proc-txt { justify-self: start; }
        .proc-row--rev .proc-visual { justify-content: flex-start; }
        .proc-row--rev .proc-txt { justify-self: end; }

        @media (max-width: 880px) {
          /* plus d'air entre le sous-titre de section et « Étape 01 » */
          .proc-list { margin-top: clamp(44px, 13vw, 80px); }
          .proc-row { grid-template-columns: 1fr !important; gap: var(--sp-10) !important; }
          .proc-visual, .proc-txt { grid-column: 1 !important; }
          .proc-row .proc-visual, .proc-row--rev .proc-visual { justify-content: center !important; }
          .proc-row .proc-txt, .proc-row--rev .proc-txt { justify-self: center !important; max-width: 100% !important; }
          /* sur mobile : le titre d'abord, l'image ensuite (sinon on voit l'image avant de savoir de quelle étape il s'agit) */
          .proc-txt { grid-row: 1 !important; text-align: center; }
          .proc-visual { grid-row: 2 !important; }
          .proc-txt p, .proc-txt ul { margin-left: auto; margin-right: auto; }
          .proc-txt ul { width: fit-content; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
