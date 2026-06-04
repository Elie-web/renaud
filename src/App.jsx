import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Realisations from './components/Realisations'
import ImageBand from './components/ImageBand'
import Metier from './components/Metier'
import Processus from './components/Processus'
import Materiaux from './components/Materiaux'
import Engagements from './components/Engagements'
import Temoignages from './components/Temoignages'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Realisations />
        <ImageBand />
        <Metier />
        <Processus />
        <Materiaux />
        <Engagements />
        <Temoignages />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
