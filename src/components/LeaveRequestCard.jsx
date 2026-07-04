const statusColors = {
  Pending: "#f0ad4e",
  Approved: "#28a745",
  Rejected: "#dc3545",
};

const LeaveRequestCard = ({ leave, onCancel }) => {
  return (
    <div className="leave-card">
      <div className="leave-card-header">
        <span className="leave-type">{leave.leaveType} Leave</span>
        <span
          className="leave-status"
          style={{ color: statusColors[leave.status] }}
        >
          {leave.status}
        </span>
      </div>
      <p>
        {new Date(leave.startDate).toLocaleDateString()} -{" "}
        {new Date(leave.endDate).toLocaleDateString()}
      </p>
      <p className="leave-reason">{leave.reason}</p>

      {leave.status === "Pending" && (
        <button className="leave-cancel-btn" onClick={() => onCancel(leave._id)}>
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default LeaveRequestCard;