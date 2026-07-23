import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const PHONE_DISPLAY = '06 34 08 46 90'
const PHONE_HREF = 'tel:+33634084690'

const HERO_BG = '/hero.webp'

const proofs = [
  { strong: 'Depuis 2019', rest: 'dans le bois, CAP d’ébénisterie' },
  { strong: '100 %', rest: 'de clients satisfaits' },
]

// Dispositions testées d'une version à l'autre (grosses différences visuelles).
const LAYOUTS = {
  center: { ai: 'center',     ta: 'center', vJustify: 'flex-start' },
  left:   { ai: 'flex-start', ta: 'left',   vJustify: 'center' },
  bottom: { ai: 'flex-start', ta: 'left',   vJustify: 'flex-end' },
  split:  { ai: 'flex-start', ta: 'left',   vJustify: 'center' },
  boxed:  { ai: 'center',     ta: 'center', vJustify: 'center' },
  framed: { ai: 'flex-start', ta: 'left',   vJustify: 'flex-end' },
  solid:  { ai: 'flex-start', ta: 'left',   vJustify: 'center' },
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export default function Hero({ bg = HERO_BG, layout = 'center', variant = 'full' }) {
  const ref = useRef(null)
  const clean = variant === 'clean'
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40])

  const split = layout === 'split'
  const boxed = layout === 'boxed'
  const framed = layout === 'framed'
  const solid = layout === 'solid'
  const lay = LAYOUTS[layout] || LAYOUTS.center
  const rowsJustify = (layout === 'center' || boxed) ? 'center' : 'flex-start'

  // 1320px (au lieu de 1180) : le titre tient sur deux lignes larges sans se couper.
  const innerMaxW = split ? '620px' : boxed ? 'none' : solid ? '1100px' : '1320px'
  const innerPad =
    split ? 'clamp(120px, 16vh, 180px) clamp(32px, 5vw, 72px) clamp(48px, 8vh, 90px)'
      : boxed ? '0'
      : framed ? 'clamp(40px, 7vh, 90px) clamp(30px, 4vw, 60px)'
      : solid ? 'clamp(120px, 16vh, 190px) var(--px) clamp(40px, 6vh, 80px)'
      : layout === 'center' ? 'clamp(120px, 18vh, 200px) var(--px) clamp(28px, 5vh, 56px)'
      : 'clamp(116px, 15vh, 168px) var(--px) clamp(48px, 8vh, 92px)'

  // ── Contenu (réutilisé quelle que soit la disposition) ──
  const Content = (
    <div
      className="hero-inner"
      style={{
        width: '100%', maxWidth: innerMaxW, margin: (split || boxed) ? '0' : '0 auto',
        padding: innerPad,
        display: 'flex', flexDirection: 'column',
        alignItems: lay.ai, textAlign: lay.ta,
        gap: 'clamp(18px, 2.6vh, 30px)',
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="eyebrow hero-eyebrow"
        style={{ color: 'var(--c-or-pale)', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 12px rgba(20,15,9,0.6)' }}
      >
        Mobilier &amp; agencement sur mesure · depuis 2019
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease }}
        className="hero-title"
        style={{
          fontFamily: 'var(--f-serif)', fontWeight: 400,
          fontSize: 'clamp(2.4rem, 5.4vw, 5.4rem)', lineHeight: 1.12,
          letterSpacing: '0', color: 'var(--c-ivoire)',
          // Pas de nowrap : les <br /> donnent la coupe voulue quand la ligne
          // tient, et le titre se replie de lui-même sur les colonnes étroites
          // (disposition « split ») au lieu de déborder.
          maxWidth: 'none',
          // Ombre DIFFUSE uniquement. Les deux couches serrées (1px et 2px) qu'il y
          // avait ici dessinaient un liseré sombre juste sous chaque lettre : c'est
          // l'effet de « relief » que Renaud ne voulait plus (vocal du 23/07/2026).
          // Une seule ombre large suffit à décoller le titre de la photo.
          paddingBottom: '0.08em', textShadow: '0 2px 22px rgba(20,15,9,0.6), 0 4px 48px rgba(20,15,9,0.45)',
        }}
      >
        Votre intérieur sur mesure,<br />
        <em className="i-accent--light">par un ébéniste à Chamonix.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease }}
        className="hero-sub"
        style={{
          fontFamily: 'var(--f-sans)', fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
          lineHeight: 1.7, color: 'rgba(242,235,221,0.9)', maxWidth: '46ch',
          textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 16px rgba(20,15,9,0.55)',
        }}
      >
        Mobilier, cuisines et escaliers sur mesure, dessinés, fabriqués et
        posés par mes soins dans la vallée de Chamonix et toute la Haute-Savoie.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: lay.ai, gap: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}
      >
        <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: rowsJustify }}>
          <a href="#contact" className="btn btn--gold" style={{ fontSize: '0.84rem' }}>
            <span>Demander un devis gratuit</span><span className="arrow" />
          </a>
          {!clean && (
            <a href={PHONE_HREF} className="btn btn--outline-light hero-phone" aria-label={`Appeler le ${PHONE_DISPLAY}`} style={{ fontSize: '0.84rem', gap: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.2 2h2.8l1.4 3.2-1.6 1.3a8.8 8.8 0 0 0 3.6 3.6l1.3-1.6 3.2 1.4v2.8A1 1 0 0 1 13 14C5.82 14 2 8.18 2 3a1 1 0 0 1 1-1z" fill="currentColor"/>
              </svg>
              <span style={{ fontSize: '1.08rem', letterSpacing: '0.04em' }}>{PHONE_DISPLAY}</span>
            </a>
          )}
        </div>
        {!clean && (
          <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.82rem', color: 'rgba(242,235,221,0.72)', textShadow: '0 1px 6px rgba(20,15,9,0.65)' }}>
            Réponse sous 24 h, sans engagement.
          </span>
        )}
      </motion.div>

      {!clean && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease }}
          className="hero-stats"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 34px)', marginTop: 'var(--sp-2)', flexWrap: 'wrap', justifyContent: rowsJustify }}
        >
          {proofs.map((p, i) => (
            <div key={p.strong} className="hero-stat" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 34px)' }}>
              {i > 0 && <span aria-hidden="true" className="hero-proof-sep" style={{ width: '1px', height: '26px', background: 'rgba(242,235,221,0.22)' }} />}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
                <span aria-hidden="true" style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(194,116,78,0.22)', color: 'var(--c-or-pale)' }}><Check /></span>
                <span style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)', lineHeight: 1.3, color: 'rgba(242,235,221,0.92)', textAlign: 'left', textShadow: '0 1px 6px rgba(20,15,9,0.7)' }}>
                  <strong style={{ fontWeight: 600, color: 'var(--c-ivoire)' }}>{p.strong}</strong> {p.rest}
                </span>
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )

  // ── Disposition BOXED : carte translucide centrée sur la photo ──
  if (boxed) {
    return (
      <section id="top" ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--c-noir)' }}>
        <motion.div style={{ position: 'absolute', inset: '-8% 0', zIndex: 0, y: reduce ? 0 : bgY }}>
          <img src={bg} alt="Atelier d'ébénisterie Achard Créa : mobilier en bois massif en cours de fabrication"
            fetchpriority="high" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </motion.div>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(24,18,12,0.34)' }} />
        <motion.div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(104px, 14vh, 150px) var(--px) clamp(48px, 6vh, 80px)', opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}>
          <div className="hero-box" style={{
            width: '100%', maxWidth: '760px',
            padding: 'clamp(36px, 5vw, 68px) clamp(28px, 4vw, 56px)',
            background: 'rgba(20,15,9,0.52)',
            border: '1px solid rgba(242,235,221,0.16)',
            borderRadius: '4px',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          }}>
            {Content}
          </div>
        </motion.div>
      </section>
    )
  }

  // ── Disposition SPLIT : panneau sombre à gauche + photo à droite ──
  if (split) {
    return (
      <section id="top" ref={ref} className="hero-split" style={{ position: 'relative', minHeight: '100dvh', display: 'grid', gridTemplateColumns: '1.05fr 1fr', background: 'var(--c-noir)' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', zIndex: 2 }}>
          {Content}
        </div>
        <div className="hero-split-media" style={{ position: 'relative', overflow: 'hidden', background: 'var(--c-brun-md)' }}>
          <img src={bg} alt="Atelier d'ébénisterie Achard Créa : mobilier en bois massif en cours de fabrication"
            fetchpriority="high" decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <style>{`
          @media (max-width: 860px) {
            .hero-split { grid-template-columns: 1fr !important; }
            .hero-split .hero-split-media { min-height: 46vh; order: -1; }
            .hero-split .hero-inner { padding-top: clamp(104px, 14vh, 150px) !important; }
          }
        `}</style>
      </section>
    )
  }

  // ── Disposition FRAMED : photo encadrée (marge autour), légende en bas ──
  if (framed) {
    return (
      <section id="top" ref={ref} style={{ position: 'relative', minHeight: '100dvh', background: 'var(--c-noir)', display: 'flex', padding: 'clamp(88px, 11vh, 128px) clamp(16px, 3.5vw, 48px) clamp(20px, 4vh, 44px)' }}>
        <div style={{ position: 'relative', flex: 1, borderRadius: '22px', overflow: 'hidden', display: 'flex' }}>
          <motion.div style={{ position: 'absolute', inset: '-8% 0', zIndex: 0, y: reduce ? 0 : bgY }}>
            <img src={bg} alt="Atelier d'ébénisterie Achard Créa : mobilier en bois massif en cours de fabrication"
              fetchpriority="high" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </motion.div>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(20,15,9,0.34) 0%, rgba(20,15,9,0.12) 34%, rgba(20,15,9,0.5) 72%, rgba(20,15,9,0.9) 100%)' }} />
          <motion.div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', justifyContent: lay.vJustify, opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}>
            {Content}
          </motion.div>
        </div>
      </section>
    )
  }

  // ── Disposition SOLID : typographie sur fond plein sombre + médaillon photo ──
  if (solid) {
    return (
      <section id="top" ref={ref} style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(100% 70% at 18% 24%, var(--or-15), transparent 60%), var(--c-noir)' }}>
        <div aria-hidden="true" className="hero-medallion" style={{ position: 'absolute', right: 'clamp(20px, 4vw, 64px)', bottom: 'clamp(20px, 4vw, 64px)', width: 'clamp(150px, 20vw, 300px)', aspectRatio: '4 / 5', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(242,235,221,0.18)', boxShadow: 'var(--shadow-md)', zIndex: 1 }}>
          <img src={bg} alt="" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <motion.div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', justifyContent: lay.vJustify, opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}>
          {Content}
        </motion.div>
        <style>{`@media (max-width: 760px) { .hero-medallion { display: none !important; } }`}</style>
      </section>
    )
  }

  // ── Dispositions sur photo plein cadre (center / left / bottom) ──
  return (
    <section
      id="top"
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--c-noir)' }}
    >
      <motion.div style={{ position: 'absolute', inset: '-8% 0', zIndex: 0, y: reduce ? 0 : bgY }}>
        <img
          src={bg}
          alt="Atelier d'ébénisterie Achard Créa : mobilier en bois massif en cours de fabrication"
          fetchpriority="high" decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>

      {/* voile plat léger (allégé quand le texte est calé à gauche → photo plus nette) */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: `rgba(24,18,12,${(layout === 'left' || layout === 'bottom') ? 0.16 : 0.40})` }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: layout === 'center'
          ? 'linear-gradient(180deg, rgba(20,15,9,0.42) 0%, rgba(20,15,9,0.26) 36%, rgba(20,15,9,0.42) 72%, rgba(20,15,9,0.86) 100%)'
          : 'linear-gradient(180deg, rgba(20,15,9,0.40) 0%, rgba(20,15,9,0.20) 36%, rgba(20,15,9,0.40) 72%, rgba(20,15,9,0.86) 100%)',
      }} />
      {/* dégradé sombre à gauche : texte lisible, sujet (à droite) préservé */}
      {(layout === 'left' || layout === 'bottom') && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(90deg, rgba(20,15,9,0.82) 0%, rgba(20,15,9,0.42) 34%, rgba(20,15,9,0) 62%)',
        }} />
      )}

      <motion.div
        style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', justifyContent: lay.vJustify, opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}
      >
        {Content}
      </motion.div>

      <style>{`
        @media (max-width: 760px) {
          .hero-inner {
            padding-top: 104px !important;
            padding-bottom: 44px !important;
            gap: 20px !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-eyebrow { display: none !important; }
          .hero-title { font-size: clamp(2.4rem, 9vw, 3.4rem) !important; line-height: 1.12 !important; max-width: none !important; white-space: normal !important; }
          .hero-sub   { font-size: 0.98rem !important; line-height: 1.6 !important; max-width: 38ch !important; }
          .hero-cta-row {
            flex-direction: column !important;
            flex-wrap: nowrap !important;
            width: 100%;
            max-width: 360px;
            gap: 12px !important;
            justify-content: center !important;
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
          .hero-stats { gap: 18px !important; justify-content: center !important; }
          .hero-stat  { gap: 18px !important; }
        }
      `}</style>
    </section>
  )
}
