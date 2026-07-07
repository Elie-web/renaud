import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

/* Bandeau MANIFESTE — grande citation sur fond sombre (rupture visuelle forte
   au milieu des sections claires). Réutilise le texte poétique validé. */
export default function Manifesto() {
  return (
    <section style={{ background: 'var(--c-noir)', padding: 'clamp(96px, 13vw, 200px) var(--px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.6 }}
          className="eyebrow eyebrow--light" style={{ display: 'inline-block', marginBottom: 'var(--sp-6)' }}
        >
          Ma façon de travailler
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9, delay: 0.08 }}
          className="manifesto-quote"
          style={{
            fontFamily: 'var(--f-serif)', fontWeight: 400,
            fontSize: 'clamp(1.7rem, 4vw, 3.4rem)', lineHeight: 1.3, letterSpacing: '-0.01em',
            color: 'var(--c-ivoire)', textWrap: 'balance',
          }}
        >
          «&nbsp;Je travaille à la lumière du jour, sur des pièces qui trouvent
          leur place chez vous <span style={{ color: 'var(--c-or-pale)' }}>pour vous accompagner.</span>&nbsp;»
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'block', marginTop: 'var(--sp-8)', fontFamily: 'var(--f-sc)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cr-50)' }}
        >
          Renaud Achard · Ébéniste depuis 2019
        </motion.span>
      </div>
    </section>
  )
}
