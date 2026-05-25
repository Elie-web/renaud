import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

export default function Manifeste() {
  return (
    <section style={{
      background: 'var(--c-ivoire)',
      padding: 'clamp(80px, 14vw, 200px) var(--px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <motion.span
          className="eyebrow eyebrow--dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.7 }}
          style={{ display: 'inline-block', marginBottom: 'var(--sp-8)' }}
        >
          Ce que je crois
        </motion.span>

        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 4rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.25,
              color: 'var(--c-texte)',
              marginBottom: 'var(--sp-10)',
              letterSpacing: '-0.01em',
            }}
          >
            "Quand une pièce quitte mon atelier,
            <br />
            elle va rester vingt, trente ans dans votre maison.
            <br />
            C'est ça qui{' '}
            <span style={{ color: 'var(--c-or-dim)' }}>m'oblige à bien travailler.</span>"
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportSettings}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--c-bleu), transparent)',
            marginBottom: 'var(--sp-10)',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lead"
          style={{ maxWidth: '52ch', margin: '0 auto', textAlign: 'center' }}
        >
          J'ai appris le métier à Coarraze, puis le design à Lyon. Depuis, j'ai un atelier. C'est plus long et plus cher que le catalogue. Mais dans dix ans, la pièce sera encore là.
        </motion.p>
      </div>
    </section>
  )
}
