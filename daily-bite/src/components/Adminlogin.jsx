import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const AdminLogin = () => {
  // =========================
  // FORM STATE
  // =========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // LOGIN FUNCTION
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // SEND LOGIN REQUEST
      // =========================
      const res = await axios.post(
        `${BASE_URL}/api/admin/login`,
        {
          email,
          password,
        }
      );

      // =========================
      // STORE JWT TOKEN
      // =========================
      localStorage.setItem("token", res.data.token);

      alert("Welcome Admin 🚀");

      // =========================
      // REDIRECT TO ADMIN PAGE
      // =========================
      navigate("/addproducts");

    } catch (err) {
      console.log(err);
      alert("Invalid admin credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Admin Login</h2>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// =========================
// 🎨 STYLES
// =========================
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#000,#1a1a1a,#2c2c2c)",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "15px",
    background: "#111",
    border: "2px solid #d4af37",
    boxShadow: "0 0 20px rgba(212,175,55,0.3)",
    textAlign: "center",
  },

  title: {
    color: "#d4af37",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#d4af37,#ffcc00)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AdminLogin;