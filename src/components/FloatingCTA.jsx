import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="float-bar"
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900, display: 'none',
              gap: '10px', padding: '12px 16px',
              background: 'rgba(246,241,231,0.94)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              borderTop: '1px solid var(--c-pierre)',
            }}
          >
            <a href="tel:+33600000000" style={{
              flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '15px 20px', borderRadius: 'var(--r-pill)', border: '1px solid var(--or-40)',
              color: 'var(--c-or-dim)', fontFamily: 'var(--f-sc)', fontSize: '0.64rem', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.2 2h2.8l1.4 3.2-1.6 1.3a8.8 8.8 0 0 0 3.6 3.6l1.3-1.6 3.2 1.4v2.8A1 1 0 0 1 13 14C5.82 14 2 8.18 2 3a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
              Appeler
            </a>
            <a href="#contact" className="btn btn--gold btn--full" style={{ flex: 1, padding: '15px' }}>
              Devis gratuit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media (max-width: 760px) { .float-bar { display: flex !important; } }`}</style>
    </>
  )
}
