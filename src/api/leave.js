import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Apply for a new leave request
export const applyLeave = async (data) => {
  const res = await axios.post(`${API_URL}/leave/apply`, data, authHeader());
  return res.data;
};

// Get leave history/status for logged-in user
export const getMyLeaves = async () => {
  const res = await axios.get(`${API_URL}/leave/my`, authHeader());
  return res.data;
};

// Cancel a pending leave request
export const cancelLeave = async (id) => {
  const res = await axios.delete(`${API_URL}/leave/${id}`, authHeader());
  return res.data;
};

// (Admin/HR) Approve or reject a leave request
export const updateLeaveStatus = async (id, status) => {
  const res = await axios.patch(
    `${API_URL}/leave/${id}/status`,
    { status },
    authHeader()
  );
  return res.data;
};