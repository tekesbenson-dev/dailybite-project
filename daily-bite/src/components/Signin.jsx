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

      if (res.data.success) {
        const userData = res.data.user;

        // 🔥 SAFETY CHECK (CRITICAL FOR ROLE SYSTEM)
        if (!userData?.role) {
          alert("Login failed: user role missing from backend response");
          return;
        }

        // SAVE USER (includes role)
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Login successful");

        navigate("/");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>Login</h2>

        <form onSubmit={login}>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
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

          <button style={styles.button}>
            Sign In
          </button>

        </form>

        <p
          style={styles.link}
          onClick={() => navigate("/signup")}
        >
          Create account
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
  },

  card: {
    width: 350,
    padding: 25,
    background: "#111",
    border: "1px solid #d4af37",
    borderRadius: 10,
    textAlign: "center",
  },

  title: {
    color: "#d4af37",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 6,
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 10,
    background: "#d4af37",
    border: "none",
    marginTop: 10,
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: 6,
  },

  link: {
    marginTop: 15,
    color: "#d4af37",
    cursor: "pointer",
  },
};

export default Signin;