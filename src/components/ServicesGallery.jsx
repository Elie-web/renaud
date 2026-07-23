import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

/* Savoir-faire - VARIANTE V3 « plus de photos ».
   Galerie masonry dense : beaucoup de visuels, chacun avec une étiquette
   discrète (catégorie / geste). Un seul bouton en bas vers le contact. */

// Le meilleur de tout le catalogue : pièces récentes, anciennes marqueteries,
// rendus 3D et gestes d'atelier, mélangés.
import imgCuisineIlot from '../assets/realisations/cuisine/cuisine-ilot-chene-01.webp'
import imgCuisineFoncee from '../assets/realisations/cuisine/cuisine-chene-fonce-02.webp'
import imgBibliotheque from '../assets/realisations/agencement/bibliotheque-sur-mesure-01.webp'
import imgTasseaux from '../assets/realisations/agencement/meuble-tasseaux-retroeclaire-02.webp'
import imgDressing from '../assets/realisations/agencement/dressing-epicea-01.webp'
import imgBanquette from '../assets/realisations/agencement/etagere-banquette-pierre-01.webp'
import imgCommode from '../assets/realisations/meuble/commode-chene-cuir-01.webp'
import imgTableBasse from '../assets/realisations/meuble/table-basse-jeu-01.webp'
import imgConsoleMarq from '../assets/realisations/meuble/console-marqueterie-01.webp'
import imgChevet from '../assets/realisations/meuble/chevet-vague-rendu-04.webp'
import imgAppoint from '../assets/realisations/meuble/table-appoint-marqueterie-01.webp'
import imgTreteaux from '../assets/realisations/objet/treteaux-frene-01.webp'
import imgBoite from '../assets/realisations/objet/boite-noyer-02.webp'
import imgTerrasse from '../assets/realisations/exterieur/terrasse-claustra-02.webp'
import imgSciage from '../assets/atelier/sciage-scie-japonaise.webp'
import imgTenon from '../assets/atelier/assemblage-tenon-mortaise.webp'

const ease = [0.22, 1, 0.36, 1]

const items = [
  { img: imgCuisineIlot,   tag: 'Cuisines en bois' },
  { img: imgCommode,       tag: 'Meubles sur mesure' },
  { img: imgBibliotheque,  tag: 'Aménagement intérieur' },
  { img: imgConsoleMarq,   tag: 'Marqueterie' },
  { img: imgTableBasse,    tag: 'Table échiquier' },
  { img: imgTasseaux,      tag: 'Tasseaux rétroéclairés' },
  { img: imgBoite,         tag: 'Objets' },
  { img: imgChevet,        tag: 'Rendu 3D' },
  { img: imgDressing,      tag: 'Dressings' },
  { img: imgSciage,        tag: 'Découpe & cintrage' },
  { img: imgCuisineFoncee, tag: 'Façades chêne foncé' },
  { img: imgAppoint,       tag: "Table d'appoint" },
  { img: imgBanquette,     tag: 'Banquettes & étagères' },
  { img: imgTreteaux,      tag: 'Tréteaux sculptés' },
  { img: imgTerrasse,      tag: 'Aménagement extérieur' },
  { img: imgTenon,         tag: 'Tenons & mortaises' },
]

export default function ServicesGallery() {
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
