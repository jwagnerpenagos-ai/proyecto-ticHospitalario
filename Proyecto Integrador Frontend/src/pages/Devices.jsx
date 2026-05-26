import { useEffect, useState } from "react";

import {
  Plus,
} from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { isAdmin } from "../utils/auth";

import DeviceCatalogs from "../components/devices/DeviceCatalogs";
import DevicesTable from "../components/devices/DeviceTable";
import DeviceModal from "../components/devices/DeviceModal";

function Devices() {
  const admin = isAdmin();

  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceStatuses, setDeviceStatuses] = useState([]);
  const [locations, setLocations] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const [form, setForm] = useState({
    name: "",
    ip_address: "",
    device_type_id: "",
    device_status_id: "",
    location_id: "",
  });

  const [typeForm, setTypeForm] = useState({
    name: "",
  });

  const [statusForm, setStatusForm] = useState({
    name: "",
  });

  const [editingType, setEditingType] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);

  const [editTypeName, setEditTypeName] = useState("");
  const [editStatusName, setEditStatusName] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadDevices(),
      loadDeviceTypes(),
      loadDeviceStatuses(),
      loadLocations(),
    ]);
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

  const loadDeviceTypes = async () => {
    try {
      const response = await api.get("/devices/types");
      setDeviceTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando tipos de dispositivos:", error);
      setDeviceTypes([]);
    }
  };

  const loadDeviceStatuses = async () => {
    try {
      const response = await api.get("/devices/statuses");
      setDeviceStatuses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando estados de dispositivos:", error);
      setDeviceStatuses([]);
    }
  };

  const loadLocations = async () => {
    try {
      const response = await api.get("/locations");
      setLocations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error cargando ubicaciones:", error);
      setLocations([]);
    }
  };

  const openCreateModal = () => {
    setEditingDevice(null);

    setForm({
      name: "",
      ip_address: "",
      device_type_id: "",
      device_status_id: "",
      location_id: "",
    });

    setShowModal(true);
  };

  const openEditModal = (device) => {
    setEditingDevice(device);

    setForm({
      name: device.name || "",
      ip_address: device.ip_address || "",
      device_type_id: device.device_type_id || "",
      device_status_id: device.device_status_id || "",
      location_id: device.location_id || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDevice(null);

    setForm({
      name: "",
      ip_address: "",
      device_type_id: "",
      device_status_id: "",
      location_id: "",
    });
  };

  const saveDevice = async () => {
    if (
      !form.name ||
      !form.ip_address ||
      !form.device_type_id ||
      !form.device_status_id ||
      !form.location_id
    ) {
      alert("Completa todos los campos del dispositivo");
      return;
    }

    const payload = {
      name: form.name,
      ip_address: form.ip_address,
      device_type_id: Number(form.device_type_id),
      device_status_id: Number(form.device_status_id),
      location_id: Number(form.location_id),
    };

    try {
      if (editingDevice) {
        await api.put(`/devices/${editingDevice.id}`, payload);
      } else {
        await api.post("/devices", payload);
      }

      await loadDevices();
      closeModal();
    } catch (error) {
      console.error("Error guardando dispositivo:", error);
      alert(
        editingDevice
          ? "No se pudo actualizar el dispositivo"
          : "No se pudo crear el dispositivo"
      );
    }
  };

  const deleteDevice = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este dispositivo?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/devices/${id}`);
      await loadDevices();
    } catch (error) {
      console.error("Error eliminando dispositivo:", error);
      alert("No se pudo eliminar el dispositivo");
    }
  };

  const createDeviceType = async () => {
    if (!typeForm.name.trim()) {
      alert("Escribe el nombre del tipo de dispositivo");
      return;
    }

    try {
      await api.post("/devices/types", {
        name: typeForm.name.trim(),
      });

      setTypeForm({
        name: "",
      });

      await loadDeviceTypes();
    } catch (error) {
      console.error("Error creando tipo de dispositivo:", error);
      alert("No se pudo crear el tipo de dispositivo");
    }
  };

  const createDeviceStatus = async () => {
    if (!statusForm.name.trim()) {
      alert("Escribe el nombre del estado de dispositivo");
      return;
    }

    try {
      await api.post("/devices/statuses", {
        name: statusForm.name.trim(),
      });

      setStatusForm({
        name: "",
      });

      await loadDeviceStatuses();
    } catch (error) {
      console.error("Error creando estado de dispositivo:", error);
      alert("No se pudo crear el estado de dispositivo");
    }
  };

  const deleteDeviceType = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este tipo de dispositivo?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/devices/types/${id}`);
      await loadDeviceTypes();
      await loadDevices();
    } catch (error) {
      console.error("Error eliminando tipo de dispositivo:", error);
      alert(
        "No se pudo eliminar el tipo. Puede que esté asociado a un dispositivo."
      );
    }
  };

  const deleteDeviceStatus = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este estado de dispositivo?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/devices/statuses/${id}`);
      await loadDeviceStatuses();
      await loadDevices();
    } catch (error) {
      console.error("Error eliminando estado de dispositivo:", error);
      alert(
        "No se pudo eliminar el estado. Puede que esté asociado a un dispositivo."
      );
    }
  };

  const startEditDeviceType = (type) => {
    setEditingType(type.id);
    setEditTypeName(type.name);
  };

  const cancelEditDeviceType = () => {
    setEditingType(null);
    setEditTypeName("");
  };

  const updateDeviceType = async (id) => {
    if (!editTypeName.trim()) {
      alert("El nombre del tipo no puede estar vacío");
      return;
    }

    try {
      await api.put(`/devices/types/${id}`, {
        name: editTypeName.trim(),
      });

      setEditingType(null);
      setEditTypeName("");

      await loadDeviceTypes();
      await loadDevices();
    } catch (error) {
      console.error("Error actualizando tipo de dispositivo:", error);
      alert("No se pudo actualizar el tipo de dispositivo");
    }
  };

  const startEditDeviceStatus = (status) => {
    setEditingStatus(status.id);
    setEditStatusName(status.name);
  };

  const cancelEditDeviceStatus = () => {
    setEditingStatus(null);
    setEditStatusName("");
  };

  const updateDeviceStatus = async (id) => {
    if (!editStatusName.trim()) {
      alert("El nombre del estado no puede estar vacío");
      return;
    }

    try {
      await api.put(`/devices/statuses/${id}`, {
        name: editStatusName.trim(),
      });

      setEditingStatus(null);
      setEditStatusName("");

      await loadDeviceStatuses();
      await loadDevices();
    } catch (error) {
      console.error("Error actualizando estado de dispositivo:", error);
      alert("No se pudo actualizar el estado de dispositivo");
    }
  };

  const getTypeName = (device) => {
    return (
      device.device_type?.name ||
      device.type?.name ||
      deviceTypes.find((type) => type.id === device.device_type_id)?.name ||
      `ID ${device.device_type_id}`
    );
  };

  const getStatusName = (device) => {
    return (
      device.device_status?.name ||
      device.status?.name ||
      deviceStatuses.find((status) => status.id === device.device_status_id)
        ?.name ||
      `ID ${device.device_status_id}`
    );
  };

  const getLocationName = (device) => {
    return (
      device.location?.name ||
      locations.find((location) => location.id === device.location_id)?.name ||
      `ID ${device.location_id}`
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="mb-3 text-5xl font-black text-slate-900">
            Dispositivos
          </h1>

          <p className="text-slate-600">
            Gestión inteligente de dispositivos hospitalarios.
          </p>
        </div>

        {admin && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white shadow-lg transition hover:bg-slate-800"
          >
            <Plus size={20} />
            Nuevo dispositivo
          </button>
        )}
      </div>

      {!admin && (
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 font-semibold text-cyan-800">
          Estás en modo consulta. Solo el administrador puede crear, editar o
          eliminar dispositivos.
        </div>
      )}

      {admin && (
        <DeviceCatalogs
          deviceTypes={deviceTypes}
          deviceStatuses={deviceStatuses}
          typeForm={typeForm}
          statusForm={statusForm}
          setTypeForm={setTypeForm}
          setStatusForm={setStatusForm}
          createDeviceType={createDeviceType}
          createDeviceStatus={createDeviceStatus}
          deleteDeviceType={deleteDeviceType}
          deleteDeviceStatus={deleteDeviceStatus}
          editingType={editingType}
          editingStatus={editingStatus}
          editTypeName={editTypeName}
          editStatusName={editStatusName}
          setEditTypeName={setEditTypeName}
          setEditStatusName={setEditStatusName}
          startEditDeviceType={startEditDeviceType}
          startEditDeviceStatus={startEditDeviceStatus}
          cancelEditDeviceType={cancelEditDeviceType}
          cancelEditDeviceStatus={cancelEditDeviceStatus}
          updateDeviceType={updateDeviceType}
          updateDeviceStatus={updateDeviceStatus}
        />
      )}

      <DevicesTable
        devices={devices}
        admin={admin}
        getTypeName={getTypeName}
        getStatusName={getStatusName}
        getLocationName={getLocationName}
        onEdit={openEditModal}
        onDelete={deleteDevice}
      />

      <DeviceModal
        showModal={showModal}
        editingDevice={editingDevice}
        form={form}
        setForm={setForm}
        deviceTypes={deviceTypes}
        deviceStatuses={deviceStatuses}
        locations={locations}
        onClose={closeModal}
        onSave={saveDevice}
      />
    </DashboardLayout>
  );
}

export default Devices;