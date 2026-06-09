import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import imgMobilier from '../assets/créations renaud/c_est_elle_mec_2022-May-29_01-34-13PM-000_CustomizedView24060457088_jpg.webp'
import imgCuisines from '../assets/working/DSC09010-opt.webp'
import imgBiblio from '../assets/working/DSC09111.webp'
import imgEscaliers from '../assets/working/124979027_5294257680600333_1820063589436393798_n.webp'
import imgPortes from '../assets/working/DSC09096.webp'

const ease = [0.25, 0.1, 0.25, 1]

const services = [
  {
    n: '01', title: 'Mobilier sur mesure',
    intro: "Des pièces dessinées pour votre espace et votre usage, pas pour un catalogue. Je pars de vos mesures et de vos contraintes.",
    points: ['Tables, bureaux & consoles', 'Buffets & enfilades', 'Dressings & rangements', 'Meubles TV sur mesure'],
    img: imgMobilier,
  },
  {
    n: '02', title: 'Cuisines',
    intro: "Une cuisine pensée autour de votre façon de cuisiner. Six mois de vie quotidienne dessinés à l'avance, au centimètre.",
    points: ['Façades en bois massif', 'Plans de travail adaptés', 'Îlots & rangements optimisés', 'Conception + pose comprises'],
    img: imgCuisines,
  },
  {
    n: '03', title: 'Bibliothèques',
    intro: "Du sol au plafond ou en meuble indépendant. Pensées pour la pièce, la lumière et le poids réel des livres.",
    points: ['Sur-mesure jusqu\'au plafond', 'Niches & éclairage intégré', 'Portes coulissantes', 'Bois massif ou plaqué'],
    img: imgBiblio,
  },
  {
    n: '04', title: 'Escaliers & garde-corps',
    intro: "L'escalier structure la circulation d'une maison. Je le conçois solide, stable, et pensé pour ne pas craquer avec le temps.",
    points: ['Droits, tournants, balancés', 'Garde-corps bois & métal', 'Marches en bois massif', 'Étudié sur place'],
    img: imgEscaliers,
  },
  {
    n: '05', title: 'Portes & menuiseries',
    intro: "Souvent négligés, ce sont pourtant eux qui changent l'aspect d'un intérieur quand ils sont bien faits.",
    points: ['Portes intérieures', 'Encadrements & plinthes', 'Boiseries & lambris', 'Habillages sur mesure'],
    img: imgPortes,
  },
]

function Row({ s, reverse, index }) {
  return (
    <div className={`serv-row ${reverse ? 'serv-row--rev' : ''}`} style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px, 5vw, 88px)', alignItems: 'center',
    }}>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 1, ease }}
        className="serv-row-img"
        style={{ gridColumn: reverse ? 2 : 1, gridRow: 1 }}
      >
        <div style={{ aspectRatio: '5 / 4', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
          <img src={s.img} alt={s.title} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </motion.div>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        className="serv-row-txt"
        style={{ gridColumn: reverse ? 1 : 2, gridRow: 1 }}
      >
        {/* En-tête : numéro + titre (groupés sur mobile pour une lecture nette) */}
        <div className="serv-head">
          {/* Puce numéro */}
          <div className="serv-num" style={{
            width: '46px', height: '46px', borderRadius: '10px', flexShrink: 0,
            background: 'var(--or-10)', border: '1px solid var(--or-20)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--f-sc)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--c-or-dim)',
            marginBottom: 'var(--sp-6)',
          }}>{s.n}</div>

          <h3 style={{
            fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400,
            color: 'var(--c-texte)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 'var(--sp-5)',
          }}>{s.title}</h3>
        </div>

        <p style={{
          fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.2vw, 1.12rem)', lineHeight: 1.72,
          color: 'var(--c-texte-2)', maxWidth: '44ch', marginBottom: 'var(--sp-7)',
        }}>{s.intro}</p>

        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3) var(--sp-6)' }} className="serv-points">
          {s.points.map((p) => (
            <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--c-or-dim)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.92rem', color: 'var(--c-texte)' }}>{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="savoir-faire" style={{ background: 'var(--c-ivoire)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header centré */}
        <SectionHeader
          eyebrow="Savoir-faire"
          title={<>Ce que <Accent>je fabrique.</Accent></>}
          lead="Tout est dessiné, fabriqué et posé par mes soins. Un seul interlocuteur, du premier croquis à l'installation chez vous."
          style={{ marginBottom: 'clamp(56px, 8vw, 120px)' }}
        />

        {/* Lignes alternées */}
        <div className="serv-list" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 10vw, 144px)' }}>
          {services.map((s, i) => (
            <Row key={s.n} s={s} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .serv-row { grid-template-columns: 1fr !important; gap: var(--sp-6) !important; }
          .serv-row-img, .serv-row-txt { grid-column: 1 !important; }
          .serv-row-img { grid-row: 1 !important; }
          .serv-row-txt { grid-row: 2 !important; }

          /* Séparation nette entre services + en-tête numéro/titre groupé */
          .serv-list { gap: 0 !important; }
          .serv-row + .serv-row {
            border-top: 1px solid var(--c-pierre);
            margin-top: clamp(40px, 9vw, 56px);
            padding-top: clamp(40px, 9vw, 56px);
          }
          .serv-head {
            display: flex !important;
            align-items: center;
            gap: 16px;
            margin-bottom: var(--sp-5);
          }
          .serv-num { width: 40px !important; height: 40px !important; margin-bottom: 0 !important; }
          .serv-head h3 { margin-bottom: 0 !important; }
        }
        @media (max-width: 440px) {
          .serv-points { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
