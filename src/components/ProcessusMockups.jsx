import { motion } from 'framer-motion'

/**
 * Mockups « en markup » par étape du process (aucune image).
 * Même esprit que le site Elie et House of Gibbs : cartes inclinées, chips
 * flottantes qui cassent le cadre, profondeur en couches, hover qui décale les
 * éléments. Ici la palette reste artisanale : papier chaud, argile, bois (noyer,
 * chêne, frêne) et une touche d'olive pour la validation. Lisible au 1er coup d'œil.
 */

const spring = { type: 'spring', stiffness: 240, damping: 18 }

/* ── petits utilitaires ──────────────────────────────────────────────── */
const mono = {
  fontFamily: 'var(--f-sc)', fontSize: '0.5rem', fontWeight: 500,
  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-texte-2)',
}
const cardBase = {
  borderRadius: '16px', background: 'var(--c-ivoire)',
  border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)',
}
// chip flottante : variants pilotés par le hover du parent (group)
const chip = (rest, hover) => ({
  rest: { x: 0, y: 0, rotate: 0, ...rest },
  hover: { ...rest, ...hover },
})

/* ── icônes inline (cohérent avec le reste du site) ──────────────────── */
const Ico = ({ d, size = 12, stroke = 'currentColor', fill = 'none', sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)
const Calendar = (p) => <Ico {...p} d={<><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /></>} />
const Pencil = (p) => <Ico {...p} d={<><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>} />
const Check = (p) => <Ico {...p} d={<path d="M4 12.5l5 5L20 6.5" />} sw={2.6} />
const Ear = (p) => <Ico {...p} d={<path d="M6 9a6 6 0 0 1 12 0c0 4-3 4-3 7a3 3 0 0 1-6 0M9 9a3 3 0 0 1 6 0" />} />
const Plane = (p) => <Ico {...p} d={<><path d="M3 14h18l-1.5 4.5A2 2 0 0 1 17.6 20H6.4a2 2 0 0 1-1.9-1.5Z" /><path d="M5 14V9a2 2 0 0 1 2-2h3l2-3h4l-1 5" /></>} />

/* ════════════════════════════════════════════════════════════════════════
   01 — LA RENCONTRE : conversation + références + prise de RDV
   ════════════════════════════════════════════════════════════════════════ */
function RencontreMockup() {
  return (
    <div style={{ position: 'relative', width: 'min(340px, 82vw)' }}>
      <div style={{ ...cardBase, overflow: 'hidden', transform: 'rotate(-2deg)' }}>
        {/* En-tête */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'var(--c-creme)', borderBottom: '1px solid var(--c-pierre)' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, var(--c-or-pale), var(--c-or-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-serif)', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--c-ivoire)' }}>R</span>
          <span style={{ lineHeight: 1.2, minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>Renaud · Achard Créa</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-vert)' }} />
              <span style={{ ...mono }}>à l'écoute</span>
            </span>
          </span>
          <span style={{ marginLeft: 'auto', padding: '3px 9px', borderRadius: 'var(--r-pill)', background: 'var(--or-10)', border: '1px solid var(--or-20)', fontFamily: 'var(--f-sc)', fontSize: '0.48rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-or-dim)', flexShrink: 0 }}>Sans frais</span>
        </div>

        {/* Conversation */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Client + références */}
          <div style={{ maxWidth: '88%', borderRadius: '14px 14px 14px 4px', background: 'var(--c-creme)', padding: '10px 12px' }}>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.68rem', color: 'var(--c-texte)', lineHeight: 1.5 }}>« Un dressing sous comble, en chêne clair »</p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              {['linear-gradient(135deg,#caa472,#7A5638)', 'linear-gradient(135deg,#e7d4ad,#b48a52)', 'linear-gradient(135deg,#9c6b41,#5c3d24)'].map((g, i) => (
                <span key={i} style={{ width: '36px', height: '36px', borderRadius: '7px', background: g }} />
              ))}
            </div>
          </div>
          {/* Réponse Renaud */}
          <div style={{ marginLeft: 'auto', maxWidth: '82%', borderRadius: '14px 14px 4px 14px', background: 'var(--c-or)', padding: '10px 12px' }}>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.68rem', color: 'var(--c-ivoire)', lineHeight: 1.5 }}>« Je passe voir l'espace cette semaine ? »</p>
          </div>
          {/* Créneau */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: 'var(--r-pill)', border: '1px solid var(--c-pierre)', background: 'var(--c-ivoire)', padding: '5px 12px', width: 'fit-content' }}>
            <span style={{ color: 'var(--c-or-dim)' }}><Calendar size={11} /></span>
            <span style={{ ...mono, fontSize: '0.52rem' }}>Jeu. 9:00 · à l'atelier</span>
          </div>
        </div>
      </div>

      {/* Chip flottante : à l'écoute */}
      <motion.div variants={chip({ rotate: 3 }, { x: -10, y: 5, rotate: -2 })} transition={spring}
        style={{ position: 'absolute', bottom: '-18px', left: '-22px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '7px 14px 7px 8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--or-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-or-dim)' }}><Ear size={14} /></span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>On en parle</span>
      </motion.div>

      {/* Badge notification */}
      <motion.div variants={chip({ rotate: 0 }, { x: 5, y: -5 })} transition={spring}
        style={{ position: 'absolute', top: '-12px', right: '-12px', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--c-or)', border: '4px solid var(--c-fond)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-sans)', fontSize: '0.66rem', fontWeight: 800, color: 'var(--c-ivoire)' }} aria-hidden="true">1</motion.div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   02 — LA CONCEPTION : planche d'esquisse + rendu + nuancier de bois
   ════════════════════════════════════════════════════════════════════════ */
function ConceptionMockup() {
  return (
    <div style={{ position: 'relative', width: 'min(340px, 82vw)', transform: 'rotate(1.5deg)' }}>
      <div style={{ ...cardBase, padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ padding: '3px 10px', borderRadius: 'var(--r-pill)', background: 'var(--or-10)', border: '1px solid var(--or-20)', fontFamily: 'var(--f-sc)', fontSize: '0.48rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-or-dim)' }}>Sur mesure</span>
          <span style={{ ...mono }}>esquisse · 1/1</span>
        </div>

        {/* Cadre quadrillé + silhouette de meuble */}
        <div style={{
          position: 'relative', borderRadius: '12px', border: '1px dashed var(--c-pierre)',
          height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          backgroundImage: 'linear-gradient(rgba(122,86,56,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(122,86,56,0.05) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        }}>
          <svg viewBox="0 0 160 120" width="150" height="112" fill="none" stroke="var(--c-bois)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {/* meuble bas / enfilade sur mesure */}
            <rect x="14" y="34" width="132" height="62" rx="2" />
            <path d="M14 50h132M80 34v62" />
            <path d="M30 50v46M130 50v46" />
            <circle cx="47" cy="62" r="2" /><circle cx="113" cy="62" r="2" />
            {/* pieds */}
            <path d="M22 96v10M138 96v10" />
            {/* cote / mesure en argile */}
            <g stroke="var(--c-or)" strokeWidth="1">
              <path d="M14 24h132M14 21v6M146 21v6" />
            </g>
          </svg>
          <span style={{ position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', ...mono, fontSize: '0.46rem', color: 'var(--c-or-dim)' }}>2,40 m</span>
        </div>

        {/* Nuancier de bois + finition */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
          <span style={{ ...mono, marginRight: '2px' }}>Bois</span>
          {[
            ['Noyer', 'linear-gradient(135deg,#8a5c38,#4f3422)'],
            ['Chêne', 'linear-gradient(135deg,#c9a06a,#8a6638)'],
            ['Frêne', 'linear-gradient(135deg,#e6d5b3,#b89b6a)'],
          ].map(([n, g]) => (
            <span key={n} title={n} style={{ width: '20px', height: '20px', borderRadius: '50%', background: g, boxShadow: '0 0 0 2px var(--c-ivoire)', border: '1px solid var(--c-pierre)' }} />
          ))}
          <span style={{ marginLeft: 'auto', ...mono, fontSize: '0.48rem', color: 'var(--c-or-dim)' }}>finition huilée</span>
        </div>
      </div>

      {/* Chip crayon — rendu 3D */}
      <motion.div variants={chip({ rotate: 6 }, { x: 10, y: -6, rotate: 12 })} transition={spring}
        style={{ position: 'absolute', top: '-18px', right: '-18px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '14px', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '7px 12px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'var(--c-noir)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ivoire)' }}><Pencil size={13} /></span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>Rendu 3D</span>
      </motion.div>

      {/* Pastille bois flottante */}
      <motion.div variants={chip({ rotate: -6 }, { x: -6, y: 6, rotate: -12 })} transition={spring}
        style={{ position: 'absolute', bottom: '-16px', left: '28px', width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg,#8a5c38,#4f3422)', border: '4px solid var(--c-fond)', boxShadow: 'var(--shadow-md)' }} aria-hidden="true" />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   03 — LA FABRICATION : établi en cours + progression
   ════════════════════════════════════════════════════════════════════════ */
function FabricationMockup() {
  return (
    <div style={{ position: 'relative', width: 'min(340px, 82vw)', transform: 'rotate(-1deg)' }}>
      <div style={{ ...cardBase, overflow: 'hidden' }}>
        {/* Fenêtre atelier : copeaux / établi */}
        <div style={{ position: 'relative', height: '96px', overflow: 'hidden', background: 'linear-gradient(to bottom,#e7d8bd,#cdb58c)' }}>
          <span style={{ position: 'absolute', top: '14px', right: '26px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.45)', filter: 'blur(2px)' }} aria-hidden="true" />
          {/* copeaux */}
          <svg viewBox="0 0 340 96" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
            <path d="M0 96 L0 70 C60 58 110 78 170 66 C230 54 280 74 340 60 L340 96 Z" fill="#a87b4c" fillOpacity="0.55" />
            <path d="M0 96 L0 82 C70 72 120 88 190 78 C250 70 300 84 340 76 L340 96 Z" fill="#7A5638" fillOpacity="0.9" />
            {/* quelques copeaux qui volent */}
            <path d="M70 40 q8 -6 16 0 q-8 6 -16 0Z" fill="#5c3d24" fillOpacity="0.5" />
            <path d="M250 30 q8 -6 16 0 q-8 6 -16 0Z" fill="#5c3d24" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Panneau « en cours » */}
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'var(--c-noir)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--c-ivoire)' }}><Plane size={16} /></span>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)', lineHeight: 1.2 }}>À l'établi</p>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-or)' }} />
                <span style={{ ...mono }}>assemblage · jour 6</span>
              </span>
            </div>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-serif)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--c-or-dim)', flexShrink: 0 }}>70%</span>
          </div>
          {/* Barre de progression */}
          <div style={{ height: '8px', borderRadius: 'var(--r-pill)', background: 'var(--c-creme)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '70%', borderRadius: 'var(--r-pill)', background: 'linear-gradient(to right,#8a5c38,var(--c-or))' }} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Chip fait main */}
      <motion.div variants={chip({ rotate: 6 }, { x: 10, y: -6, rotate: 12 })} transition={spring}
        style={{ position: 'absolute', top: '-16px', right: '-20px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '7px 14px 7px 8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--or-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-or-dim)' }}><Pencil size={13} /></span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>Fait main</span>
      </motion.div>

      {/* Chip « ici, rien sous-traité » */}
      <motion.div variants={chip({ rotate: -3 }, { x: -8, y: 6, rotate: -10 })} transition={spring}
        style={{ position: 'absolute', bottom: '-14px', left: '-18px', display: 'flex', alignItems: 'center', gap: '7px', borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '5px 12px 5px 6px' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--c-vert)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Check size={12} /></span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.66rem', fontWeight: 600, color: 'var(--c-texte)' }}>À l'atelier</span>
      </motion.div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   04 — LA LIVRAISON : pose + vérification d'aplomb (niveau à bulle)
   ════════════════════════════════════════════════════════════════════════ */
function LivraisonMockup() {
  return (
    <div style={{ position: 'relative', width: 'min(340px, 82vw)', transform: 'rotate(1.5deg)' }}>
      {/* carte d'arrière-plan pour la profondeur */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translate(12px,12px) rotate(3deg)', borderRadius: '16px', background: 'var(--c-creme)', border: '1px solid var(--c-pierre)' }} aria-hidden="true" />

      <div style={{ ...cardBase, position: 'relative', overflow: 'hidden' }}>
        {/* Fenêtre : pièce posée dans l'intérieur */}
        <div style={{ position: 'relative', height: '104px', overflow: 'hidden', background: 'linear-gradient(to bottom,#f3ecdd,#e3d8c2)' }}>
          <svg viewBox="0 0 340 104" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
            {/* sol */}
            <path d="M0 104 L0 86 L340 78 L340 104 Z" fill="#cdb58c" fillOpacity="0.7" />
            {/* meuble posé (bibliothèque/niche) */}
            <g fill="none" stroke="var(--c-bois)" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="120" y="26" width="100" height="58" rx="1.5" fill="rgba(122,86,56,0.10)" />
              <path d="M120 45h100M120 64h100M153 26v58M187 26v58" />
            </g>
            {/* livres / objets, touches discrètes */}
            <rect x="126" y="32" width="6" height="11" rx="1" fill="var(--c-or)" />
            <rect x="135" y="30" width="5" height="13" rx="1" fill="var(--c-vert)" />
          </svg>
        </div>

        {/* Panneau « posé & vérifié » + niveau à bulle */}
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--c-vert)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><Check size={12} /></span>
            <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.74rem', fontWeight: 600, color: 'var(--c-texte)' }}>Posé & vérifié</p>
            <span style={{ marginLeft: 'auto', ...mono }}>aplomb OK</span>
          </div>
          {/* Niveau à bulle */}
          <div style={{ position: 'relative', height: '20px', borderRadius: 'var(--r-pill)', background: 'var(--c-creme)', border: '1px solid var(--c-pierre)', display: 'flex', alignItems: 'center' }}>
            {/* repères centraux */}
            <span style={{ position: 'absolute', left: 'calc(50% - 13px)', top: '3px', bottom: '3px', width: '1px', background: 'var(--or-40)' }} />
            <span style={{ position: 'absolute', left: 'calc(50% + 12px)', top: '3px', bottom: '3px', width: '1px', background: 'var(--or-40)' }} />
            {/* bulle centrée = de niveau */}
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '22px', height: '12px', borderRadius: 'var(--r-pill)', background: 'var(--c-vert)', opacity: 0.85 }} />
          </div>
        </div>
      </div>

      {/* Badge garantie */}
      <motion.div variants={chip({ rotate: 6 }, { x: 8, y: -7, rotate: 14 })} transition={spring}
        style={{ position: 'absolute', top: '-20px', right: '-16px', width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg,var(--c-or-pale),var(--c-or-dim))', border: '4px solid var(--c-fond)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ivoire)' }}>
        <span style={{ fontFamily: 'var(--f-serif)', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1 }}>5</span>
        <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.42rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>ans</span>
      </motion.div>

      {/* Chip « posé par mes soins » */}
      <motion.div variants={chip({ rotate: -4 }, { x: -8, y: 6, rotate: -10 })} transition={spring}
        style={{ position: 'absolute', bottom: '-14px', left: '-18px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: 'var(--r-pill)', background: 'var(--c-ivoire)', border: '1px solid var(--c-pierre)', boxShadow: 'var(--shadow-md)', padding: '7px 14px 7px 8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--or-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '0.78rem', color: 'var(--c-or-dim)' }}>R</span>
        <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--c-texte)' }}>Posé par mes soins</span>
      </motion.div>
    </div>
  )
}

const MOCKUPS = {
  rencontre: RencontreMockup,
  conception: ConceptionMockup,
  fabrication: FabricationMockup,
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
