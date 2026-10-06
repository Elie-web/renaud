import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader, { Accent } from './SectionHeader'
import { INSTAGRAM, INSTAGRAM_URL, BEHOLD_FEED } from '../lib/coordonnees'

// ─────────────────────────────────────────────────────────────────────────────
//  « L'atelier, au jour le jour » : les 6 dernières publications Instagram.
//
//  Proposé à Renaud en visio le 06/10/2026, et c'est lui qui en a vu l'intérêt :
//  « j'ai juste à gérer sur Insta, et tout ce que je mets sur Insta, ça se
//  retrouve sur le site ». Les stories n'y sont pas, elles sont temporaires.
//  « Au pire, ça te plaît pas, on l'enlève » : retirer la ligne <Instagram />
//  d'App.jsx suffit.
//
//  Le flux vient de Behold (voir lib/coordonnees.js), qui gère le jeton
//  Instagram à notre place. Trois règles :
//
//  1. La section n'existe que si le flux est branché. Un identifiant seul donne
//     un lien dans le contact et le pied de page, pas une section vide.
//  2. Le flux n'est demandé qu'à l'approche de la section. La formule gratuite
//     compte 1 200 affichages par mois : un visiteur qui repart depuis le haut
//     de page n'en consomme pas. Rien n'est stocké chez le visiteur (ni cookie
//     ni sessionStorage) : la politique de confidentialité peut le dire.
//  3. Si Behold ne répond pas, la grille disparaît et il reste le lien vers le
//     compte. Jamais de cases vides à l'écran.
// ─────────────────────────────────────────────────────────────────────────────

const NB = 6

function couper(texte, max) {
  const t = texte.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, t.lastIndexOf(' ', max) > 40 ? t.lastIndexOf(' ', max) : max) + '…'
}

function normaliser(post) {
  const s = post.sizes || {}
  const petit = s.small
  const moyen = s.medium || s.large
  const base = petit || moyen
  if (!base?.mediaUrl || !post.permalink) return null
  const legende = (post.prunedCaption || post.caption || '').trim()
  const video = post.mediaType === 'VIDEO'
  return {
    id: post.id || post.permalink,
    lien: post.permalink,
    src: base.mediaUrl,
    srcSet: petit && moyen
      ? `${petit.mediaUrl} ${petit.width}w, ${moyen.mediaUrl} ${moyen.width}w`
      : undefined,
    video,
    alt: (legende ? couper(legende, 140) : "Publication Instagram d'Achard Créa") + (video ? ' (vidéo)' : ''),
  }
}

const IcoLecture = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
  </svg>
)

export default function Instagram() {
  if (!INSTAGRAM || !BEHOLD_FEED) return null
  return <SectionInstagram />
}

function SectionInstagram() {
  const ref = useRef(null)
  const [posts, setPosts] = useState([])
  // attente → ok | vide
  const [etat, setEtat] = useState('attente')

  useEffect(() => {
    if (etat !== 'attente') return
    const ctrl = new AbortController()
    let lance = false

    const charger = async () => {
      if (lance) return
      lance = true
      try {
        const rep = await fetch(BEHOLD_FEED, { signal: ctrl.signal })
        if (!rep.ok) throw new Error(String(rep.status))
        const data = await rep.json()
        const liste = (Array.isArray(data?.posts) ? data.posts : [])
          .map(normaliser).filter(Boolean).slice(0, NB)
        if (!liste.length) throw new Error('flux vide')
        setPosts(liste)
        setEtat('ok')
      } catch (err) {
        if (err?.name !== 'AbortError') setEtat('vide')
      }
    }

    if (!('IntersectionObserver' in window) || !ref.current) {
      charger()
      return () => ctrl.abort()
    }
    const obs = new IntersectionObserver(
      (entrees) => { if (entrees.some((e) => e.isIntersecting)) { obs.disconnect(); charger() } },
      { rootMargin: '900px 0px' },
    )
    obs.observe(ref.current)
    return () => { obs.disconnect(); ctrl.abort() }
  }, [etat])

  return (
    <section ref={ref} id="instagram" aria-labelledby="titre-instagram"
      style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          titleId="titre-instagram"
          eyebrow={`Sur Instagram · @${INSTAGRAM}`}
          title={<>L'atelier,<br /> <Accent>au jour le jour.</Accent></>}
          lead="Les pièces en cours, les finitions et les poses, au fil des chantiers."
        />

        {etat !== 'vide' && (
          <ul className="insta-grid">
            {etat === 'ok'
              ? posts.map((p, i) => (
                <motion.li key={p.id}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                  <a href={p.lien} target="_blank" rel="noopener noreferrer" className="insta-tile">
                    <img src={p.src} srcSet={p.srcSet}
                      sizes="(max-width: 860px) 33vw, 200px"
                      alt={p.alt} loading="lazy" decoding="async" width="400" height="500" />
                    {p.video && <span className="insta-video">{IcoLecture}</span>}
                  </a>
                </motion.li>
              ))
              // Places réservées pendant le chargement : la grille ne fait pas
              // sauter la page quand les images arrivent.
              : Array.from({ length: NB }, (_, i) => (
                <li key={i} aria-hidden="true"><span className="insta-tile insta-tile--attente" /></li>
              ))}
          </ul>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(32px, 4vw, 52px)' }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <span>Suivre l'atelier sur Instagram</span><span className="arrow" />
          </a>
        </div>
      </div>

      <style>{`
        .insta-grid {
          display: grid; grid-template-columns: repeat(6, 1fr);
          gap: clamp(8px, 1vw, 14px);
          max-width: 1240px; margin: 0 auto; list-style: none; padding: 0;
        }
        .insta-tile {
          position: relative; display: block; aspect-ratio: 4 / 5;
          overflow: hidden; border-radius: 12px;
          background: var(--c-pierre);
        }
        .insta-tile img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s var(--ease);
        }
        .insta-tile--attente { box-shadow: inset 0 0 0 1px var(--c-pierre); }
        .insta-video {
          position: absolute; top: 10px; right: 10px;
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(30, 24, 17, 0.55); color: var(--c-ivoire);
          padding-left: 2px;
        }
        @media (hover: hover) {
          .insta-tile:hover img { transform: scale(1.04); }
        }
        @media (max-width: 860px) {
          .insta-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  )
}
