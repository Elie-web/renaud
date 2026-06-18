import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

const faqs = [
  { q: 'Combien coûte une création sur mesure ?', a: "Comptez entre 1 500 € et 5 000 € pour un meuble de qualité, davantage pour un agencement complet. Le prix dépend des matériaux, du volume et de la complexité. Vous recevez un devis détaillé et fixe avant tout engagement." },
  { q: 'Quel est le délai pour un projet ?', a: "Une table prend 3 à 6 semaines, une cuisine complète 2 à 4 mois. Je travaille sur commande, et je vous donne une date précise avant de commencer." },
  { q: 'Comment se passe la première rencontre ?', a: "Je vous reçois chez vous ou à l'atelier. Rien n'est signé ce jour-là : vous repartez avec mes idées et recevez une proposition détaillée sous 5 jours." },
  { q: 'Quels bois utilisez-vous ?', a: "Des bois massifs français, choisis en scierie selon votre projet. Jamais de panneaux de particules." },
  { q: "Quelles sont vos zones d'intervention ?", a: "Toute la vallée de Chamonix — Chamonix, Les Houches, Servoz, Argentière, Vallorcine — et plus largement la Haute-Savoie : Sallanches, Passy, Saint-Gervais, Megève, Combloux. Pour le mobilier transportable, je peux intervenir au-delà, parlons-en." },
  { q: 'Proposez-vous une garantie ?', a: "Oui, cinq ans sur les assemblages et les finitions. Si une finition s'altère trop tôt, je viens la reprendre." },
]

function Item({ faq, isOpen, onToggle, index }) {
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`
  return (
    <motion.div variants={staggerItem} style={{ borderTop: '1px solid var(--c-pierre)' }}>
      <button id={btnId} onClick={onToggle} aria-expanded={isOpen} aria-controls={panelId}
        style={{ width: '100%', textAlign: 'left', padding: 'var(--sp-5) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-4)', background: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1.35, flex: 1 }}>{faq.q}</span>
        <motion.span aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: 'var(--c-or-dim)', fontSize: '1.35rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div id={panelId} role="region" aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: 'hidden' }}>
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
    <section style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          title={<>Ce que mes clients <Accent>me demandent souvent.</Accent></>}
        />

        {/* Accordéon centré */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'left' }}>
          {faqs.map((faq, i) => <Item key={i} index={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
          <div style={{ borderTop: '1px solid var(--c-pierre)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ textAlign: 'center', marginTop: 'var(--sp-8)', fontFamily: 'var(--f-sans)', fontSize: '0.95rem', color: 'var(--c-texte-2)' }}>
          Une autre question ?{' '}
          <a href="#contact" style={{ color: 'var(--c-or-dim)', borderBottom: '1px solid var(--c-or-dim)' }}>Écrivez-moi →</a>
        </motion.p>
      </div>
    </section>
  )
}
