import { useState, useEffect, useRef } from 'react'

const PRODUCT_LINKS = [
  { label: 'Funcionalidades', href: '#features' },
  { label: 'Precios', href: '#cta' },
  { label: 'Demo en vivo', href: '#preview' },
  { label: 'Changelog', href: '#' },
]

const COMPANY_LINKS = [
  { label: 'Sobre Hotelus', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Soporte', href: '#cta' },
  { label: 'Privacidad', href: '#' },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

function useIntersecting(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return sent ? (
    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
      <svg className="h-4 w-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-sm text-emerald-300">¡Listo! Te avisamos cuando haya novedades.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        className="min-w-0 flex-1 rounded-xl border border-slate-700/80 bg-slate-800/60 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-200"
      >
        Suscribir
      </button>
    </form>
  )
}

function FooterColumn({ title, links, delay, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.34,1.3,0.64,1) ${delay}s`,
      }}
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
            >
              <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-500 text-xs">›</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const [ref, visible] = useIntersecting(0.1)

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-slate-800/80 bg-slate-900">

      {/* Orb de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-[320px] w-[600px] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Línea degradé arriba */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 30%, rgba(139,92,246,0.5) 70%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Grid principal */}
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">

          {/* Col 1: Logo + descripción + redes + newsletter */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.55s ease 0s, transform 0.55s ease 0s',
            }}
          >
            <a href="#" className="group inline-flex items-center gap-2 mb-4">
              <img
                src="/hotelus-logo.png"
                alt="Hotelus"
                className="h-12 w-auto object-contain scale-150 ml-6 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                width={120}
                height={48}
              />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-xs">
              Sistema de gestión hotelera moderno e intuitivo para hoteles que quieren operar más inteligente.
            </p>

            {/* Redes sociales */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/70 text-slate-500 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2.5 text-xs font-medium text-slate-500">Recibí novedades y actualizaciones</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Col 2 */}
          <FooterColumn title="Producto" links={PRODUCT_LINKS} delay={0.1} visible={visible} />

          {/* Col 3 */}
          <FooterColumn title="Empresa" links={COMPANY_LINKS} delay={0.18} visible={visible} />

          {/* Col 4: Contacto */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.55s ease 0.26s, transform 0.55s cubic-bezier(0.34,1.3,0.64,1) 0.26s',
            }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:hola@hotelus.app" className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200">
                  hola@hotelus.app
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-500">Soporte 24/7</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-slate-500">Argentina · Latinoamérica</span>
              </li>
            </ul>

            {/* Status badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                style={{ animation: 'pulse-dot 2s ease-in-out infinite', boxShadow: '0 0 5px #10b981' }}
              />
              <span className="text-xs text-emerald-500">Todos los sistemas operativos</span>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div
          className="mt-14 border-t border-slate-800"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.35s',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.55s ease 0.4s, transform 0.55s ease 0.4s',
          }}
          className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {new Date().getFullYear()} Hotelus. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {['Privacidad', 'Términos', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
