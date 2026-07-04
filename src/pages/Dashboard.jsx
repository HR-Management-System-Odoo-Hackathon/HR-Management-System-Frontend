import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardCard from "./DashboardCard";
import { useAuth } from "../api/AuthContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function comingSoon(feature) {
    alert(`${feature} page will be implemented next.`);
  }

  function handleLogout() {
    logout();
    navigate("/signin");
  }

  const employeeActivities = [
    { text: "Attendance marked today", time: "09:02" },
    { text: "Leave request submitted", time: "Yesterday" },
    { text: "Profile updated recently", time: "3 days ago" },
  ];

  const employeeList = [
    "John Doe",
    "Alice Smith",
    "Robert Johnson",
    "Emma Wilson",
  ];

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-header-text">
            <span className="dashboard-eyebrow">{todayLabel}</span>
            <h1>Welcome, {user?.name || "User"}</h1>
            <p>{user?.role === "admin" ? "Admin Dashboard" : "Employee Dashboard"}</p>
          </div>
          <div className="dashboard-id-badge">
            <div className="badge-avatar">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="badge-meta">
              <span className="badge-role">{user?.role === "admin" ? "Admin" : "Employee"}</span>
              <span className="badge-id">ID-{String(user?.id ?? "0000").padStart(4, "0")}</span>
            </div>
          </div>
        </div>

        {/* Employee Dashboard */}
        {user?.role !== "admin" && (
          <>
            <div className="card-grid">
              <DashboardCard
                index={1}
                title="Profile"
                description="View your personal information."
                onClick={() => comingSoon("Profile")}
                color="#2f3b76"
              />
              <DashboardCard
                index={2}
                title="Attendance"
                description="View your attendance records."
                onClick={() => comingSoon("Attendance")}
                color="#d98e2c"
              />
              <DashboardCard
                index={3}
                title="Leave Requests"
                description="Apply or check leave status."
                onClick={() => navigate("/leave-requests")}
                color="#3f8f5f"
              />
              <DashboardCard
                index={4}
                title="Logout"
                description="Sign out of the system."
                onClick={handleLogout}
                color="#c1443c"
              />
            </div>
            <div className="activity-section">
              <h2>Recent Activity</h2>
              <ul>
                {employeeActivities.map((item, index) => (
                  <li key={index}>
                    <span className="activity-dot" />
                    <span className="activity-text">{item.text}</span>
                    <span className="activity-time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Admin Dashboard */}
        {user?.role === "admin" && (
          <>
            <div className="card-grid">
              <DashboardCard
                index={1}
                title="Employee List"
                description="View all employees."
                onClick={() => comingSoon("Employee List")}
                color="#2f3b76"
              />
              <DashboardCard
                index={2}
                title="Attendance Records"
                description="View attendance of all employees."
                onClick={() => comingSoon("Attendance Records")}
                color="#d98e2c"
              />
              <DashboardCard
                index={3}
                title="Leave Approvals"
                description="Approve or reject leave requests."
                onClick={() => navigate("/leave-requests")}
                color="#3f8f5f"
              />
              <DashboardCard
                index={4}
                title="Logout"
                description="Sign out of the system."
                onClick={handleLogout}
                color="#c1443c"
              />
            </div>
            <div className="activity-section">
              <h2>Employee Switch</h2>
              <select className="employee-select">
                {employeeList.map((employee, index) => (
                  <option key={index}>{employee}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </>
  );
}