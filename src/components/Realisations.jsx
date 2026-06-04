import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const projects = [
  { id: 1, cat: 'Cuisine',      title: 'Cuisine en noyer massif',        lieu: 'Versailles',          img: 'https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?auto=format&fit=crop&w=800&q=80' },
  { id: 2, cat: 'Bibliothèque', title: 'Bibliothèque sur mesure',        lieu: 'Paris 11e',           img: 'https://images.unsplash.com/photo-1547609434-b732edfee020?auto=format&fit=crop&w=800&q=80' },
  { id: 3, cat: 'Mobilier',     title: 'Table de salle à manger',        lieu: 'Boulogne',            img: 'https://images.unsplash.com/photo-1497218770144-3fea6dbc33fe?auto=format&fit=crop&w=800&q=80' },
  { id: 4, cat: 'Escalier',     title: 'Escalier balancé en chêne',      lieu: 'Maison de campagne',  img: 'https://images.unsplash.com/photo-1683115096447-5d01c11d3ead?auto=format&fit=crop&w=800&q=80' },
  { id: 5, cat: 'Agencement',   title: 'Dressing & rangements',          lieu: 'Neuilly',             img: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?auto=format&fit=crop&w=800&q=80' },
  { id: 6, cat: 'Mobilier',     title: 'Buffet contemporain',            lieu: 'Paris 16e',           img: 'https://images.unsplash.com/photo-1678184096514-d28596346091?auto=format&fit=crop&w=800&q=80' },
]

function Card({ p, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.figure
      initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ margin: 0 }}
    >
      <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--c-brun-md)', marginBottom: 'var(--sp-4)' }}>
        <motion.img
          src={p.img} alt={p.title} loading="lazy" decoding="async"
          animate={{ scale: hov ? 1.05 : 1 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--sp-4)' }}>
        <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1.25 }}>{p.title}</h3>
        <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-or-dim)', whiteSpace: 'nowrap' }}>{p.cat}</span>
      </figcaption>
      <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.82rem', color: 'var(--c-texte-2)' }}>{p.lieu}</span>
    </motion.figure>
  )
}

export default function Realisations() {
  return (
    <section id="realisations" style={{ background: 'var(--c-fond)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--sp-6)', marginBottom: 'clamp(40px, 5vw, 72px)' }}>
          <div>
            <motion.span className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings} transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Réalisations
            </motion.span>
            <motion.h2 className="h2"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings} transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)', maxWidth: '16ch' }}
            >
              Quelques pièces sorties de l'atelier.
            </motion.h2>
          </div>
          <motion.a href="#contact" className="btn btn--outline"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span>Votre projet</span><span className="arrow" />
          </motion.a>
        </div>

        <div className="real-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 48px)' }}>
          {projects.map((p, i) => <Card key={p.id} p={p} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .real-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .real-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
