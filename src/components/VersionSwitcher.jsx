/**
 * Sélecteur de versions — outil de BROUILLON (pas destiné au site final).
 * Compact : pastilles numérotées + nom de la version active affiché.
 * Change le hash (#v1…#vN) → App écoute et re-thème toute la page.
 */
export default function VersionSwitcher({ current, versions }) {
  const ids = Object.keys(versions).map(Number)
  const activeName = versions[current] ? versions[current].name : ''

  return (
    <div className="vswitch" role="group" aria-label="Choisir une version du site">
      <span className="vswitch-label">
        <span className="vswitch-kicker">Brouillon</span>
        <span className="vswitch-active">V{current} · {activeName}</span>
      </span>
      <div className="vswitch-seg">
        {ids.map((id) => (
          <a
            key={id}
            href={`#v${id}`}
            className={`vswitch-btn${current === id ? ' is-active' : ''}`}
            aria-current={current === id ? 'true' : undefined}
            title={versions[id].name}
          >
            {id}
          </a>
        ))}
      </div>

      <style>{`
        .vswitch {
          position: fixed; z-index: 1100;
          left: 50%; bottom: 20px; transform: translateX(-50%);
          display: flex; align-items: center; gap: 16px;
          padding: 8px 10px 8px 20px; border-radius: 100px;
          background: rgba(30,24,17,0.94);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          box-shadow: 0 14px 40px -10px rgba(0,0,0,0.55);
          border: 1px solid rgba(242,235,221,0.14);
          max-width: calc(100vw - 24px);
        }
        .vswitch-label { display: flex; flex-direction: column; gap: 2px; white-space: nowrap; }
        .vswitch-kicker {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.54rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(242,235,221,0.5);
        }
        .vswitch-active {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.82rem; font-weight: 600; color: #F2EBDD;
        }
        .vswitch-seg {
          display: flex; gap: 3px;
          background: rgba(0,0,0,0.28); border-radius: 100px; padding: 4px;
        }
        .vswitch-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 50%;
          font-family: 'DM Sans', system-ui, sans-serif; font-weight: 600; font-size: 0.85rem;
          color: rgba(242,235,221,0.72);
          transition: background .25s ease, color .25s ease;
          cursor: pointer;
        }
        .vswitch-btn:hover { color: #F2EBDD; background: rgba(242,235,221,0.10); }
        .vswitch-btn.is-active { background: #A85D3C; color: #F2EBDD; }

        @media (max-width: 720px) {
          .vswitch-kicker { display: none; }
          .vswitch { bottom: 14px; gap: 10px; padding: 6px 8px 6px 14px; }
          .vswitch-active { font-size: 0.72rem; }
          .vswitch-btn { width: 30px; height: 30px; font-size: 0.8rem; }
        }
      `}</style>
    </div>
  )
}
