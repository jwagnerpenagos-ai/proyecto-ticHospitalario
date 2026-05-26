import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import hospitalImage from "../assets/hospital.jpg";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <main className="relative min-h-screen bg-slate-100">
      {/* Fondo estático liviano */}
      <div className="fixed inset-0 z-0">
        <img
          src={hospitalImage}
          alt="Hospital"
          className="h-full w-full object-cover opacity-10"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-100 to-cyan-50" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <div>
              <p className="text-sm font-bold text-slate-500">
                Sesión activa
              </p>

              <h2 className="text-xl font-black text-slate-900">
                {getUserRole()}
              </h2>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}

export default DashboardLayout;