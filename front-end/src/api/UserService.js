import axios from "axios";

const API_URL = "http://localhost";

export async function saveUser(user) {
  return await axios.post(`${API_URL}/create`, user);
}

export async function getUsers() {
  return await axios.get(`${API_URL}/users`);
}

export async function getUser(id) {
  return await axios.get(`${API_URL}/user?id=${id}`);
}

export async function editUser(user) {
  return await axios.post(`${API_URL}/edit`, user);
}

export async function deleteUser(id) {
  try {
    const response = await axios.get(`${API_URL}/delete`, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
