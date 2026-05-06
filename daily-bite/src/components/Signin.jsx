import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/signin`, {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div style={styles.page}>

      {/* 🌟 glowing rings */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* 🔙 BACK BUTTON (TOP RIGHT AREA NOT CORNER) */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/")}
      >
        ⬅ Home
      </button>

      {/* CARD */}
      <div style={styles.card}>
        <h2 style={styles.title}>🍰 Daily Bite Login</h2>
        <p style={styles.subtitle}>Welcome back</p>

        <form onSubmit={login}>
          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button}>Sign In</button>
        </form>

        <p style={styles.linkText}>
          No account?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b0b0b",
    position: "relative",
    overflow: "hidden",
  },

  card: {
    width: "350px",
    padding: "25px",
    background: "#111",
    border: "1px solid #d4af37",
    borderRadius: "12px",
    textAlign: "center",
    zIndex: 2,
    boxShadow: "0 0 25px rgba(212,175,55,0.25)",
  },

  title: { color: "#d4af37" },
  subtitle: { color: "#aaa", fontSize: "13px", marginBottom: "15px" },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    background: "#000",
    border: "1px solid #d4af37",
    color: "#fff",
    borderRadius: "6px",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#d4af37",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  linkText: { marginTop: "10px", color: "#aaa", fontSize: "13px" },
  link: { color: "#d4af37", cursor: "pointer" },

  backBtn: {
    position: "absolute",
    top: "20px",
    right: "40px",
    padding: "8px 15px",
    border: "1px solid #d4af37",
    background: "transparent",
    color: "#d4af37",
    cursor: "pointer",
    borderRadius: "8px",
    zIndex: 10,
    transition: "0.3s",
  },

  glow1: {
    position: "absolute",
    width: "420px",
    height: "420px",
    background: "radial-gradient(circle, rgba(212,175,55,0.25), transparent 60%)",
    filter: "blur(50px)",
    top: "-120px",
    left: "-120px",
  },

  glow2: {
    position: "absolute",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(255,204,0,0.15), transparent 60%)",
    filter: "blur(60px)",
    bottom: "-120px",
    right: "-150px",
  },
};

export default Signin;