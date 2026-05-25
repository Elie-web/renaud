import { motion } from 'framer-motion'

const items = ['Ébénisterie', '✦', 'Menuiserie', '✦', 'Sur mesure', '✦', 'Artisanat', '✦', 'Île-de-France', '✦']

export default function Marquee({ dark = false }) {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div style={{
      background: dark ? 'var(--c-or)' : 'var(--c-brun)',
      overflow: 'hidden',
      padding: '18px 0',
      borderTop: dark ? 'none' : '1px solid rgba(196,160,64,0.12)',
      borderBottom: dark ? 'none' : '1px solid rgba(196,160,64,0.12)',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          display: 'flex',
          gap: 'clamp(24px, 4vw, 48px)',
          width: 'max-content',
          alignItems: 'center',
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item === '✦' ? 'serif' : 'var(--f-sc)',
              fontSize: item === '✦' ? '0.5rem' : '0.72rem',
              letterSpacing: item === '✦' ? '0' : '0.22em',
              textTransform: 'uppercase',
              color: dark ? 'var(--c-noir)' : 'rgba(196,160,64,0.55)',
              whiteSpace: 'nowrap',
              opacity: item === '✦' ? 0.5 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}



