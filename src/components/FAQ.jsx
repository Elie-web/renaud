import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const faqs = [
  {
    q: 'Quel est le délai moyen pour un projet sur mesure ?',
    a: 'Tout dépend de la pièce. Une table prend 3 à 6 semaines, une cuisine complète entre 2 et 4 mois. Je travaille sur commande, sans délais industriels. Je vous donne une date précise avant de commencer. Comptez en moyenne 4 à 8 semaines de l\'accord sur le projet à la livraison.',
  },
  {
    q: 'Quelles sont vos zones d\'intervention ?',
    a: 'Je réalise les projets principalement en Île-de-France : Paris et sa petite et grande couronne. Pour les pièces de mobilier transportables (tables, armoires, bibliothèques), j\'interviens sur toute la France. Contactez-moi pour en parler.',
  },
  {
    q: 'Comment se déroule la première rencontre ?',
    a: 'On se retrouve chez vous ou à l\'atelier, selon votre préférence. Je prends le temps de comprendre votre espace, vos habitudes et votre goût. Rien n\'est signé ce jour-là. Vous repartez avec mes premières idées, et je vous envoie une proposition détaillée sous 5 jours.',
  },
  {
    q: 'Combien coûte une création sur mesure ?',
    a: 'Le sur mesure est plus coûteux que le catalogue, mais moins qu\'on ne le croit souvent. Comptez entre 1 500 € et 5 000 € pour un meuble de qualité, et davantage pour des projets d\'agencement. Le prix dépend des matériaux, de la complexité et du volume. Je vous fournis un devis précis et sans mauvaise surprise.',
  },
  {
    q: 'Quels bois utilisez-vous ?',
    a: 'Je travaille principalement le chêne, le noyer, le frêne et le merisier. Des essences françaises, sélectionnées en scierie pour leur qualité. Je n\'utilise pas de panneaux de particules. Sur demande, je peux travailler des bois exotiques certifiés FSC ou des bois récupérés avec une histoire.',
  },
  {
    q: 'Proposez-vous une garantie sur vos créations ?',
    a: 'Oui. Toutes mes pièces sont garanties cinq ans sur les assemblages et les finitions. Si une charnière cède, si une finition s\'altère prématurément, je viens la refaire. C\'est le principe de l\'artisanat : on reste responsable de ce qu\'on fait.',
  },
  {
    q: 'Puis-je voir votre atelier avant de me décider ?',
    a: 'Oui, et je vous y encourage. Visiter l\'atelier, toucher les matières, voir les pièces en cours : c\'est la meilleure façon de s\'assurer qu\'on travaille dans le même état d\'esprit. Prenez rendez-vous et venez.',
  },
  {
    q: 'Faites-vous aussi de la restauration de meubles anciens ?',
    a: 'Ponctuellement, oui, surtout pour des clients existants. La restauration demande des compétences spécifiques et du temps. Je priorise la création, mais si vous avez une pièce de famille qui a de l\'histoire, discutons-en.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{
      background: 'var(--c-ivoire)',
      padding: 'var(--section-py) var(--px)',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'clamp(40px, 7vw, 120px)',
          alignItems: 'start',
        }} className="faq-grid">

          {/* Left — sticky label */}
          <div className="faq-sticky" style={{ position: 'sticky', top: '120px' }}>
            <motion.span
              className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Questions fréquentes
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              className="h2"
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-6)' }}
            >
              Ce que les gens
              <br />
              me demandent
              <br />
              <em style={{
                fontFamily: 'var(--f-serif)',
                fontStyle: 'italic',
                color: 'var(--c-or-dim)',
              }}>souvent.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportSettings}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lead"
              style={{ maxWidth: '32ch' }}
            >
              Pas de réponse ici ?<br />
              <a
                href="#contact"
                style={{
                  color: 'var(--c-or-dim)',
                  borderBottom: '1px solid var(--c-or-dim)',
                  fontFamily: 'var(--f-sans)',
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  fontWeight: 400,
                  transition: 'opacity 0.2s',
                }}
              >
                Posez-moi la question directement →
              </a>
            </motion.p>
          </div>

          {/* Right — accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  borderTop: '1px solid var(--or-20)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  data-cursor
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 'var(--sp-6) 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--sp-4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--f-serif)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    fontWeight: 400,
                    color: open === i ? 'var(--c-texte)' : 'var(--c-texte)',
                    lineHeight: 1.35,
                    flex: 1,
                    transition: 'color 0.3s',
                  }}>{faq.q}</span>

                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: 'var(--c-or-dim)',
                      fontSize: '1.4rem',
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: '2px',
                      fontWeight: 400,
                    }}
                  >+</motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontFamily: 'var(--f-sans)',
                        fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                        fontWeight: 400,
                        lineHeight: 1.75,
                        color: 'var(--c-texte-2)',
                        paddingBottom: 'var(--sp-6)',
                        maxWidth: '60ch',
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid var(--or-20)' }} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-sticky { position: static !important; }
        }
      `}</style>
    </section>
  )
}

