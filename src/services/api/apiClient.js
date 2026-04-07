import axios from 'axios';
import { API_BASE_URL } from '../../constants';

/**
 * Centralised Axios instance.
 * All API calls go through this client so base URL, headers,
 * timeouts and interceptors are configured in ONE place.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ??
      error.message ??
      'An unexpected error occurred';
    const status = error.response?.status ?? 0;
    return Promise.reject({ message, status, code: error.code });
  },
);

export default apiClient;
