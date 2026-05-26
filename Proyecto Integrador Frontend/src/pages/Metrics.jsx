import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { isAdmin } from "../utils/auth";

import MetricCatalogs from "../components/metrics/MetricCatalogs";
import MetricsTable from "../components/metrics/MetricsTable";
import MetricModal from "../components/metrics/MetricModal";

function Metrics() {
  const admin = isAdmin();

  const [metrics, setMetrics] = useState([]);
  const [metricTypes, setMetricTypes] = useState([]);
  const [devices, setDevices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);

  const [form, setForm] = useState({
    device_id: "",
    metric_type_id: "",
    value: "",
  });

  const [typeForm, setTypeForm] = useState({
    name: "",
    unit: "",
    description: "",
  });

  const [editingType, setEditingType] = useState(null);

  const [editTypeForm, setEditTypeForm] = useState({
    name: "",
    unit: "",
    description: "",
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([loadMetrics(), loadMetricTypes(), loadDevices()]);
  };

  const loadMetrics = async () => {
    try {
      const response = await api.get("/metrics");
      setMetrics(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando métricas:", error);
      setMetrics([]);
    }
  };

  const loadMetricTypes = async () => {
    try {
      const response = await api.get("/metrics/types");
      setMetricTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando tipos de métricas:", error);
      setMetricTypes([]);
    }
  };

  const loadDevices = async () => {
    try {
      const response = await api.get("/devices");
      setDevices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando dispositivos:", error);
      setDevices([]);
    }
  };

  const openCreateModal = () => {
    setEditingMetric(null);

    setForm({
      device_id: "",
      metric_type_id: "",
      value: "",
    });

    setShowModal(true);
  };

  const openEditModal = (metric) => {
    setEditingMetric(metric);

    setForm({
      device_id: metric.device_id || "",
      metric_type_id: metric.metric_type_id || "",
      value: metric.value || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMetric(null);

    setForm({
      device_id: "",
      metric_type_id: "",
      value: "",
    });
  };

  const createMetricType = async () => {
    if (!typeForm.name.trim()) {
      alert("Escribe el nombre del tipo de métrica");
      return;
    }

    try {
      await api.post("/metrics/types", {
        name: typeForm.name.trim(),
        unit: typeForm.unit.trim(),
        description: typeForm.description.trim(),
      });

      setTypeForm({
        name: "",
        unit: "",
        description: "",
      });

      await loadMetricTypes();
    } catch (error) {
      console.error("Error creando tipo de métrica:", error);
      alert("No se pudo crear el tipo de métrica");
    }
  };

  const startEditMetricType = (type) => {
    setEditingType(type.id);

    setEditTypeForm({
      name: type.name || "",
      unit: type.unit || "",
      description: type.description || "",
    });
  };

  const cancelEditMetricType = () => {
    setEditingType(null);

    setEditTypeForm({
      name: "",
      unit: "",
      description: "",
    });
  };

  const updateMetricType = async (id) => {
    if (!editTypeForm.name.trim()) {
      alert("El nombre del tipo no puede estar vacío");
      return;
    }

    try {
      await api.put(`/metrics/types/${id}`, {
        name: editTypeForm.name.trim(),
        unit: editTypeForm.unit.trim(),
        description: editTypeForm.description.trim(),
      });

      setEditingType(null);

      setEditTypeForm({
        name: "",
        unit: "",
        description: "",
      });

      await loadMetricTypes();
      await loadMetrics();
    } catch (error) {
      console.error("Error actualizando tipo de métrica:", error);
      alert("No se pudo actualizar el tipo de métrica");
    }
  };

  const deleteMetricType = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este tipo de métrica?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/metrics/types/${id}`);

      await loadMetricTypes();
      await loadMetrics();
    } catch (error) {
      console.error("Error eliminando tipo de métrica:", error);
      alert(
        "No se pudo eliminar el tipo. Puede que esté asociado a una métrica."
      );
    }
  };

  const saveMetric = async () => {
    if (!form.device_id || !form.metric_type_id || form.value === "") {
      alert("Completa todos los campos de la métrica");
      return;
    }

    const payload = {
      device_id: Number(form.device_id),
      metric_type_id: Number(form.metric_type_id),
      value: Number(form.value),
    };

    try {
      if (editingMetric) {
        await api.put(`/metrics/${editingMetric.id}`, payload);
      } else {
        await api.post("/metrics", payload);
      }

      await loadMetrics();
      closeModal();
    } catch (error) {
      console.error("Error guardando métrica:", error);
      alert(
        editingMetric
          ? "No se pudo actualizar la métrica"
          : "No se pudo crear la métrica"
      );
    }
  };

  const deleteMetric = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta métrica?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/metrics/${id}`);
      await loadMetrics();
    } catch (error) {
      console.error("Error eliminando métrica:", error);
      alert("No se pudo eliminar la métrica");
    }
  };

  const getMetricTypeName = (metric) => {
    return (
      metric.metric_type?.name ||
      metricTypes.find((type) => type.id === metric.metric_type_id)?.name ||
      `ID ${metric.metric_type_id}`
    );
  };

  const getMetricTypeUnit = (metric) => {
    return (
      metric.metric_type?.unit ||
      metricTypes.find((type) => type.id === metric.metric_type_id)?.unit ||
      ""
    );
  };

  const getDeviceName = (metric) => {
    return (
      metric.device?.name ||
      devices.find((device) => device.id === metric.device_id)?.name ||
      `Device ${metric.device_id}`
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="mb-3 text-5xl font-black text-slate-900">
            Métricas
          </h1>

          <p className="text-slate-600">
            Monitoreo inteligente de métricas hospitalarias.
          </p>
        </div>

        {admin && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white shadow-lg transition hover:bg-slate-800"
          >
            <Plus size={20} />
            Nueva métrica
          </button>
        )}
      </div>

      {!admin && (
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 font-semibold text-cyan-800">
          Estás en modo consulta. Solo el administrador puede crear, editar o
          eliminar métricas.
        </div>
      )}

      {admin && (
        <MetricCatalogs
          metricTypes={metricTypes}
          typeForm={typeForm}
          setTypeForm={setTypeForm}
          editingType={editingType}
          editTypeForm={editTypeForm}
          setEditTypeForm={setEditTypeForm}
          createMetricType={createMetricType}
          startEditMetricType={startEditMetricType}
          cancelEditMetricType={cancelEditMetricType}
          updateMetricType={updateMetricType}
          deleteMetricType={deleteMetricType}
        />
      )}

      <MetricsTable
        metrics={metrics}
        admin={admin}
        getMetricTypeName={getMetricTypeName}
        getMetricTypeUnit={getMetricTypeUnit}
        getDeviceName={getDeviceName}
        onEdit={openEditModal}
        onDelete={deleteMetric}
      />

      <MetricModal
        showModal={showModal}
        editingMetric={editingMetric}
        form={form}
        setForm={setForm}
        devices={devices}
        metricTypes={metricTypes}
        onClose={closeModal}
        onSave={saveMetric}
      />
    </DashboardLayout>
  );
}

export default Metrics;