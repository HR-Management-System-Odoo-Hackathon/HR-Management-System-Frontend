import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, resendVerification } from "../api/auth";
import { useAuth } from "../api/AuthContext";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // const navigate = useNavigate();

  

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResendMsg("");
    setNeedsVerification(false);
    setSubmitting(true);
    try {
      const data = await login(form);
      loginSuccess(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      if (err.message.toLowerCase().includes("verify")) {
        setNeedsVerification(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setResendMsg("");
    try {
      const data = await resendVerification(form.email);
      setResendMsg(data.message);
    } catch (err) {
      setResendMsg(err.message);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-mark">EM</div>
          <div className="auth-brand-name">Employee Management System</div>
        </div>

        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Enter your email and password to continue.</p>

        {error && (
          <div className="alert alert-error">
            {error}
            {needsVerification && (
              <>
                {" "}
                <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleResend}>
                  Resend verification email
                </span>
              </>
            )}
          </div>
        )}
        {resendMsg && <div className="alert alert-success">{resendMsg}</div>}

        <form onSubmit={handleSubmit}>
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
              placeholder="Your password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}
