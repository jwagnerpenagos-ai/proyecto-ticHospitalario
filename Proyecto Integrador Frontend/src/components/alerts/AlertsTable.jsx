import {
  Bell,
  Cpu,
  Pencil,
  Trash2,
} from "lucide-react";

function AlertsTable({
  alerts,
  admin,
  getSeverityName,
  getStatusName,
  getDeviceName,
  getSeverityColor,
  getStatusColor,
  formatDate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Bell size={20} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Alertas registradas
          </h2>

          <p className="text-sm text-slate-500">
            Listado general de eventos reportados por los dispositivos.
          </p>
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[1150px]">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr>
              <th className="p-6 text-left">ID</th>
              <th className="p-6 text-left">Dispositivo</th>
              <th className="p-6 text-left">Severidad</th>
              <th className="p-6 text-left">Estado</th>
              <th className="p-6 text-left">Mensaje</th>
              <th className="p-6 text-left">Creada</th>
              <th className="p-6 text-left">Resuelta</th>

              {admin && <th className="p-6 text-left">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td
                  colSpan={admin ? 8 : 7}
                  className="p-10 text-center text-slate-500"
                >
                  No hay alertas registradas.
                </td>
              </tr>
            ) : (
              alerts.map((alert) => {
                const severityName = getSeverityName(alert);
                const statusName = getStatusName(alert);

                return (
                  <tr
                    key={alert.id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    <td className="p-6">{alert.id}</td>

                    <td className="p-6">
                      <span className="inline-flex items-center gap-2 font-bold text-slate-700">
                        <Cpu size={16} />
                        {getDeviceName(alert)}
                      </span>
                    </td>

                    <td className="p-6">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${getSeverityColor(
                          severityName
                        )}`}
                      >
                        {severityName}
                      </span>
                    </td>

                    <td className="p-6">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusColor(
                          statusName
                        )}`}
                      >
                        {statusName}
                      </span>
                    </td>

                    <td className="max-w-[320px] p-6 text-slate-600">
                      <p className="line-clamp-2">
                        {alert.message || "Sin mensaje"}
                      </p>
                    </td>

                    <td className="p-6 text-sm text-slate-500">
                      {formatDate(alert.triggered_at)}
                    </td>

                    <td className="p-6 text-sm text-slate-500">
                      {alert.resolved_at ? formatDate(alert.resolved_at) : "—"}
                    </td>

                    {admin && (
                      <td className="flex gap-3 p-6">
                        <button
                          onClick={() => onEdit(alert)}
                          className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                        >
                          <Pencil size={16} />
                          Editar
                        </button>

                        <button
                          onClick={() => onDelete(alert.id)}
                          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlertsTable;