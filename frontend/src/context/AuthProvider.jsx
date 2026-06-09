import { useState } from "react";
import { DEMO_USERS } from "../data/mockData";
import { AuthContext } from "./auth-store";

const STORAGE_KEY = "smart_campus_user";

function loadStoredUser() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function toPublicUser(user) {
  const { password, ...userData } = user;
  void password;
  return userData;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  const login = async (studentId, password) => {
    const found = DEMO_USERS.find(
      (u) => u.studentId === studentId.trim() && u.password === password
    );

    if (!found) {
      throw new Error("Invalid student ID or password");
    }

    const userData = toPublicUser(found);
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading: false, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
