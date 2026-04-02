import { useState, useEffect, useRef } from "react";

const problems = [
  {
    text: "Reservas en hojas de cálculo",
    detail: "Propenso a errores y difícil de compartir con el equipo",
  },
  {
    text: "Dobles reservas y overbooking",
    detail: "Sin sincronización en tiempo real entre canales",
  },
  {
    text: "Sin visibilidad de disponibilidad",
    detail: "Nunca sabés con certeza qué habitación está libre",
  },
  {
    text: "Datos de huéspedes dispersos",
    detail: "Historial perdido entre papeles, emails y anotaciones",
  },
];

function useIntersecting(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Problem() {
  const [sectionRef, visible] = useIntersecting(0.1);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900 py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
    >
      {/* Fondo radial rojo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,68,68,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/8 px-3.5 py-1.5"
          >
            <svg
              className="h-3 w-3 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
              />
            </svg>
            <span className="text-xs font-medium tracking-wide text-red-400">
              El problema actual
            </span>
          </div>

          <h2
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
            }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Los hoteles no deberían depender
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #f87171, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              de hojas de cálculo.
            </span>
          </h2>

          <p
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Muchos hoteles pequeños y medianos siguen usando Excel, papel o
            sistemas anticuados. Eso genera errores, pérdida de tiempo e
            ingresos que se escapan.
          </p>
        </div>

        {/* Problems grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((item, i) => (
            <div
              key={item.text}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${0.3 + i * 0.1}s`,
              }}
              className="group flex items-start gap-4 rounded-2xl border border-red-500/15 bg-red-500/5 p-5 backdrop-blur-sm hover:border-red-500/35 hover:bg-red-500/10 transition-all duration-300 cursor-default"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/25 bg-red-500/15 text-red-400 group-hover:bg-red-500/25 transition-colors duration-300">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-slate-200">{item.text}</p>
                <p className="mt-0.5 text-sm text-slate-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge → solución */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.75s",
          }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-4">
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(59,130,246,0.4))",
              }}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
              Existe una mejor manera
            </p>
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(59,130,246,0.4))",
              }}
            />
          </div>

          <svg
            className="h-4 w-4 text-blue-500/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Problem;
