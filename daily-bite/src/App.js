import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Getproducts from "./components/Getproducts";
import Addproducts from "./components/Addproducts";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Makepayments from "./components/Makepayments";
import AdminDashboard from "./components/AdminDashboard";
import Notfound from "./components/Notfound";

function App() {

  const [user, setUser] = useState(null);

  // =========================
  // CLEAN USER SYNC (NO INTERVAL)
  // =========================
  useEffect(() => {

    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };

  }, []);

  return (
    <Router>

      {/* 🔥 PASS USER TO HEADER (IMPORTANT FIX) */}
      <Header user={user} />

      <Routes>

        <Route path="/" element={<Getproducts />} />

        <Route
          path="/signin"
          element={user ? <Navigate to="/" replace /> : <Signin />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />

        <Route
          path="/admin-dashboard"
          element={
            user?.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/signin" replace />
          }
        />

        <Route
          path="/addproducts"
          element={
            user?.role === "admin"
              ? <Addproducts />
              : <Navigate to="/signin" replace />
          }
        />

        <Route path="/makepayment" element={<Makepayments />} />

        <Route path="*" element={<Notfound />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;