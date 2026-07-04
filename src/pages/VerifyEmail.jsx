import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/auth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Verification link is missing a token.");
      return;
    }
    verifyEmail(token)
      .then((data) => {
        setStatus("success");
        setMessage(data.message || "Email verified successfully.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [searchParams]);

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-mark">EM</div>
          <div className="auth-brand-name">Employee Management System</div>
        </div>

        <h1 className="auth-title">Email verification</h1>

        {status === "verifying" && <p className="auth-subtitle">{message}</p>}
        {status === "success" && <div className="alert alert-success">{message}</div>}
        {status === "error" && <div className="alert alert-error">{message}</div>}

        <div className="auth-footer">
          <Link to="/signin">Go to sign in</Link>
        </div>
      </div>
    </div>
  );
}
