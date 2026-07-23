import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

// Vitrine par catégorie de ce que fabrique Renaud (avant les réalisations).
import imgCuisine from '../assets/realisations/cuisine/cuisine-ilot-chene-01.webp'
import imgMeuble from '../assets/realisations/meuble/commode-chene-cuir-01.webp'
import imgAmenagement from '../assets/realisations/agencement/bibliotheque-sur-mesure-01.webp'
import imgObjet from '../assets/realisations/objet/boite-noyer-02.webp'

const ease = [0.22, 1, 0.36, 1]

// 4 familles de projets. Le carousel défile horizontalement (scroll + flèches),
// les cartes ne sont plus cliquables une à une → un seul bouton en bas mène au contact.
const categories = [
  {
    cat: 'Cuisines en bois',
    line: 'Des cuisines dessinées autour de votre façon de cuisiner, du plan de travail aux rangements, selon vos goûts.',
    img: imgCuisine,
  },
  {
    cat: 'Meubles sur mesure',
    line: 'Tables, consoles, chevets, bureaux… des pièces uniques, pensées pour votre espace et votre style.',
    img: imgMeuble,
  },
  {
    cat: 'Aménagement intérieur',
    line: 'Bibliothèques, dressings, agencements qui exploitent chaque recoin, parfois jusqu’au plafond.',
    img: imgAmenagement,
  },
  {
    cat: 'Objets',
    line: 'Plateaux, tréteaux, petites pièces du quotidien, travaillés avec le même soin que les grandes.',
    img: imgObjet,
  },
]

function Card({ c, index }) {
  return (
    <motion.article
      className="sf-card"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.65, delay: Math.min(index * 0.07, 0.28), ease }}
    >
      <div className="sf-media">
        <img
          className="sf-img"
          src={c.img}
          alt={`${c.cat}, réalisations sur mesure de Renaud Achard, ébéniste dans la vallée de Chamonix`}
          loading="lazy" decoding="async"
        />
      </div>
      {/* texte SOUS l'image (plus rien sur la photo) → propre et aligné */}
      <div className="sf-cap">
        <h3 className="sf-title">{c.cat}</h3>
        <p className="sf-line">{c.line}</p>
      </div>
    </motion.article>
  )
}

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}

export default function Services() {
  const railRef = useRef(null)
  const [rail, setRail] = useState({ start: true, end: false, scrollable: false })

  const update = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const scrollable = el.scrollWidth > el.clientWidth + 4
    setRail({
      scrollable,
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scrollBy = (dir) => {
    const el = railRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section id="savoir-faire" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Ce que je <Accent>fabrique.</Accent></>}
          lead="Meubles, cuisines, agencements ou pièces atypiques : je conçois tout type de projet sur mesure, avec le matériau adapté à chacun, du bois massif au contreplaqué. Je modélise aussi votre pièce en 3D, et je la retouche autant de fois qu’il le faut jusqu’à ce qu’elle vous convienne."
          leadWidth="60ch"
          style={{ marginBottom: 'clamp(44px, 5.5vw, 72px)' }}
        />

        <div className="sf-rail-wrap">
          <div className="sf-rail" ref={railRef} onScroll={update}>
            {categories.map((c, i) => (
              <Card key={c.cat} c={c} index={i} />
            ))}
          </div>

          {/* Flèches (desktop) - masquées si rien à défiler ou en bout de course */}
          <button
            type="button"
            className={`sf-arrow sf-arrow--prev${rail.scrollable && !rail.start ? '' : ' is-off'}`}
            aria-label="Catégorie précédente" onClick={() => scrollBy(-1)}
          ><Chevron dir={-1} /></button>
          <button
            type="button"
            className={`sf-arrow sf-arrow--next${rail.scrollable && !rail.end ? '' : ' is-off'}`}
            aria-label="Catégorie suivante" onClick={() => scrollBy(1)}
          ><Chevron dir={1} /></button>
        </div>

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
        .sf-rail-wrap { position: relative; }
        .sf-rail {
          display: flex; gap: clamp(16px, 1.8vw, 26px);
          /* overflow-y explicite : sans lui il vaut « auto » (dérivé de overflow-x),
             le rail capte la molette et la page ne défile plus quand le curseur
             est sur une carte. Le padding réserve la place du survol (-4px) et de
             l'ombre ; les marges négatives annulent son effet sur la mise en page. */
          overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x mandatory;
          padding: 16px 2px 26px;
          margin: -12px 0 -12px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .sf-rail::-webkit-scrollbar { display: none; }

        .sf-card {
          position: relative; flex: 0 0 auto;
          width: clamp(250px, 28vw, 330px);
          scroll-snap-align: start;
          display: flex; flex-direction: column;
          background: var(--c-blanc);
          border-radius: 16px; overflow: hidden;
          box-shadow: var(--shadow-sm); outline: 1px solid rgba(20,15,9,0.06); outline-offset: -1px;
          transition: box-shadow var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        @media (hover: hover) {
          .sf-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
          .sf-card:hover .sf-img { transform: scale(1.05); }
        }
        .sf-media {
          position: relative; aspect-ratio: 4 / 5; overflow: hidden;
          background: var(--c-brun-md);
        }
        .sf-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 700ms var(--ease); will-change: transform;
        }
        /* légende sous la photo */
        .sf-cap {
          display: flex; flex-direction: column; gap: 7px;
          padding: clamp(16px, 1.4vw, 22px) clamp(16px, 1.4vw, 22px) clamp(18px, 1.6vw, 24px);
        }
        .sf-title {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.3rem, 1.7vw, 1.6rem); line-height: 1.12; letter-spacing: -0.02em;
          color: var(--c-texte); text-wrap: balance;
          /* réserve 2 lignes → les descriptions s'alignent d'une carte à l'autre */
          min-height: 2.24em;
        }
        .sf-line {
          font-family: var(--f-sans); font-size: 0.92rem; line-height: 1.55;
          color: var(--c-texte-2); text-wrap: pretty;
        }

        .sf-arrow {
          /* ~centré sur la photo (la légende est sous l'image) */
          position: absolute; top: 38%; transform: translateY(-50%);
          z-index: 3; width: 50px; height: 50px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--c-pierre);
          background: rgba(253,252,250,0.97); backdrop-filter: blur(4px);
          color: var(--c-texte); cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: opacity var(--dur-mid) var(--ease), background var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), color var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .sf-arrow:hover { background: var(--c-or); border-color: var(--c-or); color: var(--c-ivoire); }
        .sf-arrow:active { transform: translateY(-50%) scale(0.94); }
        .sf-arrow--prev { left: -14px; }
        .sf-arrow--next { right: -14px; }
        /* aux extrémités : la flèche qui ne mène nulle part disparaît proprement */
        .sf-arrow.is-off { opacity: 0; pointer-events: none; }

        /* petit écran (téléphone) : pas de flèches, on glisse au doigt.
           On garde les flèches sur desktop, même les PC à écran tactile. */
        @media (max-width: 760px) {
          .sf-arrow { display: none; }
          .sf-card { width: 78vw; }
        }
      `}</style>
    </section>
  )
}
