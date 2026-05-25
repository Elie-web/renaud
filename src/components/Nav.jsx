import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoirfaire' },
  { label: 'Matériaux',    href: '#materiaux' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: `0 var(--px)`,
          height: scrolled ? '68px' : '88px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: open ? 'var(--c-brun)' : scrolled ? 'rgba(15,10,6,0.88)' : 'transparent',
          backdropFilter: open ? 'none' : scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: open ? 'none' : scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: open ? '1px solid var(--or-20)' : scrolled ? '1px solid var(--or-15)' : 'none',
          transition: 'height 0.5s var(--ease), background 0.4s var(--ease), border-color 0.4s var(--ease)',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: 'flex', flexDirection: 'column', gap: '3px', userSelect: 'none' }}>
          <span style={{
            fontFamily: 'var(--f-serif)',
            fontSize: 'clamp(1.35rem, 2vw, 1.65rem)',
            fontWeight: 400,
            color: 'var(--c-ivoire)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}>Achard</span>
          <span style={{
            fontFamily: 'var(--f-sc)',
            fontSize: '0.52rem',
            letterSpacing: '0.28em',
            color: 'var(--c-or)',
            textTransform: 'uppercase',
          }}>Ébénisteries & Créations</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: 'flex', gap: 'clamp(24px, 3vw, 52px)' }}>
          {links.map((l) => (
            <li key={l.href}>
              <NavLink href={l.href}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right: CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)' }}>
          <a href="#contact" className="btn btn--outline nav-cta" style={{ padding: '12px 28px', fontSize: '0.65rem' }}>
            <span>Votre projet</span>
            <span className="arrow" />
          </a>

          <HamburgerBtn open={open} onClick={() => setOpen(!open)} />
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: scrolled ? '68px' : '88px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--c-brun)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 var(--px) clamp(40px, 6vh, 80px)',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: 'var(--f-serif)',
                      fontSize: 'clamp(2.2rem, 9vw, 4rem)',
                      fontWeight: 400,
                      color: 'var(--c-ivoire)',
                      lineHeight: 1.1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--sp-4)',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', color: 'var(--c-or)', letterSpacing: '0.15em', marginTop: '4px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div style={{ marginTop: 'var(--sp-16)', borderTop: '1px solid var(--or-20)', paddingTop: 'var(--sp-8)' }}>
              <a href="#contact" className="btn btn--gold" onClick={() => setOpen(false)}>
                <span>Démarrer un projet</span>
                <span className="arrow" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta   { display: none !important; }
          .nav-ham   { display: flex !important; }
        }
        .nav-ham { display: none; }
      `}</style>
    </>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--f-sc)',
        fontSize: '0.66rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--cr-65)',
        position: 'relative',
        paddingBottom: '4px',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-or)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cr-65)' }}
    >
      {children}
    </a>
  )
}

function HamburgerBtn({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      className="nav-ham"
      style={{ flexDirection: 'column', gap: '5px', padding: '8px' }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            rotate: open && i === 0 ? 45 : open && i === 2 ? -45 : 0,
            y:      open && i === 0 ? 7  : open && i === 2 ? -7  : 0,
            opacity: open && i === 1 ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ display: 'block', width: '22px', height: '1px', background: 'var(--c-ivoire)' }}
        />
      ))}
    </button>
  )
}
