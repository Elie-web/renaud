import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

/* En-tête de section centré, façon VM Producers :
   eyebrow centré → titre centré (mot d'accent en italique argile) → lead centré resserré. */
export default function SectionHeader({ eyebrow, title, lead, leadWidth = '48ch', children, style }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '60ch', margin: '0 auto clamp(44px, 5vw, 76px)', ...style }}>
      {eyebrow && (
        <motion.span
          className="eyebrow eyebrow--dark"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.6 }}
          style={{ display: 'inline-block', marginBottom: 'var(--sp-4)' }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className="h2"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.05 }}
        style={{ color: 'var(--c-texte)' }}
      >
        {title}
      </motion.h2>

      {lead && (
        <motion.p
          className="lead"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ margin: 'var(--sp-5) auto 0', maxWidth: leadWidth }}
        >
          {lead}
        </motion.p>
      )}

      {children}
    </div>
  )
}

/* Mot d'accent (italique argile) à insérer dans un titre. */
export function Accent({ children }) {
  return <em className="i-accent">{children}</em>
}
