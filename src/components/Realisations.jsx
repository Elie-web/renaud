import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer } from '../lib/motion'

const projects = [
  {
    id: 1,
    cat: 'Atelier',
    title: "L'établi, la lumière, le travail qui commence",
    alt: "Artisan ébéniste travaillant une pièce de bois à l'établi dans son atelier",
    img: 'https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?auto=format&fit=crop&w=700&q=80',
    h: 'tall',
  },
  {
    id: 2,
    cat: 'Fabrication',
    title: 'Découpe à la scie, le trait juste',
    alt: 'Artisan ébéniste en train de scier une pièce de bois dans son atelier',
    img: 'https://images.unsplash.com/photo-1547609434-b732edfee020?auto=format&fit=crop&w=700&q=80',
    h: 'short',
  },
  {
    id: 3,
    cat: 'Façonnage',
    title: "La lame, le bois, le geste précis",
    alt: "Ébéniste façonnant une pièce de bois avec un outil de coupe dans son atelier",
    img: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?auto=format&fit=crop&w=700&q=80',
    h: 'tall',
  },
  {
    id: 4,
    cat: 'Outils',
    title: "Les gouges et ciseaux à bois de l'atelier",
    alt: "Ciseaux à bois et gouges d'ébéniste posés sur un établi en bois",
    img: 'https://images.unsplash.com/photo-1497218770144-3fea6dbc33fe?auto=format&fit=crop&w=700&q=80',
    h: 'short',
  },
  {
    id: 5,
    cat: 'Matériaux',
    title: 'Chêne, noyer, frêne, choisis en scierie',
    alt: 'Planches de bois massif empilées sur un établi, essences sélectionnées en scierie',
    img: 'https://images.unsplash.com/photo-1678184096514-d28596346091?auto=format&fit=crop&w=700&q=80',
    h: 'mid',
  },
  {
    id: 6,
    cat: 'Assemblage',
    title: 'Chaque joint, taillé à la main',
    alt: "Artisan menuisier travaillant à l'assemblage de pièces de bois massif",
    img: 'https://images.unsplash.com/photo-1683115096447-5d01c11d3ead?auto=format&fit=crop&w=700&q=80',
    h: 'mid',
  },
]

const heights = {
  tall: '520px',
  mid: '380px',
  short: '280px',
}

function Card({ project, index }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-cursor
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: heights[project.h],
        background: 'var(--c-brun-md)',
      }}
    >
      <motion.img
        src={project.img}
        alt={project.alt}
        loading="lazy"
        decoding="async"
        animate={{ scale: hov ? 1.06 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Overlay */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,10,6,0.95) 0%, rgba(15,10,6,0.3) 50%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--sp-6)',
        }}
      >
        <motion.span
          animate={{ y: hov ? 0 : 16, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="eyebrow eyebrow--light"
          style={{ marginBottom: 'var(--sp-2)' }}
        >
          {project.cat}
        </motion.span>
        <motion.h3
          animate={{ y: hov ? 0 : 16, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontFamily: 'var(--f-serif)',
            fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
            fontWeight: 400,
            color: 'var(--c-ivoire)',
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </motion.h3>
      </motion.div>

      {/* Category pill (visible always) */}
      <motion.div
        animate={{ opacity: hov ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 'var(--sp-4)',
          left: 'var(--sp-4)',
          background: 'rgba(26,21,16,0.62)',
          backdropFilter: 'blur(8px)',
          padding: '5px 12px',
        }}
      >
        <span className="eyebrow eyebrow--light" style={{ fontSize: '0.6rem' }}>{project.cat}</span>
      </motion.div>
    </motion.div>
  )
}

export default function Realisations() {
  return (
    <section
      id="realisations"
      style={{
        background: 'var(--c-fond)',
        padding: 'var(--section-py) var(--px)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(40px, 5vw, 72px)',
          flexWrap: 'wrap',
          gap: 'var(--sp-8)',
        }}>
          <div>
            <motion.span
              className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Réalisations
            </motion.span>
            <motion.h2
              className="h2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)' }}
            >
              Chaque pièce, une histoire.
            </motion.h2>
          </div>
          <motion.a
            href="#contact"
            className="btn btn--outline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span>Discuter d'un projet</span>
            <span className="arrow" />
          </motion.a>
        </div>

        {/* Masonry grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--sp-4)',
        }} className="gallery-grid">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
