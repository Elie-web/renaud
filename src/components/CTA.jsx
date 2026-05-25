import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--c-noir)', padding: 'var(--section-py) var(--px)' }}
    >
      {/* Parallax bg */}
      <motion.div style={{ position: 'absolute', inset: '-20%', y, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1585771724684-38796f21e6f5?auto=format&fit=crop&w=1920&q=80"
          alt=""
          role="presentation"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.10 }}
        />
      </motion.div>

      {/* Subtle grid overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--or-10) 1px, transparent 1px), linear-gradient(90deg, var(--or-10) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="cta-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px, 8vw, 120px)',
          alignItems: 'center',
        }}>

          {/* Left */}
          <div>
            <motion.span
              className="eyebrow eyebrow--light"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-8)' }}
            >
              <span className="gold-line" />
              Votre projet
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 6rem)',
                fontWeight: 400,
                color: 'var(--c-ivoire)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                marginBottom: 'var(--sp-8)',
              }}
            >
              Parlons de votre projet,
              <br /><em style={{ color: 'var(--c-or)' }}>avant qu'il reste une idée.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9, delay: 0.15 }}
              style={{
                fontFamily: 'var(--f-sans)',
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(245,249,247,0.62)',
                maxWidth: '42ch',
                marginBottom: 'var(--sp-6)',
              }}
            >
              On se voit. Vous m'expliquez ce que vous cherchez, je regarde l'espace. Je vous dis ce que je peux faire, et à quel prix.
            </motion.p>

            {/* Availability signal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                border: '1px solid var(--or-25)',
                borderRadius: 'var(--r-pill)',
                background: 'rgba(196,160,64,0.05)',
              }}
            >
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--c-vert)',
                boxShadow: '0 0 0 3px rgba(124,184,122,0.22)',
                flexShrink: 0,
                animation: 'pulse-g 2.2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--f-sc)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                color: 'rgba(245,249,247,0.55)',
                textTransform: 'uppercase',
              }}>
                Prochain créneau · <span style={{ color: 'var(--c-vert)' }}>Septembre 2026</span>
              </span>
            </motion.div>

            <style>{`
              @keyframes pulse-g {
                0%, 100% { box-shadow: 0 0 0 3px rgba(124,184,122,0.22); }
                50%       { box-shadow: 0 0 0 7px rgba(124,184,122,0.08); }
              }
            `}</style>
          </div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div style={{
              border: '1px solid var(--or-20)',
              borderRadius: 'var(--r-md)',
              padding: 'clamp(32px, 4vw, 52px)',
              background: 'rgba(245,249,247,0.02)',
            }}>
              <h3 style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
                fontWeight: 400,
                color: 'var(--c-ivoire)',
                marginBottom: 'var(--sp-8)',
              }}>Me contacter</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-8)' }}>
                {[
                  { href: 'tel:+33600000000',                   icon: '☎', label: 'Appeler',  val: '06 00 00 00 00' },
                  { href: 'mailto:renaud@ebenistemuisier.fr',   icon: '✉', label: 'Écrire',   val: 'renaud@ebenistemuisier.fr' },
                ].map(({ href, icon, label, val }) => (
                  <ContactLink key={label} href={href} icon={icon} label={label} val={val} />
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--or-15)', paddingTop: 'var(--sp-6)' }}>
                <p style={{
                  fontFamily: 'var(--f-sc)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.16em',
                  color: 'rgba(245,249,247,0.28)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--sp-5)',
                }}>Atelier ouvert du lundi au vendredi</p>

                <a href="#contact" className="btn btn--gold btn--full">
                  <span>Envoyer votre projet</span>
                  <span className="arrow" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cta-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function ContactLink({ href, icon, label, val }) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-4)',
        padding: 'var(--sp-5)',
        border: '1px solid var(--or-20)',
        borderRadius: 'var(--r-sm)',
        color: 'var(--c-creme)',
        transition: 'border-color 0.3s var(--ease), background 0.3s var(--ease)',
        background: 'transparent',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c-or)'; e.currentTarget.style.background = 'var(--or-10)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--or-20)'; e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ color: 'var(--c-or)', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--c-or)', marginBottom: '2px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1rem', color: 'var(--c-ivoire)' }}>{val}</div>
      </div>
    </a>
  )
}




