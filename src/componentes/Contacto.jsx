import React, { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("") // "", "success", "error"
  const [feedback, setFeedback] = useState("")
  const [copied, setCopied] = useState({ email: false, phone: false })

  const handleCopy = async (type, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied((prev) => ({ ...prev, [type]: true }))
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 1800)
    } catch (_) {
      // Fallback: no-op
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    // Validación básica
    const { nombre, email, mensaje } = formData
    if (!nombre || !email || !mensaje) {
      setStatus("error")
      setFeedback("Todos los campos son obligatorios.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setFeedback("Por favor ingresa un email válido.")
      return
    }

    try {
      setIsSubmitting(true)
      setStatus("")
      setFeedback("")

      const res = await fetch('https://serviciosjuan-production.up.railway.app/api/enviar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo_electronico: email, mensaje }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Error de servidor')
      }

      const data = await res.json()
      setStatus("success")
      setFeedback(data?.message || "Correo enviado exitosamente")
      // Reset form
      setFormData({ nombre: "", email: "", mensaje: "" })
    } catch (error) {
      setStatus("error")
      setFeedback(error.message || "Error al enviar el correo")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="scroll-snap-section py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Trabajemos Juntos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            ¿Tenés un proyecto en mente?<br/> Me encantaría conocer tus ideas y colaborar para hacerlas realidad
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Información de Contacto</h3>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">⏱️ Respuesta &lt; 24h</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">🟢 Disponible freelance</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">🇦🇷 ART (UTC-3)</span>
              </div>
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">Email</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a href="mailto:juanespasan@gmail.com" className="text-sm text-blue-600 hover:underline break-all">juanespasan@gmail.com</a>
                      <button
                        type="button"
                        onClick={() => handleCopy('email', 'juanespasan@gmail.com')}
                        className="text-xs px-2 py-1 rounded-md border border-border hover:bg-accent/10 transition-colors"
                        aria-live="polite"
                        aria-label="Copiar email"
                      >
                        {copied.email ? 'Copiado ✓' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">¿Listo para empezar?</h4>
              <p className="text-muted-foreground text-sm mb-3">
                Respondo en menos de 24 horas. Compartime objetivos, plazos y presupuesto estimado para acelerar el onboarding.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="#contact" className="text-xs px-3 py-2 rounded-md border border-border hover:bg-accent/10 transition-colors">Escribirme desde el formulario</a>
                <a href="mailto:juanespasan@gmail.com" className="text-xs px-3 py-2 rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors">Enviar email</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-card-foreground">Envíame un mensaje</h3>
              <p className="text-muted-foreground">Contame sobre tu proyecto y te responderé lo antes posible</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {status && (
                <div
                  className={`${status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'} border rounded-md px-4 py-3 text-sm`}
                  role="alert"
                  aria-live="polite"
                >
                  {feedback}
                </div>
              )}
              <div>
                <input
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <textarea
                  name="mensaje"
                  placeholder="Contame sobre tu proyecto..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-background px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {isSubmitting ? 'Enviando…' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;

