import React from "react";
import "../styles/DashboardCard.css";

export default function DashboardCard({
  title,
  description,
  onClick,
  color = "#2f3b76",
  index = 1,
}) {
  const stampNumber = String(index).padStart(2, "0");

  return (
    <div
      className="dashboard-card"
      onClick={onClick}
      style={{ "--accent": color }}
    >
      <div className="card-stamp" aria-hidden="true">
        NO.{stampNumber}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="card-btn">Open</button>
    </div>
  );
}