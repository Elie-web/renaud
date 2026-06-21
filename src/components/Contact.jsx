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

const infos = [
  { label: 'Téléphone', val: '06 34 08 46 90',            href: 'tel:+33634084690',            icon: IcoPhone },
  { label: 'Email',     val: 'contact@achard-crea.fr',    href: 'mailto:contact@achard-crea.fr', icon: IcoMail },
  { label: 'Atelier',   val: 'Vallée de Chamonix · sur RDV', href: null,                        icon: IcoPin },
  { label: 'Horaires',  val: 'Lun. au ven. · 8h-18h',      href: null,                          icon: IcoClock },
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
          lead="Décrivez-moi l'espace, la pièce, le besoin. Je vous réponds sous 24 h avec un premier avis, et un devis gratuit si le projet est clair."
        />

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
                  <span className="contact-info-val">{it.val}</span>
                </span>
              </>
            )
            return (
              <motion.div key={it.label} variants={staggerItem} className={`contact-info-card${it.href ? ' is-link' : ''}`}>
                {it.href ? <a href={it.href} style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>{inner}</a> : inner}
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
        .contact-infos {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.4vw, 18px);
          max-width: 1000px; margin: 0 auto clamp(40px, 5vw, 64px);
        }
        .contact-info-card {
          display: flex; align-items: center; gap: 14px;
          padding: clamp(16px, 1.5vw, 20px);
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
