import { useState } from 'react'

/**
 * Panneau de personnalisation LIVE - présent sur toutes les versions.
 * Renaud teste : couleur d'accent, police des titres, image du hero et
 * disposition du hero, sans recharger. « Auto » = garde le choix de la version.
 * Outil de brouillon, pas destiné au site final.
 */

const SWATCHES = [
  { name: 'Argile',    hex: '#A85D3C' },
  { name: 'Terre',     hex: '#8A4A2C' },
  { name: 'Doré',      hex: '#A86A30' },
  { name: 'Lie-de-vin', hex: '#7C3B3B' },
  { name: 'Olive',     hex: '#5F6B3F' },
  { name: 'Noyer',     hex: '#6B4E3D' },
  { name: 'Bleu plan', hex: '#3E6B82' },
  { name: 'Encre',     hex: '#2B2620' },
]

const FONTS = [
  { name: 'Auto (version)',       css: '' },
  { name: 'Fraunces',             css: "'Fraunces', Georgia, serif" },
  { name: 'Playfair Display',     css: "'Playfair Display', Georgia, serif" },
  { name: 'Cormorant Garamond',   css: "'Cormorant Garamond', Georgia, serif" },
  { name: 'Marcellus',            css: "'Marcellus', Georgia, serif" },
  { name: 'Jost (sans)',          css: "'Jost', system-ui, sans-serif" },
  { name: 'Archivo (sans)',       css: "'Archivo', system-ui, sans-serif" },
  { name: 'Bricolage Grotesque',  css: "'Bricolage Grotesque', system-ui, sans-serif" },
]

export default function ThemeCustomizer({ value, onChange, heroes = [], layouts = [] }) {
  const [open, setOpen] = useState(false)
  const set = (patch) => onChange({ ...value, ...patch })
  const reset = () => onChange({ accent: '', font: '', hero: '', layout: '', caps: false })
  const touched = value.accent || value.font || value.hero || value.layout || value.caps

  if (!open) {
    return (
      <button type="button" className="tc-fab" onClick={() => setOpen(true)} aria-label="Personnaliser l'apparence">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" />
          <path d="M12 2a10 10 0 1 0 0 20c1 0 1.5-.8 1.5-1.5 0-1.5-1.5-1.5-1.5-3 0-1 1-1.5 2-1.5h1.5A4.5 4.5 0 0 0 20 11 8 8 0 0 0 12 2z" />
        </svg>
        <span className="tc-fab-txt">Personnaliser</span>
        {touched ? <span className="tc-dot" aria-hidden="true" /> : null}
      </button>
    )
  }

  return (
    <div className="tc" role="group" aria-label="Personnaliser l'apparence">
      <div className="tc-top">
        <div className="tc-head">
          <span className="tc-kicker">Test · personnalise</span>
          <span className="tc-title">Couleur, police & hero</span>
        </div>
        <button type="button" className="tc-x" onClick={() => setOpen(false)} aria-label="Fermer">×</button>
      </div>

      <div className="tc-scroll">
        <div className="tc-block">
          <span className="tc-lbl">Couleur d’accent</span>
          <div className="tc-swatches">
            <button type="button" className={`tc-auto${!value.accent ? ' is-active' : ''}`} onClick={() => set({ accent: '' })}>Auto</button>
            {SWATCHES.map((s) => (
              <button
                key={s.hex} type="button" title={s.name}
                className={`tc-sw${value.accent.toLowerCase() === s.hex.toLowerCase() ? ' is-active' : ''}`}
                style={{ background: s.hex }}
                onClick={() => set({ accent: s.hex })}
                aria-label={s.name}
              />
            ))}
            <label className="tc-pick" title="Couleur libre">
              <input type="color" value={value.accent || '#A85D3C'} onChange={(e) => set({ accent: e.target.value })} />
              <span aria-hidden="true">+</span>
            </label>
          </div>
        </div>

        <div className="tc-block">
          <span className="tc-lbl">Police des titres</span>
          <select className="tc-select" value={value.font} onChange={(e) => set({ font: e.target.value })}>
            {FONTS.map((f) => <option key={f.name} value={f.css}>{f.name}</option>)}
          </select>
        </div>

        {/* Demandé par Renaud : voir ce que donnent les titres tout en capitales. */}
        <div className="tc-block">
          <span className="tc-lbl">Casse des titres</span>
          <div className="tc-chips">
            <button type="button" className={`tc-chip${!value.caps ? ' is-active' : ''}`} onClick={() => set({ caps: false })}>Normale</button>
            <button type="button" className={`tc-chip${value.caps ? ' is-active' : ''}`} onClick={() => set({ caps: true })}>MAJUSCULES</button>
          </div>
        </div>

        <div className="tc-block">
          <span className="tc-lbl">Image du hero</span>
          <div className="tc-thumbs">
            <button type="button" className={`tc-auto${!value.hero ? ' is-active' : ''}`} onClick={() => set({ hero: '' })}>Auto</button>
            {heroes.map((h) => (
              <button
                key={h.src} type="button" title={h.label}
                className={`tc-thumb${value.hero === h.src ? ' is-active' : ''}`}
                onClick={() => set({ hero: h.src })}
                aria-label={h.label}
              >
                <img src={h.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="tc-block">
          <span className="tc-lbl">Disposition du hero</span>
          <div className="tc-chips">
            <button type="button" className={`tc-chip${!value.layout ? ' is-active' : ''}`} onClick={() => set({ layout: '' })}>Auto</button>
            {layouts.map((l) => (
              <button
                key={l.key} type="button"
                className={`tc-chip${value.layout === l.key ? ' is-active' : ''}`}
                onClick={() => set({ layout: l.key })}
              >{l.label}</button>
            ))}
          </div>
        </div>
      </div>

      {touched ? (
        <button type="button" className="tc-reset" onClick={reset}>Réinitialiser</button>
      ) : null}

      <style>{`
        .tc-fab {
          position: fixed; z-index: 1100; left: 20px; bottom: 20px;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 18px 11px 14px; border-radius: 100px;
          background: rgba(30,24,17,0.94); color: #F2EBDD;
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          border: 1px solid rgba(242,235,221,0.16);
          box-shadow: 0 14px 40px -10px rgba(0,0,0,0.55);
          font-family: 'DM Sans', system-ui, sans-serif; font-size: 0.78rem; font-weight: 600;
          cursor: pointer;
        }
        .tc-fab-txt { letter-spacing: 0.02em; }
        .tc-dot { width: 7px; height: 7px; border-radius: 50%; background: #C2744E; }

        .tc {
          position: fixed; z-index: 1100; left: 20px; bottom: 20px;
          width: 268px; max-height: min(78vh, 620px);
          display: flex; flex-direction: column;
          padding: 16px; border-radius: 16px;
          background: rgba(30,24,17,0.96);
          -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
          border: 1px solid rgba(242,235,221,0.16);
          box-shadow: 0 14px 40px -10px rgba(0,0,0,0.6);
          color: #F2EBDD; font-family: 'DM Sans', system-ui, sans-serif;
        }
        .tc-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
        .tc-head { display: flex; flex-direction: column; gap: 2px; }
        .tc-kicker { font-size: 0.52rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(242,235,221,0.5); }
        .tc-title { font-size: 0.92rem; font-weight: 600; }
        .tc-x { width: 26px; height: 26px; border-radius: 8px; background: rgba(242,235,221,0.08); color: #F2EBDD; font-size: 1.1rem; line-height: 1; cursor: pointer; flex-shrink: 0; }
        .tc-x:hover { background: rgba(242,235,221,0.16); }

        .tc-scroll { overflow-y: auto; margin: 0 -4px; padding: 0 4px; }
        .tc-scroll::-webkit-scrollbar { width: 4px; }
        .tc-scroll::-webkit-scrollbar-thumb { background: rgba(242,235,221,0.2); border-radius: 4px; }

        .tc-block { margin-bottom: 16px; }
        .tc-lbl { display: block; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(242,235,221,0.6); margin-bottom: 9px; }

        .tc-swatches, .tc-thumbs, .tc-chips { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
        .tc-sw { width: 25px; height: 25px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; box-shadow: 0 0 0 1px rgba(242,235,221,0.2); transition: transform .15s ease, border-color .15s ease; }
        .tc-sw:hover { transform: scale(1.12); }
        .tc-sw.is-active { border-color: #F2EBDD; }
        .tc-pick { position: relative; width: 25px; height: 25px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; background: rgba(242,235,221,0.12); box-shadow: 0 0 0 1px rgba(242,235,221,0.2); font-size: 0.95rem; line-height: 1; }
        .tc-pick input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

        .tc-auto, .tc-chip {
          padding: 6px 11px; border-radius: 100px; cursor: pointer;
          background: rgba(242,235,221,0.08); color: rgba(242,235,221,0.82);
          border: 1px solid transparent; font-family: inherit; font-size: 0.72rem; font-weight: 500;
          transition: background .15s ease, color .15s ease;
        }
        .tc-auto:hover, .tc-chip:hover { background: rgba(242,235,221,0.16); color: #F2EBDD; }
        .tc-auto.is-active, .tc-chip.is-active { background: #A85D3C; color: #F2EBDD; }

        .tc-thumb { width: 50px; height: 36px; border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; box-shadow: 0 0 0 1px rgba(242,235,221,0.2); padding: 0; }
        .tc-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tc-thumb.is-active { border-color: #F2EBDD; }

        .tc-select { width: 100%; padding: 10px 12px; border-radius: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(242,235,221,0.18); color: #F2EBDD; font-family: inherit; font-size: 0.82rem; cursor: pointer; }
        .tc-select option { color: #231C15; }

        .tc-reset { margin-top: 12px; padding: 10px; border-radius: 10px; background: rgba(242,235,221,0.1); color: #F2EBDD; font-family: inherit; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
        .tc-reset:hover { background: rgba(242,235,221,0.18); }

        @media (max-width: 720px) {
          .tc { left: 12px; right: 12px; bottom: 62px; width: auto; }
          .tc-fab { bottom: 62px; }
          .tc-fab-txt { display: none; }
        }
      `}</style>
    </div>
  )
}
