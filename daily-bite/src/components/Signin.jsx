import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const res = await axios.post(`${BASE_URL}/api/signin`, formdata);

      if (!res.data || res.data.message !== "Login successful") {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");

    } catch (err) {
      console.log(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* 🔙 BACK BUTTON */}
        <button
          style={styles.backBtn}
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>

        <h2 style={styles.title}>🍰 Daily Bite Login</h2>
        <p style={styles.subtitle}>Welcome back, sign in to continue</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In 🚀"}
          </button>

        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link style={styles.link} to="/signup">
            Create account
          </Link>
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
    background: "radial-gradient(circle, #1a1a1a, #000)",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "30px",
    borderRadius: "15px",
    background: "#111",
    border: "1px solid #d4af37",
    boxShadow: "0 0 25px rgba(212,175,55,0.2)",
    textAlign: "center",
  },

  /* 🔙 BACK BUTTON */
  backBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "transparent",
    border: "1px solid #d4af37",
    color: "#d4af37",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  title: {
    color: "#d4af37",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#aaa",
    fontSize: "13px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
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
    background: "linear-gradient(90deg, #d4af37, #ffcc00)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "5px",
  },

  error: {
    background: "#2a0000",
    color: "#ff6b6b",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "13px",
  },

  footerText: {
    marginTop: "15px",
    color: "#aaa",
    fontSize: "13px",
  },

  link: {
    color: "#d4af37",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signin;