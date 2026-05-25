import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

/* ─── Animated counter ────────────────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 2 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step  = to / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Word reveal ─────────────────────────────────────────────────────── */
function Word({ children, delay }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.08em' }}>
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}

const words1 = ['Mobilier', 'sur', 'mesure,']
const words2 = ['fait', 'à', "l'atelier."]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY  = useTransform(scrollYProgress, [0, 1], ['0%',  '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%',  '10%'])

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100dvh',
        background: 'var(--c-brun)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background */}
      <motion.div style={{ position: 'absolute', inset: 0, y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1920&q=80"
          alt="Atelier d'ébénisterie, copeaux de bois et outils"
          style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(108deg, rgba(6,13,11,0.97) 0%, rgba(6,13,11,0.90) 38%, rgba(6,13,11,0.50) 68%, rgba(6,13,11,0.12) 100%)',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          position: 'relative', zIndex: 2,
          padding: 'var(--px)',
          paddingTop: 'clamp(120px, 14vh, 200px)',
          paddingBottom: 'clamp(80px, 10vh, 140px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100dvh',
          y: textY,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}
        >
          <span className="gold-line" />
          <span className="eyebrow eyebrow--light">Ébénisterie & Menuiserie sur mesure</span>
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--f-serif)',
          fontSize: 'clamp(3.6rem, 8.5vw, 9.5rem)',
          fontWeight: 400,
          lineHeight: 1.0,
          color: 'var(--c-ivoire)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--sp-8)',
          maxWidth: '15ch',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em', marginBottom: '0.08em' }}>
            {words1.map((w, i) => <Word key={w} delay={0.5 + i * 0.1}>{w}</Word>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em', color: 'var(--c-or)' }}>
            {words2.map((w, i) => <Word key={w} delay={0.85 + i * 0.1}>{w}</Word>)}
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease }}
          style={{
            fontFamily: 'var(--f-sans)',
            fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'var(--cr-65)',
            maxWidth: '44ch',
            marginBottom: 'var(--sp-12)',
          }}
        >
          Vingt ans d'atelier. Je dessine votre projet, je le modélise en 3D, et on démarre seulement quand ça vous convient.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-8)', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="btn btn--gold">
            <span>Parler de votre projet</span>
            <span className="arrow" />
          </a>

          {/* Text-link CTA — more French luxury than a second pill */}
          <a
            href="#realisations"
            className="link-arrow"
            style={{ color: 'var(--cr-50)' }}
          >
            <span>Voir mes réalisations</span>
            <span className="arrow" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            marginTop: 'clamp(52px, 9vh, 100px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(24px, 5vw, 88px)',
            borderTop: '1px solid var(--or-20)',
            paddingTop: 'var(--sp-8)',
          }}
        >
          {[
            { to: 20,  suffix: '+',  label: "Années d'expérience", dur: 2 },
            { to: 300, suffix: '+',  label: 'Pièces créées',       dur: 2.5 },
            { to: 98,  suffix: '%',  label: 'Clients satisfaits',  dur: 2 },
          ].map(({ to, suffix, label, dur }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--f-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                fontWeight: 400,
                color: 'var(--c-or)',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                <Counter to={to} suffix={suffix} duration={dur} />
              </div>
              <div style={{
                fontFamily: 'var(--f-sc)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: 'rgba(245,249,247,0.52)',
                textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '36px',
          right: 'var(--px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: 'var(--f-sc)',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          color: 'rgba(245,249,247,0.28)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, var(--c-or), transparent)' }}
        />
      </motion.div>
      <style>{`
        @media (max-width: 600px) { .hero-scroll-indicator { display: none; } }
      `}</style>
    </section>
  )
}
