import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/signup`, {
        customer_name: username,
        email,
        password,
        phone,
      });

      if (res.data.success) {
        alert("Account created successfully");
        navigate("/signin");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
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

          <input
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button style={styles.button}>Sign Up</button>
        </form>

        <p style={styles.link} onClick={() => navigate("/signin")}>
          Already have an account? Login
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
  },

  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    borderRadius: 6,
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
  },

  button: {
    width: "100%",
    padding: 10,
    background: "#d4af37",
    border: "none",
    marginTop: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    marginTop: 10,
    color: "#d4af37",
    cursor: "pointer",
  },
};

export default Signup;