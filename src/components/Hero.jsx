import { useState, useEffect } from "react";

const highlights = [
  "Sin Excel ni hojas de cálculo",
  "Todo en una sola plataforma",
  "Disponibilidad en tiempo real",
];

const STATS = [
  { value: 50, suffix: "+", label: "hoteles activos", icon: "🏨" },
  { value: 98, suffix: "%", label: "satisfacción", icon: "⭐" },
  { value: 5, suffix: " min", label: "para empezar", icon: "⚡" },
];

function useCountUp(target, duration = 1600, delay = 0, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, started]);
  return value;
}

function StatCard({ stat, index, started }) {
  const count = useCountUp(stat.value, 1600, index * 180, started);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900 + index * 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(14px) scale(0.96)",
        transition:
          "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.5,0.64,1)",
      }}
      className="group flex flex-col items-center gap-1 rounded-2xl border border-slate-700/60 bg-slate-800/50 px-5 py-4 backdrop-blur-sm hover:border-blue-500/40 hover:bg-slate-800/80 transition-colors duration-300"
    >
      <span className="text-xl">{stat.icon}</span>
      <p className="text-2xl font-extrabold text-white tabular-nums">
        {count}
        <span className="text-blue-400">{stat.suffix}</span>
      </p>
      <p className="text-xs text-slate-500 text-center">{stat.label}</p>
    </div>
  );
}

const HEADLINE_PARTS = [
  { text: "Gestión hotelera", gradient: false },
  { text: " moderna,", gradient: false },
  { text: " hecha simple", gradient: true },
];

function AnimatedWord({ text, gradient, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        display: "inline",
        transition:
          "opacity 0.55s ease, transform 0.55s cubic-bezier(0.34,1.3,0.64,1)",
      }}
    >
      {gradient ? (
        <span
          className="font-extrabold"
          style={{
            background:
              "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {text}
        </span>
      ) : (
        text
      )}
    </span>
  );
}

function Hero() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setBadgeVisible(true), 80),
      setTimeout(() => setSubVisible(true), 500),
      setTimeout(() => setPillsVisible(true), 680),
      setTimeout(() => setCtaVisible(true), 820),
      setTimeout(() => setStatsStarted(true), 950),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-900 px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
      {/* ── Fondo: capas animadas ── */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none" />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.14) 0%, transparent 60%)",
          animation: "hero-glow-pulse 8s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[130px]"
        style={{ animation: "hero-orb-1 20s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute -right-24 bottom-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]"
        style={{ animation: "hero-orb-2 25s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute left-1/3 top-2/3 h-72 w-72 rounded-full bg-cyan-500/8 blur-[80px]"
        style={{ animation: "hero-orb-3 18s ease-in-out infinite" }}
      />
      {/* Grid dots */}
      <div
        aria-hidden
        className="hero-bg-animated pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "hero-grid-pulse 8s ease-in-out infinite",
        }}
      />

      {/* ── Contenido ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          {/* Badge "Nuevo" */}
          <div
            style={{
              opacity: badgeVisible ? 1 : 0,
              transform: badgeVisible
                ? "translateY(0) scale(1)"
                : "translateY(-10px) scale(0.92)",
              transition:
                "opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.5,0.64,1)",
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
              style={{
                animation: "pulse-dot 2s ease-in-out infinite",
                boxShadow: "0 0 6px #3b82f6",
              }}
            />
            <span className="text-xs font-medium tracking-wide text-blue-300">
              Nuevo · Sistema PMS para hotelería
            </span>
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
              v2.0
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {HEADLINE_PARTS.map((part, i) => (
              <AnimatedWord
                key={i}
                text={part.text}
                gradient={part.gradient}
                delay={160 + i * 120}
              />
            ))}
          </h1>

          {/* Subtext */}
          <p
            style={{
              opacity: subVisible ? 1 : 0,
              transform: subVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
            className="mt-5 text-lg leading-relaxed text-slate-400 sm:mt-6 sm:text-xl"
          >
            Hotelus ayuda a hoteles pequeños y medianos a gestionar{" "}
            <span className="font-medium text-slate-300">
              habitaciones, reservas y huéspedes
            </span>{" "}
            en una sola plataforma intuitiva.
          </p>

          {/* Highlights pills */}
          <ul className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            {highlights.map((text, i) => (
              <li
                key={text}
                style={{
                  opacity: pillsVisible ? 1 : 0,
                  transform: pillsVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(10px) scale(0.95)",
                  transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.1}s`,
                }}
                className="group flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 hover:border-blue-500/40 hover:bg-slate-800 transition-colors duration-200 cursor-default"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/35 transition-colors duration-200">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <a
              href="#cta"
              className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-200"
            >
              <span className="relative z-10 flex items-center gap-2">
                Empezar gratis
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[110%]"
              />
            </a>

            <a
              href="#preview"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/50 px-6 py-3.5 text-base font-medium text-slate-400 hover:border-slate-600 hover:bg-slate-800/80 hover:text-slate-200 transition-all duration-200"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 group-hover:border-slate-500 transition-colors duration-200">
                <svg
                  className="h-3.5 w-3.5 translate-x-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Ver demo
            </a>

            <span className="w-full text-sm text-slate-600 sm:w-auto">
              Prueba gratis · Sin tarjeta · Configuración en minutos
            </span>
          </div>

          {/* Stats */}
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transition: "opacity 0.5s ease 0.3s",
            }}
            className="mt-10 sm:mt-12"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-slate-600">
              Confiado por
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm">
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={i}
                  started={statsStarted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "scroll-bounce 2.2s ease-in-out infinite" }}
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-600">
          Scroll
        </span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-700/60 pt-1.5">
          <div
            className="h-1.5 w-1 rounded-full bg-slate-500"
            style={{ animation: "scroll-dot 2.2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
