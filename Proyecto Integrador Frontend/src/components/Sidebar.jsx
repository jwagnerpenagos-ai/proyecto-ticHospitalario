import { Link, useLocation } from "react-router-dom";

import {
  Activity,
  Cpu,
  Bell,
  Shield,
  MapPin,
  UserCog,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const getUserRole = () => {
    if (!token) return "Usuario";

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id === 1 ? "Administrador" : "Usuario";
    } catch {
      return "Usuario";
    }
  };

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: Activity,
    },
    {
      path: "/devices",
      label: "Dispositivos",
      icon: Cpu,
    },
    {
      path: "/alerts",
      label: "Alertas",
      icon: Bell,
    },
    {
      path: "/metrics",
      label: "Métricas",
      icon: Shield,
    },
    {
      path: "/locations",
      label: "Ubicaciones",
      icon: MapPin,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white/75 backdrop-blur-xl border-r border-slate-200 p-8 shadow-xl">
      <div className="mb-10">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-white flex items-center justify-center font-black text-xl mb-5 shadow-lg shadow-cyan-500/30">
          SR
        </div>

        <h1 className="text-3xl font-black text-slate-900">
          Hospital
        </h1>

        <p className="text-slate-500">
          Sistema TI
        </p>
      </div>

      <div className="mb-8 rounded-3xl bg-slate-900 text-white p-5">
        <div className="flex items-center gap-3 mb-2">
          <UserCog size={20} />
          <span className="text-sm text-slate-300">Rol activo</span>
        </div>

        <h2 className="font-black">
          {getUserRole()}
        </h2>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition font-semibold ${
                active
                  ? "bg-black text-white shadow-lg"
                  : "text-slate-700 hover:bg-white hover:shadow"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;