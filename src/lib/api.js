const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export function getToken() {
  return localStorage.getItem('db_cms_token');
}

export function setToken(token) {
  if (token) localStorage.setItem('db_cms_token', token);
  else localStorage.removeItem('db_cms_token');
}

export async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'API request failed');
  return data;
}

export async function fetchPublic(path, fallback) {
  try {
    return await apiRequest(path);
  } catch {
    return fallback;
  }
}

export { API_BASE };
