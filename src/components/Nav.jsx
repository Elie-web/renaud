import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoir-faire' },
  { label: 'Le déroulé',   href: '#processus' },
  { label: 'Avis',         href: '#avis' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: scrolled ? '70px' : '92px',
          padding: '0 var(--px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(246,241,231,0.86)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--c-pierre)' : '1px solid transparent',
          transition: 'height .4s var(--ease), background .4s var(--ease), border-color .4s var(--ease)',
        }}
      >
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem, 2vw, 1.7rem)', fontWeight: 400,
            color: 'var(--c-texte)', lineHeight: 1, letterSpacing: '-0.01em',
          }}>Achard</span>
          <span style={{
            fontFamily: 'var(--f-sc)', fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.24em',
            color: 'var(--c-or-dim)', textTransform: 'uppercase',
          }}>Ébéniste · sur mesure</span>
        </a>

        {/* Liens desktop */}
        <ul className="nav-links" style={{ display: 'flex', gap: 'clamp(22px, 2.6vw, 44px)' }}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontFamily: 'var(--f-sans)', fontSize: '0.92rem', color: 'var(--c-texte-2)',
                transition: 'color .2s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-texte)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-texte-2)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
          <a href="#contact" className="nav-cta btn btn--gold" style={{ padding: '12px 26px', fontSize: '0.64rem' }}>
            Devis gratuit
          </a>
          <button
            className="nav-burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen(!open)}
            style={{ flexDirection: 'column', gap: '5px', padding: '8px', display: 'none' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span key={i}
                animate={{
                  rotate: open && i === 0 ? 45 : open && i === 2 ? -45 : 0,
                  y: open && i === 0 ? 7 : open && i === 2 ? -7 : 0,
                  opacity: open && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ display: 'block', width: '24px', height: '1.5px', background: open ? 'var(--c-ivoire)' : 'var(--c-texte)' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999, background: 'var(--c-brun)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '0 var(--px) 10vh',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
              {links.map((l, i) => (
                <motion.li key={l.href}
                  initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} style={{
                    fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.2rem, 9vw, 3.4rem)', fontWeight: 400,
                    color: 'var(--c-ivoire)', lineHeight: 1.1,
                  }}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <div style={{ marginTop: 'var(--sp-12)', paddingTop: 'var(--sp-8)', borderTop: '1px solid var(--or-20)' }}>
              <a href="#contact" className="btn btn--gold" onClick={() => setOpen(false)}>
                <span>Demander un devis gratuit</span><span className="arrow" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
