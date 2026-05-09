import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // =========================
  // LOAD USER (SYNC FIXED)
  // =========================
  useEffect(() => {

    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    loadUser();

    // instant sync between pages
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);

  }, []);

  // =========================
  // LOGOUT (CLEAN FIX)
  // =========================
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    navigate("/signin", { replace: true });
  };

  // =========================
  // HOVER EFFECTS
  // =========================
  const hoverBase = (e) => {
    e.target.style.transform = "translateY(-4px) scale(1.05)";
    e.target.style.boxShadow = "0 0 18px #d4af37";
  };

  const hoverOutBase = (e) => {
    e.target.style.transform = "translateY(0px) scale(1)";
    e.target.style.boxShadow = "none";
  };

  const hoverGold = (e) => {
    e.target.style.transform = "translateY(-4px) scale(1.05)";
    e.target.style.boxShadow = "0 0 25px #ffd700";
  };

  const hoverGoldOut = (e) => {
    e.target.style.transform = "translateY(0px) scale(1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <header style={styles.wrapper}>

      <div style={styles.topBar}>
        🍰 Fresh Bakery • Nairobi Delivery • Order Anytime
      </div>

      <div style={styles.center}>
        <h1 style={styles.brand}>Daily Bite</h1>
        <p style={styles.tagline}>
          Freshly baked happiness delivered daily 🍞✨
        </p>
      </div>

      <div style={styles.nav}>

        {/* HOME BUTTON (FIXED + HOVER ADDED) */}
        <Link
          to="/"
          style={styles.linkBtn}
          onMouseEnter={hoverBase}
          onMouseLeave={hoverOutBase}
        >
          Home
        </Link>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <>
            <Link
              to="/admin-dashboard"
              style={styles.goldBtn}
              onMouseEnter={hoverGold}
              onMouseLeave={hoverGoldOut}
            >
              Admin Dashboard
            </Link>

            <Link
              to="/addproducts"
              style={styles.goldBtn}
              onMouseEnter={hoverGold}
              onMouseLeave={hoverGoldOut}
            >
              Add Product
            </Link>
          </>
        )}

        {/* AUTH */}
        {!user ? (
          <>
            <Link
              to="/signin"
              style={styles.linkBtn}
              onMouseEnter={hoverBase}
              onMouseLeave={hoverOutBase}
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              style={styles.linkBtn}
              onMouseEnter={hoverBase}
              onMouseLeave={hoverOutBase}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={styles.dangerBtn}
            onMouseEnter={hoverBase}
            onMouseLeave={hoverOutBase}
          >
            Logout
          </button>
        )}

      </div>
    </header>
  );
};

// =========================
// STYLES (UNCHANGED CORE LOOK)
// =========================
const styles = {

  wrapper: {
    background: "linear-gradient(to bottom, #050505, #111)",
    color: "#fff",
    borderBottom: "2px solid #d4af37",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  topBar: {
    background: "#111",
    color: "#d4af37",
    fontSize: "14px",
    padding: "8px",
  },

  center: {
    padding: "30px 10px",
  },

  brand: {
    fontSize: "64px",
    fontFamily: "'Dancing Script', cursive",
    color: "#d4af37",
    margin: 0,
  },

  tagline: {
    fontSize: "16px",
    color: "#ddd",
    marginTop: "10px",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    paddingBottom: "20px",
    flexWrap: "wrap",
  },

  linkBtn: {
    padding: "12px 20px",
    border: "1px solid #d4af37",
    color: "#d4af37",
    textDecoration: "none",
    borderRadius: "8px",
    background: "#111",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  goldBtn: {
    padding: "12px 20px",
    background: "linear-gradient(145deg, #d4af37, #ffcc70)",
    color: "#000",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },

  dangerBtn: {
    padding: "12px 20px",
    background: "#220000",
    color: "#d4af37",
    border: "1px solid #d4af37",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Header;