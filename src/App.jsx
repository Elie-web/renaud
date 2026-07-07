import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Realisations from './components/Realisations'
import ImageBand from './components/ImageBand'
import Metier from './components/Metier'
import Processus from './components/Processus'
import Engagements from './components/Engagements'
import Temoignages from './components/Temoignages'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import VersionSwitcher from './components/VersionSwitcher'
import ThemeCustomizer from './components/ThemeCustomizer'

// Variantes de la section Savoir-faire
import ServicesFewer from './components/ServicesFewer'
import ServicesGallery from './components/ServicesGallery'
import ServicesSlider from './components/ServicesSlider'
// Sections INÉDITES (pour de vraies refontes structurelles par version)
import Manifesto from './components/Manifesto'
import StatsBand from './components/StatsBand'
import Marquee from './components/Marquee'
import CtaBand from './components/CtaBand'
import MetierMinimal from './components/MetierMinimal'

// Images hero IA (gros plan « explosif » — une par version brouillon)
import heroChiselA from './assets/hero ia/Gemini_Generated_Image_ajqtmvajqtmvajqt-clean.webp'
import heroChiselB from './assets/hero ia/Gemini_Generated_Image_gb5g4vgb5g4vgb5g-clean.webp'
import heroChiselC from './assets/hero ia/Gemini_Generated_Image_h2avf7h2avf7h2av-clean.webp'
import heroChiselD from './assets/hero ia/Gemini_Generated_Image_x5jq6xx5jq6xx5jq-clean.webp'
import heroLathe from './assets/hero ia/Gemini_Generated_Image_auvmkzauvmkzauvm-clean.webp'
import heroSander from './assets/hero ia/Gemini_Generated_Image_hzhctkhzhctkhzhc-clean.webp'
import heroRouter from './assets/hero ia/Gemini_Generated_Image_ucg8w7ucg8w7ucg8-clean.webp'

// Toutes les sections (hors Hero, toujours en premier) adressables par clé.
const SECTIONS = {
  services: Services,
  realisations: Realisations,
  metier: Metier,
  imageband: ImageBand,
  processus: Processus,
  engagements: Engagements,
  temoignages: Temoignages,
  faq: FAQ,
  contact: Contact,
  // sections inédites, insérées selon la version
  manifesto: Manifesto,
  stats: StatsBand,
  marquee: Marquee,
  ctaband: CtaBand,
}

// Versions brouillon : chacune = une des polices envoyées par Renaud, montée en
// thème complet (via la classe .ver-N dans index.css), avec une image de hero et
// un ORDRE de sections différents. Le nom = la police, pour la reconnaître dans
// le sélecteur de version.
const VERSIONS = {
  // V1 = RÉFÉRENCE, NE PAS MODIFIER.
  1: {
    name: 'Actuelle', hero: '/hero.webp', heroLayout: 'center', solidNav: false,
    order: ['services', 'realisations', 'metier', 'imageband', 'processus', 'engagements', 'temoignages', 'faq', 'contact'],
  },
  // V2 — QUICKSAND (la préférée de Renaud). Structure éditoriale : manifeste + chiffres + bande CTA.
  2: {
    name: 'Quicksand', hero: heroChiselC, heroLayout: 'left', variant: 'clean', solidNav: false,
    order: ['services', 'manifesto', 'realisations', 'stats', 'metier', 'processus', 'faq', 'ctaband', 'contact'],
    overrides: { services: ServicesFewer },
  },
  // V3 — LEKTON (monospace, studio/architecte), header blanc. Structure moderne : marquee + à-propos minimal.
  3: {
    name: 'Lekton', hero: heroSander, heroLayout: 'left', variant: 'clean', solidNav: true,
    order: ['marquee', 'services', 'metier', 'realisations', 'stats', 'processus', 'ctaband', 'faq', 'contact'],
    overrides: { metier: MetierMinimal },
  },
  // V4 — KATAS (display art-déco caps), hero SPLIT. Structure narrative : à-propos d'abord + manifeste.
  4: {
    name: 'Katas', hero: heroLathe, heroLayout: 'split', variant: 'clean', solidNav: true,
    order: ['metier', 'services', 'imageband', 'manifesto', 'realisations', 'processus', 'engagements', 'stats', 'faq', 'contact'],
    overrides: { services: ServicesSlider },
  },
  // V5 — NISABA (display très fin), thème SOMBRE complet, hero ENCADRÉ. Refonte radicale.
  5: {
    name: 'Nisaba', hero: heroChiselA, heroLayout: 'framed', variant: 'clean', solidNav: false,
    order: ['realisations', 'marquee', 'services', 'manifesto', 'stats', 'processus', 'engagements', 'ctaband', 'faq', 'contact'],
    overrides: { services: ServicesGallery },
  },
  // V6 — RELICTA (sans élégant, clair & raffiné), header blanc. Structure sobre.
  6: {
    name: 'Relicta', hero: heroRouter, heroLayout: 'left', variant: 'clean', solidNav: true,
    order: ['services', 'realisations', 'metier', 'stats', 'processus', 'engagements', 'ctaband', 'faq', 'contact'],
    overrides: { services: ServicesFewer },
  },
  // V7 — DANIEL SANS (manuscrit/marqueur), crème conviviale, hero centré.
  7: {
    name: 'Daniel Sans', hero: heroChiselB, heroLayout: 'center', variant: 'clean', solidNav: false,
    order: ['services', 'metier', 'realisations', 'imageband', 'processus', 'engagements', 'faq', 'contact'],
    overrides: { services: ServicesGallery },
  },
}

function readVersion() {
  const m = /^#v([1-7])$/.exec(window.location.hash)
  return m ? Number(m[1]) : 1
}

// ── Personnalisation live : dérive les variables CSS depuis couleur + police ──
function hexToRgb(h) {
  h = h.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
function shade(rgb, amt) {
  const f = (x) => (amt < 0 ? Math.round(x * (1 + amt)) : Math.round(x + (255 - x) * amt))
  return `rgb(${f(rgb[0])}, ${f(rgb[1])}, ${f(rgb[2])})`
}
// N'écrase QUE les champs réellement choisis (les autres gardent le thème de la version).
function customVars({ accent, font }) {
  const vars = {}
  if (accent) {
    const [r, g, b] = hexToRgb(accent)
    const a = (x) => `rgba(${r}, ${g}, ${b}, ${x})`
    Object.assign(vars, {
      '--c-or': accent,
      '--c-or-pale': shade([r, g, b], 0.24),
      '--c-or-dim': shade([r, g, b], -0.24),
      '--or-10': a(0.1), '--or-15': a(0.15), '--or-20': a(0.2), '--or-25': a(0.26), '--or-40': a(0.42),
      '--shadow-clay': `0 14px 44px -14px ${a(0.34)}`,
    })
  }
  if (font) { vars['--f-serif'] = font; vars['--f-sc'] = font }
  return vars
}

// Bibliothèque d'images hero + dispositions, proposées dans le customizer (toutes versions).
const HEROS = [
  { label: 'Atelier (actuelle)', src: '/hero.webp' },
  { label: 'Ciseau 1', src: heroChiselA },
  { label: 'Ciseau 2', src: heroChiselB },
  { label: 'Ciseau 3', src: heroChiselC },
  { label: 'Ciseau 4', src: heroChiselD },
  { label: 'Tour à bois', src: heroLathe },
  { label: 'Ponceuse', src: heroSander },
  { label: 'Défonceuse', src: heroRouter },
]
const LAYOUT_OPTIONS = [
  { key: 'center', label: 'Centré' },
  { key: 'left', label: 'Gauche' },
  { key: 'bottom', label: 'Bas' },
  { key: 'split', label: 'Split' },
  { key: 'boxed', label: 'Carte' },
  { key: 'framed', label: 'Encadré' },
  { key: 'solid', label: 'Typo' },
]

export default function App() {
  const [ver, setVer] = useState(readVersion)
  // Personnalisation live, dispo sur TOUTES les versions. '' = auto (thème de la version).
  const [custom, setCustom] = useState({ accent: '', font: '', hero: '', layout: '' })

  useEffect(() => {
    const onHash = () => setVer(readVersion())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // à chaque changement de version : on remonte en haut pour comparer les hero
  useEffect(() => { window.scrollTo({ top: 0 }) }, [ver])

  const cfg = VERSIONS[ver] || VERSIONS[1]
  const heroBg = custom.hero || cfg.hero
  const heroLayout = custom.layout || cfg.heroLayout
  const style = customVars(custom)

  return (
    <div className={`site ver-${ver}`} style={style}>
      <div className="grain" aria-hidden="true" />
      <Nav solid={cfg.solidNav} />
      <main>
        <Hero bg={heroBg} layout={heroLayout} variant={cfg.variant} />
        {cfg.order.map((key) => {
          const Section = (cfg.overrides && cfg.overrides[key]) || SECTIONS[key]
          return <Section key={key} />
        })}
      </main>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      <VersionSwitcher current={ver} versions={VERSIONS} />
      <ThemeCustomizer value={custom} onChange={setCustom} heroes={HEROS} layouts={LAYOUT_OPTIONS} />
    </div>
  )
}
