import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import portrait from '../assets/Renaud/DSC09023.webp'

const ease = [0.22, 1, 0.36, 1]

// Diplômes mis en avant ici (et non plus dans une bande de stats qu'on scrolle).
const formation = [
  { k: 'CAP', v: 'Ébénisterie' },
  { k: 'BMA', v: 'Ébéniste diplômé' },
  { k: 'DNMADE', v: 'Mobilier contemporain' },
]

export default function Metier() {
  return (
    <section id="metier" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="metier-grid" style={{
          display: 'grid', gridTemplateColumns: '0.82fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center',
        }}>
          {/* Portrait + cadre décalé + badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings}
            transition={{ duration: 0.9, ease }}
            className="metier-img"
          >
            <span className="metier-frame" aria-hidden="true" />
            <div className="metier-photo">
              <img
                src={portrait}
                alt="Renaud Achard, ébéniste, traçant une planche de noyer dans son atelier" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span className="metier-badge">
              <span className="metier-badge-dot" aria-hidden="true" />
              Ébéniste depuis 2017
            </span>
          </motion.div>

          {/* Texte resserré */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="metier-text"
          >
            <div className="metier-head">
              <span className="metier-kicker">Renaud Achard · Ébéniste</span>

              <h2 className="metier-statement">
                Le&nbsp;bois, ma&nbsp;matière.{' '}
                <em>Votre&nbsp;intérieur, ma&nbsp;raison.</em>
              </h2>

              <p className="metier-lead">
                Un seul artisan, du premier croquis à la pose. De mes mains aux vôtres,
                sans intermédiaire&nbsp;: vous savez toujours qui prend soin de votre projet.
              </p>

              <p className="metier-story">
                J'ai grandi avec le bois. Son odeur, sa chaleur, le temps qu'il faut
                pour bien le travailler. Avec les années, j'ai appris à le lire&nbsp;:
                à suivre son fil plutôt qu'à le forcer.
              </p>

              <p className="metier-story">
                Création artisanale pure. Je travaille à la lumière du jour, sur
                des pièces qui trouvent leur place chez vous pour vous accompagner. Vous
                m'apportez une idée, je la concrétise.
              </p>
            </div>

            <div className="metier-body">
            <div className="metier-parcours">
              <div className="metier-parcours-head">
                <span className="metier-parcours-label">Formation</span>
                <span className="metier-parcours-place">Coarraze, puis Lyon</span>
              </div>
              <div className="metier-diplomas">
                {formation.map((f) => (
                  <div key={f.k} className="metier-diploma">
                    <span className="metier-diploma-k">{f.k}</span>
                    <span className="metier-diploma-v">{f.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="metier-sign">
              <span className="metier-sign-name">Renaud</span>
              <span className="metier-sign-rule" aria-hidden="true" />
              <span className="metier-sign-meta">Dessiné, fabriqué &amp; posé par mes soins</span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .metier-img { position: relative; }
        .metier-photo {
          position: relative; z-index: 1;
          aspect-ratio: 4 / 5; overflow: hidden;
          border-radius: 16px; box-shadow: var(--shadow-md);
        }
        .metier-frame {
          position: absolute; z-index: 0;
          inset: 0; transform: translate(18px, 18px);
          border: 1px solid var(--or-40);
          border-radius: 16px;
        }
        .metier-badge {
          position: absolute; z-index: 2;
          left: -16px; bottom: 28px;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 18px;
          background: var(--c-blanc);
          border: 1px solid var(--c-pierre);
          border-radius: var(--r-pill);
          box-shadow: var(--shadow-md);
          font-family: var(--f-sc); font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-texte);
          white-space: nowrap;
        }
        .metier-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-vert); flex-shrink: 0; }

        .metier-text { display: flex; flex-direction: column; align-items: flex-start; }
        .metier-head, .metier-body { display: flex; flex-direction: column; align-items: flex-start; width: 100%; }
        .metier-kicker {
          font-family: var(--f-sc); font-size: 0.66rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-or-dim);
          margin-bottom: var(--sp-5);
        }
        .metier-statement {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.9rem, 3.2vw, 3rem); line-height: 1.14;
          letter-spacing: -0.02em; color: var(--c-texte);
          margin-bottom: var(--sp-6); max-width: 18ch;
        }
        .metier-statement em { font-style: italic; color: var(--c-or-dim); }
        .metier-lead {
          font-family: var(--f-sans); font-size: clamp(1rem, 1.2vw, 1.12rem);
          line-height: 1.7; color: var(--c-texte-2); max-width: 42ch;
          margin-bottom: var(--sp-6);
        }
        .metier-story {
          font-family: var(--f-sans); font-size: clamp(0.95rem, 1.1vw, 1.04rem);
          line-height: 1.78; color: var(--c-texte-2); max-width: 46ch;
          margin-bottom: var(--sp-5);
        }
        .metier-story:last-of-type { margin-bottom: var(--sp-8); }
        .metier-story em { font-style: italic; color: var(--c-or-dim); }

        .metier-parcours {
          display: flex; flex-direction: column; gap: var(--sp-5);
          width: 100%; padding-top: var(--sp-6); margin-bottom: var(--sp-10);
          border-top: 1px solid var(--c-pierre);
        }
        .metier-parcours-head {
          display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
        }
        .metier-parcours-label {
          font-family: var(--f-sc); font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-texte-2);
        }
        .metier-parcours-place {
          font-family: var(--f-sans); font-size: 0.82rem; color: var(--c-texte-2);
        }
        .metier-diplomas {
          display: flex; flex-wrap: wrap;
          gap: clamp(22px, 3.2vw, 52px) clamp(30px, 4.2vw, 64px);
        }
        .metier-diploma {
          display: flex; flex-direction: column; gap: 7px;
          max-width: 22ch;
        }
        /* acronyme = niveau fort (serif, encre), intitulé = descripteur (sans, taupe) :
           deux familles distinctes pour une hiérarchie nette, sans soulignage. */
        .metier-diploma-k {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.5rem, 2.2vw, 1.95rem); line-height: 1;
          letter-spacing: -0.01em; color: var(--c-texte);
        }
        .metier-diploma-v {
          font-family: var(--f-sans); font-weight: 400;
          font-size: 0.82rem; line-height: 1.4;
          color: var(--c-texte-2); text-wrap: balance;
        }

        .metier-sign { display: flex; align-items: center; gap: 16px; }
        .metier-sign-name { font-family: var(--f-serif); font-style: italic; font-size: 1.6rem; color: var(--c-texte); }
        .metier-sign-rule { width: 34px; height: 1px; background: var(--c-or-dim); flex-shrink: 0; }
        .metier-sign-meta { font-family: var(--f-sc); font-size: 0.58rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-texte-2); }

        @media (max-width: 860px) {
          .metier-grid { grid-template-columns: 1fr !important; gap: var(--sp-10) !important; }
          /* sur mobile : titre + sous-titre, PUIS la photo, PUIS le reste.
             display:contents fait remonter .metier-head et .metier-body comme
             éléments de la grille, ce qui permet d'insérer la photo entre les deux. */
          .metier-text { display: contents; }
          /* Titre centré comme les autres sections… */
          .metier-head { order: 1; align-items: center; text-align: center; }
          .metier-statement { max-width: 22ch; }
          /* …mais les paragraphes de lecture restent alignés à gauche. */
          .metier-head .metier-lead,
          .metier-head .metier-story {
            align-self: stretch; text-align: left; max-width: none;
          }
          .metier-img { order: 2; max-width: 380px; margin: 0 auto; }
          .metier-body { order: 3; }
          .metier-head .metier-story:last-of-type { margin-bottom: 0; }
          .metier-badge { left: 0; }
        }
      `}</style>
    </section>
  )
}
