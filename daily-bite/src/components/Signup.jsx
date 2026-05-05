import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !email || !password || !phone) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const res = await axios.post(`${BASE_URL}/api/signup`, formdata);

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setSuccess("🎉 Account created successfully!");

      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err) {
      console.log(err);
      setError("Signup failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* 🔙 BACK BUTTON ADDED HERE */}
        <button
          style={styles.backBtn}
          onClick={() => navigate("/")}
        >
          ⬅ Back to Home
        </button>

        <h2 style={styles.title}>🍰 Join Daily Bite</h2>
        <p style={styles.subtitle}>Create your account to start ordering</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <input
            style={styles.input}
            placeholder="Phone (2547...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up 🚀"}
          </button>

        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signin")}>
            Sign in
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
    background: "radial-gradient(circle, #1a1a1a, #000)",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "15px",
    background: "#111",
    border: "1px solid #d4af37",
    boxShadow: "0 0 25px rgba(212,175,55,0.2)",
    textAlign: "center",
  },

  /* 🔙 BACK BUTTON STYLE */
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

  success: {
    background: "#0f2a0f",
    color: "#7CFC90",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "13px",
  },

  footer: {
    marginTop: "15px",
    color: "#aaa",
    fontSize: "13px",
  },

  link: {
    color: "#d4af37",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;