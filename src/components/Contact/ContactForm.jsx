import { useRef, useState } from 'react'

const WEB3FORMS_ACCESS_KEY = 'a948086b-d140-4cde-8c3c-5d42eae573a7'

const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  subject: (v) => (v.trim().length >= 3 ? '' : 'Please enter a short subject.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.')
}

export default function ContactForm() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ text: '', kind: '' }) // kind: '' | 'success' | 'error'
  const [isLoading, setIsLoading] = useState(false)

  function validateField(field) {
    const input = formRef.current.elements[field]
    const msg = validators[field](input.value)
    setErrors((prev) => ({ ...prev, [field]: msg }))
    return !msg
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    const fields = ['name', 'email', 'subject', 'message']
    const results = fields.map(validateField)

    if (results.includes(false)) {
      setStatus({ text: 'Please fix the highlighted fields.', kind: 'error' })
      return
    }

    const firstName = form.elements.name.value.trim().split(' ')[0]

    const formData = new FormData(form)
    formData.set('subject', `Portfolio contact: ${form.elements.subject.value.trim()}`)
    formData.append('from_name', 'Yusuf Aman Portfolio')
    formData.append('replyto', form.elements.email.value.trim())

    setIsLoading(true)
    setStatus({ text: '', kind: '' })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus({ text: `Thanks, ${firstName}! Your message has been sent — I'll get back to you soon.`, kind: 'success' })
        form.reset()
        setErrors({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ text: data.message || 'Something went wrong. Please try again.', kind: 'error' })
      }
    } catch {
      setStatus({ text: 'Network error — please check your connection and try again.', kind: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="contact-form glass"
      id="contactForm"
      data-aos="fade-up"
      data-aos-delay="200"
      noValidate
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} readOnly />

      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          autoComplete="name"
          required
          className={errors.name ? 'invalid' : undefined}
          onBlur={() => validateField('name')}
        />
        <span className="field-error" data-error-for="name">{errors.name}</span>
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          className={errors.email ? 'invalid' : undefined}
          onBlur={() => validateField('email')}
        />
        <span className="field-error" data-error-for="email">{errors.email}</span>
      </div>

      <div className="form-row">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Role, project, or opportunity"
          required
          className={errors.subject ? 'invalid' : undefined}
          onBlur={() => validateField('subject')}
        />
        <span className="field-error" data-error-for="subject">{errors.subject}</span>
      </div>

      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Tell me a bit about what you have in mind..."
          required
          className={errors.message ? 'invalid' : undefined}
          onBlur={() => validateField('message')}
        />
        <span className="field-error" data-error-for="message">{errors.message}</span>
      </div>

      <button type="submit" className={`btn btn-primary btn-submit magnetic${isLoading ? ' is-loading' : ''}`} disabled={isLoading}>
        <span className="btn-label">Send Message</span>
        <span className="btn-spinner" aria-hidden="true" />
      </button>

      <p className={`form-status${status.kind ? ' ' + status.kind : ''}`} id="formStatus" role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  )
}
