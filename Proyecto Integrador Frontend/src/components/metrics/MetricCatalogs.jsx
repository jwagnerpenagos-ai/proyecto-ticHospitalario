import {
  Tags,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

function MetricCatalogs({
  metricTypes,
  typeForm,
  setTypeForm,
  editingType,
  editTypeForm,
  setEditTypeForm,
  createMetricType,
  startEditMetricType,
  cancelEditMetricType,
  updateMetricType,
  deleteMetricType,
}) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900">
          Catálogo de tipos de métrica
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Crea tipos como CPU, RAM, temperatura, latencia o almacenamiento.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Tags size={20} />
          </div>

          <div>
            <h3 className="font-black text-slate-900">
              Tipos de métrica
            </h3>

            <p className="text-sm text-slate-500">
              Ej: CPU %, RAM %, Temperatura °C
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_140px_1.4fr_auto]">
          <input
            type="text"
            placeholder="Nombre del tipo"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
            value={typeForm.name}
            onChange={(e) =>
              setTypeForm({
                ...typeForm,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Unidad"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
            value={typeForm.unit}
            onChange={(e) =>
              setTypeForm({
                ...typeForm,
                unit: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Descripción"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
            value={typeForm.description}
            onChange={(e) =>
              setTypeForm({
                ...typeForm,
                description: e.target.value,
              })
            }
          />

          <button
            onClick={createMetricType}
            className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-blue-700"
          >
            Crear
          </button>
        </div>

        <div className="mt-4 max-h-52 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
          {metricTypes.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-500">
              No hay tipos de métrica creados.
            </p>
          ) : (
            <div className="space-y-2">
              {metricTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
                >
                  {editingType === type.id ? (
                    <div className="grid flex-1 grid-cols-1 gap-2 xl:grid-cols-[1fr_120px_1.4fr_auto_auto]">
                      <input
                        type="text"
                        value={editTypeForm.name}
                        onChange={(e) =>
                          setEditTypeForm({
                            ...editTypeForm,
                            name: e.target.value,
                          })
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                        autoFocus
                      />

                      <input
                        type="text"
                        value={editTypeForm.unit}
                        onChange={(e) =>
                          setEditTypeForm({
                            ...editTypeForm,
                            unit: e.target.value,
                          })
                        }
                        placeholder="Unidad"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />

                      <input
                        type="text"
                        value={editTypeForm.description}
                        onChange={(e) =>
                          setEditTypeForm({
                            ...editTypeForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Descripción"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />

                      <button
                        onClick={() => updateMetricType(type.id)}
                        className="rounded-xl bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                        title="Guardar"
                      >
                        <Save size={16} />
                      </button>

                      <button
                        onClick={cancelEditMetricType}
                        className="rounded-xl bg-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-300"
                        title="Cancelar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="font-black text-slate-800">
                          {type.name}
                          {type.unit ? (
                            <span className="ml-2 text-sm text-slate-500">
                              ({type.unit})
                            </span>
                          ) : null}
                        </p>

                        <p className="text-xs text-slate-400">
                          ID {type.id}
                        </p>

                        <p className="text-xs text-slate-500">
                          {type.description || "Sin descripción"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditMetricType(type)}
                          className="rounded-xl bg-blue-50 px-3 py-2 text-blue-600 transition hover:bg-blue-100"
                          title="Editar tipo"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteMetricType(type.id)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                          title="Eliminar tipo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MetricCatalogs;