import { useEffect, useState } from "react";
import { AlertTriangle, Cpu, MapPin, Shield, Activity, Bell, TrendingUp, Wifi } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ── Datos de ejemplo ──────────────────────────────────────────────────────
const alertasPorTipoData = {
  labels: ["CPU", "Red", "Memoria", "Disco"],
  datasets: [{
    label: "Alertas",
    data: [9, 6, 5, 4],
    backgroundColor: ["#4a66e2", "#1daa87", "#378add", "#12b88e"],
    borderRadius: 8,
    borderSkipped: false,
  }],
};

const dispositivosData = {
  labels: ["UCI", "Urgencias", "Consultas", "Radiología", "Admin"],
  datasets: [{
    label: "Dispositivos",
    data: [18, 14, 11, 8, 5],
    backgroundColor: "#185fa5",
    borderRadius: 8,
    borderSkipped: false,
  }],
};

const cpuData = {
  labels: ["08h", "10h", "12h", "14h", "16h", "18h"],
  datasets: [{
    label: "CPU %",
    data: [45, 62, 78, 55, 91, 67],
    backgroundColor: [45, 62, 78, 55, 91, 67].map(v => v >= 85 ? "#2cafa9" : "#639922"),
    borderRadius: 8,
    borderSkipped: false,
  }],
};

const alertasSemanaData = {
  labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  datasets: [{
    label: "Alertas",
    data: [3, 7, 5, 2, 8, 1, 4],
    backgroundColor: "#d4537e",
    borderRadius: 8,
    borderSkipped: false,
  }],
};

const baseOptions = (yFormatter) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#0f172a",
      bodyColor: "#64748b",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      padding: 10,
      cornerRadius: 10,
      callbacks: yFormatter ? { label: ctx => ` ${ctx.parsed.y}${yFormatter}` } : {},
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: "#94a3b8", font: { size: 11 } },
    },
    y: {
      grid: { color: "#f1f5f9" },
      border: { display: false },
      ticks: {
        color: "#94a3b8",
        font: { size: 11 },
        ...(yFormatter ? { callback: v => `${v}${yFormatter}` } : {}),
      },
      ...(yFormatter ? { max: 100 } : {}),
    },
  },
});

// ── Estilos inline base ───────────────────────────────────────────────────
const card = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "1.5rem",
  padding: "1.75rem",
  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
};

function StatCard({ icon: Icon, iconBg, iconColor, label, value, badge, badgeColor }) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div style={{ width: 52, height: 52, borderRadius: "1rem", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={iconColor} />
        </div>
        {badge && <span style={{ fontSize: "0.8rem", fontWeight: 700, color: badgeColor }}>{badge}</span>}
      </div>
      <p style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", margin: 0, lineHeight: 1 }}>{value}</p>
      <p style={{ color: "#64748b", margin: "0.4rem 0 0", fontSize: "0.9rem" }}>{label}</p>
    </div>
  );
}

function ChartCard({ title, subtitle, legend, height = 210, children }) {
  return (
    <div style={card}>
      <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0f172a", margin: "0 0 0.2rem" }}>{title}</h2>
      <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "0 0 0.85rem" }}>{subtitle}</p>
      {legend && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.85rem" }}>
          {legend.map(l => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#64748b" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      <div style={{ position: "relative", height }}>
        {children}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState({ locations: 0, devices: 0, alerts: 0, metrics: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [loc, dev, ale, met] = await Promise.all([
        api.get("/locations"), api.get("/devices"),
        api.get("/alerts"),    api.get("/metrics"),
      ]);
      setStats({
        locations: loc.data.length,
        devices:   dev.data.length,
        alerts:    ale.data.length,
        metrics:   met.data.length,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const v = n => loading ? "—" : n;

  return (
    <DashboardLayout>

      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Dashboard</h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0" }}>Monitoreo inteligente de infraestructura hospitalaria.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "1rem", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#15803d" }}>En vivo</span>
          </div>
          <div style={{ ...card, padding: "0.65rem 1.1rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Estado general</p>
            <p style={{ fontWeight: 900, color: "#16a34a", margin: 0, fontSize: "0.9rem" }}>Operativo</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
        <StatCard icon={MapPin}        iconBg="#f1f5f9" iconColor="#475569" label="Ubicaciones"  value={v(stats.locations)} />
        <StatCard icon={Cpu}           iconBg="#f1f5f9" iconColor="#475569" label="Dispositivos" value={v(stats.devices)}   badge="Online"   badgeColor="#16a34a" />
        <StatCard icon={AlertTriangle} iconBg="#fee2e2" iconColor="#ef4444" label="Alertas"      value={v(stats.alerts)}    badge="Críticas" badgeColor="#ef4444" />
        <StatCard icon={Shield}        iconBg="#dbeafe" iconColor="#2563eb" label="Métricas"     value={v(stats.metrics)}   badge="Live"     badgeColor="#2563eb" />
      </div>

      {/* Gráficas fila 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
        <ChartCard
          title="Alertas por tipo"
          subtitle="Distribución de alertas activas"
          legend={[
            { label: "CPU 9",      color: "#5c0074" },
            { label: "Red 6",      color: "#ef9f27" },
            { label: "Memoria 5",  color: "#378add" },
            { label: "Disco 4",    color: "#888780" },
          ]}
        >
          <Bar data={alertasPorTipoData} options={baseOptions()} />
        </ChartCard>

        <ChartCard
          title="Dispositivos por ubicación"
          subtitle="Total de dispositivos por sede"
          legend={[{ label: "Dispositivos activos", color: "#185fa5" }]}
        >
          <Bar data={dispositivosData} options={baseOptions()} />
        </ChartCard>
      </div>

      {/* Gráficas fila 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
        <ChartCard
          title="CPU promedio"
          subtitle="Últimas 6 horas"
          legend={[
            { label: "Normal",          color: "#639922" },
            { label: "Crítico (>85%)",  color: "#e24b4a" },
          ]}
        >
          <Bar data={cpuData} options={baseOptions("%")} />
        </ChartCard>

        <ChartCard
          title="Alertas esta semana"
          subtitle="Últimos 7 días"
          legend={[{ label: "Alertas diarias", color: "#d4537e" }]}
        >
          <Bar data={alertasSemanaData} options={baseOptions()} />
        </ChartCard>
      </div>

      {/* Fila inferior */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>

        {/* Alertas recientes */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Alertas recientes</h2>
            <Bell size={17} color="#94a3b8" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { Icon: Cpu,      bg: "#fee2e2", ic: "#107bad", tc: "#0d3c57", rb: "#fef2f2", b: "#fecaca", title: "CPU elevada",       desc: "Servidor principal superó el 90%.",  time: "Hace 5 min"  },
              { Icon: Wifi,     bg: "#fef9c3", ic: "#ca8a04", tc: "#b45309", rb: "#fefce8", b: "#fde68a", title: "Red inestable",     desc: "Latencia detectada en UCI.",           time: "Hace 22 min" },
              { Icon: Activity, bg: "#dbeafe", ic: "#3b82f6", tc: "#2563eb", rb: "#eff6ff", b: "#bfdbfe", title: "Memoria al límite", desc: "Servidor secundario al 87% de RAM.",  time: "Hace 1h"     },
            ].map(({ Icon, bg, ic, tc, rb, b, title, desc, time }) => (
              <div key={title} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start", padding: "0.85rem", borderRadius: "1rem", background: rb, border: `1px solid ${b}` }}>
                <div style={{ width: 30, height: 30, borderRadius: "0.6rem", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} color={ic} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: tc, fontSize: "0.82rem", margin: 0 }}>{title}</p>
                  <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "0.15rem 0 0" }}>{desc}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.72rem", margin: "0.2rem 0 0" }}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del sistema */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Estado del sistema</h2>
            <TrendingUp size={17} color="#94a3b8" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { nombre: "Servidor central",    desc: "Funcionando correctamente",   estado: "ONLINE",  bb: "#dcfce7", bc: "#15803d" },
              { nombre: "Base de datos",        desc: "Sin errores detectados",      estado: "ACTIVA",  bb: "#dcfce7", bc: "#15803d" },
              { nombre: "API Gateway",          desc: "Respondiendo con normalidad", estado: "ONLINE",  bb: "#dcfce7", bc: "#15803d" },
              { nombre: "Servicio de alertas",  desc: "Latencia elevada detectada",  estado: "ALERTA",  bb: "#fef9c3", bc: "#854d0e" },
            ].map(({ nombre, desc, estado, bb, bc }) => (
              <div key={nombre} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderRadius: "1rem", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div>
                  <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.82rem", margin: 0 }}>{nombre}</p>
                  <p style={{ color: "#64748b", fontSize: "0.72rem", margin: "0.15rem 0 0" }}>{desc}</p>
                </div>
                <span style={{ padding: "0.3rem 0.7rem", borderRadius: "0.5rem", background: bb, color: bc, fontSize: "0.72rem", fontWeight: 700, marginLeft: "1rem", flexShrink: 0 }}>
                  {estado}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;