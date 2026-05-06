import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, {
        identifier,
        password,
      });

      localStorage.setItem("admin", JSON.stringify(res.data));

      alert("Admin login success ✅");
      navigate("/admin-dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <form onSubmit={login}>
      <input placeholder="Email or Name" onChange={(e) => setIdentifier(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default AdminLogin;