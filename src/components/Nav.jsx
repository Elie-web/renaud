import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logos/logo-principal.png'

const links = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoir-faire' },
  { label: 'À propos',     href: '#metier' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav({ solid = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // `solid` = header clair permanent (testé sur une version) ; sinon transparent → clair au scroll
  const light = scrolled || solid

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
          background: light ? 'rgba(246,241,231,0.9)' : 'transparent',
          backdropFilter: light ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: light ? 'blur(16px)' : 'none',
          borderBottom: light ? '1px solid var(--c-pierre)' : '1px solid transparent',
          transition: 'height .4s var(--ease), background .4s var(--ease), border-color .4s var(--ease)',
        }}
      >
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="Logo Achard Créa" width="40" height="40"
            style={{ height: 'clamp(34px, 4vw, 44px)', width: 'auto', display: 'block', flexShrink: 0 }} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{
              fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem, 2vw, 1.7rem)', fontWeight: 400,
              color: light ? 'var(--c-texte)' : 'var(--c-ivoire)', lineHeight: 1, letterSpacing: '-0.01em',
              transition: 'color .4s var(--ease)',
            }}>Achard Créa</span>
            <span style={{
              fontFamily: 'var(--f-sc)', fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.24em',
              color: light ? 'var(--c-or-dim)' : 'var(--c-or-pale)', textTransform: 'uppercase',
              transition: 'color .4s var(--ease)',
            }}>Ébéniste · sur mesure</span>
          </span>
        </a>

        {/* Liens desktop */}
        <ul className="nav-links" style={{ display: 'flex', gap: 'clamp(22px, 2.6vw, 44px)' }}>
          {links.map((l) => {
            const base = light ? 'var(--c-texte-2)' : 'rgba(242,235,221,0.82)'
            const hover = light ? 'var(--c-texte)' : 'var(--c-ivoire)'
            return (
              <li key={l.href}>
                <a href={l.href} style={{
                  fontFamily: 'var(--f-sans)', fontSize: '1.02rem', color: base,
                  transition: 'color .2s ease',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = hover}
                  onMouseLeave={(e) => e.currentTarget.style.color = base}
                  onFocus={(e) => e.currentTarget.style.color = hover}
                  onBlur={(e) => e.currentTarget.style.color = base}
                >{l.label}</a>
              </li>
            )
          })}
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
                style={{ display: 'block', width: '24px', height: '1.5px', background: open || !light ? 'var(--c-ivoire)' : 'var(--c-texte)' }}
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
