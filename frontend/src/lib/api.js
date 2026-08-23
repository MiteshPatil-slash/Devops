const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('ai_deploy_token');
}

export function setToken(token) {
  localStorage.setItem('ai_deploy_token', token);
}

export function clearToken() {
  localStorage.removeItem('ai_deploy_token');
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload, auth: false }),
  verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: payload, auth: false }),
  resendOtp: (payload) => request('/auth/resend-otp', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, auth: false }),
  me: () => request('/auth/me'),
  githubLoginUrl: () => `${API_BASE}/auth/github`,

  generate: (prompt) => request('/generate', { method: 'POST', body: { prompt } }),
  listProjects: () => request('/generate'),
  getProject: (id) => request(`/generate/${id}`),
  deleteProject: (id) => request(`/generate/${id}`, { method: 'DELETE' }),
};
