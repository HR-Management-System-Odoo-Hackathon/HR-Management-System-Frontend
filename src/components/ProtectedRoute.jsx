import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="center-status">Loading…</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
