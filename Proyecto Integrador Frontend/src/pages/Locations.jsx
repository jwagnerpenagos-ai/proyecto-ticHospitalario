import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
} from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { isAdmin } from "../utils/auth";

function Locations() {
  const admin = isAdmin();

  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  const [form, setForm] = useState({
    name: "",
    building: "",
    room: "",
    description: "",
  });

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await api.get("/locations");
      setLocations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando ubicaciones:", error);
      setLocations([]);
    }
  };

  const openCreateModal = () => {
    setEditingLocation(null);

    setForm({
      name: "",
      building: "",
      room: "",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (location) => {
    setEditingLocation(location);

    setForm({
      name: location.name || "",
      building: location.building || "",
      room: location.room || "",
      description: location.description || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLocation(null);

    setForm({
      name: "",
      building: "",
      room: "",
      description: "",
    });
  };

  const saveLocation = async () => {
    if (!form.name.trim()) {
      alert("El nombre de la ubicación es obligatorio");
      return;
    }

    const payload = {
      name: form.name.trim(),
      building: form.building.trim(),
      room: form.room.trim(),
      description: form.description.trim(),
    };

    try {
      if (editingLocation) {
        await api.put(`/locations/${editingLocation.id}`, payload);
      } else {
        await api.post("/locations", payload);
      }

      await loadLocations();
      closeModal();
    } catch (error) {
      console.error("Error guardando ubicación:", error);
      alert(
        editingLocation
          ? "No se pudo actualizar la ubicación"
          : "No se pudo crear la ubicación"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta ubicación?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/locations/${id}`);
      await loadLocations();
    } catch (error) {
      console.error("Error eliminando ubicación:", error);
      alert(
        "No se pudo eliminar la ubicación. Puede que esté asociada a un dispositivo."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="mb-3 text-5xl font-black text-slate-900">
            Ubicaciones
          </h1>

          <p className="text-slate-600">
            Gestión de ubicaciones hospitalarias.
          </p>
        </div>

        {admin && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white shadow-lg transition hover:bg-slate-800"
          >
            <Plus size={20} />
            Nueva ubicación
          </button>
        )}
      </div>

      {!admin && (
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 font-semibold text-cyan-800">
          Estás en modo consulta. Solo el administrador puede crear, editar o
          eliminar ubicaciones.
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">
              Ubicaciones registradas
            </h2>

            <p className="text-sm text-slate-500">
              Listado general de áreas físicas del hospital.
            </p>
          </div>
        </div>

        <div className="max-h-[520px] overflow-auto">
          <table className="w-full min-w-[950px]">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              <tr>
                <th className="p-6 text-left">ID</th>
                <th className="p-6 text-left">Nombre</th>
                <th className="p-6 text-left">Edificio</th>
                <th className="p-6 text-left">Sala</th>
                <th className="p-6 text-left">Descripción</th>

                {admin && <th className="p-6 text-left">Acciones</th>}
              </tr>
            </thead>

            <tbody>
              {locations.length === 0 ? (
                <tr>
                  <td
                    colSpan={admin ? 6 : 5}
                    className="p-10 text-center text-slate-500"
                  >
                    No hay ubicaciones registradas.
                  </td>
                </tr>
              ) : (
                locations.map((location) => (
                  <tr
                    key={location.id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    <td className="p-6">{location.id}</td>

                    <td className="p-6 font-black text-slate-800">
                      {location.name}
                    </td>

                    <td className="p-6">
                      {location.building || "N/A"}
                    </td>

                    <td className="p-6">
                      {location.room || "N/A"}
                    </td>

                    <td className="max-w-xs p-6 text-slate-600">
                      <p className="line-clamp-2">
                        {location.description || "Sin descripción"}
                      </p>
                    </td>

                    {admin && (
                      <td className="flex gap-3 p-6">
                        <button
                          onClick={() => openEditModal(location)}
                          className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                        >
                          <Pencil size={16} />
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(location.id)}
                          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && admin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black">
                  {editingLocation ? "Editar ubicación" : "Nueva ubicación"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Registra o actualiza un área física del hospital.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-2xl text-slate-500 transition hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Edificio"
                className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
                value={form.building}
                onChange={(e) =>
                  setForm({
                    ...form,
                    building: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Sala"
                className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
                value={form.room}
                onChange={(e) =>
                  setForm({
                    ...form,
                    room: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Descripción"
                rows="4"
                className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={saveLocation}
              className="mt-8 w-full rounded-2xl bg-black py-4 font-black text-white transition hover:bg-slate-800"
            >
              {editingLocation ? "Guardar cambios" : "Crear ubicación"}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Locations;