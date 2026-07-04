import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/signin");
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-nav">
        <div className="auth-brand">
          <div className="auth-brand-mark">EM</div>
          <div className="auth-brand-name">Employee Management System</div>
        </div>
        <button className="btn-ghost" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="dashboard-body">
        <h1>Welcome, {user?.employee_id}</h1>
        <p style={{ color: "var(--slate)" }}>{user?.email}</p>
        <span className="badge">{user?.role} dashboard</span>

        <div style={{ marginTop: 32 }}>
          {user?.role === "HR" ? (
            <p>This is where HR administrators would manage employee records, approvals, and reports.</p>
          ) : (
            <p>This is where employees would view their profile, leave balance, and company updates.</p>
          )}
        </div>
      </div>
    </div>
  );
}
