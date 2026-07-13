import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import imgFeature from '../assets/realisations/agencement/bibliotheque-sur-mesure-01.webp'

/* Savoir-faire - VARIANTE V2 « moins de photos ».
   Parti pris éditorial : une seule grande image + les 4 familles en liste
   typographique (numérotée). Beaucoup de texte, très peu d'images. */

const ease = [0.22, 1, 0.36, 1]

const cats = [
  { cat: 'Cuisines en bois',      line: 'Dessinées autour de votre façon de cuisiner, du plan de travail aux rangements.' },
  { cat: 'Meubles sur mesure',    line: 'Tables, consoles, chevets, bureaux… des pièces uniques, pensées pour votre espace.' },
  { cat: 'Aménagement intérieur', line: 'Bibliothèques, dressings, agencements qui exploitent chaque recoin.' },
  { cat: 'Objets',                line: 'Plateaux, tréteaux, petites pièces du quotidien, travaillés avec le même soin.' },
]

export default function ServicesFewer() {
  return (
    <section id="savoir-faire" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Ce que je <Accent>fabrique.</Accent></>}
          lead="Meubles, cuisines, agencements ou pièces atypiques : j’ai les compétences pour concevoir tout type de projet sur mesure, avec les matériaux adaptés à chacun : bois massif ou contreplaqué selon l’usage. Et avant la moindre découpe, vous validez un rendu 3D réaliste de votre pièce, facilement modifiable jusqu’à ce qu’il vous ressemble."
          leadWidth="60ch"
          style={{ marginBottom: 'clamp(44px, 5.5vw, 72px)' }}
        />

        <div className="svf-grid">
          <motion.div
            className="svf-media"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings} transition={{ duration: 0.9, ease }}
          >
            <img src={imgFeature} alt="Bibliothèque sur mesure en bois, du sol au plafond, Achard Créa, ébéniste dans la vallée de Chamonix" loading="lazy" decoding="async" />
          </motion.div>

          <div className="svf-list">
            {cats.map((c, i) => (
              <motion.div
                key={c.cat} className="svf-row"
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings} transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <span className="svf-num">0{i + 1}</span>
                <div className="svf-text">
                  <h3 className="svf-cat">{c.cat}</h3>
                  <p className="svf-line">{c.line}</p>
                </div>
              </motion.div>
            ))}
            <motion.a
              href="#contact" className="btn btn--gold svf-btn"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span>Commander une pièce sur mesure</span><span className="arrow" />
            </motion.a>
          </div>
        </div>
      </div>

      <style>{`
        .svf-grid {
          display: grid; grid-template-columns: 0.92fr 1fr;
          gap: clamp(40px, 6vw, 96px); align-items: center;
        }
        .svf-media {
          aspect-ratio: 4 / 5; border-radius: 18px; overflow: hidden;
          box-shadow: var(--shadow-md); background: var(--c-brun-md);
        }
        .svf-media img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .svf-list { display: flex; flex-direction: column; }
        .svf-row {
          display: flex; gap: clamp(16px, 1.6vw, 24px); align-items: baseline;
          padding: clamp(20px, 2vw, 28px) 0;
          border-top: 1px solid var(--c-pierre);
        }
        .svf-row:first-child { border-top: none; padding-top: 0; }
        .svf-num {
          font-family: var(--f-sc); font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; color: var(--c-or-dim); flex-shrink: 0;
        }
        .svf-cat {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.5rem, 2.4vw, 2.1rem); line-height: 1.1; letter-spacing: -0.02em;
          color: var(--c-texte); margin-bottom: 6px;
        }
        .svf-line {
          font-family: var(--f-sans); font-size: clamp(0.95rem, 1.1vw, 1.05rem); line-height: 1.6;
          color: var(--c-texte-2); max-width: 46ch;
        }
        .svf-btn { margin-top: clamp(28px, 3vw, 40px); align-self: flex-start; }

        @media (max-width: 860px) {
          .svf-grid { grid-template-columns: 1fr; gap: clamp(32px, 6vw, 48px); }
          .svf-media { max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
