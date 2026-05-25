import FloatingCTA from './components/FloatingCTA'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifeste from './components/Manifeste'
import Marquee from './components/Marquee'
import SavoirFaire from './components/SavoirFaire'
import Realisations from './components/Realisations'
import Processus from './components/Processus'
import Confiance from './components/Confiance'
import Materiaux from './components/Materiaux'
import Temoignages from './components/Temoignages'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <FloatingCTA />
      <Nav />
      <main>
        <Hero />
        <Manifeste />
        <Marquee />
        <SavoirFaire />
        <Realisations />
        <Marquee dark />
        <Processus />
        <Confiance />
        <Materiaux />
        <Temoignages />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
