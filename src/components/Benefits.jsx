import { useState, useEffect, useRef } from 'react'

const BENEFITS = [
  {
    number: '01',
    title: 'Cero errores en reservas',
    description:
      'El sistema valida disponibilidad en tiempo real y evita dobles reservas automáticamente.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    number: '02',
    title: 'Ahorrá horas cada semana',
    description:
      'Check-in, check-out y reportes que antes tomaban horas, ahora se hacen en minutos.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'blue',
  },
  {
    number: '03',
    title: 'Historial completo de huéspedes',
    description:
      'Cada visita, preferencia y registro queda centralizado. Brindá un servicio personalizado.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    number: '04',
    title: 'Visibilidad total del negocio',
    description:
      'Dashboard con métricas de ocupación, ingresos y movimiento. Todo en tiempo real.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    color: 'amber',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Pasamos de usar tres planillas de Excel a tener todo en un solo lugar. El equipo lo adoptó en un día.',
    author: 'Valentina M.',
    role: 'Gerente · Hotel Mirador',
    avatar: 'VM',
    color: '#3b82f6',
  },
  {
    quote: 'El dashboard nos da una visión que antes no teníamos. Ahora tomamos mejores decisiones cada día.',
    author: 'Roberto S.',
    role: 'Propietario · Apart Serrano',
    avatar: 'RS',
    color: '#8b5cf6',
  },
]

const COLOR_MAP = {
  emerald:{ bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
  blue:   { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
  violet: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa' },
  amber:  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
}

function useIntersecting(threshold = 0.1) {
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

function BenefitCard({ benefit, index, visible }) {
  const c = COLOR_MAP[benefit.color]
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${0.2 + index * 0.1}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${0.2 + index * 0.1}s`,
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 backdrop-blur-sm hover:border-slate-600/80 transition-all duration-300 cursor-default"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${c.bg} 0%, transparent 60%)`,
          transition: 'opacity 0.35s ease',
        }}
      />

      <div className="relative flex items-start gap-4">
        {/* Number + Icon stack */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          >
            {benefit.icon}
          </div>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: c.text, opacity: 0.5 }}
          >
            {benefit.number}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100">{benefit.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{benefit.description}</p>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, index, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s ease ${0.65 + index * 0.12}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${0.65 + index * 0.12}s`,
      }}
      className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm"
    >
      {/* Quote mark */}
      <div className="mb-3 text-3xl leading-none font-serif text-slate-700">"</div>
      <p className="text-sm leading-relaxed text-slate-300 italic">
        {testimonial.quote}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">{testimonial.author}</p>
          <p className="text-xs text-slate-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

function Benefits() {
  const [sectionRef, visible] = useIntersecting(0.08)

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900 py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
    >
      {/* Fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 100% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 0% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
              }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3.5 py-1.5"
            >
              <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-xs font-medium tracking-wide text-emerald-400">Por qué Hotelus</span>
            </div>
            <h2
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(18px)',
                transition: 'opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s',
              }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Sustituí hojas de cálculo y papel
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #34d399, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                por un sistema que funciona.
              </span>
            </h2>
          </div>

          <p
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.5s ease 0.18s',
            }}
            className="max-w-xs text-slate-500 text-sm leading-relaxed lg:text-right"
          >
            Más de 500 hoteles en Argentina ya gestionan sus operaciones con Hotelus.
          </p>
        </div>

        {/* Layout: benefits + testimonials */}
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

          {/* Benefits grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <BenefitCard key={benefit.number} benefit={benefit} index={i} visible={visible} />
            ))}
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.author} testimonial={t} index={i} visible={visible} />
            ))}

            {/* Mini stat */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
              }}
              className="rounded-2xl border border-slate-700/40 bg-slate-800/30 p-4 flex items-center justify-between gap-4"
            >
              {[['4.9 ★', 'Valoración promedio'], ['< 1 día', 'Tiempo de setup'], ['24/7', 'Soporte incluido']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-base font-bold text-slate-100">{val}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
