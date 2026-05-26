import {
  Activity,
  Cpu,
  Pencil,
  Trash2,
} from "lucide-react";

function MetricsTable({
  metrics,
  admin,
  getMetricTypeName,
  getMetricTypeUnit,
  getDeviceName,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Activity size={20} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Métricas registradas
          </h2>

          <p className="text-sm text-slate-500">
            Listado general de mediciones por dispositivo.
          </p>
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto">
        <table className="w-full min-w-[850px]">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr>
              <th className="p-6 text-left">ID</th>
              <th className="p-6 text-left">Dispositivo</th>
              <th className="p-6 text-left">Tipo</th>
              <th className="p-6 text-left">Valor</th>

              {admin && <th className="p-6 text-left">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {metrics.length === 0 ? (
              <tr>
                <td
                  colSpan={admin ? 5 : 4}
                  className="p-10 text-center text-slate-500"
                >
                  No hay métricas registradas.
                </td>
              </tr>
            ) : (
              metrics.map((metric) => {
                const typeName = getMetricTypeName(metric);
                const unit = getMetricTypeUnit(metric);

                return (
                  <tr
                    key={metric.id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    <td className="p-6">{metric.id}</td>

                    <td className="p-6">
                      <span className="inline-flex items-center gap-2 font-bold text-slate-700">
                        <Cpu size={16} />
                        {getDeviceName(metric)}
                      </span>
                    </td>

                    <td className="p-6">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                        {typeName}
                      </span>
                    </td>

                    <td className="p-6 font-black text-slate-800">
                      {metric.value} {unit}
                    </td>

                    {admin && (
                      <td className="flex gap-3 p-6">
                        <button
                          onClick={() => onEdit(metric)}
                          className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                        >
                          <Pencil size={16} />
                          Editar
                        </button>

                        <button
                          onClick={() => onDelete(metric.id)}
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

export default MetricsTable;