import { motion } from 'framer-motion'
import { viewportSettings } from '../lib/motion'

/* À-propos MINIMAL - sans photo, centré, façon éditorial. Alternative au Metier
   (grille portrait + texte) pour les versions épurées. */
const formation = [
  { k: 'CAP', v: 'Ébénisterie' },
  { k: 'BMA', v: 'Ébéniste diplômé' },
  { k: 'DNMADE', v: 'Mobilier contemporain' },
]

export default function MetierMinimal() {
  return (
    <section id="metier" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.6 }}
          className="eyebrow eyebrow--dark" style={{ display: 'inline-block', marginBottom: 'var(--sp-5)' }}
        >
          Renaud Achard · Ébéniste
        </motion.span>
        <motion.h2
          className="h2"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.05 }}
          style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-6)' }}
        >
          Le&nbsp;bois, ma&nbsp;matière. <em className="i-accent">Votre&nbsp;intérieur, ma&nbsp;raison.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.12 }}
          style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.2vw, 1.12rem)', lineHeight: 1.8, color: 'var(--c-texte-2)', maxWidth: '58ch', margin: '0 auto var(--sp-6)' }}
        >
          J'ai grandi avec le bois : son odeur, sa chaleur, le temps qu'il faut pour bien le
          travailler. Un seul artisan, du premier croquis à la pose&nbsp;: vous savez toujours qui
          prend soin de votre projet. Vous m'apportez une idée, je la concrétise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.18 }}
          className="mm-diplomas"
        >
          {formation.map((f) => (
            <div key={f.k} className="mm-diploma">
              <span className="mm-k">{f.k}</span>
              <span className="mm-v">{f.v}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.7, delay: 0.24 }}
          style={{ marginTop: 'var(--sp-8)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
        >
          {/* Pas d'italique : Relicta n'en a pas de vraie, le navigateur en fabriquerait une penchée et sale. */}
          <span className="metier-sign-name" style={{ fontFamily: 'var(--f-serif)', fontSize: '1.6rem', color: 'var(--c-texte)' }}>Renaud</span>
          <span aria-hidden="true" style={{ width: '34px', height: '1px', background: 'var(--c-or-dim)' }} />
          <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-texte-2)' }}>Dessiné, fabriqué &amp; posé par mes soins</span>
        </motion.div>
      </div>

      <style>{`
        .mm-diplomas {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: clamp(24px, 4vw, 56px);
          padding-top: var(--sp-6); border-top: 1px solid var(--c-pierre);
          max-width: 620px; margin: var(--sp-6) auto 0;
        }
        .mm-diploma { display: flex; flex-direction: column; gap: 5px; }
        .mm-k { font-family: var(--f-serif); font-size: clamp(1.4rem, 2vw, 1.9rem); line-height: 1; color: var(--c-texte); }
        .mm-v { font-family: var(--f-sans); font-size: 0.8rem; color: var(--c-texte-2); }
      `}</style>
    </section>
  )
}
