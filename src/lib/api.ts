// src/lib/api.ts
import axios from 'axios';

// Cria uma instância do Axios com a URL base da sua API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor: Adiciona o token de autenticação a cada requisição
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- FUNÇÕES DE API ---

// VENDEDOR
export const login = (data) => apiClient.post('/login', data);
export const registerVendedor = (data) => apiClient.post('/vendedores', data);
export const activateVendedor = (data) => apiClient.post('/vendedores/activate', data);
export const logout = () => apiClient.post('/logout');

// PRODUTOS
export const getProducts = () => apiClient.get('/produtos');
export const createProduct = (data) => apiClient.post('/produtos', data);
export const updateProduct = (id, data) => apiClient.put(`/produtos/${id}`, data);
export const activateProduct = (id) => apiClient.post(`/produtos/${id}/ativar`);
export const deactivateProduct = (id) => apiClient.post(`/produtos/${id}/inativar`);

// VENDAS
export const createSale = (data) => apiClient.post('/vendas', data);

export default apiClient;