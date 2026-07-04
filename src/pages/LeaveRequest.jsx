import { useEffect, useState } from "react";
import { getMyLeaves, cancelLeave } from "../api/leave";
import LeaveRequestForm from "../components/LeaveRequestForm";
import LeaveRequestCard from "../components/LeaveRequestCard";
import "../styles/LeaveRequests.css";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await getMyLeaves();
      setLeaves(data);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this leave request?")) return;
    await cancelLeave(id);
    fetchLeaves();
  };

  return (
    <div className="leave-page">
      <h2>Leave Requests</h2>

      <div className="leave-page-content">
        <LeaveRequestForm onSuccess={fetchLeaves} />

        <div className="leave-list">
          <h3>My Leave History</h3>
          {loading ? (
            <p>Loading...</p>
          ) : leaves.length === 0 ? (
            <p>No leave requests yet.</p>
          ) : (
            leaves.map((leave) => (
              <LeaveRequestCard
                key={leave._id}
                leave={leave}
                onCancel={handleCancel}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;