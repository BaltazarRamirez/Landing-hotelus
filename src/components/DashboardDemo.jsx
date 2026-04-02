import { useState, useEffect, useRef } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

// ─── Datos demo ───────────────────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10)

const DEMO_STATS = {
  occupancyRate: 75, occupiedRooms: 18, availableRooms: 5,
  cleaningRooms: 1, arrivals: 4, departures: 2, inHouse: 18,
  todayRoomRevenue: 125000, todayChargesRevenue: 8500,
  monthRoomRevenue: 1240000, monthChargesRevenue: 42000, totalRooms: 24,
}

const CHART_OCCUPANCY = [
  { fecha: '01 mar', ocupación: 68 }, { fecha: '02 mar', ocupación: 72 },
  { fecha: '03 mar', ocupación: 70 }, { fecha: '04 mar', ocupación: 78 },
  { fecha: '05 mar', ocupación: 82 }, { fecha: '06 mar', ocupación: 75 },
  { fecha: '07 mar', ocupación: 75 },
]

const CHART_REVENUE = [
  { fecha: '01 mar', habitaciones: 98000, otros: 5200 },
  { fecha: '02 mar', habitaciones: 112000, otros: 6800 },
  { fecha: '03 mar', habitaciones: 105000, otros: 4100 },
  { fecha: '04 mar', habitaciones: 118000, otros: 5900 },
  { fecha: '05 mar', habitaciones: 132000, otros: 7200 },
  { fecha: '06 mar', habitaciones: 125000, otros: 8500 },
  { fecha: '07 mar', habitaciones: 125000, otros: 8500 },
]

const ROOM_STATUSES = [
  ...Array(18).fill('occupied'), ...Array(5).fill('available'), ...Array(1).fill('cleaning'),
]

const ROOMS_DATA = [
  { num: '101', type: 'Doble',      floor: 1, status: 'occupied',  guest: 'John M.',    checkout: '08 mar', nights: 2 },
  { num: '102', type: 'Individual', floor: 1, status: 'available' },
  { num: '103', type: 'Doble',      floor: 1, status: 'reserved',  guest: 'Sarah K.',   checkin: 'Hoy',     nights: 3 },
  { num: '104', type: 'Suite',      floor: 1, status: 'cleaning' },
  { num: '105', type: 'Individual', floor: 1, status: 'available' },
  { num: '106', type: 'Doble',      floor: 1, status: 'occupied',  guest: 'Marta G.',   checkout: '09 mar', nights: 4 },
  { num: '201', type: 'Suite',      floor: 2, status: 'occupied',  guest: 'Carlos M.',  checkout: '10 mar', nights: 5 },
  { num: '202', type: 'Individual', floor: 2, status: 'available' },
  { num: '203', type: 'Doble',      floor: 2, status: 'occupied',  guest: 'Ana L.',     checkout: '09 mar', nights: 2 },
  { num: '204', type: 'Doble',      floor: 2, status: 'available' },
  { num: '205', type: 'Individual', floor: 2, status: 'occupied',  guest: 'Mike R.',    checkout: '08 mar', nights: 1 },
  { num: '206', type: 'Suite',      floor: 2, status: 'reserved',  guest: 'Roberto S.', checkin: '15 mar',  nights: 3 },
  { num: '301', type: 'Suite',      floor: 3, status: 'occupied',  guest: 'Laura P.',   checkout: '11 mar', nights: 6 },
  { num: '302', type: 'Doble',      floor: 3, status: 'available' },
  { num: '303', type: 'Individual', floor: 3, status: 'occupied',  guest: 'Diego F.',   checkout: '10 mar', nights: 3 },
  { num: '304', type: 'Doble',      floor: 3, status: 'cleaning' },
  { num: '305', type: 'Individual', floor: 3, status: 'occupied',  guest: 'Paula M.',   checkout: '12 mar', nights: 7 },
  { num: '306', type: 'Suite',      floor: 3, status: 'available' },
]

const RESERVATIONS_DATA = [
  { id: 1,  guest: 'Sarah K.',   room: '103', type: 'Doble',      checkin: '07 mar', checkout: '10 mar', nights: 3, status: 'checkin-hoy',  amount: 42000 },
  { id: 2,  guest: 'Mike R.',    room: '205', type: 'Individual', checkin: '08 mar', checkout: '09 mar', nights: 1, status: 'confirmada',   amount: 12000 },
  { id: 3,  guest: 'Carlos M.',  room: '201', type: 'Suite',      checkin: '05 mar', checkout: '10 mar', nights: 5, status: 'alojado',      amount: 95000 },
  { id: 4,  guest: 'Anna L.',    room: '203', type: 'Doble',      checkin: '06 mar', checkout: '09 mar', nights: 3, status: 'alojado',      amount: 36000 },
  { id: 5,  guest: 'Roberto S.', room: '206', type: 'Suite',      checkin: '15 mar', checkout: '18 mar', nights: 3, status: 'pendiente',    amount: 57000 },
  { id: 6,  guest: 'Laura P.',   room: '301', type: 'Suite',      checkin: '04 mar', checkout: '11 mar', nights: 7, status: 'alojado',      amount: 133000 },
  { id: 7,  guest: 'Diego F.',   room: '303', type: 'Individual', checkin: '07 mar', checkout: '10 mar', nights: 3, status: 'alojado',      amount: 36000 },
  { id: 8,  guest: 'Valeria T.', room: '102', type: 'Individual', checkin: '12 mar', checkout: '14 mar', nights: 2, status: 'confirmada',   amount: 24000 },
]

const GUESTS_DATA = [
  { name: 'John M.',   room: '101', type: 'Doble',      checkout: '08 mar', nights: 2, doc: 'DNI 12.345.678', phone: '+54 9 11 1234-5678', spent: 31400 },
  { name: 'Carlos M.', room: '201', type: 'Suite',      checkout: '10 mar', nights: 5, doc: 'DNI 23.456.789', phone: '+54 9 11 2345-6789', spent: 102000 },
  { name: 'Ana L.',    room: '203', type: 'Doble',      checkout: '09 mar', nights: 3, doc: 'DNI 34.567.890', phone: '+54 9 11 3456-7890', spent: 42500 },
  { name: 'Mike R.',   room: '205', type: 'Individual', checkout: '08 mar', nights: 1, doc: 'DNI 45.678.901', phone: '+54 9 11 4567-8901', spent: 14200 },
  { name: 'Laura P.',  room: '301', type: 'Suite',      checkout: '11 mar', nights: 6, doc: 'DNI 56.789.012', phone: '+54 9 11 5678-9012', spent: 140000 },
  { name: 'Diego F.',  room: '303', type: 'Individual', checkout: '10 mar', nights: 3, doc: 'DNI 67.890.123', phone: '+54 9 11 6789-0123', spent: 38800 },
  { name: 'Marta G.',  room: '106', type: 'Doble',      checkout: '09 mar', nights: 4, doc: 'DNI 78.901.234', phone: '+54 9 11 7890-1234', spent: 55600 },
  { name: 'Paula M.',  room: '305', type: 'Individual', checkout: '12 mar', nights: 7, doc: 'DNI 89.012.345', phone: '+54 9 11 8901-2345', spent: 78400 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(amount || 0)
}

function initials(name) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('')
}

const AVATAR_COLORS = [
  '#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444',
  '#06b6d4','#ec4899','#84cc16',
]
function avatarColor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountUp(target, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    const timeout = setTimeout(() => {
      const startTime = Date.now()
      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setValue(Math.round((1 - Math.pow(1 - progress, 4)) * target))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [target, duration, delay])
  return value
}

function useVisible(delay = 0) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return visible
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
        style={{ animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  )
}

function AnimatedBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 500 + delay)
    return () => clearTimeout(t)
  }, [pct, delay])
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/60">
      <div style={{
        width: `${width}%`, backgroundColor: color, height: '100%', borderRadius: 9999,
        transition: 'width 1.2s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: `0 0 8px ${color}88`,
      }} />
    </div>
  )
}

function StatCard({ title, value, accent, icon, delay = 0, trend, sub }) {
  const visible = useVisible(delay)
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
        transition: 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.34,1.4,0.64,1)',
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm cursor-default"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: accent
            ? 'radial-gradient(ellipse at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 50% -10%, rgba(148,163,184,0.07) 0%, transparent 65%)',
          transition: 'opacity 0.4s ease',
        }} />
      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
          {icon && <span className="mt-0.5 text-base text-slate-600 group-hover:text-slate-400 transition-colors duration-300">{icon}</span>}
        </div>
        <p className={`mt-2 text-2xl font-bold tracking-tight ${accent ? 'text-blue-400' : 'text-slate-100'}`}>{value}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-600">{sub}</p>}
        {trend !== undefined && (
          <div className="mt-1.5 flex items-center gap-1">
            <span className={`text-xs font-medium ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
            </span>
            <span className="text-xs text-slate-600">vs ayer</span>
          </div>
        )}
      </div>
    </div>
  )
}

function RingProgress({ value, size = 130 }) {
  const [animValue, setAnimValue] = useState(0)
  const sw = 10, r = (size - sw) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (animValue / 100) * circ
  useEffect(() => { const t = setTimeout(() => setAnimValue(value), 400); return () => clearTimeout(t) }, [value])
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="ringGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={sw}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} filter="url(#ringGlow)"
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.34,1.56,0.64,1)' }} />
    </svg>
  )
}

function RoomGrid({ statuses }) {
  const [visible, setVisible] = useState([])
  useEffect(() => {
    statuses.forEach((_, i) => setTimeout(() => setVisible((p) => [...p, i]), 80 + i * 40))
  }, [statuses])
  const colorMap = { occupied: '#3b82f6', available: '#10b981', cleaning: '#f59e0b' }
  const labelMap = { occupied: 'Ocupada', available: 'Disponible', cleaning: 'En limpieza' }
  return (
    <div className="flex flex-wrap gap-1.5">
      {statuses.map((s, i) => (
        <div key={i} title={`Hab. ${i + 101} · ${labelMap[s]}`}
          style={{
            width: 18, height: 18, borderRadius: 4,
            backgroundColor: colorMap[s],
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? 'scale(1)' : 'scale(0.4)',
            transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.8,0.64,1)',
            boxShadow: `0 0 6px ${colorMap[s]}66`, cursor: 'default',
          }} />
      ))}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <p style={{ color: '#e2e8f0', fontSize: 12, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : `${p.value}%`}
        </p>
      ))}
    </div>
  )
}

// ─── Status config ────────────────────────────────────────────────────────────

const ROOM_STATUS = {
  occupied:  { label: 'Ocupada',     color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.3)',  text: '#93c5fd' },
  available: { label: 'Disponible',  color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  text: '#6ee7b7' },
  cleaning:  { label: 'En limpieza', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  text: '#fcd34d' },
  reserved:  { label: 'Reservada',   color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.3)',  text: '#c4b5fd' },
}

const RES_STATUS = {
  'checkin-hoy': { label: 'Check-in hoy', bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  text: '#93c5fd'  },
  confirmada:    { label: 'Confirmada',   bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  text: '#6ee7b7'  },
  alojado:       { label: 'Alojado',      bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.3)',  text: '#c4b5fd'  },
  pendiente:     { label: 'Pendiente',    bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  text: '#fcd34d'  },
}

function Badge({ cfg }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: cfg.bg, borderColor: cfg.border, color: cfg.text }}>
      {cfg.label}
    </span>
  )
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'panel',         label: 'Panel' },
  { id: 'habitaciones',  label: 'Habitaciones' },
  { id: 'reservas',      label: 'Reservas' },
  { id: 'huespedes',     label: 'Huéspedes' },
]

// ─── PANEL TAB ────────────────────────────────────────────────────────────────

function PanelTab() {
  const stats = DEMO_STATS
  const occupancyCount    = useCountUp(stats.occupancyRate, 1500, 200)
  const occupiedCount     = useCountUp(stats.occupiedRooms, 1200, 300)
  const availableCount    = useCountUp(stats.availableRooms, 1200, 400)
  const cleaningCount     = useCountUp(stats.cleaningRooms, 900, 500)
  const arrivalsCount     = useCountUp(stats.arrivals, 900, 600)
  const departuresCount   = useCountUp(stats.departures, 900, 650)
  const inHouseCount      = useCountUp(stats.inHouse, 1200, 550)
  const todayRoomCount    = useCountUp(stats.todayRoomRevenue, 1800, 700)
  const todayChargesCount = useCountUp(stats.todayChargesRevenue, 1600, 750)
  const monthRoomCount    = useCountUp(stats.monthRoomRevenue, 2000, 800)
  const monthChargesCount = useCountUp(stats.monthChargesRevenue, 1800, 850)
  const v = useVisible(0)

  return (
    <div className="space-y-5" style={{ animation: 'tab-fade-in 0.3s ease' }}>
      {/* Ocupación */}
      <div style={{ opacity: v?1:0, transform: v?'translateY(0)':'translateY(16px)', transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s' }}
        className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/80 p-5 shadow-xl">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative shrink-0">
            <RingProgress value={stats.occupancyRate} size={130} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white">{occupancyCount}%</span>
              <span className="text-xs text-slate-500">ocupación</span>
            </div>
          </div>
          <div className="flex-1 w-full space-y-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Estado de habitaciones</p>
            {[
              { label: 'Ocupadas',    count: occupiedCount,  total: `/ ${stats.totalRooms}`, pct: (stats.occupiedRooms/stats.totalRooms)*100, color: '#3b82f6', glow: '#3b82f6' },
              { label: 'Disponibles', count: availableCount, total: '',                       pct: (stats.availableRooms/stats.totalRooms)*100, color: '#10b981', glow: '#10b981' },
              { label: 'En limpieza', count: cleaningCount,  total: '',                       pct: (stats.cleaningRooms/stats.totalRooms)*100, color: '#f59e0b', glow: '#f59e0b' },
            ].map((row, i) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.color, boxShadow: `0 0 6px ${row.glow}` }} />
                    <span className="text-slate-300">{row.label}</span>
                  </div>
                  <span className="font-semibold text-slate-100">{row.count} <span className="text-slate-600 text-xs">{row.total}</span></span>
                </div>
                <AnimatedBar pct={row.pct} color={row.color} delay={i * 150} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div style={{ opacity: v?1:0, transform: v?'translateY(0)':'translateY(16px)', transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s' }}
        className="rounded-2xl border border-slate-700/80 bg-slate-800/80 p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-slate-500">Mapa de habitaciones</p>
          <div className="flex items-center gap-3">
            {[['#3b82f6','Ocupada'],['#10b981','Disponible'],['#f59e0b','Limpieza']].map(([c,l]) => (
              <div key={l} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: c }} />
                <span className="text-xs text-slate-500">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <RoomGrid statuses={ROOM_STATUSES} />
      </div>

      {/* Cards movimiento */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Llegadas de hoy" value={arrivalsCount}   icon="↓" delay={300} trend={+33} sub="Check-ins pendientes" />
        <StatCard title="Salidas de hoy"  value={departuresCount} icon="↑" delay={380} trend={-25} sub="Check-outs pendientes" />
        <StatCard title="Huéspedes alojados" value={inHouseCount} icon="●" delay={460} sub={`de ${stats.totalRooms} habitaciones`} />
      </div>

      {/* Ingresos */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">Ingresos (check-outs realizados)</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Hoy · Habitaciones" value={formatCurrency(todayRoomCount)}    accent delay={500} trend={+8} />
          <StatCard title="Hoy · Consumos"     value={formatCurrency(todayChargesCount)} delay={560} trend={+12} />
          <StatCard title="Mes · Habitaciones" value={formatCurrency(monthRoomCount)}    accent delay={620} />
          <StatCard title="Mes · Consumos"     value={formatCurrency(monthChargesCount)} delay={680} />
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div style={{ opacity: v?1:0, transform: v?'translateY(0)':'translateY(20px)', transition: 'opacity 0.65s ease 0.7s, transform 0.65s ease 0.7s' }}
          className="group rounded-2xl border border-slate-700/80 bg-slate-800/80 p-4 shadow-lg hover:border-blue-500/40 transition-colors duration-300">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-slate-500">Ocupación 7 días (%)</p>
            <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">AreaChart</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_OCCUPANCY}>
                <defs>
                  <linearGradient id="ocupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ocupLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="fecha" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[60, 100]} stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ocupación" name="Ocupación" stroke="url(#ocupLine)"
                  fill="url(#ocupGrad)" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ opacity: v?1:0, transform: v?'translateY(0)':'translateY(20px)', transition: 'opacity 0.65s ease 0.85s, transform 0.65s ease 0.85s' }}
          className="group rounded-2xl border border-slate-700/80 bg-slate-800/80 p-4 shadow-lg hover:border-emerald-500/40 transition-colors duration-300">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-slate-500">Ingresos 7 días</p>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">BarChart</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_REVENUE} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="barBlue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="barGreen2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="fecha" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="habitaciones" name="Habitaciones" stackId="a" fill="url(#barBlue2)" radius={[0,0,0,0]} />
                <Bar dataKey="otros" name="Consumos" stackId="a" fill="url(#barGreen2)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /><span className="text-xs text-slate-500">Habitaciones</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-xs text-slate-500">Consumos</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HABITACIONES TAB ─────────────────────────────────────────────────────────

const FLOOR_LABELS = { 1: 'Piso 1', 2: 'Piso 2', 3: 'Piso 3' }

function RoomCard({ room, index }) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 60 + index * 55); return () => clearTimeout(t) }, [index])
  const s = ROOM_STATUS[room.status] ?? ROOM_STATUS.available

  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.4,0.64,1)',
      }}
      className="group relative overflow-hidden rounded-xl border bg-slate-800/70 p-4 cursor-default hover:shadow-lg transition-shadow duration-300"
      style2={{ borderColor: s.border }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.bg} 0%, transparent 65%)`, transition: 'opacity 0.3s ease' }} />

      {/* Número y tipo */}
      <div className="relative flex items-start justify-between mb-3">
        <div>
          <p className="text-lg font-extrabold text-slate-100 leading-none">{room.num}</p>
          <p className="text-xs text-slate-600 mt-0.5">{room.type}</p>
        </div>
        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium"
          style={{ backgroundColor: s.bg, borderColor: s.border, color: s.text }}>
          {s.label}
        </span>
      </div>

      {/* Info condicional */}
      <div className="relative min-h-[40px]">
        {(room.status === 'occupied' || room.status === 'reserved') && room.guest ? (
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: avatarColor(room.guest) }}>
              {initials(room.guest)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 leading-none">{room.guest}</p>
              <p className="text-xs text-slate-600 mt-0.5">
                {room.status === 'occupied'
                  ? `Salida: ${room.checkout} · ${room.nights} noche${room.nights !== 1 ? 's' : ''}`
                  : `Entrada: ${room.checkin} · ${room.nights} noche${room.nights !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        ) : room.status === 'cleaning' ? (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            <span className="text-xs text-amber-400/80">Limpieza en proceso</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-emerald-400/80">Lista para ocupar</span>
          </div>
        )}
      </div>

      {/* Línea color abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl"
        style={{ background: `linear-gradient(to right, ${s.color}60, transparent)`, opacity: 0.7 }} />
    </div>
  )
}

function HabitacionesTab() {
  const [filter, setFilter] = useState('all')
  const floors = [1, 2, 3]
  const FILTERS = [
    { id: 'all',       label: 'Todas' },
    { id: 'occupied',  label: 'Ocupadas' },
    { id: 'available', label: 'Disponibles' },
    { id: 'cleaning',  label: 'Limpieza' },
    { id: 'reserved',  label: 'Reservadas' },
  ]

  const filtered = ROOMS_DATA.filter((r) => filter === 'all' || r.status === filter)
  const counts = {
    occupied:  ROOMS_DATA.filter(r => r.status === 'occupied').length,
    available: ROOMS_DATA.filter(r => r.status === 'available').length,
    cleaning:  ROOMS_DATA.filter(r => r.status === 'cleaning').length,
    reserved:  ROOMS_DATA.filter(r => r.status === 'reserved').length,
  }

  return (
    <div className="space-y-5" style={{ animation: 'tab-fade-in 0.3s ease' }}>
      {/* Stat chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'occupied',  label: 'Ocupadas',    c: ROOM_STATUS.occupied },
          { key: 'available', label: 'Disponibles', c: ROOM_STATUS.available },
          { key: 'cleaning',  label: 'Limpieza',    c: ROOM_STATUS.cleaning },
          { key: 'reserved',  label: 'Reservadas',  c: ROOM_STATUS.reserved },
        ].map(({ key, label, c }) => (
          <div key={key} className="flex items-center gap-2 rounded-xl border px-3 py-2"
            style={{ backgroundColor: c.bg, borderColor: c.border }}>
            <span className="text-xl font-bold" style={{ color: c.text }}>{counts[key]}</span>
            <span className="text-xs" style={{ color: c.text, opacity: 0.8 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFilter(f.id)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: filter === f.id ? 'rgba(59,130,246,0.2)' : 'rgba(51,65,85,0.4)',
              border: filter === f.id ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(51,65,85,0.6)',
              color: filter === f.id ? '#93c5fd' : '#64748b',
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid por piso */}
      {floors.map((floor) => {
        const rooms = filtered.filter((r) => r.floor === floor)
        if (!rooms.length) return null
        return (
          <div key={floor}>
            <div className="mb-3 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">{FLOOR_LABELS[floor]}</p>
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-700">{rooms.length} hab.</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {rooms.map((room, i) => (
                <RoomCard key={room.num} room={room} index={i} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── RESERVAS TAB ─────────────────────────────────────────────────────────────

function ReservationRow({ res, index }) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 60 + index * 70); return () => clearTimeout(t) }, [index])
  const s = RES_STATUS[res.status] ?? RES_STATUS.confirmada

  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(-12px)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.3,0.64,1)',
      }}
      className="group flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-800/40 p-4 hover:border-slate-700/60 hover:bg-slate-800/70 transition-all duration-200 cursor-default sm:flex-row sm:items-center"
    >
      {/* Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: avatarColor(res.guest) }}>
        {initials(res.guest)}
      </div>

      {/* Nombre + room */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-200 text-sm">{res.guest}</p>
        <p className="text-xs text-slate-600">Hab. {res.room} · {res.type}</p>
      </div>

      {/* Fechas */}
      <div className="flex items-center gap-1.5 text-xs">
        <span className="rounded-md bg-slate-700/50 px-2 py-1 text-slate-400">{res.checkin}</span>
        <svg className="h-3 w-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="rounded-md bg-slate-700/50 px-2 py-1 text-slate-400">{res.checkout}</span>
        <span className="text-slate-600 ml-1">{res.nights}n</span>
      </div>

      {/* Monto */}
      <p className="text-sm font-semibold text-slate-300 tabular-nums">{formatCurrency(res.amount)}</p>

      {/* Badge */}
      <Badge cfg={s} />
    </div>
  )
}

function ReservasTab() {
  const [filter, setFilter] = useState('all')
  const v = useVisible(0)

  const FILTERS = [
    { id: 'all',         label: 'Todas' },
    { id: 'checkin-hoy', label: 'Check-in hoy' },
    { id: 'alojado',     label: 'Alojados' },
    { id: 'confirmada',  label: 'Confirmadas' },
    { id: 'pendiente',   label: 'Pendientes' },
  ]
  const filtered = RESERVATIONS_DATA.filter((r) => filter === 'all' || r.status === filter)
  const total = RESERVATIONS_DATA.reduce((s, r) => s + r.amount, 0)
  const alojados = RESERVATIONS_DATA.filter(r => r.status === 'alojado').length
  const hoy = RESERVATIONS_DATA.filter(r => r.status === 'checkin-hoy').length

  return (
    <div className="space-y-5" style={{ animation: 'tab-fade-in 0.3s ease' }}>
      {/* Stats */}
      <div style={{ opacity: v?1:0, transition: 'opacity 0.4s ease' }}
        className="grid grid-cols-3 gap-3">
        {[
          { val: RESERVATIONS_DATA.length, label: 'Total reservas',   color: '#60a5fa' },
          { val: alojados,                 label: 'Alojados hoy',     color: '#a78bfa' },
          { val: hoy,                      label: 'Check-in hoy',     color: '#34d399' },
        ].map(({ val, label, color }) => (
          <div key={label} className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 text-center">
            <p className="text-2xl font-bold" style={{ color }}>{val}</p>
            <p className="text-xs text-slate-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Ingresos totales */}
      <div style={{ opacity: v?1:0, transition: 'opacity 0.4s ease 0.1s' }}
        className="rounded-xl border border-blue-500/20 bg-blue-500/8 p-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-blue-400/70">Ingresos periodo</p>
        <p className="text-lg font-bold text-blue-300">{formatCurrency(total)}</p>
      </div>

      {/* Filtros */}
      <div style={{ opacity: v?1:0, transition: 'opacity 0.4s ease 0.15s' }}
        className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFilter(f.id)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: filter === f.id ? 'rgba(59,130,246,0.2)' : 'rgba(51,65,85,0.4)',
              border: filter === f.id ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(51,65,85,0.6)',
              color: filter === f.id ? '#93c5fd' : '#64748b',
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-2.5">
        {filtered.map((res, i) => (
          <ReservationRow key={res.id} res={res} index={i} />
        ))}
        {!filtered.length && (
          <p className="py-8 text-center text-sm text-slate-600">Sin reservas para este filtro.</p>
        )}
      </div>
    </div>
  )
}

// ─── HUÉSPEDES TAB ────────────────────────────────────────────────────────────

function GuestCard({ guest, index }) {
  const [vis, setVis] = useState(false)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 60 + index * 65); return () => clearTimeout(t) }, [index])

  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.3,0.64,1)',
      }}
      className="rounded-xl border border-slate-800/80 bg-slate-800/40 overflow-hidden cursor-default"
    >
      <div
        className="flex items-center gap-4 p-4 hover:bg-slate-800/70 transition-colors duration-200"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor(guest.name) }}>
            {initials(guest.name)}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-200 text-sm truncate">{guest.name}</p>
          <p className="text-xs text-slate-600">
            Hab. {guest.room} · {guest.type} · {guest.nights} noche{guest.nights !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Checkout */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-600">Check-out</p>
          <p className="text-sm font-semibold text-slate-300">{guest.checkout}</p>
        </div>

        {/* Consumos */}
        <div className="text-right hidden md:block">
          <p className="text-xs text-slate-600">Total</p>
          <p className="text-sm font-semibold text-blue-400 tabular-nums">{formatCurrency(guest.spent)}</p>
        </div>

        {/* Expand arrow */}
        <svg className="h-4 w-4 text-slate-600 shrink-0 transition-transform duration-200"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded details */}
      <div style={{
        maxHeight: expanded ? 160 : 0,
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
      }}>
        <div className="border-t border-slate-800 px-4 py-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Documento',  val: guest.doc },
            { label: 'Teléfono',   val: guest.phone },
            { label: 'Check-out',  val: guest.checkout },
            { label: 'Consumos',   val: formatCurrency(guest.spent) },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wide text-slate-600 mb-0.5">{label}</p>
              <p className="text-xs text-slate-300 font-medium truncate">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HuespedesTab() {
  const v = useVisible(0)
  const totalSpent = GUESTS_DATA.reduce((s, g) => s + g.spent, 0)
  const avgNights  = (GUESTS_DATA.reduce((s, g) => s + g.nights, 0) / GUESTS_DATA.length).toFixed(1)

  return (
    <div className="space-y-5" style={{ animation: 'tab-fade-in 0.3s ease' }}>
      {/* Stats */}
      <div style={{ opacity: v?1:0, transition: 'opacity 0.4s ease' }}
        className="grid grid-cols-3 gap-3">
        {[
          { val: GUESTS_DATA.length, label: 'Alojados',         color: '#a78bfa' },
          { val: `${avgNights}`,     label: 'Noches promedio',  color: '#60a5fa' },
          { val: formatCurrency(totalSpent), label: 'Total consumos', color: '#34d399' },
        ].map(({ val, label, color }) => (
          <div key={label} className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3 text-center">
            <p className="text-lg font-bold leading-tight" style={{ color }}>{val}</p>
            <p className="text-xs text-slate-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Hint */}
      <p style={{ opacity: v?1:0, transition: 'opacity 0.4s ease 0.1s' }}
        className="text-xs text-slate-600 flex items-center gap-1.5">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Hacé clic en un huésped para ver detalles
      </p>

      {/* Guest cards */}
      <div className="space-y-2.5">
        {GUESTS_DATA.map((guest, i) => (
          <GuestCard key={guest.name} guest={guest} index={i} />
        ))}
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState('panel')
  const [contentKey, setContentKey] = useState(0)
  const tabsRef = useRef(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const v = useVisible(0)

  useEffect(() => {
    const container = tabsRef.current
    if (!container) return
    const el = container.querySelector('[data-active="true"]')
    if (!el) return
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeTab])

  const handleTab = (id) => {
    if (id === activeTab) return
    setContentKey((k) => k + 1)
    setActiveTab(id)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div style={{ opacity: v?1:0, transform: v?'translateY(0)':'translateY(-10px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
        className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 md:text-2xl">Hotelus PMS</h1>
          <p className="text-xs text-slate-500 md:text-sm">Resumen operativo · {today}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <LiveDot />
          <span className="text-xs font-medium text-emerald-400">En vivo</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ opacity: v?1:0, transition: 'opacity 0.5s ease 0.05s' }}
        ref={tabsRef}
        className="relative flex gap-0.5 overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-800/60 p-1"
      >
        {/* Slider */}
        <div aria-hidden className="absolute top-1 bottom-1 rounded-lg bg-slate-700/70 transition-all duration-300"
          style={{ left: indicator.left + 4, width: indicator.width - 8 }} />

        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button key={tab.id} type="button" data-active={isActive ? 'true' : 'false'}
              onClick={() => handleTab(tab.id)}
              className="relative shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{ color: isActive ? '#f1f5f9' : '#64748b' }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div key={contentKey}>
        {activeTab === 'panel'        && <PanelTab />}
        {activeTab === 'habitaciones' && <HabitacionesTab />}
        {activeTab === 'reservas'     && <ReservasTab />}
        {activeTab === 'huespedes'    && <HuespedesTab />}
      </div>

      <style>{`
        @keyframes ping { 75%,100%{transform:scale(2);opacity:0} }
        @keyframes tab-fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}
