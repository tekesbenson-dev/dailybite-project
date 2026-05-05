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

  // Check if user is admin (simple frontend protection)
  useEffect(() => {
    const adminFlag = localStorage.getItem("admin");
    if (adminFlag === "true") {
      setIsAdmin(true);
    }
  }, []);

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !desc || !product_cost || !photo) {
      alert("Please fill all fields");
      return;
    }

    // Ensure price is valid number
    const cleanCost = parseFloat(product_cost);

    if (isNaN(cleanCost)) {
      alert("Invalid product cost");
      return;
    }

    // Prepare form data for backend (important for file upload)
    const formdata = new FormData();
    formdata.append("product_name", name.trim());
    formdata.append("product_description", desc.trim());
    formdata.append("product_cost", cleanCost);
    formdata.append("product_photo", photo);

    try {
      setLoading(true);

      // Send request to backend
      const res = await axios.post(
        `${BASE_URL}/api/add_product`,
        formdata
      );

      alert(res.data.message || "Product added successfully!");

      // Reset form after success
      setName("");
      setDesc("");
      setProductCost("");
      setPhoto(null);

      // Refresh product list in parent component
      if (fetchProducts) fetchProducts();

    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADMIN PROTECTION UI
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
        <h2 style={styles.title}>🍔 Add Product</h2>

        <form onSubmit={handleSubmit}>
          {/* PRODUCT NAME */}
          <input
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* DESCRIPTION */}
          <input
            style={styles.input}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* COST */}
          <input
            type="number"
            style={styles.input}
            placeholder="Product Cost (Ksh)"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            style={styles.input}
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Adding..." : "➕ Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

// =========================
// 🎨 STYLES (CLEAN DARK GOLD THEME)
// =========================
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#000,#1a1a1a,#2c2c2c)",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#111",
    padding: "25px",
    borderRadius: "15px",
    border: "2px solid #d4af37",
    boxShadow: "0 0 20px rgba(212,175,55,0.3)"
  },

  title: {
    textAlign: "center",
    color: "#d4af37",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#d4af37,#ffcc00)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  },

  blocked: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    color: "#d4af37",
    background: "#000"
  }
};

export default Addproducts;