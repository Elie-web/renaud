import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import imgMatiere from '../assets/working/DSC09034.webp'
import imgCintrage from '../assets/working/DSC09096.webp'
import imgAssemblage from '../assets/créations renaud/124786510_417682035900216_6567680258826415206_n.webp'
import imgLaiton from '../assets/working/286228920_556145752805131_3350369565849358194_n.webp'
import imgAtelier from '../assets/Renaud/DSC08872.webp'
import imgEtabli from '../assets/Renaud/DSC08929.webp'

const ease = [0.22, 1, 0.36, 1]

// Savoir-faire : le geste, la matière, le détail (pas les pièces finies → c'est Réalisations).
const pieces = [
  { cat: 'Le bois',     title: 'Bois massifs',     line: 'Essences françaises choisies en scierie, jamais de panneaux.', img: imgMatiere },
  { cat: 'Cintrage',    title: 'Courbes en noyer', line: 'Pièces cintrées, taillées et poncées à la main.',              img: imgCintrage },
  { cat: 'Assemblages', title: "Queue-d'aronde",   line: 'Assemblages traditionnels, sans vis ni clou.',                 img: imgAssemblage },
  { cat: 'Le détail',   title: 'Laiton tourné',    line: 'Pièces métalliques façonnées et intégrées à la main.',         img: imgLaiton },
  { cat: "L'atelier",   title: 'Rien sous-traité', line: "Tout sort d'un seul atelier, de la découpe à la finition.",    img: imgAtelier },
  { cat: "À l'établi",  title: 'Monté & contrôlé', line: 'Chaque pièce assemblée et vérifiée avant de partir.',          img: imgEtabli },
]

function Arrow() {
  return (
    <svg className="sf-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function Card({ s, index }) {
  return (
    <motion.a
      className="sf-link"
      href="#contact"
      aria-label={`${s.title} — parlons de votre projet`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.65, delay: Math.min(index * 0.07, 0.28), ease }}
    >
      <img
        className="sf-img"
        src={s.img}
        alt={`${s.title} — savoir-faire de Renaud Achard, ébéniste dans la vallée de Chamonix`}
        loading="lazy" decoding="async"
      />
      <span className="sf-over" aria-hidden="false">
        <span className="sf-cat">{s.cat}</span>
        <span className="sf-titrow">
          <h3 className="sf-title">{s.title}</h3>
          <Arrow />
        </span>
        <p className="sf-line">{s.line}</p>
      </span>
    </motion.a>
  )
}

export default function Services() {
  return (
    <section id="savoir-faire" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Le soin du <Accent>détail.</Accent></>}
          lead="Bois massifs choisis en scierie, assemblages traditionnels, finitions à la main. Chaque pièce est façonnée et contrôlée par mes soins, à l'atelier."
          style={{ marginBottom: 'clamp(56px, 7vw, 96px)' }}
        />

        <div className="sf-gallery">
          {pieces.map((s, i) => (
            <Card key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* galerie masonry : chaque image garde son format naturel */
        .sf-gallery {
          column-count: 4;
          column-gap: clamp(18px, 2vw, 30px);
        }
        @media (max-width: 1100px) { .sf-gallery { column-count: 3; } }
        @media (max-width: 760px)  { .sf-gallery { column-count: 2; } }
        @media (max-width: 480px)  { .sf-gallery { column-count: 1; } }

        .sf-link {
          position: relative; display: block;
          break-inside: avoid; -webkit-column-break-inside: avoid;
          margin-bottom: clamp(20px, 2.4vw, 36px);
          border-radius: 14px; overflow: hidden;
          box-shadow: var(--shadow-sm); outline: 1px solid rgba(20,15,9,0.06); outline-offset: -1px;
          transition: box-shadow var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .sf-link:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
        .sf-link:active { transform: translateY(-4px) scale(0.99); }
        .sf-link:focus-visible { outline: 2px solid var(--c-or-dim); outline-offset: 3px; }

        .sf-img {
          width: 100%; height: auto; display: block;
          background: var(--c-brun-md);
          transition: transform 700ms var(--ease); will-change: transform;
        }
        .sf-link:hover .sf-img,
        .sf-link:focus-visible .sf-img { transform: scale(1.05); }

        /* texte : invisible au repos, révélé au survol sur un voile dégradé */
        .sf-over {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: clamp(16px, 1.7vw, 26px);
          background: linear-gradient(to top,
            rgba(20,15,9,0.88) 0%, rgba(20,15,9,0.62) 26%,
            rgba(20,15,9,0.18) 50%, rgba(20,15,9,0) 72%);
          opacity: 0;
          transition: opacity var(--dur-mid) var(--ease);
        }
        .sf-link:hover .sf-over,
        .sf-link:focus-visible .sf-over { opacity: 1; }

        /* petit décalage staggeré du texte à l'apparition */
        .sf-over > * {
          transform: translateY(12px);
          transition: transform var(--dur-mid) var(--ease);
        }
        .sf-link:hover .sf-over > *,
        .sf-link:focus-visible .sf-over > * { transform: none; }
        .sf-over > .sf-cat    { transition-delay: 0ms; }
        .sf-over > .sf-titrow { transition-delay: 45ms; }
        .sf-over > .sf-line   { transition-delay: 90ms; }

        .sf-cat {
          font-family: var(--f-sc); font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-or-pale);
          margin-bottom: 12px;
          text-shadow: 0 1px 8px rgba(20,15,9,0.6);
        }
        .sf-titrow { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .sf-title {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.8rem, 2.5vw, 2.7rem); line-height: 1.08; letter-spacing: -0.02em;
          color: var(--c-ivoire); text-wrap: balance;
          text-shadow: 0 1px 2px rgba(20,15,9,0.5), 0 2px 18px rgba(20,15,9,0.5);
        }
        .sf-arrow {
          flex-shrink: 0; width: 26px; height: 26px;
          color: var(--c-or-pale); filter: drop-shadow(0 1px 8px rgba(20,15,9,0.6));
        }
        .sf-line {
          margin-top: 11px;
          font-family: var(--f-sans); font-size: 1.04rem; line-height: 1.5;
          color: rgba(242,235,221,0.94); text-wrap: pretty; max-width: 42ch;
          text-shadow: 0 1px 10px rgba(20,15,9,0.7);
        }

        /* mobile / tablette (tactile, pas de survol) : on affiche le texte en
           permanence — le voile dégradé en bas garantit la lisibilité */
        @media (max-width: 880px) {
          .sf-over { opacity: 1; }
          .sf-over > * { transform: none; }
        }
      `}</style>
    </section>
  )
}
