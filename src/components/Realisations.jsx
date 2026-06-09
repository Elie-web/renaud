import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import imgConsole from '../assets/créations renaud/20190302_174312136_iOS.webp'
import imgTableJeu from '../assets/créations renaud/rendu.webp'
import imgChevet from '../assets/créations renaud/rendu 7 (6 fermé).webp'
import imgAppoint from '../assets/créations renaud/20190302_175141500_iOS.webp'
import imgTreteaux from '../assets/créations renaud/TRETEAUX.webp'
import imgMarqueterie from '../assets/créations renaud/console japo dessus.webp'

const projects = [
  { id: 1, cat: 'Console',     title: 'Console marquetée',          meta: 'Frêne & marqueterie',  img: imgConsole },
  { id: 2, cat: 'Table basse', title: 'Table échiquier',            meta: 'Noyer & laiton',       img: imgTableJeu },
  { id: 3, cat: 'Mobilier',    title: 'Chevet « vague & soleil »',  meta: 'Frêne & laque',        img: imgChevet },
  { id: 4, cat: 'Table',       title: "Table d'appoint marquetée",  meta: 'Marqueterie sur frêne', img: imgAppoint },
  { id: 5, cat: 'Mobilier',    title: 'Tréteaux sculptés',          meta: 'Frêne massif',         img: imgTreteaux },
  { id: 6, cat: 'Marqueterie', title: 'Plateau « trident »',        meta: 'Marqueterie de bois',  img: imgMarqueterie },
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
      <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.82rem', color: 'var(--c-texte-2)' }}>{p.meta}</span>
    </motion.figure>
  )
}

export default function Realisations() {
  return (
    <section id="realisations" style={{ background: 'var(--c-fond)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Réalisations"
          title={<>Quelques pièces <Accent>sorties de l'atelier.</Accent></>}
        />

        <div className="real-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 48px)' }}>
          {projects.map((p, i) => <Card key={p.id} p={p} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={viewportSettings} transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px, 5vw, 72px)' }}
        >
          <a href="#contact" className="btn btn--outline">
            <span>Parlons de votre projet</span><span className="arrow" />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .real-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .real-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
