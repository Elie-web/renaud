import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

/* Bande de CHIFFRES-preuve - grands nombres en serif, façon éditorial.
   Reprend la preuve sociale (2019/CAP, satisfaction, réactivité).
   La garantie 5 ans qui figurait ici a été retirée : Renaud ne veut annoncer
   aucune garantie (vocal du 23/07/2026). Le délai de réponse la remplace, il est
   déjà promis ailleurs sur le site (hero, contact) donc n'engage rien de neuf. */
const stats = [
  { k: '2019', v: 'Dans le bois, CAP d’ébénisterie' },
  { k: '100 %', v: 'De clients satisfaits' },
  { k: '24 h', v: 'Pour répondre à votre demande' },
  { k: '1', v: 'Seul interlocuteur, du croquis à la pose' },
]

export default function StatsBand() {
  return (
    <section style={{ background: 'var(--c-creme)', padding: 'clamp(64px, 8vw, 120px) var(--px)', borderTop: '1px solid var(--c-pierre)', borderBottom: '1px solid var(--c-pierre)' }}>
      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
        className="sb-grid"
      >
        {stats.map((s) => (
          <motion.div key={s.k} variants={staggerItem} className="sb-item">
            <span className="sb-k">{s.k}</span>
            <span className="sb-v">{s.v}</span>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .sb-grid {
          max-width: var(--max-w); margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        .sb-item {
          display: flex; flex-direction: column; gap: 10px;
          padding: 0 clamp(8px, 1.5vw, 24px);
          border-left: 1px solid var(--c-pierre);
        }
        .sb-item:first-child { border-left: none; }
        .sb-k {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(2.6rem, 5vw, 4.4rem); line-height: 0.95; letter-spacing: -0.02em;
          color: var(--c-or-dim);
        }
        .sb-v {
          font-family: var(--f-sans); font-size: clamp(0.85rem, 1vw, 0.98rem); line-height: 1.5;
          color: var(--c-texte-2); max-width: 22ch;
        }
        @media (max-width: 860px) {
          .sb-grid { grid-template-columns: 1fr 1fr; gap: 32px 24px; }
          .sb-item:nth-child(3) { border-left: none; }
        }
        @media (max-width: 480px) {
          .sb-grid { grid-template-columns: 1fr; }
          .sb-item { border-left: none; border-top: 1px solid var(--c-pierre); padding: 20px 0 0; }
          .sb-item:first-child { border-top: none; padding-top: 0; }
        }
      `}</style>
    </section>
  )
}
