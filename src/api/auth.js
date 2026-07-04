const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export async function signup({ employee_id, email, password, role }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id, email, password, role }),
  });
  return handleResponse(res);
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function verifyEmail(token) {
  const res = await fetch(`${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: "GET",
  });
  return handleResponse(res);
}

export async function resendVerification(email) {
  const res = await fetch(`${API_URL}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}

export async function fetchMe(token) {
  const res = await fetch(`${API_URL}/dashboard/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}
