import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import portrait from '../assets/Renaud/DSC09023.webp'

const ease = [0.25, 0.1, 0.25, 1]

const formation = ['CAP Ébéniste', 'BMA Ébéniste', 'DNMADE Mobilier contemporain']

export default function Metier() {
  return (
    <section id="metier" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Le métier"
          title={<>Renaud Achard, <Accent>ébéniste.</Accent></>}
        />

        {/* PC : image à gauche, texte à droite · Mobile : empilé */}
        <div className="metier-grid" style={{
          display: 'grid', gridTemplateColumns: '0.85fr 1fr',
          gap: 'clamp(36px, 6vw, 88px)', alignItems: 'center',
        }}>
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportSettings}
            transition={{ duration: 1, ease }}
            className="metier-img"
          >
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
              <img
                src={portrait}
                alt="Renaud Achard, ébéniste, traçant une planche de noyer dans son atelier" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* Texte à droite */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}
          >
            {/* Accroche en serif */}
            <p style={{
              fontFamily: 'var(--f-serif)', fontWeight: 400,
              fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', lineHeight: 1.32,
              letterSpacing: '-0.01em', color: 'var(--c-texte)', maxWidth: '24ch',
            }}>
              Je travaille seul, à l'atelier. C'est moi qui vous reçois, qui dessine, qui
              fabrique <em style={{ fontStyle: 'italic', color: 'var(--c-or-dim)' }}>et qui pose.</em>
            </p>

            {/* Corps resserré */}
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.15vw, 1.08rem)', lineHeight: 1.75, color: 'var(--c-texte-2)', maxWidth: '50ch' }}>
              Pas de sous-traitance, pas d'intermédiaire : quand vous me confiez un projet,
              vous savez exactement qui s'en occupe. La technique d'un côté, le dessin de
              l'autre. Ce double regard me permet de concevoir des pièces justes&nbsp;:
              solides, bien faites, et qui ont une vraie allure.
            </p>

            {/* Le parcours, chips */}
            <div style={{ borderTop: '1px solid var(--c-pierre)', paddingTop: 'var(--sp-5)' }}>
              <span className="eyebrow eyebrow--dark" style={{ display: 'block', marginBottom: 'var(--sp-4)' }}>
                Le parcours
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {formation.map((f) => (
                  <span key={f} style={{
                    fontFamily: 'var(--f-sc)', fontSize: '0.66rem', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-or-dim)',
                    padding: '8px 16px', borderRadius: 'var(--r-pill)',
                    background: 'var(--or-10)', border: '1px solid var(--or-20)',
                  }}>{f}</span>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.85rem', color: 'var(--c-texte-2)', marginTop: 'var(--sp-4)' }}>
                Formé au Lycée des Métiers d'Art de Coarraze, puis à Lyon.
              </p>
            </div>

            {/* Signature */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--c-texte)' }}>Renaud</span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--c-or-dim)' }} />
              <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>Ébéniste depuis 2017</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .metier-grid { grid-template-columns: 1fr !important; gap: var(--sp-8) !important; }
          .metier-img { max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
