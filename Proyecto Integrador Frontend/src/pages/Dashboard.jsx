import { useEffect, useState } from "react";

import {
  AlertTriangle,
  Cpu,
  MapPin,
  Shield,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    locations: 0,
    devices: 0,
    alerts: 0,
    metrics: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locations = await api.get("/locations");
      const devices = await api.get("/devices");
      const alerts = await api.get("/alerts");
      const metrics = await api.get("/metrics");

      setStats({
        locations: locations.data.length,
        devices: devices.data.length,
        alerts: alerts.data.length,
        metrics: metrics.data.length,
      });
    } catch (error) {
      console.error(error);

      setStats({
        locations: 0,
        devices: 0,
        alerts: 0,
        metrics: 0,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-3">
            Dashboard
          </h1>

          <p className="text-slate-600">
            Monitoreo inteligente de infraestructura hospitalaria.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow">
          <p className="text-sm text-slate-500">Estado general</p>

          <h2 className="font-black text-green-600">Operativo</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-7 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <MapPin className="text-black" />
            </div>

            <span className="text-sm text-slate-500">Ubicaciones</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 mb-2">
            {stats.locations}
          </h2>

          <p className="text-slate-500">Ubicaciones registradas</p>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-7 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Cpu className="text-black" />
            </div>

            <span className="text-sm text-green-600">Online</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 mb-2">
            {stats.devices}
          </h2>

          <p className="text-slate-500">Dispositivos</p>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-7 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-500" />
            </div>

            <span className="text-sm text-red-500">Críticas</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 mb-2">
            {stats.alerts}
          </h2>

          <p className="text-slate-500">Alertas</p>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-7 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Shield className="text-blue-600" />
            </div>

            <span className="text-sm text-blue-600">Live</span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 mb-2">
            {stats.metrics}
          </h2>

          <p className="text-slate-500">Métricas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-8 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Alertas recientes
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
              <h3 className="font-bold text-red-600">CPU elevada</h3>

              <p className="text-slate-600 text-sm mt-1">
                Servidor principal superó el 90%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
              <h3 className="font-bold text-yellow-600">Red inestable</h3>

              <p className="text-slate-600 text-sm mt-1">
                Latencia detectada en UCI.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 p-8 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Estado del sistema
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center p-5 rounded-2xl bg-white shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900">Servidor central</h3>

                <p className="text-sm text-slate-500">
                  Funcionando correctamente
                </p>
              </div>

              <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-bold">
                ONLINE
              </span>
            </div>

            <div className="flex justify-between items-center p-5 rounded-2xl bg-white shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900">Base de datos</h3>

                <p className="text-sm text-slate-500">
                  Sin errores detectados
                </p>
              </div>

              <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-bold">
                ACTIVA
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;