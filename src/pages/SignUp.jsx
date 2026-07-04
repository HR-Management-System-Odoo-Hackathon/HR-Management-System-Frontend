import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const initialForm = { employee_id: "", email: "", password: "", role: "Employee" };

export default function SignUp() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const data = await signup(form);
      setSuccess(data.message || "Account created. Check your email to verify your account.");
      setForm(initialForm);
      // Give the person a moment to read the success message, then send them
      // to sign in once they've verified.
      setTimeout(() => navigate("/signin"), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-mark">EM</div>
          <div className="auth-brand-name">Employee Management System</div>
        </div>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Sign up as an employee or HR administrator.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="employee_id">Employee ID</label>
            <input
              id="employee_id"
              type="text"
              placeholder="e.g. EMP1024"
              value={form.employee_id}
              onChange={(e) => update("employee_id", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
            <div className="field-hint">
              At least 8 characters, with an uppercase letter, a lowercase letter, a number, and a special character.
            </div>
          </div>

          <div className="field">
            <label>Role</label>
            <div className="role-toggle">
              <div
                className={`role-option ${form.role === "Employee" ? "active" : ""}`}
                onClick={() => update("role", "Employee")}
              >
                Employee
              </div>
              <div
                className={`role-option ${form.role === "HR" ? "active" : ""}`}
                onClick={() => update("role", "HR")}
              >
                HR
              </div>
            </div>
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
