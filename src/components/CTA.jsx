import { useState, useEffect, useRef } from 'react'

const TRUST_SIGNALS = [
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    text: 'Sin tarjeta de crédito',
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Configuración en minutos',
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    text: 'Datos seguros y privados',
  },
  {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    text: 'Soporte 24/7 incluido',
  },
]

function useIntersecting(threshold = 0.12) {
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

function CTA() {
  const [sectionRef, visible] = useIntersecting(0.1)

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden py-28 px-4 sm:py-36 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0c1525 40%, #0f172a 100%)' }}
    >
      {/* Orbs animados */}
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'hero-orb-1 22s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'hero-orb-2 28s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 65%)',
          filter: 'blur(30px)',
          animation: 'hero-orb-3 18s ease-in-out infinite',
        }}
      />

      {/* Grid dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Líneas decorativas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(139,92,246,0.2), transparent)' }}
      />

      <div className="relative mx-auto max-w-3xl text-center">

        {/* Badge */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.94)',
            transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.5,0.64,1)',
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-blue-400"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite', boxShadow: '0 0 6px #3b82f6' }}
          />
          <span className="text-xs font-medium tracking-wide text-blue-300">Empezá hoy mismo</span>
        </div>

        {/* Headline */}
        <h2
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.1s',
          }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
        >
          Gestioná tu hotel
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            a la manera moderna.
          </span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
          }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          Únite a los hoteles que ya dejaron las hojas de cálculo por Hotelus.
          Prueba gratuita, sin compromiso, sin tarjeta.
        </p>

        {/* CTAs */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.55s ease 0.32s, transform 0.55s ease 0.32s',
          }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#"
            className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-200 sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Prueba gratis por 30 días
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span
              aria-hidden
              className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[110%]"
            />
          </a>

          <a
            href="#preview"
            className="group w-full rounded-xl border border-slate-700/80 bg-slate-900/50 px-8 py-4 text-base font-medium text-slate-400 hover:border-slate-600 hover:bg-slate-800/60 hover:text-slate-200 transition-all duration-200 text-center sm:w-auto"
          >
            Ver demo primero
          </a>
        </div>

        {/* Trust signals */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.55s ease 0.48s',
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.text} className="flex items-center gap-2 text-slate-600">
              <span className="text-slate-700">{signal.icon}</span>
              <span className="text-sm">{signal.text}</span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s',
          }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-slate-600">
            <span className="text-slate-400 font-medium">4.9 / 5</span> · basado en más de 200 reseñas
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA
