import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "./auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("ems_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        // Token invalid/expired -- clear it out.
        localStorage.removeItem("ems_token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  function loginSuccess(newToken, newUser) {
    localStorage.setItem("ems_token", newToken);
    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("ems_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
