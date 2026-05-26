function AlertModal({
  showModal,
  editingAlert,
  form,
  setForm,
  devices,
  severities,
  statuses,
  onClose,
  onSave,
}) {
  if (!showModal) return null;

  const missingData =
    devices.length === 0 || severities.length === 0 || statuses.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">
              {editingAlert ? "Editar alerta" : "Nueva alerta"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Selecciona dispositivo, severidad, estado y mensaje.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-black"
          >
            ×
          </button>
        </div>

        {missingData && (
          <div className="mb-6 rounded-2xl border border-yellow-100 bg-yellow-50 px-5 py-4 text-yellow-800">
            Antes de crear una alerta necesitas tener al menos un dispositivo,
            una severidad y un estado registrados.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.device_id}
            onChange={(e) =>
              setForm({
                ...form,
                device_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona dispositivo</option>

            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}{" "}
                {device.ip_address ? `- ${device.ip_address}` : ""}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.severity_id}
            onChange={(e) =>
              setForm({
                ...form,
                severity_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona severidad</option>

            {severities.map((severity) => (
              <option key={severity.id} value={severity.id}>
                {severity.name}{" "}
                {severity.level ? `(Nivel ${severity.level})` : ""}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.alert_status_id}
            onChange={(e) =>
              setForm({
                ...form,
                alert_status_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona estado</option>

            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Mensaje de alerta"
            rows="4"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={onSave}
          disabled={missingData}
          className="mt-8 w-full rounded-2xl bg-black py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {editingAlert ? "Guardar cambios" : "Crear alerta"}
        </button>
      </div>
    </div>
  );
}

export default AlertModal;