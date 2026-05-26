import api from "../api/api";

export const getDevices = async () => {

  const response = await api.get("/devices");

  return response.data;

};

export const createDevice = async (data) => {

  const response = await api.post("/devices", data);

  return response.data;

};

export const updateDevice = async (id, data) => {

  const response = await api.put(`/devices/${id}`, data);

  return response.data;

};

export const deleteDevice = async (id) => {

  const response = await api.delete(`/devices/${id}`);

  return response.data;

};