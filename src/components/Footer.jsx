import logo from '../assets/logos/logo footer.png'

const nav = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoir-faire' },
  { label: 'À propos',     href: '#metier' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-noir)', padding: 'clamp(56px, 7vw, 96px) var(--px) 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Grand logo en filigrane, pleine hauteur, ancré à gauche, assombri par un voile */}
      <div className="foot-logo" aria-hidden="true">
        <img src={logo} alt="" />
      </div>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="foot-top" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 'var(--sp-8)',
          paddingBottom: 'clamp(36px, 5vw, 56px)', borderBottom: '1px solid var(--or-15)', marginBottom: 'var(--sp-8)',
        }}>
          {/* Marque + accroche + CTA */}
          <div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', color: 'var(--c-ivoire)', lineHeight: 1, marginBottom: '4px' }}>Achard Créa</div>
            <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.22em', color: 'var(--c-or-pale)', textTransform: 'uppercase', marginBottom: 'var(--sp-6)' }}>Ébéniste · sur mesure</div>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--cr-50)', maxWidth: '30ch', marginBottom: 'var(--sp-6)' }}>
              Mobilier, cuisines et escaliers sur mesure, dessinés et fabriqués à l'atelier dans la vallée de Chamonix.
            </p>
            <a href="#contact" className="btn btn--gold" style={{ padding: '13px 28px', fontSize: '0.64rem' }}>
              <span>Demander un devis</span><span className="arrow" />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em', color: 'var(--cr-35)', textTransform: 'uppercase', marginBottom: 'var(--sp-5)' }}>Navigation</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', color: 'var(--cr-50)', transition: 'color .2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-or-pale)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cr-50)'}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em', color: 'var(--cr-35)', textTransform: 'uppercase', marginBottom: 'var(--sp-5)' }}>Contact</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {[
                { label: '06 34 08 46 90', href: 'tel:+33634084690' },
                { label: 'contact@achard-crea.fr', href: 'mailto:contact@achard-crea.fr' },
                { label: 'Vallée de Chamonix', href: null },
              ].map((c) => (
                <li key={c.label}>
                  {c.href
                    ? <a href={c.href} style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', color: 'var(--cr-50)', transition: 'color .2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-or-pale)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cr-50)'}>{c.label}</a>
                    : <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', color: 'var(--cr-50)' }}>{c.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-3) var(--sp-6)' }}>
          <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--cr-35)', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Achard Créa. Tous droits réservés.
          </span>

          <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--cr-35)', textTransform: 'uppercase' }}>
            Site réalisé par{' '}
            <a href="https://elieageron.com" target="_blank" rel="noopener"
              style={{ color: 'var(--c-or-pale)', borderBottom: '1px solid var(--or-40)', transition: 'color .2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-ivoire)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-or-pale)'}
            >Elie Ageron</a>
          </span>

          <div style={{ display: 'flex', gap: 'var(--sp-6)' }}>
            {['Mentions légales', 'Confidentialité'].map((l) => (
              <a key={l} href="#" style={{ fontFamily: 'var(--f-sc)', fontSize: '0.56rem', letterSpacing: '0.12em', color: 'var(--cr-35)', textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Logo calé dans le coin bas-gauche, collé aux bords */
        .foot-logo {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          display: flex; align-items: flex-end;
          z-index: 0; pointer-events: none; user-select: none;
        }
        .foot-logo img {
          height: 118%;
          width: auto;
          object-fit: contain;
          object-position: left bottom;
          opacity: 0.42;
        }
        /* Voile dégradé : protège la lisibilité du texte côté droit */
        .foot-logo::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(30,24,17,0.28) 0%, rgba(30,24,17,0.74) 56%, var(--c-noir) 100%);
        }
        @media (max-width: 760px) {
          .foot-logo img { opacity: 0.20; }
          .foot-top { grid-template-columns: 1fr 1fr !important; }
          /* La barre flottante fixe (FloatingCTA) recouvre le bas : on dégage l'espace
             pour que le copyright, le crédit et les mentions légales restent lisibles */
          footer { padding-bottom: 96px !important; }
          .foot-bottom { justify-content: flex-start !important; gap: var(--sp-4) !important; }
        }
        @media (max-width: 480px) { .foot-top { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
