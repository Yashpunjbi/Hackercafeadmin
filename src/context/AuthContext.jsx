import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

// Context banaya
const AuthContext = createContext();

// ✅ AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Login function
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  // ✅ Logout function
  const logout = () => signOut(auth);

  // ✅ Realtime user listener (page refresh ke baad bhi login remember rahe)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth hook
export const useAuth = () => useContext(AuthContext);