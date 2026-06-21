import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const PHONE_DISPLAY = '06 34 08 46 90'
const PHONE_HREF = 'tel:+33634084690'

/* Image de fond du hero : public/hero.webp.
   Servie depuis /public avec une URL stable, préchargée dans index.html (<link rel="preload">)
   pour démarrer son téléchargement dès le HTML, sans attendre le bundle JS (LCP). */
const HERO_BG = '/hero.webp'

const stats = [
  { value: '9 ans', label: "d'atelier" },
  { value: '+300', label: 'projets' },
  { value: '5 ans', label: 'garantie' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40])

  return (
    <section
      id="top"
      ref={ref}
      style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        background: 'var(--c-noir)',
      }}
    >
      {/* Photo de fond - parallaxe douce */}
      <motion.div style={{ position: 'absolute', inset: '-8% 0', zIndex: 0, y: reduce ? 0 : bgY }}>
        <img
          src={HERO_BG}
          alt="Atelier d'ébénisterie Achard Créa : mobilier en bois massif en cours de fabrication"
          fetchpriority="high" decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>

      {/* Voiles chauds pour la lisibilité du texte + de la nav */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(24,18,12,0.48)' }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(20,15,9,0.84) 0%, rgba(20,15,9,0.56) 36%, rgba(20,15,9,0.66) 72%, rgba(20,15,9,0.95) 100%)',
      }} />

      {/* Contenu centré */}
      <motion.div
        style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}
      >
        <div className="hero-inner" style={{
          width: '100%', maxWidth: '1180px', margin: '0 auto',
          padding: 'clamp(120px, 18vh, 200px) var(--px) clamp(28px, 5vh, 56px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          gap: 'clamp(18px, 2.6vh, 30px)',
        }}>
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow hero-eyebrow"
            style={{ color: 'var(--c-or-pale)' }}
          >
            Mobilier &amp; agencement sur mesure · depuis 2017
          </motion.span>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="hero-title"
            style={{
              fontFamily: 'var(--f-serif)', fontWeight: 400,
              fontSize: 'clamp(2.4rem, 5vw, 4.8rem)', lineHeight: 1.1,
              letterSpacing: '-0.022em', color: 'var(--c-ivoire)',
              maxWidth: 'none', whiteSpace: 'nowrap',
              paddingBottom: '0.08em', textShadow: '0 2px 30px rgba(20,15,9,0.55)',
            }}
          >
            Votre intérieur<br />
            sur mesure,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--c-or-pale)' }}>par un ébéniste<br />à Chamonix.</em>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="hero-sub"
            style={{
              fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
              lineHeight: 1.7, color: 'rgba(242,235,221,0.86)', maxWidth: '46ch',
            }}
          >
            Mobilier, cuisines et escaliers sur mesure, dessinés, fabriqués et
            posés par mes soins dans la vallée de Chamonix et toute la Haute-Savoie.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}
          >
            <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#contact" className="btn btn--gold" style={{ fontSize: '0.84rem' }}>
                <span>Demander un devis gratuit</span><span className="arrow" />
              </a>
              <a href={PHONE_HREF} className="btn btn--outline-light hero-phone" aria-label={`Appeler le ${PHONE_DISPLAY}`} style={{ fontSize: '0.84rem', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.2 2h2.8l1.4 3.2-1.6 1.3a8.8 8.8 0 0 0 3.6 3.6l1.3-1.6 3.2 1.4v2.8A1 1 0 0 1 13 14C5.82 14 2 8.18 2 3a1 1 0 0 1 1-1z" fill="currentColor"/>
                </svg>
                <span style={{ fontSize: '1.08rem', letterSpacing: '0.04em' }}>{PHONE_DISPLAY}</span>
              </a>
            </div>
            <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.82rem', color: 'rgba(242,235,221,0.6)' }}>
              Réponse sous 24 h, sans engagement.
            </span>
          </motion.div>

          {/* Social proof - chiffres */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease }}
            className="hero-stats"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 48px)', marginTop: 'var(--sp-2)' }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="hero-stat" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 48px)' }}>
                {i > 0 && <span aria-hidden="true" style={{ width: '1px', height: '30px', background: 'rgba(242,235,221,0.22)' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: 'var(--c-ivoire)', lineHeight: 1 }}>{s.value}</span>
                  <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,235,221,0.55)' }}>{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>


      <style>{`
        @media (max-width: 760px) {
          /* On laisse le hero respirer : plus de hauteur forcée, on dégage la nav fixe */
          .hero-inner {
            padding-top: 104px !important;
            padding-bottom: 44px !important;
            gap: 20px !important;
          }
          /* eyebrow masqué sur mobile : trop d'infos sur le hero */
          .hero-eyebrow { display: none !important; }
          /* sur mobile la 1re ligne est trop longue pour tenir : on autorise le retour naturel */
          .hero-title { font-size: clamp(2.4rem, 9vw, 3.4rem) !important; line-height: 1.12 !important; max-width: none !important; white-space: normal !important; }
          .hero-sub   { font-size: 0.98rem !important; line-height: 1.6 !important; max-width: 38ch !important; }

          /* CTA : deux boutons pleine largeur empilés, largeurs identiques */
          .hero-cta-row {
            flex-direction: column !important;
            flex-wrap: nowrap !important;
            width: 100%;
            max-width: 360px;
            gap: 12px !important;
          }
          .hero-cta-row .btn {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 54px !important;
            padding: 0 24px !important;
            font-size: 0.78rem !important;
            letter-spacing: 0.12em !important;
            white-space: nowrap !important;
          }
          .hero-phone span { font-size: 0.92rem !important; letter-spacing: 0.04em !important; }

          .hero-stats { gap: 18px !important; }
          .hero-stat  { gap: 18px !important; }
        }
      `}</style>
    </section>
  )
}
