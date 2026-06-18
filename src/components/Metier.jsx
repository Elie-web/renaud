import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import portrait from '../assets/Renaud/DSC09023.webp'

const ease = [0.22, 1, 0.36, 1]

const formation = ['CAP', 'BMA', 'DNMADE']

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
            <span className="metier-kicker">Renaud Achard — Ébéniste</span>

            <h2 className="metier-statement">
              Je vous reçois, je dessine, je fabrique{' '}
              <em>et je pose.</em>
            </h2>

            <p className="metier-lead">
              Seul, à l'atelier. Pas de sous-traitance, pas d'intermédiaire&nbsp;:
              vous savez toujours qui s'occupe de votre projet.
            </p>

            <div className="metier-parcours">
              <span className="metier-parcours-label">Formation</span>
              <div className="metier-chips">
                {formation.map((f) => <span key={f} className="metier-chip">{f}</span>)}
                <span className="metier-parcours-place">Coarraze, puis Lyon</span>
              </div>
            </div>

            <div className="metier-sign">
              <span className="metier-sign-name">Renaud</span>
              <span className="metier-sign-rule" aria-hidden="true" />
              <span className="metier-sign-meta">Dessiné, fabriqué &amp; posé par mes soins</span>
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
          margin-bottom: var(--sp-8);
        }

        .metier-parcours {
          display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
          width: 100%; padding-top: var(--sp-6); margin-bottom: var(--sp-7);
          border-top: 1px solid var(--c-pierre);
        }
        .metier-parcours-label {
          font-family: var(--f-sc); font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-texte-2);
          flex-shrink: 0;
        }
        .metier-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .metier-chip {
          font-family: var(--f-sc); font-size: 0.66rem; font-weight: 600;
          letter-spacing: 0.08em; color: var(--c-or-dim);
          padding: 6px 13px; border-radius: var(--r-pill);
          background: var(--or-10); border: 1px solid var(--or-20);
        }
        .metier-parcours-place {
          font-family: var(--f-sans); font-size: 0.82rem; color: var(--c-texte-2);
          margin-left: 4px;
        }

        .metier-sign { display: flex; align-items: center; gap: 16px; }
        .metier-sign-name { font-family: var(--f-serif); font-style: italic; font-size: 1.6rem; color: var(--c-texte); }
        .metier-sign-rule { width: 34px; height: 1px; background: var(--c-or-dim); flex-shrink: 0; }
        .metier-sign-meta { font-family: var(--f-sc); font-size: 0.58rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-texte-2); }

        @media (max-width: 860px) {
          .metier-grid { grid-template-columns: 1fr !important; gap: var(--sp-12) !important; }
          .metier-img { max-width: 380px; margin: 0 auto; }
          .metier-badge { left: 0; }
        }
      `}</style>
    </section>
  )
}
