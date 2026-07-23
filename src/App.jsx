import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ServicesFewer from './components/ServicesFewer'
import Realisations from './components/Realisations'
import Metier from './components/Metier'
import StatsBand from './components/StatsBand'
import Processus from './components/Processus'
import Engagements from './components/Engagements'
import CtaBand from './components/CtaBand'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ThemeCustomizer from './components/ThemeCustomizer'
import { CUISINES } from './lib/cuisines'

// Images hero. ⚠ Ce sont des images GÉNÉRÉES (IA) : Renaud a justement trouvé
// que celle en place « faisait un peu IA » et veut la remplacer par une vraie
// photo de lui à l'atelier (vocal du 23/07/2026). À changer avant mise en ligne.
import heroChiselA from './assets/hero/hero-ciseau-01.webp'
import heroChiselB from './assets/hero/hero-ciseau-02.webp'
import heroChiselC from './assets/hero/hero-ciseau-03.webp'
import heroChiselD from './assets/hero/hero-ciseau-04.webp'
import heroLathe from './assets/hero/hero-tour.webp'
import heroSander from './assets/hero/hero-ponceuse.webp'
import heroRouter from './assets/hero/hero-defonceuse.webp'

/**
 * Le site tient désormais dans une seule mise en page : l'ancienne V6 « Sobre »,
 * celle que Renaud a retenue et qu'il commente dans ses vocaux. Le sélecteur de
 * versions et les six autres pistes ont été retirés — récupérables sur la branche
 * `sauvegarde-7-versions` / le tag `versions-1-7-avant-consolidation`.
 *
 * Ce qui définissait la V6 et qui vaut maintenant pour tout le site : structure
 * classique resserrée, header blanc, hero calé à gauche sur photo, palette claire
 * (dans index.css), savoir-faire en liste typographique.
 */
const HERO_IMAGE = heroRouter
const HERO_LAYOUT = 'left'

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
// N'écrase QUE les champs réellement choisis (les autres gardent la base).
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

// Bibliothèque d'images hero + dispositions, proposées dans le customizer.
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
  // Personnalisation live. '' = valeur du site.
  const [custom, setCustom] = useState({ accent: '', font: '', hero: '', layout: '', caps: false })

  const heroBg = custom.hero || HERO_IMAGE
  const heroLayout = custom.layout || HERO_LAYOUT
  const style = customVars(custom)

  return (
    <div className={`site${custom.caps ? ' caps-titles' : ''}`} style={style}>
      <div className="grain" aria-hidden="true" />
      <Nav solid />
      <main>
        <Hero bg={heroBg} layout={heroLayout} variant="clean" />
        <ServicesFewer />
        <Realisations cuisine={CUISINES.foncePortrait} />
        <Metier />
        <StatsBand />
        <Processus />
        <Engagements />
        <CtaBand />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      <ThemeCustomizer value={custom} onChange={setCustom} heroes={HEROS} layouts={LAYOUT_OPTIONS} />
    </div>
  )
}
