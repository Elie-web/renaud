import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const ease = [0.25, 0.1, 0.25, 1]

const services = [
  {
    n: '01', title: 'Mobilier sur mesure',
    intro: "Des pièces dessinées pour votre espace et votre usage, pas pour un catalogue. On part de vos mesures et de vos contraintes.",
    points: ['Tables, bureaux & consoles', 'Buffets & enfilades', 'Dressings & rangements', 'Meubles TV sur mesure'],
    img: 'https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?auto=format&fit=crop&w=1000&q=82',
  },
  {
    n: '02', title: 'Cuisines',
    intro: "Une cuisine pensée autour de votre façon de cuisiner. Six mois de vie quotidienne dessinés à l'avance, au centimètre.",
    points: ['Façades en bois massif', 'Plans de travail adaptés', 'Îlots & rangements optimisés', 'Conception + pose comprises'],
    img: 'https://images.unsplash.com/photo-1547609434-b732edfee020?auto=format&fit=crop&w=1000&q=82',
  },
  {
    n: '03', title: 'Bibliothèques',
    intro: "Du sol au plafond ou en meuble indépendant. Pensées pour la pièce, la lumière et le poids réel des livres.",
    points: ['Sur-mesure jusqu\'au plafond', 'Niches & éclairage intégré', 'Portes coulissantes', 'Bois massif ou plaqué'],
    img: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?auto=format&fit=crop&w=1000&q=82',
  },
  {
    n: '04', title: 'Escaliers & garde-corps',
    intro: "L'escalier structure la circulation d'une maison. Je le conçois solide, stable, et pensé pour ne pas craquer avec le temps.",
    points: ['Droits, tournants, balancés', 'Garde-corps bois & métal', 'Marches en bois massif', 'Étudié sur place'],
    img: 'https://images.unsplash.com/photo-1683115096447-5d01c11d3ead?auto=format&fit=crop&w=1000&q=82',
  },
  {
    n: '05', title: 'Portes & menuiseries',
    intro: "Souvent négligés, ce sont pourtant eux qui changent l'aspect d'un intérieur quand ils sont bien faits.",
    points: ['Portes intérieures', 'Encadrements & plinthes', 'Boiseries & lambris', 'Habillages sur mesure'],
    img: 'https://images.unsplash.com/photo-1497218770144-3fea6dbc33fe?auto=format&fit=crop&w=1000&q=82',
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
        {/* Puce numéro */}
        <div style={{
          width: '46px', height: '46px', borderRadius: '10px',
          background: 'var(--or-10)', border: '1px solid var(--or-20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-sc)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--c-or-dim)',
          marginBottom: 'var(--sp-6)',
        }}>{s.n}</div>

        <h3 style={{
          fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400,
          color: 'var(--c-texte)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 'var(--sp-5)',
        }}>{s.title}</h3>

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
        {/* Header */}
        <div style={{ maxWidth: '46ch', marginBottom: 'clamp(56px, 8vw, 120px)' }}>
          <motion.span className="eyebrow eyebrow--dark"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportSettings} transition={{ duration: 0.7 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
            <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
            Savoir-faire
          </motion.span>
          <motion.h2 className="h2"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
            style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-5)' }}>
            Ce que je fabrique.
          </motion.h2>
          <motion.p className="lead"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.15 }}>
            Tout est dessiné, fabriqué et posé par mes soins. Un seul interlocuteur,
            du premier croquis à l'installation chez vous.
          </motion.p>
        </div>

        {/* Lignes alternées */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 10vw, 144px)' }}>
          {services.map((s, i) => (
            <Row key={s.n} s={s} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .serv-row { grid-template-columns: 1fr !important; gap: var(--sp-8) !important; }
          .serv-row-img, .serv-row-txt { grid-column: 1 !important; }
          .serv-row-img { grid-row: 1 !important; }
          .serv-row-txt { grid-row: 2 !important; }
        }
        @media (max-width: 440px) {
          .serv-points { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
