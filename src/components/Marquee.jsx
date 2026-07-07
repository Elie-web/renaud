/* Bandeau MARQUEE — défilé horizontal infini de mots-clés (texture graphique
   très différente des autres sections). Pause au survol. */
const WORDS = [
  'Cuisines sur mesure', 'Meubles design', 'Bibliothèques', 'Escaliers',
  'Marqueterie', 'Aménagement intérieur', 'Dressings', 'Rendu 3D', 'Bois massif',
]

export default function Marquee() {
  const items = [...WORDS, ...WORDS]
  return (
    <section style={{ background: 'var(--c-blanc)', padding: 'clamp(28px, 4vw, 52px) 0', borderTop: '1px solid var(--c-pierre)', borderBottom: '1px solid var(--c-pierre)', overflow: 'hidden' }}>
      <div className="mq" aria-hidden="true">
        <div className="mq-track">
          {items.map((w, i) => (
            <span key={i} className="mq-item">
              {w}
              <span className="mq-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .mq { display: flex; width: 100%; }
        .mq-track {
          display: flex; align-items: center; flex-shrink: 0;
          gap: clamp(20px, 3vw, 44px);
          padding-left: clamp(20px, 3vw, 44px);
          white-space: nowrap;
          animation: mq-scroll 34s linear infinite;
          will-change: transform;
        }
        .mq:hover .mq-track { animation-play-state: paused; }
        .mq-item {
          display: inline-flex; align-items: center; gap: clamp(20px, 3vw, 44px);
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.4rem, 3vw, 2.4rem); letter-spacing: -0.01em;
          color: var(--c-texte);
        }
        .mq-dot { color: var(--c-or); font-size: 0.7em; }
        @keyframes mq-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .mq-track { animation: none; } }
      `}</style>
    </section>
  )
}
