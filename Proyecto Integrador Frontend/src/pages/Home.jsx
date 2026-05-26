import { Link } from "react-router-dom";
import {
  Activity,
  Bell,
  Cpu,
  Database,
  MapPin,
  ShieldCheck,
  Server,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import hospitalImage from "../assets/SanRafael.png";
import logo from "../assets/logo_admin.png";

function Home() {
  const modules = [
    {
      title: "Autenticación",
      text: "Acceso seguro mediante JWT y control de sesión.",
      icon: ShieldCheck,
    },
    {
      title: "Dispositivos",
      text: "Gestión de equipos, servidores y recursos tecnológicos.",
      icon: Cpu,
    },
    {
      title: "Alertas",
      text: "Registro y seguimiento de eventos críticos.",
      icon: Bell,
    },
    {
      title: "Métricas",
      text: "Monitoreo de valores operativos de infraestructura.",
      icon: Activity,
    },
    {
      title: "Ubicaciones",
      text: "Organización física de áreas hospitalarias.",
      icon: MapPin,
    },
    {
      title: "Gateway",
      text: "Entrada centralizada hacia los microservicios.",
      icon: Server,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo Hospital"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h1 className="font-black text-lg tracking-tight">
                Hospital San Rafael
              </h1>
              <p className="text-sm text-slate-500">
                Monitoreo de Infraestructura TI
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-bold text-slate-500">
            <a href="#inicio" className="hover:text-cyan-600 transition">
              Inicio
            </a>
            <a href="#sistema" className="hover:text-cyan-600 transition">
              Sistema
            </a>
            <a href="#modulos" className="hover:text-cyan-600 transition">
              Módulos
            </a>
            <a href="#arquitectura" className="hover:text-cyan-600 transition">
              Arquitectura
            </a>
            <a href="#contacto" className="hover:text-cyan-600 transition">
              Contacto
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="hidden md:inline-flex px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 text-sm font-black hover:border-cyan-300 hover:text-cyan-700 transition"
            >
              Registrarse
            </Link>

            <Link
              to="/login"
              className="px-5 py-3 rounded-2xl bg-slate-950 text-white text-sm font-black hover:bg-cyan-600 transition"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </header>

      <section
        id="inicio"
        className="relative pt-20 bg-gradient-to-b from-white via-cyan-50/40 to-slate-50"
      >
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-100 bg-white shadow-sm mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-black text-slate-600">
                Infraestructura hospitalaria en monitoreo
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-8">
              Tecnología crítica bajo control para una atención continua.
            </h2>

            <p className="text-xl text-slate-600 leading-9 max-w-2xl mb-10">
              Plataforma centralizada para supervisar dispositivos, ubicaciones,
              métricas y alertas críticas del Hospital Universitario San Rafael
              de Tunja.
            </p>

            <div className="flex gap-4 flex-wrap mb-12">
              <Link
                to="/login"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition"
              >
                Entrar al sistema
                <ArrowRight
                  size={18}
                  className="inline ml-2 group-hover:translate-x-1 transition"
                />
              </Link>

              <a
                href="#sistema"
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 font-black text-slate-700 hover:border-cyan-300 hover:text-cyan-700 transition"
              >
                Conocer plataforma
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              {[
                ["24/7", "Monitoreo"],
                ["REST", "API Gateway"],
                ["JWT", "Seguridad"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-3xl font-black text-cyan-600">
                    {value}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[42px] bg-white p-3 border border-slate-200 shadow-xl">
              <img
                src={hospitalImage}
                alt="Hospital San Rafael"
                className="w-full h-[540px] object-cover rounded-[32px]"
              />
            </div>

            <div className="absolute -bottom-8 left-8 right-8 rounded-3xl bg-white border border-slate-200 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    Estado institucional
                  </p>
                  <h3 className="text-2xl font-black text-slate-950">
                    Infraestructura operativa
                  </h3>
                </div>

                <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sistema" className="max-w-7xl mx-auto px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-600 font-black mb-5">
              Acerca del sistema
            </p>

            <h2 className="text-5xl font-black tracking-tight leading-tight mb-7">
              Una solución moderna para infraestructura TI hospitalaria.
            </h2>

            <p className="text-lg text-slate-600 leading-9">
              El sistema permite centralizar recursos tecnológicos, consultar
              información crítica y monitorear eventos relevantes para mantener
              la operación hospitalaria con mayor visibilidad y control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "Gestión de dispositivos",
              "Control de ubicaciones",
              "Registro de métricas",
              "Seguimiento de alertas",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm"
              >
                <CheckCircle2 className="text-cyan-600 mb-5" />
                <h3 className="font-black text-lg">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modulos" className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-28">
          <div className="mb-14">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-600 font-black mb-5">
              Módulos principales
            </p>

            <h2 className="text-5xl font-black tracking-tight">
              Gestión centralizada y segura.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <div
                  key={module.title}
                  className="group rounded-[30px] border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-7 group-hover:bg-cyan-600 group-hover:text-white transition">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    {module.title}
                  </h3>

                  <p className="text-slate-600 leading-7">
                    {module.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="arquitectura" className="max-w-7xl mx-auto px-8 py-28">
        <div className="rounded-[42px] bg-slate-950 text-white p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 text-sm font-black mb-6">
                Arquitectura
              </p>

              <h2 className="text-5xl font-black leading-tight mb-8">
                Backend dockerizado con gateway y microservicios.
              </h2>

              <p className="text-slate-300 leading-9 text-lg">
                La aplicación funciona mediante servicios independientes
                conectados por un API Gateway, con base de datos PostgreSQL y
                autenticación segura mediante tokens JWT.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                ["React", "Frontend desacoplado"],
                ["Flask", "Microservicios"],
                ["Docker", "Ejecución unificada"],
                ["PostgreSQL", "Persistencia"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7"
                >
                  <Database className="text-cyan-300 mb-5" />
                  <h3 className="text-2xl font-black mb-2">{title}</h3>
                  <p className="text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Logo Hospital"
                className="w-12 h-12 object-contain"
              />
              <h3 className="font-black text-lg">Hospital San Rafael</h3>
            </div>

            <p className="text-slate-500 leading-7">
              Sistema de Monitoreo de Infraestructura TI.
            </p>
          </div>

          <div>
            <h4 className="font-black mb-4">Proyecto</h4>
            <p className="text-slate-500">Proyecto Integrador 2026-1</p>
            <p className="text-slate-500">Microservicios + React + Docker</p>
          </div>

          <div>
            <h4 className="font-black mb-4">Ubicación</h4>
            <p className="text-slate-500">Tunja, Boyacá</p>
            <p className="text-slate-500">
              Hospital Universitario San Rafael
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;