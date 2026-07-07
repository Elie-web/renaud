import { motion } from 'framer-motion'
import imgRencontre from '../assets/Renaud/20220522_144203.webp'
import imgConception from '../assets/working/DSC09111.webp'
import imgRendu from '../assets/créations renaud/rendu.webp'
import imgLivraison from '../assets/créations renaud/console japo face.webp'

/* TODO Renaud - visuels idéaux à fournir :
   · Conception : un croquis / plan ou une capture du logiciel de modélisation.
   · Rendu réaliste : une capture du logiciel de modélisation « en action ».
   · Livraison : une vraie photo de pose / installation chez le client.
   En attendant on utilise une photo d'atelier (conception), un vrai rendu 3D
   (rendu) et une pièce finie (livraison). */

/**
 * Visuels par étape du process : une vraie photo par étape, dans un cadre
 * incliné avec un halo de couleur derrière et des chips flottantes qui cassent
 * le cadre (même esprit premium qu'avant, mais authentique). Pas de titre dans
 * la carte - il est déjà à côté. Une couleur d'accent par étape : argile (la
 * rencontre), bleu-plan (la conception), ambre (la fabrication), olive (la pose).
 */

const spring = { type: 'spring', stiffness: 240, damping: 18 }

/* ── couleur d'accent par étape ──────────────────────────────────────── */
const A = {
  clay:  { tint: '#A85D3C', soft: 'rgba(168,93,60,0.14)' },
  blue:  { tint: '#3E6B82', soft: 'rgba(62,107,130,0.16)' },
  amber: { tint: '#C58415', soft: 'rgba(197,132,21,0.18)' },
  olive: { tint: '#6E8B43', soft: 'rgba(110,139,67,0.18)' },
}

// chip flottante : variants pilotés par le hover du parent (group)
const chip = (rest, hover) => ({
  rest: { x: 0, y: 0, rotate: 0, ...rest },
  hover: { ...rest, ...hover },
})

/* ── icônes inline ───────────────────────────────────────────────────── */
const Ico = ({ d, size = 13, stroke = 'currentColor', fill = 'none', sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)
const Pencil = (p) => <Ico {...p} d={<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />} />
const Check = (p) => <Ico {...p} d={<path d="M4 12.5l5 5L20 6.5" />} sw={2.6} />
const Ear = (p) => <Ico {...p} d={<path d="M6 9a6 6 0 0 1 12 0c0 4-3 4-3 7a3 3 0 0 1-6 0M9 9a3 3 0 0 1 6 0" />} />
const Plane = (p) => <Ico {...p} d={<><path d="M3 14h18l-1.5 4.5A2 2 0 0 1 17.6 20H6.4a2 2 0 0 1-1.9-1.5Z" /><path d="M5 14V9a2 2 0 0 1 2-2h3l2-3h4l-1 5" /></>} />

/* ── cadre photo incliné + halo de couleur ───────────────────────────── */
function Frame({ img, alt, rotate, accent, children }) {
  return (
    <div style={{ position: 'relative', width: 'min(360px, 84vw)' }}>
      {/* halo décalé pour la profondeur */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        transform: `translate(12px, 14px) rotate(${rotate + 3}deg)`,
        borderRadius: '18px', background: accent.soft, border: `1px solid ${accent.tint}22`,
      }} />

      <div style={{
        position: 'relative', borderRadius: '18px', overflow: 'hidden',
        transform: `rotate(${rotate}deg)`, border: '1px solid var(--c-pierre)',
        boxShadow: 'var(--shadow-md)', background: 'var(--c-ivoire)',
      }}>
        <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
          <img src={img} alt={alt} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* liseré couleur en bas */}
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '4px', background: accent.tint }} />
      </div>

      {children}
    </div>
  )
}

/* ── chips réutilisables ─────────────────────────────────────────────── */
// chip pilule icône + texte
function PillChip({ accent, icon, label, pos, rest, hover, mono }) {
  return (
    <motion.div variants={chip(rest, hover)} transition={spring} style={{
      position: 'absolute', ...pos, display: 'flex', alignItems: 'center', gap: '8px',
      borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)',
      boxShadow: 'var(--shadow-md)', padding: '7px 14px 7px 8px',
    }}>
      <span style={{
        width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
        background: mono ? accent.soft : accent.soft, color: accent.tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: mono ? 'var(--f-serif)' : undefined, fontStyle: mono ? 'italic' : undefined,
        fontSize: mono ? '0.78rem' : undefined,
      }}>{mono ? 'R' : icon}</span>
      <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>{label}</span>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   01 - LA RENCONTRE : Renaud en rendez-vous projet avec un client
   ════════════════════════════════════════════════════════════════════════ */
function RencontreMockup() {
  const a = A.clay
  return (
    <Frame rotate={-2} accent={a} img={imgRencontre}
      alt="Renaud Achard en rendez-vous projet avec un client à l'atelier, ébéniste, vallée de Chamonix">
      <PillChip accent={a} icon={<Ear />} label="On en parle"
        pos={{ bottom: '-18px', left: '-22px' }} rest={{ rotate: -3 }} hover={{ x: -10, y: 5, rotate: -6 }} />
      {/* pastille « sans frais » */}
      <motion.div variants={chip({ rotate: 4 }, { x: 6, y: -6, rotate: 8 })} transition={spring}
        style={{ position: 'absolute', top: '-12px', right: '-14px', padding: '6px 13px', borderRadius: 'var(--r-pill)', background: a.tint, color: 'var(--c-ivoire)', border: '4px solid var(--c-fond)', boxShadow: 'var(--shadow-md)', fontFamily: 'var(--f-sc)', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sans frais</motion.div>
    </Frame>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   02 - LA CONCEPTION : vrai rendu 3D du meuble
   ════════════════════════════════════════════════════════════════════════ */
function ConceptionMockup() {
  const a = A.clay
  return (
    <Frame rotate={1.5} accent={a} img={imgConception}
      alt="Prise de cotes et plans à l'atelier, conception d'un meuble sur mesure, Achard Créa">
      <PillChip accent={a} icon={<Pencil />} label="Plans & cotes"
        pos={{ top: '-16px', right: '-20px' }} rest={{ rotate: 5 }} hover={{ x: 10, y: -6, rotate: 11 }} />
      {/* nuancier de bois flottant */}
      <motion.div variants={chip({ rotate: -5 }, { x: -8, y: 6, rotate: -11 })} transition={spring}
        style={{ position: 'absolute', bottom: '-16px', left: '-16px', display: 'flex', gap: '5px', padding: '8px 10px', borderRadius: '14px', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)' }}>
        {['linear-gradient(135deg,#8a5c38,#4f3422)', 'linear-gradient(135deg,#c9a06a,#8a6638)', 'linear-gradient(135deg,#e6d5b3,#b89b6a)'].map((g, i) => (
          <span key={i} style={{ width: '18px', height: '18px', borderRadius: '50%', background: g, boxShadow: '0 0 0 2px var(--c-ivoire)', border: '1px solid var(--c-pierre)' }} />
        ))}
      </motion.div>
    </Frame>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   03 - LE RENDU RÉALISTE : rendu 3D fidèle, modifiable avant fabrication
   ════════════════════════════════════════════════════════════════════════ */
function RenduMockup() {
  const a = A.blue
  return (
    <Frame rotate={-1.5} accent={a} img={imgRendu}
      alt="Rendu 3D photo-réaliste d'une table basse en noyer, validé avant fabrication, Achard Créa">
      <PillChip accent={a} icon={<Pencil />} label="Rendu 3D"
        pos={{ top: '-16px', right: '-20px' }} rest={{ rotate: 5 }} hover={{ x: 10, y: -6, rotate: 11 }} />
      {/* chip « modifiable » (validation verte) */}
      <motion.div variants={chip({ rotate: -3 }, { x: -8, y: 6, rotate: -10 })} transition={spring}
        style={{ position: 'absolute', bottom: '-14px', left: '-18px', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '6px 13px 6px 6px' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--c-vert)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Check size={12} /></span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--c-texte)' }}>Modifiable</span>
      </motion.div>
    </Frame>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   04 - LA LIVRAISON : pièce finie + garantie
   ════════════════════════════════════════════════════════════════════════ */
function LivraisonMockup() {
  const a = A.olive
  return (
    <Frame rotate={1.5} accent={a} img={imgLivraison}
      alt="Console sur mesure en frêne avec marqueterie, finie et livrée, Achard Créa">
      <PillChip accent={a} mono label="Posé par mes soins"
        pos={{ bottom: '-16px', left: '-18px' }} rest={{ rotate: -4 }} hover={{ x: -8, y: 6, rotate: -10 }} />
      {/* badge garantie 5 ans */}
      <motion.div variants={chip({ rotate: 6 }, { x: 8, y: -7, rotate: 14 })} transition={spring}
        style={{ position: 'absolute', top: '-20px', right: '-16px', width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg,var(--c-or-pale),var(--c-or-dim))', border: '4px solid var(--c-fond)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ivoire)' }}>
        <span style={{ fontFamily: 'var(--f-serif)', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1 }}>5</span>
        <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.42rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>ans</span>
      </motion.div>
    </Frame>
  )
}

const MOCKUPS = {
  rencontre: RencontreMockup,
  conception: ConceptionMockup,
  rendu: RenduMockup,
  livraison: LivraisonMockup,
}

export default function ProcessusMockup({ id }) {
  const Mockup = MOCKUPS[id]
  if (!Mockup) return null
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -8, scale: 1.02 } }}
      transition={spring}
      style={{ cursor: 'default' }}
    >
      <Mockup />
    </motion.div>
  )
}
