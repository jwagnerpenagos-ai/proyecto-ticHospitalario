import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { isAdmin } from "../utils/auth";

import AlertCatalogs from "../components/alerts/AlertCatalogs";
import AlertsTable from "../components/alerts/AlertsTable";
import AlertModal from "../components/alerts/AlertModal";

function Alerts() {
  const admin = isAdmin();

  const [alerts, setAlerts] = useState([]);
  const [severities, setSeverities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [devices, setDevices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  const [form, setForm] = useState({
    device_id: "",
    severity_id: "",
    alert_status_id: "",
    message: "",
  });

  const [severityForm, setSeverityForm] = useState({
    name: "",
    level: "",
    description: "",
  });

  const [statusForm, setStatusForm] = useState({
    name: "",
    description: "",
  });

  const [editingSeverity, setEditingSeverity] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);

  const [editSeverityForm, setEditSeverityForm] = useState({
    name: "",
    level: "",
    description: "",
  });

  const [editStatusForm, setEditStatusForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadAlerts(),
      loadSeverities(),
      loadStatuses(),
      loadDevices(),
    ]);
  };

  const loadAlerts = async () => {
    try {
      const response = await api.get("/alerts");
      setAlerts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando alertas:", error);
      setAlerts([]);
    }
  };

  const loadSeverities = async () => {
    try {
      const response = await api.get("/alerts/severities");
      setSeverities(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando severidades:", error);
      setSeverities([]);
    }
  };

  const loadStatuses = async () => {
    try {
      const response = await api.get("/alerts/statuses");
      setStatuses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando estados:", error);
      setStatuses([]);
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
    setEditingAlert(null);

    setForm({
      device_id: "",
      severity_id: "",
      alert_status_id: "",
      message: "",
    });

    setShowModal(true);
  };

  const openEditModal = (alert) => {
    setEditingAlert(alert);

    setForm({
      device_id: alert.device_id || "",
      severity_id: alert.severity_id || "",
      alert_status_id: alert.alert_status_id || "",
      message: alert.message || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAlert(null);

    setForm({
      device_id: "",
      severity_id: "",
      alert_status_id: "",
      message: "",
    });
  };

  const createSeverity = async () => {
    if (
      !severityForm.name.trim() ||
      !severityForm.level ||
      !severityForm.description.trim()
    ) {
      alert("Completa nombre, nivel y descripción de la severidad");
      return;
    }

    try {
      await api.post("/alerts/severities", {
        name: severityForm.name.trim(),
        level: Number(severityForm.level),
        description: severityForm.description.trim(),
      });

      setSeverityForm({
        name: "",
        level: "",
        description: "",
      });

      await loadSeverities();
    } catch (error) {
      console.error("Error creando severidad:", error);
      alert("No se pudo crear la severidad");
    }
  };

  const createStatus = async () => {
    if (!statusForm.name.trim() || !statusForm.description.trim()) {
      alert("Completa nombre y descripción del estado");
      return;
    }

    try {
      await api.post("/alerts/statuses", {
        name: statusForm.name.trim(),
        description: statusForm.description.trim(),
      });

      setStatusForm({
        name: "",
        description: "",
      });

      await loadStatuses();
    } catch (error) {
      console.error("Error creando estado:", error);
      alert("No se pudo crear el estado");
    }
  };

  const startEditSeverity = (severity) => {
    setEditingSeverity(severity.id);

    setEditSeverityForm({
      name: severity.name || "",
      level: severity.level || "",
      description: severity.description || "",
    });
  };

  const cancelEditSeverity = () => {
    setEditingSeverity(null);

    setEditSeverityForm({
      name: "",
      level: "",
      description: "",
    });
  };

  const updateSeverity = async (id) => {
    if (
      !editSeverityForm.name.trim() ||
      !editSeverityForm.level ||
      !editSeverityForm.description.trim()
    ) {
      alert("Completa nombre, nivel y descripción de la severidad");
      return;
    }

    try {
      await api.put(`/alerts/severities/${id}`, {
        name: editSeverityForm.name.trim(),
        level: Number(editSeverityForm.level),
        description: editSeverityForm.description.trim(),
      });

      setEditingSeverity(null);

      setEditSeverityForm({
        name: "",
        level: "",
        description: "",
      });

      await loadSeverities();
      await loadAlerts();
    } catch (error) {
      console.error("Error actualizando severidad:", error);
      alert("No se pudo actualizar la severidad");
    }
  };

  const startEditStatus = (status) => {
    setEditingStatus(status.id);

    setEditStatusForm({
      name: status.name || "",
      description: status.description || "",
    });
  };

  const cancelEditStatus = () => {
    setEditingStatus(null);

    setEditStatusForm({
      name: "",
      description: "",
    });
  };

  const updateStatus = async (id) => {
    if (!editStatusForm.name.trim() || !editStatusForm.description.trim()) {
      alert("Completa nombre y descripción del estado");
      return;
    }

    try {
      await api.put(`/alerts/statuses/${id}`, {
        name: editStatusForm.name.trim(),
        description: editStatusForm.description.trim(),
      });

      setEditingStatus(null);

      setEditStatusForm({
        name: "",
        description: "",
      });

      await loadStatuses();
      await loadAlerts();
    } catch (error) {
      console.error("Error actualizando estado:", error);
      alert("No se pudo actualizar el estado");
    }
  };

  const deleteSeverity = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta severidad?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/alerts/severities/${id}`);

      await loadSeverities();
      await loadAlerts();
    } catch (error) {
      console.error("Error eliminando severidad:", error);
      alert(
        "No se pudo eliminar la severidad. Puede que esté asociada a una alerta."
      );
    }
  };

  const deleteStatus = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este estado de alerta?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/alerts/statuses/${id}`);

      await loadStatuses();
      await loadAlerts();
    } catch (error) {
      console.error("Error eliminando estado:", error);
      alert(
        "No se pudo eliminar el estado. Puede que esté asociado a una alerta."
      );
    }
  };

  const saveAlert = async () => {
    if (
      !form.device_id ||
      !form.severity_id ||
      !form.alert_status_id ||
      !form.message.trim()
    ) {
      alert("Completa todos los campos de la alerta");
      return;
    }

    const payload = {
      device_id: Number(form.device_id),
      severity_id: Number(form.severity_id),
      alert_status_id: Number(form.alert_status_id),
      message: form.message.trim(),
    };

    try {
      if (editingAlert) {
        await api.put(`/alerts/${editingAlert.id}`, payload);
      } else {
        await api.post("/alerts", payload);
      }

      await loadAlerts();
      closeModal();
    } catch (error) {
      console.error("Error guardando alerta:", error);
      alert(
        editingAlert
          ? "No se pudo actualizar la alerta"
          : "No se pudo crear la alerta"
      );
    }
  };

  const deleteAlert = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta alerta?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/alerts/${id}`);
      await loadAlerts();
    } catch (error) {
      console.error("Error eliminando alerta:", error);
      alert("No se pudo eliminar la alerta");
    }
  };

  const getSeverityName = (alert) => {
    return (
      alert.severity?.name ||
      severities.find((severity) => severity.id === alert.severity_id)?.name ||
      `ID ${alert.severity_id}`
    );
  };

  const getStatusName = (alert) => {
    return (
      alert.alert_status?.name ||
      alert.status?.name ||
      statuses.find((status) => status.id === alert.alert_status_id)?.name ||
      `ID ${alert.alert_status_id}`
    );
  };

  const getDeviceName = (alert) => {
    return (
      alert.device?.name ||
      devices.find((device) => device.id === alert.device_id)?.name ||
      `Device ${alert.device_id}`
    );
  };

  const getSeverityColor = (severity) => {
    const value = String(severity || "").toLowerCase();

    if (
      value.includes("crítica") ||
      value.includes("critica") ||
      value.includes("alta")
    ) {
      return "bg-red-100 text-red-600";
    }

    if (value.includes("media") || value.includes("moderada")) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-blue-100 text-blue-600";
  };

  const getStatusColor = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value.includes("abierta") ||
      value.includes("open") ||
      value.includes("pendiente")
    ) {
      return "bg-red-100 text-red-600";
    }

    if (
      value.includes("resuelta") ||
      value.includes("resuelto") ||
      value.includes("resolved") ||
      value.includes("cerrada")
    ) {
      return "bg-green-100 text-green-600";
    }

    return "bg-slate-100 text-slate-600";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="mb-3 text-5xl font-black text-slate-900">
            Alertas
          </h1>

          <p className="text-slate-600">
            Gestión inteligente de alertas hospitalarias.
          </p>
        </div>

        {admin && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white shadow-lg transition hover:bg-slate-800"
          >
            <Plus size={20} />
            Nueva alerta
          </button>
        )}
      </div>

      {!admin && (
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 font-semibold text-cyan-800">
          Estás en modo consulta. Solo el administrador puede crear, editar o
          eliminar alertas.
        </div>
      )}

      {admin && (
        <AlertCatalogs
          severities={severities}
          statuses={statuses}
          severityForm={severityForm}
          statusForm={statusForm}
          setSeverityForm={setSeverityForm}
          setStatusForm={setStatusForm}
          editingSeverity={editingSeverity}
          editingStatus={editingStatus}
          editSeverityForm={editSeverityForm}
          editStatusForm={editStatusForm}
          setEditSeverityForm={setEditSeverityForm}
          setEditStatusForm={setEditStatusForm}
          createSeverity={createSeverity}
          createStatus={createStatus}
          startEditSeverity={startEditSeverity}
          startEditStatus={startEditStatus}
          cancelEditSeverity={cancelEditSeverity}
          cancelEditStatus={cancelEditStatus}
          updateSeverity={updateSeverity}
          updateStatus={updateStatus}
          deleteSeverity={deleteSeverity}
          deleteStatus={deleteStatus}
        />
      )}

      <AlertsTable
        alerts={alerts}
        admin={admin}
        getSeverityName={getSeverityName}
        getStatusName={getStatusName}
        getDeviceName={getDeviceName}
        getSeverityColor={getSeverityColor}
        getStatusColor={getStatusColor}
        formatDate={formatDate}
        onEdit={openEditModal}
        onDelete={deleteAlert}
      />

      <AlertModal
        showModal={showModal}
        editingAlert={editingAlert}
        form={form}
        setForm={setForm}
        devices={devices}
        severities={severities}
        statuses={statuses}
        onClose={closeModal}
        onSave={saveAlert}
      />
    </DashboardLayout>
  );
}

export default Alerts;