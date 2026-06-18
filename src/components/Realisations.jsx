import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import imgConsole from '../assets/créations renaud/20190302_174312136_iOS.webp'
import imgTableJeu from '../assets/créations renaud/rendu.webp'
import imgChevet from '../assets/créations renaud/rendu 7 (6 fermé).webp'
import imgAppoint from '../assets/créations renaud/20190302_175141500_iOS.webp'
import imgTreteaux from '../assets/créations renaud/TRETEAUX.webp'
import imgMarqueterie from '../assets/créations renaud/console japo dessus.webp'

const ease = [0.22, 1, 0.36, 1]

const projects = [
  { id: 1, cat: 'Console',     title: 'Console marquetée',          meta: 'Frêne & marqueterie',   img: imgConsole },
  { id: 2, cat: 'Table basse', title: 'Table échiquier',            meta: 'Noyer & laiton',        img: imgTableJeu },
  { id: 3, cat: 'Mobilier',    title: 'Chevet « vague & soleil »',  meta: 'Frêne & laque',         img: imgChevet },
  { id: 4, cat: 'Table',       title: "Table d'appoint marquetée",  meta: 'Marqueterie sur frêne', img: imgAppoint },
  { id: 5, cat: 'Mobilier',    title: 'Tréteaux sculptés',          meta: 'Frêne massif',          img: imgTreteaux },
  { id: 6, cat: 'Marqueterie', title: 'Plateau « trident »',        meta: 'Marqueterie de bois',   img: imgMarqueterie },
]

const pad = (n) => String(n).padStart(2, '0')

export default function Realisations() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = projects.length
  const p = projects[active]

  const select = useCallback((i) => setActive(((i % count) + count) % count), [count])

  // Défilement lent au repos — vivant dès le chargement, en pause au survol/focus.
  useEffect(() => {
    if (reduce || paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % count), 5200)
    return () => clearInterval(t)
  }, [reduce, paused, count])

  return (
    <section id="realisations" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Réalisations"
          title={<>Quelques pièces <Accent>sorties de l'atelier.</Accent></>}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.8, ease }}
          className="real-stage-wrap"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.55fr) minmax(280px, 0.92fr)',
            gap: 'clamp(20px, 2.6vw, 52px)',
            alignItems: 'start',
          }}
        >
          {/* ── Scène : la pièce en grand ── */}
          <div
            className="real-stage"
            style={{
              position: 'relative', borderRadius: '20px', overflow: 'hidden',
              background: 'var(--c-brun-md)', aspectRatio: '4 / 3',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <AnimatePresence>
              <motion.img
                key={p.id}
                src={p.img}
                alt={`${p.title} — ${p.meta}, création sur mesure de l'ébéniste Achard Créa (Chamonix)`}
                decoding="async"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.0 }}
                animate={{ opacity: 1, scale: reduce ? 1 : 1.09 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.7, ease },
                  scale: { duration: 7.5, ease: 'linear' },
                }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AnimatePresence>

            {/* Voile bas pour la lisibilité de la légende */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(180deg, rgba(20,15,9,0) 38%, rgba(20,15,9,0.16) 60%, rgba(20,15,9,0.82) 100%)',
            }} />

            {/* Numéro filigrane */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(14px, 2vw, 26px)', right: 'clamp(16px, 2.4vw, 30px)', zIndex: 2, display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1, color: 'rgba(242,235,221,0.9)', textShadow: '0 2px 18px rgba(20,15,9,0.5)' }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: '1rem', color: 'rgba(242,235,221,0.55)' }}>/ {pad(count)}</span>
            </div>

            {/* Légende */}
            <div className="real-caption" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, padding: 'clamp(20px, 3vw, 40px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <span className="eyebrow eyebrow--light" style={{ display: 'block', marginBottom: '10px' }}>{p.cat}</span>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: 1.12, color: 'var(--c-ivoire)', marginBottom: '6px' }}>{p.title}</h3>
                  <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.9rem', color: 'rgba(242,235,221,0.78)' }}>{p.meta}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Index : vignettes navigables ── */}
          <ul className="real-index" role="tablist" aria-label="Pièces de l'atelier">
            {projects.map((proj, i) => {
              const isActive = i === active
              return (
                <li key={proj.id} style={{ margin: 0 }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`real-row${isActive ? ' is-active' : ''}`}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="real-marker"
                        className="real-marker"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="real-thumb">
                      <img src={proj.img} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="real-row-text">
                      <span className="real-row-top">
                        <span className="real-num">{pad(i + 1)}</span>
                        <span className="real-title">{proj.title}</span>
                      </span>
                      <span className="real-sub">{proj.meta}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={viewportSettings} transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px, 5vw, 72px)' }}
        >
          <a href="#contact" className="btn btn--outline">
            <span>Parlons de votre projet</span><span className="arrow" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .real-index {
          display: flex; flex-direction: column;
          gap: 6px; margin: 0; padding: 0; list-style: none;
        }
        .real-row {
          position: relative;
          display: flex; align-items: center; gap: 16px;
          width: 100%; text-align: left;
          padding: 10px 14px 10px 18px;
          border: none; background: transparent; cursor: pointer;
          border-radius: 12px;
          transition: background var(--dur-mid) var(--ease);
        }
        .real-row:hover { background: var(--or-10); }
        .real-row.is-active { background: var(--or-15); }
        .real-marker {
          position: absolute; left: 0; top: 12px; bottom: 12px;
          width: 3px; border-radius: 3px; background: var(--c-or);
        }
        .real-thumb {
          flex-shrink: 0; width: 78px; height: 60px;
          border-radius: 8px; overflow: hidden; background: var(--c-brun-md);
        }
        .real-thumb img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(0.7) brightness(0.94);
          opacity: 0.7;
          transition: filter var(--dur-mid) var(--ease), opacity var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .real-row:hover .real-thumb img,
        .real-row.is-active .real-thumb img {
          filter: none; opacity: 1; transform: scale(1.05);
        }
        .real-row-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .real-row-top { display: flex; align-items: baseline; gap: 10px; }
        .real-num {
          font-family: var(--f-sc); font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.12em; color: var(--c-or-dim); opacity: 0.7;
          flex-shrink: 0;
        }
        .real-title {
          font-family: var(--f-serif); font-weight: 400;
          font-size: 1.02rem; line-height: 1.2;
          color: var(--c-texte-2);
          transition: color var(--dur-mid) var(--ease);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .real-row:hover .real-title,
        .real-row.is-active .real-title { color: var(--c-texte); }
        .real-sub {
          font-family: var(--f-sans); font-size: 0.78rem; color: var(--c-texte-2);
          opacity: 0.72; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        @media (max-width: 920px) {
          .real-stage-wrap { grid-template-columns: 1fr !important; }
          .real-index {
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 10px;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .real-index::-webkit-scrollbar { display: none; }
          .real-row {
            flex: 0 0 auto; flex-direction: column; align-items: flex-start;
            width: 150px; gap: 10px; padding: 10px;
            scroll-snap-align: start;
          }
          .real-marker { top: auto; bottom: 0; left: 10px; right: 10px; width: auto; height: 3px; }
          .real-thumb { width: 100%; height: 90px; }
          .real-row-text { width: 100%; }
          .real-title { font-size: 0.92rem; white-space: normal; }
        }

        @media (max-width: 480px) {
          .real-stage { aspect-ratio: 3 / 4 !important; }
          .real-row { width: 132px; }
        }
      `}</style>
    </section>
  )
}
