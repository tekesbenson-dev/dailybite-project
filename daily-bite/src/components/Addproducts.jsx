import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Addproducts = ({ fetchProducts }) => {

  // =========================
  // FORM STATE
  // =========================
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // ADMIN CONTROL STATE
  // =========================
  const [isAdmin, setIsAdmin] = useState(false);

  // =========================
  // CHECK ADMIN
  // =========================
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!name || !desc || !product_cost || !photo) {
      alert("Please fill all fields");
      return;
    }

    // VALIDATE COST
    const cleanCost = parseFloat(product_cost);

    if (isNaN(cleanCost)) {
      alert("Invalid product cost");
      return;
    }

    // FORM DATA
    const formdata = new FormData();

    formdata.append("product_name", name.trim());
    formdata.append("product_description", desc.trim());
    formdata.append("product_cost", cleanCost);
    formdata.append("product_photo", photo);

    try {

      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/api/add_product`,
        formdata
      );

      alert(res.data.message || "Product added successfully!");

      // RESET FORM
      setName("");
      setDesc("");
      setProductCost("");
      setPhoto(null);

      // REFRESH PRODUCTS
      if (fetchProducts) {
        fetchProducts();
      }

    } catch (err) {

      console.log(err);

      alert("Failed to add product");

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // BLOCK NON ADMIN
  // =========================
  if (!isAdmin) {
    return (
      <div style={styles.blocked}>
        🚫 Admin Access Only
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          🍔 Add Product
        </h2>

        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Product Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={styles.textarea}
          />

          {/* PRODUCT COST */}
          <input
            type="number"
            placeholder="Product Cost"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            style={styles.input}
          />

          {/* PRODUCT PHOTO */}
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={styles.input}
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Adding Product..." : "➕ Add Product"}
          </button>

        </form>

      </div>

    </div>
  );
};

// =========================
// STYLES
// =========================
const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#000,#111,#1a1a1a)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#111",
    borderRadius: "15px",
    padding: "25px",
    border: "2px solid #d4af37",
    boxShadow: "0 0 20px rgba(212,175,55,0.3)",
  },

  title: {
    textAlign: "center",
    color: "#d4af37",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    outline: "none",
    resize: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg,#d4af37,#ffcc00)",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 0 15px rgba(212,175,55,0.5)",
  },

  blocked: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    color: "#d4af37",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Addproducts;