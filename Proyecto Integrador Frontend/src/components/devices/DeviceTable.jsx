import {
  Cpu,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

function DevicesTable({
  devices,
  admin,
  getTypeName,
  getStatusName,
  getLocationName,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Cpu size={20} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Dispositivos registrados
          </h2>

          <p className="text-sm text-slate-500">
            Listado general de equipos hospitalarios.
          </p>
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[900px]">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr>
              <th className="p-6 text-left">ID</th>
              <th className="p-6 text-left">Nombre</th>
              <th className="p-6 text-left">IP</th>
              <th className="p-6 text-left">Tipo</th>
              <th className="p-6 text-left">Estado</th>
              <th className="p-6 text-left">Ubicación</th>

              {admin && <th className="p-6 text-left">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td
                  colSpan={admin ? 7 : 6}
                  className="p-10 text-center text-slate-500"
                >
                  No hay dispositivos registrados.
                </td>
              </tr>
            ) : (
              devices.map((device) => (
                <tr
                  key={device.id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >
                  <td className="p-6">{device.id}</td>

                  <td className="p-6 font-black text-slate-800">
                    {device.name}
                  </td>

                  <td className="p-6">{device.ip_address || "Sin IP"}</td>

                  <td className="p-6">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                      {getTypeName(device)}
                    </span>
                  </td>

                  <td className="p-6">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                      {getStatusName(device)}
                    </span>
                  </td>

                  <td className="p-6">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      {getLocationName(device)}
                    </span>
                  </td>

                  {admin && (
                    <td className="flex gap-3 p-6">
                      <button
                        onClick={() => onEdit(device)}
                        className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                        Editar
                      </button>

                      <button
                        onClick={() => onDelete(device.id)}
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
  );
}

export default DevicesTable;