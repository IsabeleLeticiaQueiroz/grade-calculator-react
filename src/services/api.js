import axios from "axios";

const API_URL = "https://grade-calculator-api-z8km.onrender.com";

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // retorna a lista de usuários
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.response || error.message);
    throw error;
  }
};
