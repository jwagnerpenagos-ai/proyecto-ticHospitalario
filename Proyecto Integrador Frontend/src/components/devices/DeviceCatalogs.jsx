import {
  Tags,
  Activity,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

function DeviceCatalogs({
  deviceTypes,
  deviceStatuses,
  typeForm,
  statusForm,
  setTypeForm,
  setStatusForm,
  createDeviceType,
  createDeviceStatus,
  deleteDeviceType,
  deleteDeviceStatus,
  editingType,
  editingStatus,
  editTypeName,
  editStatusName,
  setEditTypeName,
  setEditStatusName,
  startEditDeviceType,
  startEditDeviceStatus,
  cancelEditDeviceType,
  cancelEditDeviceStatus,
  updateDeviceType,
  updateDeviceStatus,
}) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900">
          Catálogos de dispositivos
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Administra los tipos y estados antes de registrar dispositivos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* TIPOS */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Tags size={20} />
            </div>

            <div>
              <h3 className="font-black text-slate-900">
                Tipos de dispositivo
              </h3>

              <p className="text-sm text-slate-500">
                Ej: Servidor, Router, Switch
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Nombre del tipo"
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={typeForm.name}
              onChange={(e) =>
                setTypeForm({
                  ...typeForm,
                  name: e.target.value,
                })
              }
            />

            <button
              onClick={createDeviceType}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-blue-700"
            >
              Crear
            </button>
          </div>

          <div className="mt-4 max-h-44 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
            {deviceTypes.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">
                No hay tipos creados.
              </p>
            ) : (
              <div className="space-y-2">
                {deviceTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    {editingType === type.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="text"
                          value={editTypeName}
                          onChange={(e) => setEditTypeName(e.target.value)}
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                          autoFocus
                        />

                        <button
                          onClick={() => updateDeviceType(type.id)}
                          className="rounded-xl bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                          title="Guardar"
                        >
                          <Save size={16} />
                        </button>

                        <button
                          onClick={cancelEditDeviceType}
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
                          </p>

                          <p className="text-xs text-slate-400">
                            ID {type.id}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditDeviceType(type)}
                            className="rounded-xl bg-blue-50 px-3 py-2 text-blue-600 transition hover:bg-blue-100"
                            title="Editar tipo"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteDeviceType(type.id)}
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

        {/* ESTADOS */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Activity size={20} />
            </div>

            <div>
              <h3 className="font-black text-slate-900">
                Estados de dispositivo
              </h3>

              <p className="text-sm text-slate-500">
                Ej: Activo, Inactivo, Mantenimiento
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Nombre del estado"
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
              value={statusForm.name}
              onChange={(e) =>
                setStatusForm({
                  ...statusForm,
                  name: e.target.value,
                })
              }
            />

            <button
              onClick={createDeviceStatus}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-blue-700"
            >
              Crear
            </button>
          </div>

          <div className="mt-4 max-h-44 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
            {deviceStatuses.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">
                No hay estados creados.
              </p>
            ) : (
              <div className="space-y-2">
                {deviceStatuses.map((status) => (
                  <div
                    key={status.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    {editingStatus === status.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="text"
                          value={editStatusName}
                          onChange={(e) => setEditStatusName(e.target.value)}
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                          autoFocus
                        />

                        <button
                          onClick={() => updateDeviceStatus(status.id)}
                          className="rounded-xl bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                          title="Guardar"
                        >
                          <Save size={16} />
                        </button>

                        <button
                          onClick={cancelEditDeviceStatus}
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
                            {status.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID {status.id}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditDeviceStatus(status)}
                            className="rounded-xl bg-blue-50 px-3 py-2 text-blue-600 transition hover:bg-blue-100"
                            title="Editar estado"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteDeviceStatus(status.id)}
                            className="rounded-xl bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                            title="Eliminar estado"
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
      </div>
    </section>
  );
}

export default DeviceCatalogs;