import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="floating-bar"
            style={{
              position: 'fixed',
              bottom: 0, left: 0, right: 0,
              zIndex: 998,
              display: 'none',
              background: 'rgba(15,10,6,0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--or-15)',
              padding: '12px 20px',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <a
              href="tel:+33600000000"
              style={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 22px',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--or-25)',
                color: 'var(--c-or)',
                fontFamily: 'var(--f-sc)',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: 'transparent',
                transition: 'all 0.3s var(--ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--or-15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.2 2h2.8l1.4 3.2-1.6 1.3a8.8 8.8 0 0 0 3.6 3.6l1.3-1.6 3.2 1.4v2.8A1 1 0 0 1 13 14C5.82 14 2 8.18 2 3a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
              <span>Appeler</span>
            </a>

            <a
              href="#contact"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                borderRadius: 'var(--r-pill)',
                background: 'var(--c-or)',
                color: 'var(--c-noir)',
                fontFamily: 'var(--f-sc)',
                fontSize: '0.66rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.3s var(--ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-or-pale)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-or)' }}
            >
              <span>Votre projet</span>
              <span style={{ fontSize: '0.85rem' }}>→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .floating-bar { display: flex !important; } }
      `}</style>
    </>
  )
}
