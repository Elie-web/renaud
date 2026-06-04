import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

const ease = [0.25, 0.1, 0.25, 1]

export default function Metier() {
  return (
    <section id="metier" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="metier-grid" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 'clamp(36px, 6vw, 96px)', alignItems: 'center' }}>
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportSettings}
            transition={{ duration: 1, ease }} className="metier-img" style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=82"
                alt="Renaud Achard, ébéniste, au travail dans son atelier" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.1, ease }}>
            <span className="eyebrow eyebrow--dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-5)' }}>
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Le métier
            </span>

            <h2 className="h2" style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-6)', maxWidth: '16ch' }}>
              Renaud Achard, ébéniste.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)', maxWidth: '50ch' }}>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.15vw, 1.1rem)', lineHeight: 1.75, color: 'var(--c-texte-2)' }}>
                J'ai appris le métier au Lycée des Métiers d'Art de Coarraze, avec un CAP
                puis un BMA ébéniste, avant un DNMADE mobilier contemporain à Lyon. La
                technique d'un côté, le dessin de l'autre. C'est ce double parcours qui me
                permet de concevoir des pièces justes : solides, bien faites, et qui ont
                une vraie allure.
              </p>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.15vw, 1.1rem)', lineHeight: 1.75, color: 'var(--c-texte-2)' }}>
                Je travaille seul, à l'atelier. C'est moi qui vous reçois, qui dessine, qui
                fabrique et qui pose. Pas de sous-traitance, pas d'intermédiaire. Quand vous
                me confiez un projet, vous savez exactement qui s'en occupe.
              </p>
            </div>

            <div style={{ marginTop: 'var(--sp-8)', display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--c-texte)' }}>Renaud</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--c-or-dim)' }} />
              <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>Ébéniste depuis 2017</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .metier-grid { grid-template-columns: 1fr !important; }
          .metier-img { max-width: 420px; order: -1; }
        }
      `}</style>
    </section>
  )
}
