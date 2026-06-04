import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ImageBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      minHeight: 'clamp(380px, 58vh, 600px)', display: 'flex', alignItems: 'center',
      background: 'var(--c-noir)',
    }}>
      {/* Photo bois chaude, parallaxe douce */}
      <motion.div style={{ position: 'absolute', inset: '-8% 0', y, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=2000&q=85"
          alt="Détail de veines de bois massif travaillé en atelier"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>

      {/* Voiles : assombrissement global + dégradé fort à gauche (lisibilité garantie) */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(26,20,13,0.42)' }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(100deg, rgba(20,15,9,0.92) 0%, rgba(20,15,9,0.74) 38%, rgba(20,15,9,0.30) 72%, rgba(20,15,9,0.12) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
          <span className="gold-line" style={{ background: 'var(--c-or-pale)' }} />
          <span className="eyebrow eyebrow--light">L'atelier · Île-de-France</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem, 4.4vw, 3.8rem)', fontWeight: 400,
            lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--c-ivoire)', maxWidth: '18ch',
            textShadow: '0 2px 30px rgba(20,15,9,0.6)',
          }}>
          Rien n'est sous-traité.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--c-or-pale)' }}>Tout sort d'ici.</em>
        </motion.p>
      </div>
    </section>
  )
}
