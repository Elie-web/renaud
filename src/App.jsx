import { useState, useEffect, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Realisations from './components/Realisations'
import ImageBand from './components/ImageBand'
import Metier from './components/Metier'
import Processus from './components/Processus'
import Engagements from './components/Engagements'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import FloatingWhatsApp from './components/FloatingWhatsApp'

// Le panneau « Personnaliser » est un OUTIL DE TRAVAIL, pas une fonctionnalité du
// site livré : un visiteur qui vient chercher un ébéniste n'a rien à faire avec un
// sélecteur de couleurs. Il est donc :
//   1. chargé à la demande (`lazy`) → son code, ses 7 images hero et ses 7 polices
//      partent dans un fichier séparé qu'aucun visiteur ne télécharge ;
//   2. affiché uniquement en développement (`npm run dev`) ou sur l'adresse
//      `…/#perso` en ligne → Renaud et Elie y accèdent quand ils veulent, personne
//      d'autre ne le voit.
const ThemeCustomizer = lazy(() => import('./components/ThemeCustomizer'))

// Le site tel que Renaud l'a retenu (message vocal du 13/08/2026 : « j'ai choisi
// le numéro 1 »). Les 6 autres mises en page brouillon ont été retirées ; elles
// restent sauvegardées hors dépôt dans `_brouillon/` et dans l'historique git.
const HERO_DEFAUT = '/hero.webp'
const HERO_LAYOUT_DEFAUT = 'center'

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
// N'écrase QUE les champs réellement choisis (les autres gardent le thème du site).
function customVars({ accent, font }) {
  const vars = {}
  if (accent) {
    const [r, g, b] = hexToRgb(accent)
    const a = (x) => `rgba(${r}, ${g}, ${b}, ${x})`
    Object.assign(vars, {
      '--c-or': accent,
      '--c-or-pale': shade([r, g, b], 0.24),
      '--c-or-dim': shade([r, g, b], -0.24),
      // Remplissage des boutons pleins : légèrement assombri pour que le
      // libellé ivoire reste lisible quelle que soit la couleur choisie.
      '--c-or-cta': shade([r, g, b], -0.1),
      '--or-10': a(0.1), '--or-15': a(0.15), '--or-20': a(0.2), '--or-25': a(0.26), '--or-40': a(0.42),
      '--shadow-clay': `0 14px 44px -14px ${a(0.34)}`,
    })
  }
  if (font) { vars['--f-serif'] = font; vars['--f-sc'] = font }
  return vars
}

const DEFAUTS = { accent: '', font: '', hero: '', layout: '', caps: false }

export default function App() {
  // '' = valeur d'origine du site. Le panneau ne surcharge que ce qu'on lui choisit.
  const [custom, setCustom] = useState(DEFAUTS)
  const [perso, setPerso] = useState(
    () => import.meta.env.DEV || window.location.hash === '#perso'
  )

  // On peut donc activer le panneau en direct depuis le site en ligne, sans
  // recharger, en tapant `#perso` dans la barre d'adresse.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#perso') setPerso(true)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`site${custom.caps ? ' caps-titles' : ''}`} style={customVars(custom)}>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero bg={custom.hero || HERO_DEFAUT} layout={custom.layout || HERO_LAYOUT_DEFAUT} />
        <Services />
        <Realisations />
        <Metier />
        <ImageBand />
        <Processus />
        <Engagements />
        {/* La section « Ce qu'en disent mes clients » est RETIRÉE tant que Renaud
            n'a pas de vrais avis (décision d'Elie, 13/08/2026). Les témoignages
            qui s'y trouvaient étaient des placeholders inventés, avec des villes
            qui n'ont rien à voir avec sa zone, et un badge « 5,0 · 3 avis Google »
            pointant vers rien.
            Le composant est conservé dans `_brouillon/components/Temoignages.jsx`.
            Pour le remettre : le recopier dans `src/components/`, remplacer le
            tableau `avis`, `GOOGLE_URL`, `NOTE` et `NB_AVIS` par les vraies
            valeurs de la fiche Google Business, réimporter ici, et seulement à ce
            moment-là ajouter `aggregateRating` au JSON-LD d'index.html. */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <FloatingWhatsApp />
      {perso && (
        <Suspense fallback={null}>
          <ThemeCustomizer value={custom} onChange={setCustom} onReset={() => setCustom(DEFAUTS)} />
        </Suspense>
      )}
    </div>
  )
}
