import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <header style={styles.wrapper}>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        🍰 Fresh Bakery • Nairobi Delivery • Order Anytime
      </div>

      {/* BRAND */}
      <div style={styles.center}>
        <h1 style={styles.brand}>Daily Bite</h1>
        <p style={styles.tagline}>
          Freshly baked happiness delivered daily 🍞✨
        </p>
      </div>

      {/* NAV */}
      <div style={styles.nav}>

        {/* HOME */}
        <Link
          to="/"
          style={{
            ...styles.linkBtn,
            ...(hovered === "home" ? styles.hover : {}),
          }}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered("")}
        >
          Home
        </Link>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/addproducts"
            style={{
              ...styles.goldBtn,
              ...(hovered === "add" ? styles.hoverGold : {}),
            }}
            onMouseEnter={() => setHovered("add")}
            onMouseLeave={() => setHovered("")}
          >
            Add Product
          </Link>
        )}

        {/* AUTH */}
        {!user ? (
          <>
            <Link
              to="/signin"
              style={{
                ...styles.linkBtn,
                ...(hovered === "signin" ? styles.hover : {}),
              }}
              onMouseEnter={() => setHovered("signin")}
              onMouseLeave={() => setHovered("")}
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              style={{
                ...styles.linkBtn,
                ...(hovered === "signup" ? styles.hover : {}),
              }}
              onMouseEnter={() => setHovered("signup")}
              onMouseLeave={() => setHovered("")}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              ...styles.dangerBtn,
              ...(hovered === "logout" ? styles.hoverDanger : {}),
            }}
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered("")}
          >
            Logout
          </button>
        )}

      </div>

    </header>
  );
};

const styles = {
  wrapper: {
    background: "#0b0b0b",
    color: "#fff",
    borderBottom: "2px solid #d4af37",
    textAlign: "center",
  },

  topBar: {
    background: "#111",
    color: "#d4af37",
    fontSize: "14px",
    padding: "8px",
    letterSpacing: "1px",
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
    fontFamily: "'Lora', serif",
    color: "#ccc",
    marginTop: "10px",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    paddingBottom: "18px",
    flexWrap: "wrap",
  },

  // =========================
  // BUTTONS
  // =========================
  linkBtn: {
    padding: "10px 18px",
    border: "1px solid #d4af37",
    color: "#d4af37",
    textDecoration: "none",
    fontFamily: "'Instrument Serif', serif",
    borderRadius: "6px",
    background: "#111",
    transition: "0.3s",
  },

  goldBtn: {
    padding: "10px 18px",
    background: "linear-gradient(145deg, #d4af37, #ffcc70)",
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "6px",
    border: "none",
    transition: "0.3s",
  },

  dangerBtn: {
    padding: "10px 18px",
    background: "linear-gradient(145deg, #000, #220000)",
    color: "#d4af37",
    border: "1px solid #d4af37",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  // =========================
  // HOVER EFFECTS
  // =========================
  hover: {
    transform: "scale(1.08)",
    boxShadow: "0 0 12px rgba(212,175,55,0.7)",
  },

  hoverGold: {
    transform: "scale(1.08)",
    boxShadow: "0 0 18px rgba(255,204,112,0.9)",
  },

  hoverDanger: {
    transform: "scale(1.08)",
    boxShadow: "0 0 15px rgba(255,0,0,0.6)",
  },
};

export default Header;