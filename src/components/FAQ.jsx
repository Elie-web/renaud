import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const faqs = [
  { q: 'Combien coûte une création sur mesure ?', a: "Comptez entre 1 500 € et 5 000 € pour un meuble de qualité, davantage pour un agencement complet. Le prix dépend des matériaux, du volume et de la complexité. Vous recevez un devis détaillé et fixe avant tout engagement." },
  { q: 'Quel est le délai pour un projet ?', a: "Une table prend 3 à 6 semaines, une cuisine complète 2 à 4 mois. Je travaille sur commande, et je vous donne une date précise avant de commencer." },
  { q: 'Comment se passe la première rencontre ?', a: "On se voit chez vous ou à l'atelier. Rien n'est signé ce jour-là : vous repartez avec mes idées et recevez une proposition détaillée sous 5 jours." },
  { q: 'Quels bois utilisez-vous ?', a: "Surtout du chêne, du noyer, du frêne et du merisier, des essences françaises choisies en scierie. Pas de panneaux de particules." },
  { q: "Quelles sont vos zones d'intervention ?", a: "Les projets d'agencement en Île-de-France. Pour le mobilier transportable, j'interviens partout en France." },
  { q: 'Proposez-vous une garantie ?', a: "Oui, cinq ans sur les assemblages et les finitions. Si une finition s'altère trop tôt, je viens la reprendre." },
]

function Item({ faq, isOpen, onToggle }) {
  return (
    <motion.div variants={staggerItem} style={{ borderTop: '1px solid var(--c-pierre)' }}>
      <button onClick={onToggle} style={{ width: '100%', textAlign: 'left', padding: 'var(--sp-5) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-4)', background: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1.35, flex: 1 }}>{faq.q}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: 'var(--c-or-dim)', fontSize: '1.35rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', lineHeight: 1.72, color: 'var(--c-texte-2)', paddingBottom: 'var(--sp-5)', maxWidth: '56ch' }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ background: 'var(--c-fond)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }}>
          {/* Gauche - image + titre sticky */}
          <div className="faq-left" style={{ position: 'sticky', top: '110px' }}>
            <motion.span className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportSettings} transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Questions fréquentes
            </motion.span>
            <motion.h2 className="h2"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-6)', maxWidth: '14ch' }}>
              Ce qu'on me demande souvent.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportSettings} transition={{ duration: 0.9, delay: 0.1 }}
              className="faq-img" style={{ aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 'var(--sp-6)' }}>
              <img src="https://images.unsplash.com/photo-1497218770144-3fea6dbc33fe?auto=format&fit=crop&w=800&q=80"
                alt="Ciseaux à bois et gouges d'ébéniste sur l'établi" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'var(--f-sans)', fontSize: '0.95rem', color: 'var(--c-texte-2)' }}>
              Une autre question ?{' '}
              <a href="#contact" style={{ color: 'var(--c-or-dim)', borderBottom: '1px solid var(--c-or-dim)' }}>Écrivez-moi →</a>
            </motion.p>
          </div>

          {/* Droite - accordéon */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}>
            {faqs.map((faq, i) => <Item key={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
            <div style={{ borderTop: '1px solid var(--c-pierre)' }} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-left { position: static !important; }
          .faq-img { max-width: 420px; }
        }
      `}</style>
    </section>
  )
}
