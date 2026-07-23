import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import atelierImg from '../assets/atelier/gabarit-metal-angle.webp'

const ease = [0.22, 1, 0.36, 1]

/* Icônes au trait, cohérentes avec le reste du site (stroke 1.7, bouts ronds) */
const Ico = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
const IcoDevis = <Ico d={<><path d="M20.6 13.4 11 3.8H4v7l9.6 9.6a1.9 1.9 0 0 0 2.7 0l4.3-4.3a1.9 1.9 0 0 0 0-2.7Z" /><circle cx="7.8" cy="7.8" r="1.1" /></>} />
const Ico3D = <Ico d={<><path d="M21 16V8l-9-5-9 5v8l9 5z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>} />
const IcoSuivi = <Ico d={<><path d="M12 3 4 6v6c0 4 3.4 7 8 9 4.6-2 8-5 8-9V6z" /><path d="M9 12l2 2 4-4" /></>} />
const IcoBois = <Ico d={<><path d="M11 21c-4.4 0-7-3-7-8 0-6.6 5.5-10 13-10 0 8.5-3.4 14-13 14z" /><path d="M8 18c1.8-5.5 5-9 9.5-10.5" /></>} />

const points = [
  { icon: IcoDevis,    title: 'Devis gratuit et fixe', desc: 'Le prix annoncé est le prix final.' },
  // Pas de garantie annoncée : Renaud n'en veut pas (vocal du 23/07/2026).
  // L'engagement porte sur le suivi, qu'il assume, pas sur une durée.
  { icon: IcoSuivi, title: 'Suivi après la pose',   desc: 'Je reste joignable. Si ça bouge, je reviens.' },
  { icon: Ico3D,       title: 'Validé en 3D',          desc: 'Vous voyez la pièce avant la première découpe.' },
  { icon: IcoBois,     title: 'Matériaux adaptés',     desc: 'Bois massif ou contreplaqué, choisi selon l\'usage de chaque projet.' },
]

export default function Engagements() {
  return (
    <section style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Pourquoi me confier votre projet"
          title={<>Du sur-mesure, <Accent>sans mauvaise surprise.</Accent></>}
        />

        <div className="eng-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportSettings}
            transition={{ duration: 1, ease }}
            className="eng-img" style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
              <img src={atelierImg}
                alt="Ajustement au millimètre d'un gabarit sur une pièce courbe" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Engagements */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings} className="eng-list">
            {points.map((p) => (
              <motion.div key={p.title} variants={staggerItem} className="eng-item">
                <span className="eng-icon">{p.icon}</span>
                <div>
                  <h3 className="eng-title">{p.title}</h3>
                  <p className="eng-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .eng-list { display: flex; flex-direction: column; gap: clamp(12px, 1.2vw, 18px); }
        .eng-item {
          display: flex; gap: 18px; align-items: center;
          padding: clamp(18px, 1.7vw, 24px);
          border-radius: 16px;
          background: var(--c-blanc);
          border: 1px solid var(--c-pierre);
          box-shadow: var(--shadow-sm);
          transition: transform var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), box-shadow var(--dur-mid) var(--ease);
        }
        .eng-icon {
          width: 50px; height: 50px; border-radius: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--or-10); border: 1px solid var(--or-20); color: var(--c-or-dim);
          transition: background var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), color var(--dur-mid) var(--ease), transform var(--dur-mid) var(--ease);
        }
        .eng-title {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.3rem, 1.9vw, 1.65rem); line-height: 1.15;
          color: var(--c-texte); margin-bottom: 4px;
          transition: color var(--dur-mid) var(--ease);
        }
        .eng-desc {
          font-family: var(--f-sans); font-size: 0.95rem; line-height: 1.55;
          color: var(--c-texte-2); max-width: 52ch;
          transition: color var(--dur-mid) var(--ease);
        }

        /* Survol : la carte se lève, l'icône se remplit d'argile */
        @media (hover: hover) {
          .eng-item:hover {
            border-color: var(--or-20);
            box-shadow: var(--shadow-md);
            transform: translateY(-4px);
          }
          .eng-item:hover .eng-icon {
            background: var(--c-or); border-color: var(--c-or); color: var(--c-ivoire);
            transform: scale(1.05);
          }
          .eng-item:hover .eng-title { color: var(--c-or-dim); }
          .eng-item:hover .eng-desc { color: var(--c-texte); }
        }

        @media (max-width: 860px) {
          .eng-grid { grid-template-columns: 1fr !important; }
          .eng-img { max-width: 380px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
