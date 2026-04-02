import { useState, useEffect, useRef } from 'react'

const FEATURES = [
  {
    title: 'Gestión de habitaciones',
    description:
      'Consultá disponibilidad y estado de cada habitación en tiempo real. Asigná, bloqueá o cambiá de estado con un clic.',
    color: 'blue',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: 'Sistema de reservas',
    description:
      'Creá y gestioná reservas con facilidad. Check-in, check-out, modificaciones y cancelaciones desde un solo lugar.',
    color: 'violet',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Gestión de huéspedes',
    description:
      'Mantené una base de datos ordenada con historial completo de huéspedes, documentos y preferencias.',
    color: 'emerald',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Panel de analíticas',
    description:
      'Entendé la ocupación, ingresos y rendimiento de tu hotel con gráficos claros y métricas en tiempo real.',
    color: 'amber',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Cargos y consumos',
    description:
      'Registrá consumos adicionales de cada huésped: restaurante, minibar, lavandería. Todo se suma automáticamente.',
    color: 'rose',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Interfaz rápida y simple',
    description:
      'Diseñada para que el personal del hotel la use sin capacitación. Intuitiva desde el primer día.',
    color: 'cyan',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 6.75l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
]

const COLOR_MAP = {
  blue:   { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  text: '#60a5fa',  glow: 'rgba(59,130,246,0.15)'  },
  violet: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', text: '#a78bfa', glow: 'rgba(139,92,246,0.15)' },
  emerald:{ bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', text: '#34d399', glow: 'rgba(16,185,129,0.15)' },
  amber:  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#fbbf24', glow: 'rgba(245,158,11,0.15)' },
  rose:   { bg: 'rgba(244,63,94,0.12)',  border: 'rgba(244,63,94,0.25)',  text: '#fb7185', glow: 'rgba(244,63,94,0.15)'  },
  cyan:   { bg: 'rgba(6,182,212,0.12)',  border: 'rgba(6,182,212,0.25)',  text: '#22d3ee', glow: 'rgba(6,182,212,0.15)'  },
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

function FeatureCard({ feature, index, visible }) {
  const [hovered, setHovered] = useState(false)
  const c = COLOR_MAP[feature.color]
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.97)',
        transition: `opacity 0.5s ease ${0.15 + index * 0.09}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${0.15 + index * 0.09}s`,
        borderColor: hovered ? c.border : 'rgba(51,65,85,0.7)',
        boxShadow: hovered ? `0 0 32px ${c.glow}, 0 4px 24px rgba(0,0,0,0.25)` : '0 2px 8px rgba(0,0,0,0.15)',
        transition2: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="group relative overflow-hidden rounded-2xl border bg-slate-800/60 p-6 backdrop-blur-sm cursor-default"
    >
      {/* Hover background glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${c.glow} 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Feature number */}
      <span
        className="absolute right-5 top-5 text-xs font-mono font-bold tabular-nums"
        style={{ color: c.text, opacity: 0.3 }}
      >
        {num}
      </span>

      <div className="relative">
        {/* Icon */}
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
        >
          {feature.icon}
        </div>

        <h3 className="text-base font-semibold text-slate-100">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>

        {/* Bottom accent line */}
        <div
          className="mt-5 h-px w-0 rounded-full group-hover:w-full"
          style={{
            background: `linear-gradient(to right, ${c.text}60, transparent)`,
            transition: 'width 0.5s cubic-bezier(0.34,1.3,0.64,1)',
          }}
        />
      </div>
    </div>
  )
}

function Features() {
  const [sectionRef, visible] = useIntersecting()

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900/95 py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
    >
      {/* Fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-3.5 py-1.5"
          >
            <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 6.75l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-xs font-medium tracking-wide text-blue-300">Funcionalidades</span>
          </div>

          <h2
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s',
            }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Todo lo que necesitás para
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              gestionar tu hotel
            </span>
          </h2>

          <p
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.5s ease 0.16s, transform 0.5s ease 0.16s',
            }}
            className="mx-auto mt-4 max-w-2xl text-lg text-slate-400"
          >
            Una sola plataforma para habitaciones, reservas, huéspedes e informes.
            Sin curva de aprendizaje.
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
