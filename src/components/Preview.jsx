import { useState, useEffect, useRef } from 'react'
import DashboardDemo from './DashboardDemo'

function useIntersecting(threshold = 0.08) {
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

function Preview() {
  const [sectionRef, visible] = useIntersecting()

  return (
    <section
      id="preview"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900/95 py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
    >
      {/* Fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(59,130,246,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-3.5 py-1.5"
          >
            <span className="text-xs font-medium tracking-wide text-blue-300">Demo interactiva</span>
          </div>
          <h2
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s',
            }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Tu hotel de un vistazo
          </h2>
          <p
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.5s ease 0.16s, transform 0.5s ease 0.16s',
            }}
            className="mx-auto mt-3 max-w-xl text-slate-400"
          >
            Explorá el Panel, las habitaciones, reservas y huéspedes — todo en una sola pantalla.
          </p>
        </div>

        {/* Window chrome */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
            transition: 'opacity 0.6s ease 0.25s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.25s',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(51,65,85,0.6)',
          }}
          className="overflow-hidden rounded-2xl bg-slate-900"
        >
          {/* Barra de ventana */}
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-amber-500/70" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
            </div>
            <div className="ml-3 flex h-6 flex-1 items-center rounded-md border border-slate-700/60 bg-slate-800/60 px-3">
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              <span className="text-xs text-slate-600">app.hotelus.ar / dashboard</span>
            </div>
          </div>

          {/* Dashboard */}
          <div className="p-5 sm:p-7">
            <DashboardDemo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
