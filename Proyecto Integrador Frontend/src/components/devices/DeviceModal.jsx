function DeviceModal({
  showModal,
  editingDevice,
  form,
  setForm,
  deviceTypes,
  deviceStatuses,
  locations,
  onClose,
  onSave,
}) {
  if (!showModal) return null;

  const missingCatalogs =
    deviceTypes.length === 0 ||
    deviceStatuses.length === 0 ||
    locations.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">
              {editingDevice ? "Editar dispositivo" : "Nuevo dispositivo"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Selecciona tipo, estado y ubicación desde los catálogos.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-black"
          >
            ×
          </button>
        </div>

        {missingCatalogs && (
          <div className="mb-6 rounded-2xl border border-yellow-100 bg-yellow-50 px-5 py-4 text-yellow-800">
            Antes de crear un dispositivo necesitas tener al menos un tipo, un
            estado y una ubicación registrados.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            placeholder="IP"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.ip_address}
            onChange={(e) =>
              setForm({
                ...form,
                ip_address: e.target.value,
              })
            }
          />

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.device_type_id}
            onChange={(e) =>
              setForm({
                ...form,
                device_type_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona tipo</option>

            {deviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.device_status_id}
            onChange={(e) =>
              setForm({
                ...form,
                device_status_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona estado</option>

            {deviceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400 md:col-span-2"
            value={form.location_id}
            onChange={(e) =>
              setForm({
                ...form,
                location_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona ubicación</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}{" "}
                {location.room ? `- Sala ${location.room}` : ""}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSave}
          disabled={missingCatalogs}
          className="mt-8 w-full rounded-2xl bg-black py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {editingDevice ? "Guardar cambios" : "Crear dispositivo"}
        </button>
      </div>
    </div>
  );
}

export default DeviceModal;