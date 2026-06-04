import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const avis = [
  {
    text: "J'avais une photo Pinterest et un espace bizarre sous l'escalier. Renaud en a fait une bibliothèque que tout le monde remarque en entrant. Du premier croquis à la pose, tout était clair.",
    name: 'Sophie L.', projet: 'Bibliothèque sur mesure · Paris 11e',
  },
  {
    text: "Notre cuisine a été entièrement repensée autour de notre façon de cuisiner. Dix-huit mois plus tard, pas un tiroir qui accroche. Les finitions sont irréprochables.",
    name: 'Marc & Hélène D.', projet: 'Cuisine en noyer · Versailles',
  },
  {
    text: "L'escalier nous inquiétait pour la rénovation. Il a proposé une solution à laquelle on n'avait pas pensé, et le rendu dépasse ce qu'on imaginait. Devis tenu au centime près.",
    name: 'Thomas R.', projet: 'Escalier balancé · Maison de campagne',
  },
]

export default function Temoignages() {
  return (
    <section id="avis" style={{ background: 'var(--c-ivoire)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(40px, 5vw, 72px)', maxWidth: '40ch' }}>
          <motion.span className="eyebrow eyebrow--dark"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings} transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}
          >
            <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
            Ils m'ont fait confiance
          </motion.span>
          <motion.h2 className="h2"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings} transition={{ duration: 0.9 }}
            style={{ color: 'var(--c-texte)' }}
          >
            Ce qu'en disent mes clients.
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          className="avis-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px, 2.4vw, 32px)' }}
        >
          {avis.map((a) => (
            <motion.blockquote key={a.name} variants={staggerItem}
              style={{ margin: 0, background: 'var(--c-fond)', border: '1px solid var(--c-pierre)',
                padding: 'clamp(28px, 3vw, 40px)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: 'var(--sp-5)' }}>
                {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: 'var(--c-or)', fontSize: '0.85rem' }}>★</span>)}
              </div>
              <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.02rem, 1.25vw, 1.18rem)', fontStyle: 'italic',
                lineHeight: 1.6, color: 'var(--c-texte)', marginBottom: 'var(--sp-6)', flex: 1 }}>
                « {a.text} »
              </p>
              <footer>
                <div style={{ fontFamily: 'var(--f-sans)', fontSize: '0.92rem', fontWeight: 500, color: 'var(--c-texte)' }}>{a.name}</div>
                <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-or-dim)', marginTop: '3px' }}>{a.projet}</div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .avis-grid { grid-template-columns: 1fr !important; max-width: 560px; margin: 0 auto; } }
      `}</style>
    </section>
  )
}
