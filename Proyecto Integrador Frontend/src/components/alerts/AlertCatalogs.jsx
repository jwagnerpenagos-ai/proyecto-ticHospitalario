import {
  AlertTriangle,
  Activity,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

function AlertCatalogs({
  severities,
  statuses,

  severityForm,
  statusForm,
  setSeverityForm,
  setStatusForm,

  editingSeverity,
  editingStatus,

  editSeverityForm,
  editStatusForm,
  setEditSeverityForm,
  setEditStatusForm,

  createSeverity,
  createStatus,

  startEditSeverity,
  startEditStatus,

  cancelEditSeverity,
  cancelEditStatus,

  updateSeverity,
  updateStatus,

  deleteSeverity,
  deleteStatus,
}) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-7">
        <h2 className="text-2xl font-black text-slate-900">
          Catálogos de alertas
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Administra severidades y estados antes de registrar alertas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        {/* SEVERIDADES */}
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertTriangle size={21} />
            </div>

            <div>
              <h3 className="font-black text-slate-900">Severidades</h3>
              <p className="text-sm text-slate-500">
                Ej: Baja, Media, Alta, Crítica
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_110px]">
            <input
              type="text"
              placeholder="Nombre"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={severityForm.name}
              onChange={(e) =>
                setSeverityForm({
                  ...severityForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              min="1"
              placeholder="Nivel"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={severityForm.level}
              onChange={(e) =>
                setSeverityForm({
                  ...severityForm,
                  level: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Descripción"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400 lg:col-span-2"
              value={severityForm.description}
              onChange={(e) =>
                setSeverityForm({
                  ...severityForm,
                  description: e.target.value,
                })
              }
            />

            <button
              onClick={createSeverity}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-blue-700 lg:col-span-2"
            >
              Crear severidad
            </button>
          </div>

          <div className="mt-5 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
            {severities.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No hay severidades creadas.
              </p>
            ) : (
              <div className="space-y-2">
                {severities.map((severity) => (
                  <div
                    key={severity.id}
                    className="rounded-xl bg-slate-50 px-4 py-3"
                  >
                    {editingSeverity === severity.id ? (
                      <div className="grid grid-cols-1 gap-2">
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_110px]">
                          <input
                            type="text"
                            value={editSeverityForm.name}
                            onChange={(e) =>
                              setEditSeverityForm({
                                ...editSeverityForm,
                                name: e.target.value,
                              })
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                            autoFocus
                          />

                          <input
                            type="number"
                            min="1"
                            value={editSeverityForm.level}
                            onChange={(e) =>
                              setEditSeverityForm({
                                ...editSeverityForm,
                                level: e.target.value,
                              })
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                          />
                        </div>

                        <input
                          type="text"
                          value={editSeverityForm.description}
                          onChange={(e) =>
                            setEditSeverityForm({
                              ...editSeverityForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descripción"
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateSeverity(severity.id)}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-black text-white transition hover:bg-blue-700"
                          >
                            <Save size={15} />
                            Guardar
                          </button>

                          <button
                            onClick={cancelEditSeverity}
                            className="flex items-center gap-2 rounded-xl bg-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300"
                          >
                            <X size={15} />
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-black text-slate-800">
                            {severity.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            Nivel {severity.level ?? "N/A"} · ID {severity.id}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            {severity.description || "Sin descripción"}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            onClick={() => startEditSeverity(severity)}
                            className="rounded-xl bg-blue-50 px-3 py-2 text-blue-600 transition hover:bg-blue-100"
                            title="Editar severidad"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteSeverity(severity.id)}
                            className="rounded-xl bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                            title="Eliminar severidad"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ESTADOS */}
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Activity size={21} />
            </div>

            <div>
              <h3 className="font-black text-slate-900">Estados de alerta</h3>
              <p className="text-sm text-slate-500">
                Ej: Abierta, En revisión, Resuelta
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Nombre"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={statusForm.name}
              onChange={(e) =>
                setStatusForm({
                  ...statusForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Descripción"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={statusForm.description}
              onChange={(e) =>
                setStatusForm({
                  ...statusForm,
                  description: e.target.value,
                })
              }
            />

            <button
              onClick={createStatus}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-blue-700"
            >
              Crear estado
            </button>
          </div>

          <div className="mt-5 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
            {statuses.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No hay estados creados.
              </p>
            ) : (
              <div className="space-y-2">
                {statuses.map((status) => (
                  <div
                    key={status.id}
                    className="rounded-xl bg-slate-50 px-4 py-3"
                  >
                    {editingStatus === status.id ? (
                      <div className="grid grid-cols-1 gap-2">
                        <input
                          type="text"
                          value={editStatusForm.name}
                          onChange={(e) =>
                            setEditStatusForm({
                              ...editStatusForm,
                              name: e.target.value,
                            })
                          }
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                          autoFocus
                        />

                        <input
                          type="text"
                          value={editStatusForm.description}
                          onChange={(e) =>
                            setEditStatusForm({
                              ...editStatusForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descripción"
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(status.id)}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-black text-white transition hover:bg-blue-700"
                          >
                            <Save size={15} />
                            Guardar
                          </button>

                          <button
                            onClick={cancelEditStatus}
                            className="flex items-center gap-2 rounded-xl bg-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300"
                          >
                            <X size={15} />
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-black text-slate-800">
                            {status.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID {status.id}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            {status.description || "Sin descripción"}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            onClick={() => startEditStatus(status)}
                            className="rounded-xl bg-blue-50 px-3 py-2 text-blue-600 transition hover:bg-blue-100"
                            title="Editar estado"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteStatus(status.id)}
                            className="rounded-xl bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                            title="Eliminar estado"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlertCatalogs;