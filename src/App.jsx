import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./api/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import LeaveRequests from "./pages/LeaveRequest";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/signin" element={<SignIn />} />

          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/leave-requests" element={
            <ProtectedRoute>
              <LeaveRequests />
            </ProtectedRoute>
          } />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}