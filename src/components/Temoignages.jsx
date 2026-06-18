import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

const STAR = 'var(--c-etoile)' // or jaune chaud (token), contraste ≥ 3:1 sur blanc

// À REMPLACER par le vrai lien du profil Google de Renaud (et la vraie note / le vrai nombre d'avis).
const GOOGLE_URL = '#'
const NOTE = '5,0'
const NB_AVIS = 3

const avis = [
  {
    text: "Une photo Pinterest, un espace bizarre sous l'escalier… Renaud en a fait une bibliothèque qu'on remarque en entrant. Du croquis à la pose, tout était clair.",
    name: 'Sophie L.', when: 'il y a 2 mois', projet: 'Bibliothèque · Paris 11e', color: 'var(--c-or)',
  },
  {
    text: "Cuisine repensée autour de notre façon de cuisiner. Dix-huit mois plus tard, pas un tiroir qui accroche. Les finitions sont irréprochables.",
    name: 'Marc & Hélène D.', when: 'il y a 5 mois', projet: 'Cuisine en noyer · Versailles', color: 'var(--c-bois)',
  },
  {
    text: "L'escalier nous inquiétait. Renaud a trouvé une solution à laquelle on n'avait pas pensé, le rendu dépasse nos attentes. Devis tenu au centime près.",
    name: 'Thomas R.', when: 'il y a 1 an', projet: 'Escalier balancé · Maison de campagne', color: 'var(--c-vert)',
  },
]

function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Google" style={{ flexShrink: 0, display: 'block' }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function Stars({ size = '0.82rem', gap = '2px' }) {
  return (
    <div aria-label="Note : 5 étoiles sur 5" style={{ display: 'flex', gap }}>
      {Array(5).fill(0).map((_, i) => (
        <span key={i} aria-hidden="true" style={{ color: STAR, fontSize: size, lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

function initials(name) {
  return name.replace(/&.*/, '').trim().charAt(0).toUpperCase()
}

export default function Temoignages() {
  return (
    <section id="avis" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)', borderTop: '1px solid var(--c-pierre)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          title={<>Ce qu'en disent <Accent>mes clients.</Accent></>}
        />

        {/* Bandeau de note Google */}
        <motion.a
          href={GOOGLE_URL}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.6 }}
          className="avis-trust"
        >
          <GoogleG size={24} />
          <span className="avis-trust-sep" aria-hidden="true" />
          <span style={{ fontFamily: 'var(--f-serif)', fontSize: '1.55rem', lineHeight: 1, color: 'var(--c-texte)' }}>{NOTE}</span>
          <Stars size="0.95rem" />
          <span className="avis-trust-label">{NB_AVIS} avis Google · note moyenne</span>
          <span className="avis-trust-link">Voir sur Google →</span>
        </motion.a>

        {/* Cartes compactes */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          className="avis-grid"
        >
          {avis.map((a) => (
            <motion.blockquote key={a.name} variants={staggerItem} className="avis-card">
              <div className="avis-card-head">
                <span className="avis-avatar" aria-hidden="true" style={{ background: a.color }}>{initials(a.name)}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="avis-name">{a.name}</div>
                  <div className="avis-when">{a.when}</div>
                </div>
                <GoogleG size={16} />
              </div>
              <Stars />
              <p className="avis-text">{a.text}</p>
              <footer className="avis-projet">{a.projet}</footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Bandeau de note */
        .avis-trust {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: 12px 16px;
          width: fit-content; max-width: 100%;
          margin: 0 auto clamp(28px, 4vw, 44px);
          padding: 12px 22px;
          background: var(--c-blanc);
          border: 1px solid var(--c-pierre);
          border-radius: var(--r-pill);
          box-shadow: var(--shadow-sm);
        }
        .avis-trust-sep { width: 1px; height: 22px; background: var(--c-pierre); }
        .avis-trust-label {
          font-family: var(--f-sans); font-size: 0.82rem; color: var(--c-texte-2);
        }
        .avis-trust-link {
          font-family: var(--f-sc); font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-or-dim);
          padding-left: 6px;
        }
        .avis-trust:hover .avis-trust-link { color: var(--c-or); }

        /* Grille de cartes compactes */
        .avis-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 1.6vw, 22px);
        }
        .avis-card {
          margin: 0;
          background: var(--c-blanc);
          border: 1px solid var(--c-pierre);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          padding: clamp(20px, 1.8vw, 26px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .avis-card-head { display: flex; align-items: center; gap: 11px; }
        .avis-avatar {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--f-serif); font-size: 1.05rem; color: var(--c-ivoire);
        }
        .avis-name { font-family: var(--f-sans); font-size: 0.92rem; font-weight: 600; color: var(--c-texte); line-height: 1.25; }
        .avis-when { font-family: var(--f-sans); font-size: 0.76rem; color: var(--c-texte-2); }
        .avis-text {
          font-family: var(--f-sans); font-size: 0.95rem; line-height: 1.6;
          color: var(--c-texte); margin: 0;
        }
        .avis-projet {
          margin-top: auto; padding-top: 4px;
          font-family: var(--f-sc); font-size: 0.56rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-or-dim);
        }

        @media (max-width: 900px) { .avis-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .avis-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .avis-trust { gap: 8px 12px; padding: 12px 18px; }
          .avis-trust-label, .avis-trust-link { flex-basis: 100%; text-align: center; padding-left: 0; }
        }
      `}</style>
    </section>
  )
}
