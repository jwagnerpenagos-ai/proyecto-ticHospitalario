import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Activity,
  Bell,
  ArrowRight,
  LogIn,
  CheckCircle2,
  Home,
} from "lucide-react";

import api from "../api/api";
import hospitalImage from "../assets/hospital.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Credenciales incorrectas. Intenta nuevamente."
      );

      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef7ff] flex items-center justify-center px-6 py-5">
      <img
        src={hospitalImage}
        alt="Hospital"
        className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[2px] scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-white/72 via-sky-100/55 to-blue-100/72" />

      <section className="relative z-10 w-full max-w-6xl rounded-[34px] bg-white/88 shadow-[0_28px_80px_rgba(15,23,42,0.16)] backdrop-blur-[2px] overflow-hidden min-h-[600px] lg:min-h-[620px]">
        {loading && (
          <div className="absolute left-0 top-0 z-30 h-1 w-full overflow-hidden bg-slate-100">
            <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-sky-400 to-blue-700" />
          </div>
        )}

        {/* MOBILE / TABLET */}
        <div className="flex flex-col lg:hidden p-6 gap-6">
          <div className="relative rounded-[28px] bg-white/80 p-6 shadow-sm overflow-hidden">
            <div className="absolute -bottom-24 right-[-40px] h-[240px] w-[240px] rounded-full bg-blue-100/80" />
            <div className="absolute top-10 right-8 grid grid-cols-5 gap-2 opacity-25">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
              ))}
            </div>

            <div className="relative z-10">
              <Link to="/" className="mb-10 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-blue-500 bg-white text-blue-700 shadow-sm">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Hospital San Rafael
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Plataforma Hospitalaria
                  </p>
                </div>
              </Link>

              <h1 className="mb-4 text-4xl font-black leading-tight text-slate-950">
                Bienvenido <span className="text-blue-600">de nuevo</span>
              </h1>

              <div className="mb-6 h-1.5 w-16 rounded-full bg-blue-500" />

              <p className="max-w-md text-sm leading-7 text-slate-600">
                Accede al sistema para consultar, gestionar y monitorear la
                infraestructura tecnológica del hospital.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-100 bg-white px-6 py-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="mb-5">
              <h1 className="mb-2 text-4xl font-black tracking-tight text-slate-950">
                Iniciar sesión
              </h1>
              <p className="text-sm text-slate-500">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            {success && (
              <div className="mb-3 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                <CheckCircle2 size={18} />
                Acceso validado. Redirigiendo...
              </div>
            )}

            {error && (
              <div className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-14 pr-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-14 pr-14 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-700 py-3.5 text-lg font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
              >
                <LogIn size={20} />
                {loading ? "Validando acceso..." : "Entrar al sistema"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-black text-slate-400">o</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              ¿No tienes cuenta?
            </p>

            <Link
              to="/register"
              className="mt-1.5 flex items-center justify-center gap-2 font-black text-blue-600 transition hover:text-blue-700"
            >
              Crear cuenta <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative hidden lg:block h-[620px]">
          {/* Panel completo izquierdo */}
          <div className="absolute inset-y-0 left-0 w-[72%] overflow-hidden bg-white/82 px-14 py-12">
            <div className="absolute bottom-[-150px] right-[40px] h-[460px] w-[460px] rounded-full bg-blue-100/85" />
            <div className="absolute bottom-[-65px] right-[170px] h-[240px] w-[240px] rounded-full bg-sky-100/75" />

            <div className="absolute right-28 top-20 grid grid-cols-5 gap-3 opacity-25">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
              ))}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Link to="/" className="mb-16 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-blue-500 bg-white text-blue-700 shadow-sm">
                    <Home size={28} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      Hospital San Rafael
                    </h2>
                    <p className="font-medium text-slate-500">
                      Plataforma Hospitalaria
                    </p>
                  </div>
                </Link>

                <div className="max-w-[470px]">
                  <h1 className="mb-5 text-5xl font-black leading-tight tracking-tight text-slate-950">
                    Bienvenido <span className="text-blue-600">de nuevo</span>
                  </h1>

                  <div className="mb-7 h-1.5 w-16 rounded-full bg-blue-500" />

                  <p className="text-base leading-8 text-slate-600">
                    Accede a la plataforma para gestionar dispositivos, métricas
                    y alertas críticas de la infraestructura tecnológica del
                    hospital.
                  </p>
                </div>
              </div>
              <div className="relative z-10 grid max-w-[500px] grid-cols-3 gap-8">
                {[
                  [ShieldCheck, "Seguridad", "Acceso protegido"],
                  [Activity, "Monitoreo", "Datos en tiempo real"],
                  [Bell, "Alertas", "Eventos críticos"],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-[0_10px_24px_rgba(15,23,42,0.10)]">
                      <Icon size={24} />
                    </div>

                    <h3 className="mb-1 text-[15px] font-black text-slate-950">
                      {title}
                    </h3>

                    <p className="text-sm leading-6 text-slate-500">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card flotante de login */}
          <div className="absolute right-10 top-1/2 z-20 w-[430px] -translate-y-1/2">
            <div className="rounded-[30px] border border-white/70 bg-white/96 px-9 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.16)] backdrop-blur-sm">
              <div className="mb-5">
                <h1 className="mb-2 text-4xl font-black tracking-tight text-slate-950">
                  Iniciar sesión
                </h1>

                <p className="text-sm text-slate-500">
                  Ingresa tus credenciales para continuar.
                </p>
              </div>

              {success && (
                <div className="mb-3 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                  <CheckCircle2 size={18} />
                  Acceso validado. Redirigiendo...
                </div>
              )}

              {error && (
                <div className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-14 pr-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-14 pr-14 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || success}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-700 py-3.5 text-lg font-black text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <LogIn size={20} />
                  {loading ? "Validando acceso..." : "Entrar al sistema"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm font-black text-slate-400">o</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-500">
                ¿No tienes cuenta?
              </p>

              <Link
                to="/register"
                className="mt-1.5 flex items-center justify-center gap-2 font-black text-blue-600 transition hover:text-blue-700"
              >
                Crear cuenta <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;