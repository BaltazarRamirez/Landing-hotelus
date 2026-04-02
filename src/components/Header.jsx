import { useState, useEffect } from "react";

const navLinks = [
  { label: "Producto", href: "#features" },
  { label: "Características", href: "#features" },
  { label: "Precios", href: "#cta" },
  { label: "Contacto", href: "#cta" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 10);
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      style={{
        opacity: mounted ? 1 : 0,
        backgroundColor: scrolled ? "rgba(15, 23, 42, 0.88)" : "transparent",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: scrolled ? "rgba(51,65,85,0.55)" : "transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
        transition:
          "opacity 0.5s ease, background-color 0.4s ease, border-color 0.35s ease, box-shadow 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      {/* Scroll progress bar */}

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="group relative flex items-center">
          <img
            src="/hotelus-logo.png"
            alt="Hotelus"
            className="h-16 w-auto object-contain md:h-20 scale-200 transition-all duration-300 group-hover:scale-[2.12] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            width={200}
            height={80}
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-10px)",
                transition: `opacity 0.45s ease ${0.08 + i * 0.07}s, transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${0.08 + i * 0.07}s`,
              }}
            >
              <a
                href={link.href}
                className="group relative py-1 text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-blue-500 to-violet-500 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </li>
          ))}

          <li
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-10px)",
              transition: `opacity 0.45s ease ${0.08 + navLinks.length * 0.07}s, transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${0.08 + navLinks.length * 0.07}s`,
            }}
          >
            <a
              href="#cta"
              className="group relative overflow-hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
            >
              <span className="relative z-10">Empezar gratis</span>
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[110%]"
              />
            </a>
          </li>
        </ul>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 transition-colors duration-200"
          aria-label="Abrir o cerrar menú"
        >
          <span
            style={{
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen
                ? "rotate(90deg) scale(0.6)"
                : "rotate(0) scale(1)",
              transition: "opacity 0.2s, transform 0.2s",
              position: "absolute",
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
          <span
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen
                ? "rotate(0) scale(1)"
                : "rotate(-90deg) scale(0.6)",
              transition: "opacity 0.2s, transform 0.2s",
              position: "absolute",
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? 380 : 0,
          opacity: mobileOpen ? 1 : 0,
          transition:
            "max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
          backgroundColor: "rgba(10, 16, 34, 0.98)",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "rgba(51,65,85,0.5)",
        }}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`,
              }}
            >
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            className="mt-2 border-t border-slate-700/50 pt-3"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.3s ease ${navLinks.length * 0.05 + 0.05}s, transform 0.3s ease ${navLinks.length * 0.05 + 0.05}s`,
            }}
          >
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-200"
            >
              Empezar gratis
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
