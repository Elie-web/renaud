import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import bandImg from '../assets/working/DSC09086-opt.webp'

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
          src={bandImg}
          alt="Placage de noyer assemblé et maintenu avant collage à l'atelier"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>

      {/* Voiles : assombrissement global + dégradé vertical (centré) */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(22,16,10,0.56)' }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(20,15,9,0.5) 0%, rgba(20,15,9,0.18) 50%, rgba(20,15,9,0.5) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 'var(--sp-5)' }}>
          <span className="eyebrow eyebrow--light">L'atelier · Vallée de Chamonix</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem, 4.4vw, 3.8rem)', fontWeight: 400,
            lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--c-ivoire)', maxWidth: '20ch', margin: '0 auto',
            textShadow: '0 2px 30px rgba(20,15,9,0.6)',
          }}>
          Rien n'est sous-traité.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--c-or-pale)' }}>Tout sort d'ici.</em>
        </motion.p>
      </div>
    </section>
  )
}
