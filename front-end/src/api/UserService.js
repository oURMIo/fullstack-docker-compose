import axios from "axios";
import Config from "../config/Config";

const API_URL = `http://${Config.host}:${Config.port}`;

export async function saveUser(user) {
  return await axios.post(`${API_URL}/api/user`, user);
}

export async function getUsers() {
  return await axios.get(`${API_URL}/api/user`);
}

export async function getUser(id) {
  return await axios.get(`${API_URL}/api/user/${id}`);
}

export async function editUser(id ,user) {
  return await axios.post(`${API_URL}/api/user/${id}`, user);
}

export async function deleteUser(id) {
  try {
    const response = await axios.delete(`${API_URL}/api/user/${id}`, {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
