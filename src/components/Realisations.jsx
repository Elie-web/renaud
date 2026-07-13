import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import { CUISINE_DEFAUT } from '../lib/cuisines'
// Le best-of, sans distinction d'âge : les plus belles pièces de l'atelier,
// nouvelles photos et anciennes mélangées, une par famille au minimum.
import imgTableJeu from '../assets/realisations/meuble/table-basse-jeu-01.webp'
import imgCommode from '../assets/realisations/meuble/commode-chene-cuir-01.webp'
import imgBibliotheque from '../assets/realisations/agencement/bibliotheque-sur-mesure-01.webp'
import imgConsole from '../assets/realisations/meuble/console-marqueterie-01.webp'
import imgTasseaux from '../assets/realisations/agencement/meuble-tasseaux-retroeclaire-02.webp'
import imgChevet from '../assets/realisations/meuble/chevet-vague-rendu-04.webp'
import imgAppoint from '../assets/realisations/meuble/table-appoint-marqueterie-01.webp'
import imgBoite from '../assets/realisations/objet/boite-noyer-02.webp'

const ease = [0.22, 1, 0.36, 1]

// Cadre de taille fixe (object-fit: cover) → aucun décalage de mise en page
// quand on passe d'une pièce à l'autre, quel que soit le format de la photo.
const buildProjects = (cuisine) => [
  { id: 1, cat: 'Cuisine',     title: cuisine.title,                meta: cuisine.meta,                                img: cuisine.img },
  { id: 2, cat: 'Table basse', title: 'Table basse réversible',     meta: 'Noyer massif, plateau jeux de société',      img: imgTableJeu },
  { id: 3, cat: 'Meuble',      title: 'Commode à poignées cuir',    meta: 'Chêne massif & cuir',                 img: imgCommode },
  { id: 4, cat: 'Aménagement', title: 'Bibliothèque sur mesure',    meta: 'Du sol au plafond, alcôves décalées', img: imgBibliotheque },
  { id: 5, cat: 'Console',     title: 'Console marquetée',          meta: 'Frêne & marqueterie',                 img: imgConsole },
  { id: 6, cat: 'Aménagement', title: 'Meuble à tasseaux',          meta: 'Tasseaux rétroéclairés, chêne',       img: imgTasseaux },
  { id: 7, cat: 'Mobilier',    title: 'Chevet « vague & soleil »',  meta: 'Frêne & laque',                       img: imgChevet },
  { id: 8, cat: 'Table',       title: "Table d'appoint marquetée",  meta: 'Marqueterie sur frêne',               img: imgAppoint },
  { id: 9, cat: 'Objet',       title: 'Boîte à couvercle',          meta: 'Noyer & chêne cérusé',                img: imgBoite },
]

const pad = (n) => String(n).padStart(2, '0')

// `cuisine` : les versions brouillon en passent une différente pour que Renaud
// puisse comparer les photos en situation (voir VERSIONS dans App.jsx).
export default function Realisations({ cuisine = CUISINE_DEFAUT }) {
  const reduce = useReducedMotion()
  // Table basse réversible (index 1) affichée par défaut - c'est la plus belle pièce.
  const [active, setActive] = useState(1)
  const projects = buildProjects(cuisine)
  const count = projects.length
  const p = projects[active]

  const select = useCallback((i) => setActive(((i % count) + count) % count), [count])

  // Swipe au doigt sur mobile
  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const sx = touchX.current
    touchX.current = null
    if (sx == null) return
    const dx = e.changedTouches[0].clientX - sx
    if (Math.abs(dx) > 40) select(active + (dx < 0 ? 1 : -1))
  }

  // Sur mobile l'index défile horizontalement → on garde la vignette active visible
  const indexRef = useRef(null)
  useEffect(() => {
    const ul = indexRef.current
    if (!ul || ul.scrollWidth <= ul.clientWidth + 4) return // pas de défilement (desktop)
    const li = ul.children[active]
    if (!li) return
    const target = li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2
    ul.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [active])

  // Une fois la liste défilée jusqu'en bas, le navigateur « verrouille » la molette
  // sur elle : il faut relâcher et refaire un geste pour que la page reparte. On
  // reprend donc la main dès qu'on touche un bord et on transmet le scroll à la page.
  useEffect(() => {
    const el = indexRef.current
    if (!el) return
    const onWheel = (e) => {
      if (el.scrollHeight <= el.clientHeight) return // rail horizontal (mobile) : rien à faire
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if ((dy > 0 && atBottom) || (dy < 0 && atTop)) {
        e.preventDefault()
        window.scrollBy(0, dy)
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Flèches du rail mobile : on n'affiche que celles qui mènent quelque part
  // (rien à gauche si on est tout à gauche, rien à droite si on est au bout).
  const [rail, setRail] = useState({ start: true, end: false, scrollable: false })
  const updateRail = useCallback(() => {
    const ul = indexRef.current
    if (!ul) return
    const scrollable = ul.scrollWidth > ul.clientWidth + 4
    setRail({
      scrollable,
      start: ul.scrollLeft <= 2,
      end: ul.scrollLeft + ul.clientWidth >= ul.scrollWidth - 2,
    })
  }, [])
  useEffect(() => {
    updateRail()
    window.addEventListener('resize', updateRail)
    return () => window.removeEventListener('resize', updateRail)
  }, [updateRail])
  const scrollRail = (dir) => {
    const ul = indexRef.current
    if (ul) ul.scrollBy({ left: dir * ul.clientWidth * 0.8, behavior: 'smooth' })
  }

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
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 1fr)',
            gap: 'clamp(20px, 2.6vw, 52px)',
            alignItems: 'stretch',
          }}
        >
          {/* ── Scène : la pièce en grand ── */}
          <div
            className="real-stage"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              position: 'relative', borderRadius: '20px', overflow: 'hidden',
              background: 'var(--c-brun-md)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <AnimatePresence>
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.7, ease } }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {/* La pièce en plein cadre */}
                <motion.img
                  src={p.img}
                  alt={`${p.title}, ${p.meta}, création sur mesure de l'ébéniste Achard Créa (Chamonix)`}
                  decoding="async"
                  initial={{ scale: reduce ? 1 : 1.04 }}
                  animate={{ scale: reduce ? 1 : 1.08 }}
                  transition={{ scale: { duration: 7.5, ease: 'linear' } }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Voile bas pour la lisibilité de la légende */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(180deg, rgba(20,15,9,0.28) 0%, rgba(20,15,9,0) 30%, rgba(20,15,9,0.34) 58%, rgba(20,15,9,0.92) 100%)',
            }} />

            {/* Numéro filigrane */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(14px, 2vw, 26px)', right: 'clamp(16px, 2.4vw, 30px)', zIndex: 2, display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1, color: 'var(--c-ivoire)', textShadow: '0 2px 20px rgba(20,15,9,0.85), 0 1px 3px rgba(20,15,9,0.9)' }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: '1rem', color: 'rgba(242,235,221,0.8)', textShadow: '0 1px 8px rgba(20,15,9,0.8)' }}>/ {pad(count)}</span>
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
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontWeight: 400, fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: 1.1, color: 'var(--c-ivoire)', marginBottom: '6px', textShadow: '0 2px 18px rgba(20,15,9,0.7)' }}>{p.title}</h3>
                  <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.92rem', color: 'rgba(242,235,221,0.85)', textShadow: '0 1px 10px rgba(20,15,9,0.7)' }}>{p.meta}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Flèches de navigation */}
            <button type="button" className="real-nav real-nav--prev" aria-label="Pièce précédente" onClick={() => select(active - 1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className="real-nav real-nav--next" aria-label="Pièce suivante" onClick={() => select(active + 1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>

          {/* ── Index : vignettes navigables ── */}
          <div className="real-index-wrap">
          <ul className="real-index" ref={indexRef} onScroll={updateRail} role="tablist" aria-label="Pièces de l'atelier">
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

          {/* Flèches du rail (mobile) - affichées seulement si on peut aller par là */}
          <button
            type="button"
            className={`rail-arrow rail-arrow--prev${rail.scrollable && !rail.start ? '' : ' is-off'}`}
            aria-label="Faire défiler vers la gauche" tabIndex={-1}
            onClick={() => scrollRail(-1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button
            type="button"
            className={`rail-arrow rail-arrow--next${rail.scrollable && !rail.end ? '' : ' is-off'}`}
            aria-label="Faire défiler vers la droite" tabIndex={-1}
            onClick={() => scrollRail(1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          </div>
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
        /* hauteur bornée (pas d'aspect-ratio) → l'image remplit TOUTE la largeur
           de sa colonne, même sur un écran large mais peu haut. Sinon le ratio
           1/1 + max-height rétrécissait l'image en petit carré, laissant un vide. */
        .real-stage { height: clamp(440px, 62vh, 660px); }

        .real-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 3; width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(242,235,221,0.45);
          background: rgba(20,15,9,0.34); backdrop-filter: blur(6px);
          color: var(--c-ivoire); cursor: pointer;
          transition: background var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .real-nav:hover { background: var(--c-or); border-color: var(--c-or); }
        .real-nav:active { transform: translateY(-50%) scale(0.94); }
        .real-nav--prev { left: clamp(12px, 1.6vw, 20px); }
        .real-nav--next { right: clamp(12px, 1.6vw, 20px); }

        /* hauteur figée sur celle de la photo (et non « 100% » de la ligne de grille,
           qui s'étirerait à la taille du contenu) → la liste défile au lieu de
           s'allonger sous la photo. */
        .real-index-wrap { position: relative; height: clamp(440px, 62vh, 660px); min-width: 0; }
        .rail-arrow { display: none; }
        .real-index {
          display: flex; flex-direction: column;
          gap: 6px; margin: 0; padding: 0 8px 0 0; list-style: none;
          height: 100%;
          /* liste défilante : les pièces gardent une hauteur lisible et on fait
             défiler s'il y en a beaucoup, plutôt que de tout comprimer.
             Arrivé en bas, la molette repart naturellement sur la page. */
          overflow-y: auto;
          scrollbar-width: thin; scrollbar-color: var(--or-40) transparent;
          -webkit-mask-image: linear-gradient(180deg, #000 calc(100% - 40px), transparent 100%);
          mask-image: linear-gradient(180deg, #000 calc(100% - 40px), transparent 100%);
        }
        .real-index::-webkit-scrollbar { width: 5px; }
        .real-index::-webkit-scrollbar-thumb { background: var(--or-40); border-radius: 3px; }
        .real-index::-webkit-scrollbar-track { background: transparent; }
        .real-index > li { flex: 0 0 auto; display: flex; }
        .real-row {
          position: relative;
          display: flex; align-items: center; gap: 14px;
          width: 100%; text-align: left;
          padding: 10px 12px 10px 16px;
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
          flex-shrink: 0; width: 92px; height: 66px;
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
          .real-stage { height: auto; aspect-ratio: 4 / 5; max-height: 70vh; }
          .real-index-wrap { height: auto; }
          /* on annule la répartition verticale du desktop : ici c'est un rail horizontal */
          .real-index > li { flex: 0 0 auto; }
          .real-row { height: auto; }
          .real-index {
            height: auto;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden; /* sinon le rail capte le scroll vertical de la page */
            scroll-snap-type: x mandatory;
            gap: 10px;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            /* dégradé sur les bords : on devine qu'il y a d'autres pièces à faire défiler */
            -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 34px), transparent 100%);
            mask-image: linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 34px), transparent 100%);
          }
          .real-index::-webkit-scrollbar { display: none; }
          .real-row {
            flex: 0 0 auto; flex-direction: column; align-items: flex-start;
            width: 150px; gap: 10px; padding: 10px;
            scroll-snap-align: start;
          }
          .real-marker { top: auto; bottom: 0; left: 10px; right: 10px; width: auto; height: 3px; }
          .real-thumb { width: 100%; height: 90px; max-height: none; min-height: 0; }
          .real-row-text { width: 100%; }
          .real-title { font-size: 0.92rem; white-space: normal; }

          /* Flèches sans contour : on devine juste qu'on peut slider */
          .real-nav {
            width: 40px; height: 40px;
            background: transparent; border: none; backdrop-filter: none;
          }
          .real-nav:hover { background: transparent; border-color: transparent; }
          .real-nav:active { background: transparent; }
          .real-nav svg { filter: drop-shadow(0 1px 6px rgba(20,15,9,0.9)); }
        }

        @media (max-width: 480px) {
          .real-row { width: 132px; }
        }

        /* Flèches du rail - uniquement sur mobile (là où le rail défile) */
        @media (max-width: 920px) {
          .rail-arrow {
            display: flex; align-items: center; justify-content: center;
            position: absolute; top: 55px; transform: translateY(-50%);
            z-index: 4; width: 38px; height: 38px; border-radius: 50%;
            border: 1px solid var(--or-20);
            background: rgba(247,242,232,0.92); backdrop-filter: blur(4px);
            color: var(--c-texte); cursor: pointer;
            box-shadow: 0 3px 12px rgba(20,15,9,0.18);
            transition: opacity var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
          }
          .rail-arrow--prev { left: -4px; }
          .rail-arrow--next { right: -4px; }
          .rail-arrow.is-off { opacity: 0; pointer-events: none; }
          .rail-arrow:active { transform: translateY(-50%) scale(0.9); }
        }
      `}</style>
    </section>
  )
}
