import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

/* Savoir-faire - VARIANTE V3 « plus de photos ».
   Galerie masonry dense : beaucoup de visuels, chacun avec une étiquette
   discrète (catégorie / geste). Un seul bouton en bas vers le contact. */

import img1 from '../assets/créations renaud/console japo face.webp'
import img2 from '../assets/working/DSC09096.webp'
import img3 from '../assets/créations renaud/124786510_417682035900216_6567680258826415206_n.webp'
import img4 from '../assets/créations renaud/rendu tan.webp'
import img5 from '../assets/working/125923338_379859523234117_6351789028901921509_n.webp'
import img6 from '../assets/créations renaud/TRETEAUX.webp'
import img7 from '../assets/working/124979027_5294257680600333_1820063589436393798_n.webp'
import img8 from '../assets/Renaud/DSC08872.webp'
import img9 from '../assets/créations renaud/20190302_174312136_iOS.webp'
import img10 from '../assets/working/DSC09010-opt.webp'

const ease = [0.22, 1, 0.36, 1]

const items = [
  { img: img1,  tag: 'Meubles sur mesure' },
  { img: img2,  tag: 'Découpe & cintrage' },
  { img: img3,  tag: 'Assemblages' },
  { img: img4,  tag: 'Aménagement intérieur' },
  { img: img5,  tag: 'Piètement sculpté' },
  { img: img6,  tag: 'Objets' },
  { img: img7,  tag: 'Tenons & mortaises' },
  { img: img8,  tag: "L'atelier" },
  { img: img9,  tag: 'Marqueterie' },
  { img: img10, tag: 'Débit & calibrage' },
]

export default function ServicesGallery() {
  return (
    <section id="savoir-faire" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Ce que je <Accent>fabrique.</Accent></>}
          lead="Meubles, cuisines, agencements ou pièces atypiques : j’ai les compétences pour concevoir tout type de projet sur mesure, avec les matériaux adaptés à chacun : bois massif ou contreplaqué selon l’usage. Et avant la moindre découpe, vous validez un rendu 3D réaliste, facilement modifiable jusqu’à ce qu’il vous ressemble."
          leadWidth="60ch"
          style={{ marginBottom: 'clamp(44px, 5.5vw, 72px)' }}
        />

        <div className="svg-masonry">
          {items.map((it, i) => (
            <motion.figure
              key={i} className="svg-tile"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings} transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease }}
            >
              <img src={it.img} alt={`${it.tag}, savoir-faire de Renaud Achard, ébéniste dans la vallée de Chamonix`} loading="lazy" decoding="async" />
              <figcaption className="svg-tag">{it.tag}</figcaption>
            </motion.figure>
          ))}
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
        .svg-masonry { column-count: 4; column-gap: clamp(14px, 1.6vw, 24px); }
        @media (max-width: 1100px) { .svg-masonry { column-count: 3; } }
        @media (max-width: 720px)  { .svg-masonry { column-count: 2; column-gap: 12px; } }

        .svg-tile {
          position: relative; margin: 0 0 clamp(14px, 1.6vw, 24px);
          break-inside: avoid; -webkit-column-break-inside: avoid;
          border-radius: 14px; overflow: hidden;
          box-shadow: var(--shadow-sm); outline: 1px solid rgba(20,15,9,0.06); outline-offset: -1px;
        }
        .svg-tile img {
          width: 100%; height: auto; display: block; background: var(--c-brun-md);
          transition: transform 700ms var(--ease);
        }
        @media (hover: hover) { .svg-tile:hover img { transform: scale(1.05); } }
        .svg-tag {
          position: absolute; left: 12px; bottom: 12px;
          padding: 6px 12px; border-radius: var(--r-pill);
          background: rgba(20,15,9,0.62);
          -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
          font-family: var(--f-sc); font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-ivoire);
        }
      `}</style>
    </section>
  )
}
