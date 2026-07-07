import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

/* Bande CTA pleine largeur (fond accent) - appel à l'action fort, façon bannière. */
export default function CtaBand() {
  return (
    <section style={{ background: 'var(--c-or)', padding: 'clamp(72px, 10vw, 140px) var(--px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.8 }}
        style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2 style={{
          fontFamily: 'var(--f-serif)', fontWeight: 400,
          fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
          color: 'var(--c-ivoire)', marginBottom: 'var(--sp-5)', textWrap: 'balance',
        }}>
          Un projet en tête&nbsp;? Parlons-en.
        </h2>
        <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.6, color: 'rgba(242,235,221,0.9)', maxWidth: '46ch', margin: '0 auto var(--sp-8)' }}>
          Un appel découverte offert, un devis gratuit, aucun engagement. Racontez-moi votre pièce.
        </p>
        <a href="#contact" className="btn" style={{ background: 'var(--c-ivoire)', color: 'var(--c-texte)' }}>
          <span>Demander un devis gratuit</span><span className="arrow" />
        </a>
      </motion.div>
    </section>
  )
}
