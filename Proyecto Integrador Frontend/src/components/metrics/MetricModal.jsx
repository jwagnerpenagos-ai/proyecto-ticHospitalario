function MetricModal({
  showModal,
  editingMetric,
  form,
  setForm,
  devices,
  metricTypes,
  onClose,
  onSave,
}) {
  if (!showModal) return null;

  const missingData = devices.length === 0 || metricTypes.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">
              {editingMetric ? "Editar métrica" : "Nueva métrica"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Selecciona dispositivo, tipo de métrica y valor registrado.
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
            Antes de crear una métrica necesitas tener al menos un dispositivo y
            un tipo de métrica registrados.
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
                {device.name} {device.ip_address ? `- ${device.ip_address}` : ""}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.metric_type_id}
            onChange={(e) =>
              setForm({
                ...form,
                metric_type_id: e.target.value,
              })
            }
          >
            <option value="">Selecciona tipo de métrica</option>

            {metricTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} {type.unit ? `(${type.unit})` : ""}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-cyan-400"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={onSave}
          disabled={missingData}
          className="mt-8 w-full rounded-2xl bg-black py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {editingMetric ? "Guardar cambios" : "Crear métrica"}
        </button>
      </div>
    </div>
  );
}

export default MetricModal;