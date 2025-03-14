import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const getFiles = async (id: number | undefined, search: string = "") => {
  if (id) {
    const response = await axios.get(`${API_BASE_URL}/files/${id}`);
    return response.data.data;
  } else {
    const response = await axios.get(`${API_BASE_URL}/files`, { params: { search } });
    return response.data.data;
  }
};

export const upsertFile = async (params: {
  name: string;
  type: "folder" | "file";
  parent_id?: number;
  size?: number
}) => {
  const response = await axios.post(`${API_BASE_URL}/files`, params);
  return response.data;
}

export const updateFile = async (id: number, params: {
  name: string;
}) => {
  const response = await axios.put(`${API_BASE_URL}/files/${id}`, params);
  return response.data;
}

export const destroyFile = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/files/${id}`);
  return response.data;
}
