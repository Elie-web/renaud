import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'
import SectionHeader, { Accent } from './SectionHeader'

const reassurance = ['Réponse sous 24 h', 'Devis gratuit', 'Sans engagement']

const infos = [
  { label: 'Téléphone', val: '06 34 08 46 90',            href: 'tel:+33634084690' },
  { label: 'Email',     val: 'contact@achard-crea.fr',    href: 'mailto:contact@achard-crea.fr' },
  { label: 'Atelier',   val: 'Vallée de Chamonix · sur rendez-vous', href: null },
  { label: 'Horaires',  val: 'Lun – Ven, 8h – 18h',       href: null },
]

const inputStyle = {
  fontFamily: 'var(--f-sans)', fontSize: '1rem', color: 'var(--c-texte)', background: 'var(--c-fond)',
  border: '1px solid var(--c-pierre)', borderRadius: 'var(--r-sm)', padding: '14px 16px', outline: 'none',
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

        {/* Coordonnées centrées */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSettings}
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 56px)',
            maxWidth: '860px', margin: '0 auto clamp(40px, 5vw, 64px)' }}>
          {infos.map((it) => {
            const inner = (
              <>
                <span style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-or-dim)' }}>{it.label}</span>
                <span style={{ fontFamily: 'var(--f-sans)', fontSize: '0.98rem', color: 'var(--c-texte)' }}>{it.val}</span>
              </>
            )
            return (
              <motion.div key={it.label} variants={staggerItem}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center' }}>
                {it.href ? <a href={it.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>{inner}</a> : inner}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Formulaire centré */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.9 }}
          style={{ maxWidth: '640px', margin: '0 auto', background: 'var(--c-fond)', border: '1px solid var(--c-pierre)', borderRadius: 'var(--r-md)', padding: 'clamp(28px, 4vw, 48px)' }}>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: 'clamp(28px, 4vw, 56px) 0' }}>
              <div style={{ fontSize: '2rem', color: 'var(--c-or-dim)', marginBottom: 'var(--sp-4)' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.6rem', color: 'var(--c-texte)', marginBottom: 'var(--sp-3)' }}>Message envoyé</h3>
              <p style={{ fontFamily: 'var(--f-sans)', color: 'var(--c-texte-2)' }}>Je vous réponds sous 24 heures.</p>
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
        @media (max-width: 520px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
