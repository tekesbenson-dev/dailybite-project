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

    console.log("FORM SUBMITTED 🚀");

    // ✅ STRONG VALIDATION
    if (!username.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("SENDING REQUEST...");

      const res = await axios.post(
        `${BASE_URL}/api/signup`,
        {
          customer_name: username.trim(), // ✅ MUST MATCH BACKEND
          email: email.trim(),
          password: password.trim(),
          phone: phone.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ IMPORTANT
          },
        }
      );

      console.log("RESPONSE:", res.data);

      alert("Account created ✅");
      navigate("/signin");

    } catch (err) {
      console.log("FULL ERROR:", err);

      // ✅ BETTER ERROR HANDLING
      if (err.response) {
        alert(err.response.data.message || "Signup failed ❌");
      } else if (err.request) {
        alert("Server not responding ❌");
      } else {
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ⬅ Home
      </button>

      <div style={styles.card}>
        <h2 style={styles.title}>🍰 Join Daily Bite</h2>
        <p style={styles.subtitle}>Create your account</p>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="email" // ✅ small improvement
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

          {/* ✅ IMPORTANT: type submit */}
          <button type="submit" style={styles.button}>
            Sign Up 🚀
          </button>

        </form>

        <p style={styles.linkText}>
          Already have account?{" "}
          <span style={styles.link} onClick={() => navigate("/signin")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

/* 🔥 KEEPING YOUR STYLES EXACTLY SAME */
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

  title: { color: "#d4af37", marginBottom: "5px" },
  subtitle: { color: "#aaa", fontSize: "13px", marginBottom: "15px" },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    background: "#000",
    border: "1px solid #d4af37",
    color: "#fff",
    borderRadius: "6px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#d4af37",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "6px",
  },

  linkText: { marginTop: "10px", color: "#aaa" },
  link: { color: "#d4af37", cursor: "pointer", fontWeight: "bold" },

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

export default Signup;