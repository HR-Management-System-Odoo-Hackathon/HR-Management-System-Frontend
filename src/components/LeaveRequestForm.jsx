import { useState } from "react";
import { applyLeave } from "../api/leave";

const LeaveRequestForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    try {
      setLoading(true);
      await applyLeave(form);
      setForm({ leaveType: "Casual", startDate: "", endDate: "", reason: "" });
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="leave-form" onSubmit={handleSubmit}>
      <h3>Apply for Leave</h3>

      {error && <p className="leave-error">{error}</p>}

      <label>Leave Type</label>
      <select name="leaveType" value={form.leaveType} onChange={handleChange}>
        <option value="Casual">Casual</option>
        <option value="Sick">Sick</option>
        <option value="Earned">Earned</option>
        <option value="Unpaid">Unpaid</option>
      </select>

      <label>Start Date</label>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        required
      />

      <label>End Date</label>
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        required
      />

      <label>Reason</label>
      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        rows={3}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
};

export default LeaveRequestForm;