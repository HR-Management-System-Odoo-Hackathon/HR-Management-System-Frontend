import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">EM</div>

        <div className="system-name">
          Employee Management System
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <span className="user-name">
            {user?.name || "Employee"}
          </span>

          <span className="user-role">
            {user?.role?.toUpperCase()}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}