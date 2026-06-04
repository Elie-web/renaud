const nav = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Savoir-faire', href: '#savoir-faire' },
  { label: 'Le déroulé',   href: '#processus' },
  { label: 'Avis',         href: '#avis' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-noir)', padding: 'clamp(56px, 7vw, 96px) var(--px) 32px' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="foot-top" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 'var(--sp-8)',
          paddingBottom: 'clamp(36px, 5vw, 56px)', borderBottom: '1px solid var(--or-15)', marginBottom: 'var(--sp-8)',
        }}>
          {/* Marque + accroche + CTA */}
          <div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', color: 'var(--c-ivoire)', lineHeight: 1, marginBottom: '4px' }}>Achard</div>
            <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.22em', color: 'var(--c-or-pale)', textTransform: 'uppercase', marginBottom: 'var(--sp-6)' }}>Ébéniste · sur mesure</div>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--cr-50)', maxWidth: '30ch', marginBottom: 'var(--sp-6)' }}>
              Mobilier, cuisines et escaliers sur mesure, dessinés et fabriqués à l'atelier en Île-de-France.
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
                { label: '06 00 00 00 00', href: 'tel:+33600000000' },
                { label: 'contact@achard-ebenisterie.fr', href: 'mailto:contact@achard-ebenisterie.fr' },
                { label: 'Île-de-France', href: null },
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--cr-35)', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Achard ébénisterie. Tous droits réservés.
          </span>
          <div style={{ display: 'flex', gap: 'var(--sp-6)' }}>
            {['Mentions légales', 'Confidentialité'].map((l) => (
              <a key={l} href="#" style={{ fontFamily: 'var(--f-sc)', fontSize: '0.56rem', letterSpacing: '0.12em', color: 'var(--cr-35)', textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) { .foot-top { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .foot-top { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
