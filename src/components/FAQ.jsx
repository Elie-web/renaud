import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

const faqs = [
  { q: 'Combien coûte une création sur mesure ?', a: "Chaque projet est unique, donc chiffré sur devis, gratuit et sans engagement. Pour donner un ordre d'idée, comptez entre 1 500 € et 5 000 € pour un meuble, davantage pour un agencement complet (cuisine, dressing, escalier). Le devis est détaillé et fixe : le prix annoncé est le prix final." },
  { q: 'Quel est le délai pour un projet ?', a: "Une table prend 3 à 6 semaines, une cuisine complète 2 à 4 mois. Je travaille sur commande, et je vous donne une date précise avant de commencer." },
  { q: 'Comment se passe la première rencontre ?', a: "Je vous reçois chez vous ou à l'atelier. Rien n'est signé ce jour-là : vous repartez avec mes idées et recevez une proposition détaillée sous 5 jours." },
  { q: 'Travaillez-vous uniquement le bois ?', a: "Le bois est ma matière de prédilection, et je privilégie les projets en bois. Selon l'usage, je travaille aussi bien le massif que le contreplaqué : j'adapte les matériaux à chaque projet pour un résultat solide et durable." },
  { q: "Quelles sont vos zones d'intervention ?", a: "Toute la vallée de Chamonix (Chamonix, Les Houches, Servoz, Argentière, Vallorcine) et plus largement la Haute-Savoie : Sallanches, Passy, Saint-Gervais, Megève, Combloux. Pour le mobilier transportable, je peux intervenir au-delà, parlons-en." },
  // Renaud ne veut annoncer AUCUNE garantie (vocal du 23/07/2026) : « je ne sais
  // pas s'il faut mettre une garantie sur des meubles ». On garde la question,
  // qui se pose vraiment, mais la réponse ne promet qu'un suivi. ⚠ Toute
  // modification ici doit être répercutée dans le JSON-LD FAQPage d'index.html.
  { q: 'Que se passe-t-il après la pose ?', a: "Je reste joignable une fois la pièce installée. Si quelque chose bouge ou demande une reprise, je reviens sur place." },
]

function Item({ faq, isOpen, onToggle, index }) {
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`
  return (
    <motion.div variants={staggerItem} style={{ borderTop: '1px solid var(--c-pierre)' }}>
      {/* La question est un vrai <h3> qui enveloppe le bouton : c'est le motif
          d'accordéon recommandé (ARIA Authoring Practices). Elle était posée en
          <span>, donc invisible pour le plan du document. Six questions que ni
          un lecteur d'écran en navigation par titres, ni un moteur analysant la
          structure de la page ne voyaient comme des questions. */}
      <h3 style={{ margin: 0 }}>
        <button id={btnId} onClick={onToggle} aria-expanded={isOpen} aria-controls={panelId}
          style={{ width: '100%', textAlign: 'left', padding: 'var(--sp-5) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-4)', background: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
          <span style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.3rem, 1.9vw, 1.65rem)', fontWeight: 400, color: 'var(--c-texte)', lineHeight: 1.3, flex: 1 }}>{faq.q}</span>
          {/* Rotation en CSS et non en framer-motion, pour la même raison que
              le panneau ci-dessous : tout ce qui s'anime ici est pris dans
              l'orchestration du conteneur et part avec du retard. */}
          <span aria-hidden="true" style={{ color: 'var(--c-or-dim)', fontSize: '1.7rem', lineHeight: 1, flexShrink: 0, marginTop: '2px', display: 'inline-block', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform .3s cubic-bezier(.25,.1,.25,1)' }}>+</span>
        </button>
      </h3>
      {/* Le panneau reste TOUJOURS monté, même replié. Auparavant il n'était
          rendu que lorsqu'il était ouvert : le bouton portait alors un
          `aria-controls` désignant un identifiant absent du document, ce qu'un
          lecteur d'écran signale comme une référence cassée.

          ⚠ CE PANNEAU NE DOIT PAS S'ANIMER AVEC FRAMER-MOTION. Deux raisons,
          toutes deux constatées en production :

          1. `visibility` confiée à framer-motion (par `style`, par
             `transitionEnd` ou dans `animate`) : dès qu'il a posé la valeur une
             fois, il en devient propriétaire et ignore ce que React lui passe
             ensuite. La visibilité restait figée sur l'état du montage. Bug du
             16/09/2026, six semaines en ligne : seule la première question
             affichait sa réponse, les cinq autres ouvraient un panneau vide qui
             poussait la page.
          2. Le correctif suivant (hauteur et opacité en `animate`, visibilité
             confiée à `aria-hidden`) s'est encore montré instable à la mesure :
             des panneaux déclarés ouverts restaient à hauteur zéro selon les
             enchaînements de clics. Le conteneur de l'accordéon est un
             `staggerContainer` et chaque question un `staggerItem` : tout
             `motion` imbriqué là-dedans dépend de l'orchestration du parent.
             La cause exacte n'a pas été isolée — une partie des mesures a été
             faussée par un onglet en arrière-plan, qui gèle les animations.
             Elle n'a pas été creusée davantage : la dépendance elle-même était
             le problème.

          D'où le repli en CSS pur : `grid-template-rows` de 0fr à 1fr est la
          façon standard d'animer vers une hauteur « auto » sans mesure et sans
          JavaScript. Aucune orchestration, aucun état à synchroniser, le même
          comportement au premier clic qu'au vingtième. Les six questions ont
          été vérifiées une à une, puis en clics rapides, dans un Chrome au
          premier plan.
          Le texte replié sort de l'arbre d'accessibilité par `aria-hidden`,
          piloté par React seul. Ce panneau ne contient aucun élément
          focalisable (un seul <p>), donc `aria-hidden` n'y piège aucun arrêt de
          tabulation. */}
      <div
        id={panelId} role="region" aria-labelledby={btnId}
        aria-hidden={!isOpen}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition: 'grid-template-rows .4s cubic-bezier(.25,.1,.25,1), opacity .4s cubic-bezier(.25,.1,.25,1)',
        }}
      >
        {/* `minHeight: 0` est indispensable : sans lui, un élément de grille
            garde sa hauteur de contenu minimale et la ligne ne retombe jamais
            à zéro. */}
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <p style={{ fontFamily: 'var(--f-sans)', fontSize: 'clamp(1.02rem, 1.2vw, 1.15rem)', lineHeight: 1.72, color: 'var(--c-texte-2)', paddingBottom: 'var(--sp-5)', maxWidth: '60ch' }}>{faq.a}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section aria-labelledby="titre-faq" style={{ background: 'var(--c-blanc)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          titleId="titre-faq"
          title={<>Ce que mes clients <Accent>me demandent souvent.</Accent></>}
        />

        {/* Accordéon centré */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'left' }}>
          {faqs.map((faq, i) => <Item key={i} index={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
          <div style={{ borderTop: '1px solid var(--c-pierre)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportSettings} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ textAlign: 'center', marginTop: 'var(--sp-8)', fontFamily: 'var(--f-sans)', fontSize: '0.95rem', color: 'var(--c-texte-2)' }}>
          Une autre question ?{' '}
          <a href="#contact" style={{ color: 'var(--c-or-dim)', borderBottom: '1px solid var(--c-or-dim)' }}>Écrivez-moi →</a>
        </motion.p>
      </div>
    </section>
  )
}
