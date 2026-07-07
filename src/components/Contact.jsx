import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

const reassurance = ['Réponse sous 24 h', 'Devis gratuit', 'Sans engagement']

const Ico = ({ d, size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
const IcoPhone = <Ico d={<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />} />
const IcoMail = <Ico d={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>} />
const IcoPin = <Ico d={<><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>} />
const IcoClock = <Ico d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />
const IcoWa = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.13h-.003a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
)

const WA_HREF = "https://wa.me/33634084690?text=Bonjour%20Renaud%2C%20j'aimerais%20parler%20d'un%20projet."

const infos = [
  { label: 'Téléphone', val: '06 34 08 46 90',            href: 'tel:+33634084690',            icon: IcoPhone, nowrap: true },
  { label: 'Email',     val: 'contact@achard-crea.fr',    href: 'mailto:contact@achard-crea.fr', icon: IcoMail },
  { label: 'Atelier',   val: 'Vallée de Chamonix, sur RDV', href: null,                        icon: IcoPin },
  { label: 'Horaires',  val: 'Lun. au ven., 8h30–17h',    href: null,                          icon: IcoClock },
]

const inputStyle = {
  fontFamily: 'var(--f-sans)', fontSize: '1rem', color: 'var(--c-texte)', background: 'var(--c-fond)',
  border: '1px solid var(--c-pierre)', borderRadius: '10px', padding: '14px 16px', outline: 'none',
  transition: 'border-color .25s var(--ease)', width: '100%',
}
const focus = (e) => { e.target.style.borderColor = 'var(--c-or-dim)' }
const blur  = (e) => { e.target.style.borderColor = 'var(--c-pierre)' }

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
      <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--c-texte-2)', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', projet: '', message: '' })
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const sujet = `Demande de devis - ${form.projet || 'projet sur mesure'} - ${form.nom}`
    const corps =
      `Nom : ${form.nom}\n` +
      `Téléphone : ${form.tel || 'non renseigné'}\n` +
      `Email : ${form.email}\n` +
      `Type de projet : ${form.projet || 'non précisé'}\n\n` +
      `${form.message}`
    window.location.href =
      `mailto:contact@achard-crea.fr?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Votre projet"
          title={<>Parlons de ce que <Accent>vous avez en tête.</Accent></>}
          lead="Décrivez-moi l'espace, la pièce, le besoin. Choisissez le canal qui vous arrange (téléphone, WhatsApp, e-mail ou formulaire), je réponds sous 24 h, devis gratuit si le projet est clair."
        />

        {/* Appel découverte : le point d'entrée le plus simple */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings} transition={{ duration: 0.6 }}
          className="contact-call">
          <div className="contact-call-txt">
            <span className="contact-call-eyebrow">Le plus simple pour commencer</span>
            <p className="contact-call-title">Un <strong>appel découverte offert</strong> : 15 minutes pour parler de votre projet, sans engagement.</p>
          </div>
          <div className="contact-call-actions">
            <a href="tel:+33634084690" className="btn btn--gold" aria-label="Appeler pour un appel découverte de 15 minutes">
              <span>Réserver mon appel</span><span className="arrow" />
            </a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Coordonnées en tuiles */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          className="contact-infos">
          {infos.map((it) => {
            const inner = (
              <>
                <span className="contact-info-icon">{it.icon}</span>
                <span className="contact-info-text">
                  <span className="contact-info-label">{it.label}</span>
                  <span className="contact-info-val" style={it.nowrap ? { whiteSpace: 'nowrap' } : undefined}>{it.val}</span>
                </span>
              </>
            )
            return (
              <motion.div key={it.label} variants={staggerItem} className={`contact-info-card${it.href ? ' is-link' : ''}`}>
                {it.href
                  ? <a href={it.href} target={it.external ? '_blank' : undefined} rel={it.external ? 'noopener noreferrer' : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '100%' }}>{inner}</a>
                  : inner}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Formulaire centré */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
          style={{ maxWidth: '640px', margin: '0 auto', background: 'var(--c-blanc)', border: '1px solid var(--c-pierre)', borderRadius: '20px', padding: 'clamp(28px, 4vw, 48px)', boxShadow: 'var(--shadow-md)' }}>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: 'clamp(28px, 4vw, 56px) 0' }}>
              <div style={{ fontSize: '2rem', color: 'var(--c-or-dim)', marginBottom: 'var(--sp-4)' }}>✉</div>
              <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.6rem', color: 'var(--c-texte)', marginBottom: 'var(--sp-3)' }}>Votre messagerie s'ouvre</h3>
              <p style={{ fontFamily: 'var(--f-sans)', color: 'var(--c-texte-2)', maxWidth: '38ch', margin: '0 auto var(--sp-5)' }}>
                Votre message est pré-rempli dans votre logiciel d'email. <strong style={{ color: 'var(--c-texte)', fontWeight: 600 }}>Cliquez sur « Envoyer »</strong> pour finaliser. Je vous réponds sous 24 h.
              </p>
              <p style={{ fontFamily: 'var(--f-sans)', fontSize: '0.85rem', color: 'var(--c-texte-2)' }}>
                Rien ne s'est ouvert ?{' '}
                <a href="mailto:contact@achard-crea.fr" style={{ color: 'var(--c-or-dim)', borderBottom: '1px solid var(--c-or-dim)' }}>Écrivez-moi directement</a>
                {' '}ou appelez le{' '}
                <a href="tel:+33634084690" style={{ color: 'var(--c-or-dim)', borderBottom: '1px solid var(--c-or-dim)' }}>06 34 08 46 90</a>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-5)' }}>
                <Field label="Votre nom"><input name="nom" type="text" required placeholder="Sophie Martin" value={form.nom} onChange={change} style={inputStyle} onFocus={focus} onBlur={blur} /></Field>
                <Field label="Téléphone"><input name="tel" type="tel" placeholder="06 12 34 56 78" value={form.tel} onChange={change} style={inputStyle} onFocus={focus} onBlur={blur} /></Field>
              </div>
              <Field label="Votre email"><input name="email" type="email" required placeholder="sophie@exemple.fr" value={form.email} onChange={change} style={inputStyle} onFocus={focus} onBlur={blur} /></Field>
              <Field label="Type de projet">
                <select name="projet" value={form.projet} onChange={change}
                  style={{ ...inputStyle, color: form.projet ? 'var(--c-texte)' : 'var(--c-texte-2)', appearance: 'none', cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                  <option value="" disabled>Sélectionner…</option>
                  {['Mobilier sur mesure', 'Cuisine', 'Bibliothèque', 'Escalier', 'Porte & menuiseries', 'Autre'].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Votre projet en quelques mots">
                <textarea name="message" rows={4} placeholder="Un espace de 3 m × 4 m, j'aimerais une bibliothèque qui monte jusqu'au plafond…" value={form.message} onChange={change}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} onFocus={focus} onBlur={blur} />
              </Field>
              <button type="submit" className="btn btn--gold btn--full" style={{ marginTop: 'var(--sp-2)' }}>
                <span>Envoyer ma demande</span><span className="arrow" />
              </button>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--sp-2) var(--sp-5)' }}>
                {reassurance.map((r) => (
                  <span key={r} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--f-sans)', fontSize: '0.78rem', color: 'var(--c-texte-2)' }}>
                    <span style={{ color: 'var(--c-or-dim)' }}>✓</span>{r}
                  </span>
                ))}
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .contact-call {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: clamp(18px, 2.5vw, 32px);
          max-width: 1080px; margin: 0 auto clamp(24px, 3vw, 36px);
          padding: clamp(20px, 2.4vw, 30px) clamp(22px, 2.8vw, 36px);
          background: var(--or-10);
          border: 1px solid var(--or-20);
          border-radius: 18px;
        }
        .contact-call-eyebrow {
          display: block; margin-bottom: 8px;
          font-family: var(--f-sc); font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-or-dim);
        }
        .contact-call-title {
          font-family: var(--f-serif); font-weight: 400;
          font-size: clamp(1.15rem, 1.7vw, 1.5rem); line-height: 1.3;
          color: var(--c-texte); max-width: 44ch;
        }
        .contact-call-title strong { font-weight: 400; color: var(--c-or-dim); font-style: italic; }
        .contact-call-actions { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
        @media (max-width: 620px) {
          .contact-call { flex-direction: column; align-items: flex-start; }
          .contact-call-actions { width: 100%; }
          .contact-call-actions .btn { flex: 1; justify-content: center; }
        }

        .contact-infos {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.4vw, 18px);
          max-width: 1000px; margin: 0 auto clamp(40px, 5vw, 64px);
        }
        .contact-info-card {
          display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
          padding: clamp(18px, 1.7vw, 24px);
          background: var(--c-blanc);
          border: 1px solid var(--c-pierre);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease), box-shadow var(--dur-mid) var(--ease);
        }
        .contact-info-icon {
          width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--or-10); border: 1px solid var(--or-20); color: var(--c-or-dim);
          transition: background var(--dur-mid) var(--ease), color var(--dur-mid) var(--ease), border-color var(--dur-mid) var(--ease);
        }
        .contact-info-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .contact-info-label {
          font-family: var(--f-sc); font-size: 0.56rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-or-dim);
        }
        .contact-info-val {
          font-family: var(--f-sans); font-size: 0.95rem; color: var(--c-texte);
          line-height: 1.3; word-break: break-word;
        }
        @media (hover: hover) {
          .contact-info-card.is-link:hover {
            border-color: var(--or-20); box-shadow: var(--shadow-md); transform: translateY(-3px);
          }
          .contact-info-card.is-link:hover .contact-info-icon {
            background: var(--c-or); border-color: var(--c-or); color: var(--c-ivoire);
          }
        }

        @media (max-width: 760px) { .contact-infos { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
          .contact-infos { grid-template-columns: 1fr; max-width: 420px; }
        }
      `}</style>
    </section>
  )
}
