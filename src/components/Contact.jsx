import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportSettings, staggerContainer, staggerItem } from '../lib/motion'

const INPUT_BASE = {
  fontFamily: 'var(--f-sans)',
  fontSize: '1rem',
  color: 'var(--c-texte)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--or-25)',
  padding: '13px 0',
  outline: 'none',
  transition: 'border-color 0.3s var(--ease)',
  cursor: 'text',
  width: '100%',
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
      <span style={{
        fontFamily: 'var(--f-sc)',
        fontSize: '0.62rem',
        letterSpacing: '0.2em',
        color: 'var(--c-texte-2)',
        textTransform: 'uppercase',
      }}>{label}</span>
      {children}
    </label>
  )
}

function onFocusStyle(e)  { e.target.style.borderBottomColor = 'var(--c-bleu)' }
function onBlurStyle(e)   { e.target.style.borderBottomColor = 'var(--or-25)' }

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', projet: '', message: '' })

  const handleChange  = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit  = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" style={{ background: 'var(--c-creme)', padding: 'var(--section-py) var(--px)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 'clamp(40px, 7vw, 120px)',
          alignItems: 'start',
        }}>

          {/* Left — info */}
          <div>
            <motion.span
              className="eyebrow eyebrow--dark"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-4)' }}
            >
              <span className="gold-line" style={{ background: 'var(--c-or-dim)' }} />
              Contact
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9 }}
              className="h2"
              style={{ color: 'var(--c-texte)', marginBottom: 'var(--sp-6)', maxWidth: '18ch' }}
            >
              Décrivez-moi votre projet.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lead"
              style={{ marginBottom: 'var(--sp-10)', maxWidth: '36ch' }}
            >
              L'espace, la pièce, le besoin. Je vous réponds dans les 24 heures.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}
            >
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6C12.5 3.515 10.485 1.5 8 1.5zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z" fill="currentColor"/></svg>,
                  label: 'Atelier', val: '371 route de la vigne',
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.2 2h2.8l1.4 3.2-1.6 1.3a8.8 8.8 0 0 0 3.6 3.6l1.3-1.6 3.2 1.4v2.8A1 1 0 0 1 13 14C5.82 14 2 8.18 2 3a1 1 0 0 1 1-1z" fill="currentColor"/></svg>,
                  label: 'Téléphone', val: '06 00 00 00 00',
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1"/></svg>,
                  label: 'Email', val: 'renaud@ebenistemuisier.fr',
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  label: 'Horaires', val: 'Lun–Ven, 8h–18h',
                },
              ].map(({ icon, label, val }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-4)',
                    paddingBottom: 'var(--sp-5)',
                    borderBottom: '1px solid var(--or-15)',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    border: '1px solid var(--or-20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--c-or-dim)',
                    flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--f-sc)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--c-or-dim)', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--f-sans)', fontSize: '0.95rem', color: 'var(--c-texte)' }}>{val}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 1.0 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: 'clamp(40px, 5vw, 64px)',
                  background: 'var(--c-brun)',
                  borderRadius: 'var(--r-md)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: 'var(--sp-4)', color: 'var(--c-or)' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: '1.7rem', color: 'var(--c-ivoire)', marginBottom: 'var(--sp-4)' }}>
                  Message envoyé
                </h3>
                <p style={{ color: 'rgba(245,249,247,0.45)', fontFamily: 'var(--f-sans)', fontWeight: 400 }}>
                  Je vous répondrai dans les 24 heures.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
                  <Field label="Votre nom">
                    <input
                      name="nom" type="text" placeholder="Sophie Martin"
                      value={form.nom} onChange={handleChange} required
                      style={INPUT_BASE}
                      onFocus={onFocusStyle} onBlur={onBlurStyle}
                    />
                  </Field>
                  <Field label="Votre email">
                    <input
                      name="email" type="email" placeholder="sophie@exemple.fr"
                      value={form.email} onChange={handleChange} required
                      style={INPUT_BASE}
                      onFocus={onFocusStyle} onBlur={onBlurStyle}
                    />
                  </Field>
                </div>

                <Field label="Type de projet">
                  <select
                    name="projet" value={form.projet} onChange={handleChange}
                    style={{
                      ...INPUT_BASE,
                      color: form.projet ? 'var(--c-texte)' : 'var(--c-texte-2)',
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={onFocusStyle} onBlur={onBlurStyle}
                  >
                    <option value="" disabled>Sélectionner…</option>
                    {['Mobilier sur mesure', 'Cuisine', 'Bibliothèque', 'Escalier', 'Porte & menuiseries', 'Autre'].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Décrivez votre projet">
                  <textarea
                    name="message"
                    placeholder="J'ai un espace de 3m × 4m, j'aimerais une bibliothèque qui monte jusqu'au plafond…"
                    value={form.message} onChange={handleChange} rows={5}
                    style={{ ...INPUT_BASE, resize: 'none', lineHeight: 1.65 }}
                    onFocus={onFocusStyle} onBlur={onBlurStyle}
                  />
                </Field>

                <div style={{ paddingTop: 'var(--sp-2)' }}>
                  <button type="submit" className="btn btn--gold">
                    <span>Envoyer le projet</span>
                    <span className="arrow" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}




