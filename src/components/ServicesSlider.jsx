import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

/* Savoir-faire — VARIANTE V4 « autre carrousel ».
   Un carrousel plein cadre : une catégorie à la fois, en grand, avec
   flèches + puces. Légende en surimpression bas. Bouton en bas vers contact. */

import imgCuisine from '../assets/working/DSC09086-opt.webp' // TODO photo cuisine
import imgMeuble from '../assets/créations renaud/console japo face.webp'
import imgAmenagement from '../assets/créations renaud/rendu tan.webp'
import imgObjet from '../assets/créations renaud/TRETEAUX.webp'

const ease = [0.22, 1, 0.36, 1]

const cats = [
  { cat: 'Cuisines en bois',      line: 'Des cuisines dessinées autour de votre façon de cuisiner, du plan de travail aux rangements.', img: imgCuisine },
  { cat: 'Meubles sur mesure',    line: 'Tables, consoles, chevets, bureaux… des pièces uniques, pensées pour votre espace.',        img: imgMeuble },
  { cat: 'Aménagement intérieur', line: 'Bibliothèques, dressings, agencements qui exploitent chaque recoin, parfois jusqu’au plafond.', img: imgAmenagement },
  { cat: 'Objets',                line: 'Plateaux, tréteaux, petites pièces du quotidien, travaillés avec le même soin que les grandes.', img: imgObjet },
]

const pad = (n) => String(n).padStart(2, '0')

export default function ServicesSlider() {
  const [active, setActive] = useState(0)
  const count = cats.length
  const go = useCallback((i) => setActive(((i % count) + count) % count), [count])
  const c = cats[active]

  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const sx = touchX.current; touchX.current = null
    if (sx == null) return
    const dx = e.changedTouches[0].clientX - sx
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
  }

  return (
    <section id="savoir-faire" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Ce que je <Accent>fabrique.</Accent></>}
          lead="Meubles, cuisines, agencements ou pièces atypiques : j’ai les compétences pour concevoir tout type de projet sur mesure, avec les matériaux adaptés à chacun — bois massif ou contreplaqué selon l’usage. Et avant la moindre découpe, vous validez un rendu 3D réaliste, facilement modifiable jusqu’à ce qu’il vous ressemble."
          leadWidth="60ch"
          style={{ marginBottom: 'clamp(44px, 5.5vw, 72px)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.8, ease }}
          className="svs-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        >
          <AnimatePresence>
            <motion.img
              key={c.cat} src={c.img} alt={`${c.cat} — Achard Créa, ébéniste dans la vallée de Chamonix`}
              decoding="async"
              initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.6, ease }, scale: { duration: 6, ease: 'linear' } }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AnimatePresence>

          <div aria-hidden="true" className="svs-veil" />

          <div className="svs-index">{pad(active + 1)} <span>/ {pad(count)}</span></div>

          <div className="svs-caption">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.cat}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                <h3 className="svs-cat">{c.cat}</h3>
                <p className="svs-line">{c.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button type="button" className="svs-nav svs-nav--prev" aria-label="Catégorie précédente" onClick={() => go(active - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="svs-nav svs-nav--next" aria-label="Catégorie suivante" onClick={() => go(active + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <div className="svs-dots">
            {cats.map((cc, i) => (
              <button key={cc.cat} type="button" className={`svs-dot${i === active ? ' is-active' : ''}`} aria-label={cc.cat} aria-current={i === active} onClick={() => go(i)} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={viewportSettings} transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px, 5vw, 68px)' }}
        >
          <a href="#contact" className="btn btn--gold">
            <span>Commander une pièce sur mesure</span><span className="arrow" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .svs-stage {
          position: relative; overflow: hidden;
          height: clamp(420px, 60vh, 620px);
          border-radius: 22px; background: var(--c-brun-md); box-shadow: var(--shadow-md);
        }
        .svs-veil {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(20,15,9,0.28) 0%, rgba(20,15,9,0) 34%, rgba(20,15,9,0.36) 62%, rgba(20,15,9,0.9) 100%);
        }
        .svs-index {
          position: absolute; z-index: 2; top: clamp(16px, 2vw, 28px); right: clamp(18px, 2.4vw, 32px);
          font-family: var(--f-serif); font-size: clamp(1.4rem, 3vw, 2.4rem); color: var(--c-ivoire);
          text-shadow: 0 2px 18px rgba(20,15,9,0.8);
        }
        .svs-index span { font-size: 0.9rem; color: rgba(242,235,221,0.8); }
        .svs-caption {
          position: absolute; z-index: 2; left: 0; right: 0; bottom: 0;
          padding: clamp(24px, 3.4vw, 48px) clamp(24px, 3.4vw, 52px) clamp(46px, 5vw, 64px);
        }
        .svs-cat {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.9rem, 3.6vw, 3rem); line-height: 1.06; letter-spacing: -0.02em;
          color: var(--c-ivoire); margin-bottom: 10px; text-shadow: 0 2px 20px rgba(20,15,9,0.7);
        }
        .svs-line {
          font-family: var(--f-sans); font-size: clamp(0.98rem, 1.2vw, 1.12rem); line-height: 1.6;
          color: rgba(242,235,221,0.92); max-width: 52ch; text-shadow: 0 1px 12px rgba(20,15,9,0.7);
        }
        .svs-nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(242,235,221,0.45); background: rgba(20,15,9,0.34);
          -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
          color: var(--c-ivoire); cursor: pointer;
          transition: background var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .svs-nav:hover { background: var(--c-or); border-color: var(--c-or); }
        .svs-nav:active { transform: translateY(-50%) scale(0.94); }
        .svs-nav--prev { left: clamp(14px, 1.8vw, 24px); }
        .svs-nav--next { right: clamp(14px, 1.8vw, 24px); }
        .svs-dots {
          position: absolute; z-index: 3; left: 0; right: 0; bottom: clamp(18px, 2vw, 26px);
          display: flex; justify-content: center; gap: 10px;
        }
        .svs-dot {
          width: 9px; height: 9px; border-radius: 50%; cursor: pointer;
          background: rgba(242,235,221,0.4); border: none;
          transition: background var(--dur-mid) var(--ease), width var(--dur-mid) var(--ease), border-radius var(--dur-mid) var(--ease);
        }
        .svs-dot.is-active { background: var(--c-ivoire); width: 26px; border-radius: 6px; }

        @media (max-width: 560px) {
          .svs-nav { width: 40px; height: 40px; }
        }
      `}</style>
    </section>
  )
}
