import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'
import portrait from '../assets/Renaud/DSC09023.webp'

const ease = [0.25, 0.1, 0.25, 1]

export default function Metier() {
  return (
    <section id="metier" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Le métier"
          title={<>Renaud Achard, <Accent>ébéniste.</Accent></>}
        />

        {/* Portrait centré */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportSettings}
          transition={{ duration: 1, ease }}
          style={{ width: 'min(440px, 80%)', margin: '0 auto clamp(36px, 4vw, 56px)' }}
        >
          <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
            <img
              src={portrait}
              alt="Renaud Achard, ébéniste, traçant une planche de noyer dans son atelier" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        {/* Bio centrée */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          style={{ maxWidth: '60ch', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}
        >
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
        </motion.div>

        {/* Signature centrée */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: 'var(--sp-8)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--sp-4)' }}
        >
          <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--c-texte)' }}>Renaud</span>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--c-or-dim)' }} />
          <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>Ébéniste depuis 2017</span>
        </motion.div>
      </div>
    </section>
  )
}
