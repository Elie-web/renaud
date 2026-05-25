import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const links = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoirfaire' },
  { label: 'Matériaux', href: '#materiaux' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-noir)', padding: 'clamp(48px, 7vw, 96px) var(--px) 32px' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 'var(--sp-8)',
          paddingBottom: 'clamp(40px, 5vw, 64px)',
          borderBottom: '1px solid rgba(196,160,64,0.1)',
          marginBottom: 'var(--sp-8)',
        }} className="footer-top">

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              fontWeight: 400,
              color: 'var(--c-ivoire)',
              marginBottom: '4px',
              lineHeight: 1,
            }}>Achard</div>
            <div style={{
              fontFamily: 'var(--f-sc)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              color: 'var(--c-or)',
              textTransform: 'uppercase',
              marginBottom: 'var(--sp-6)',
            }}>Ébénisteries & Créations</div>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: '0.85rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(245,249,247,0.48)',
              maxWidth: '28ch',
            }}>
              Mobilier sur mesure, fabriqué à l'atelier. De l'esquisse au rendu 3D.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{
              fontFamily: 'var(--f-sc)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(245,249,247,0.25)',
              textTransform: 'uppercase',
              marginBottom: 'var(--sp-5)',
            }}>Navigation</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontFamily: 'var(--f-sans)',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      color: 'rgba(245,249,247,0.45)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--c-or)'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(245,249,247,0.45)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontFamily: 'var(--f-sc)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(245,249,247,0.25)',
              textTransform: 'uppercase',
              marginBottom: 'var(--sp-5)',
            }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {[
                { label: '06 00 00 00 00', href: 'tel:+33600000000' },
                { label: 'renaud@ebenistemuisier.fr', href: 'mailto:renaud@ebenistemuisier.fr' },
                { label: '371 route de la vigne', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: 'var(--f-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: 'rgba(245,249,247,0.45)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--c-or)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(245,249,247,0.45)'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--sp-4)',
        }}>
          <span style={{
            fontFamily: 'var(--f-sc)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(245,249,247,0.32)',
            textTransform: 'uppercase',
          }}>
            © {new Date().getFullYear()} Achard ébénisteries & créations. Tous droits réservés.
          </span>
          <div style={{ display: 'flex', gap: 'var(--sp-6)' }}>
            {['Mentions légales', 'Confidentialité'].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: 'var(--f-sc)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(245,249,247,0.32)',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = 'rgba(245,249,247,0.5)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(245,249,247,0.2)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}




