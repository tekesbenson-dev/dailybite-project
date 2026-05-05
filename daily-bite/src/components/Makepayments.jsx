import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Makepayments = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state || null;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // PAY FUNCTION (M-PESA STK PUSH)
  // =========================
  const pay = async (e) => {
    e.preventDefault();

    // safety checks
    if (!product) {
      alert("No product selected");
      navigate("/");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("phone", phone);
      formdata.append("amount", product.product_cost);

      await axios.post(`${BASE_URL}/api/mpesa_payment`, formdata);

      alert("📱 STK Push sent! Check your phone.");

      setPhone("");
    } catch (err) {
      console.log(err);
      alert("Payment failed ❌ Try again");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY PRODUCT GUARD
  // =========================
  if (!product) {
    return (
      <div style={styles.empty}>
        <h2 style={{ color: "#d4af37" }}>No product selected</h2>
        <p>Select a product first to continue payment</p>

        <button style={styles.btn} onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* ================= PAYMENT CARD ================= */}
      <div style={styles.card}>

        <h2 style={styles.title}>
          {product.product_name}
        </h2>

        <img
          src={`${BASE_URL}/static/images/${product.product_photo}`}
          alt={product.product_name}
          style={styles.image}
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300x200?text=No+Image")
          }
        />

        <p style={styles.desc}>
          {product.product_description}
        </p>

        <h3 style={styles.price}>
          Ksh {Number(product.product_cost || 0).toFixed(2)}
        </h3>

        {/* ================= PAYMENT FORM ================= */}
        <form onSubmit={pay}>

          <input
            style={styles.input}
            placeholder="Enter phone number (e.g 2547...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button style={styles.payBtn} disabled={loading}>
            {loading ? "Processing..." : "Pay with M-Pesa 💳"}
          </button>

        </form>

      </div>

    </div>
  );
};

// =========================
// 🎨 PREMIUM GOLD / BLACK UI
// =========================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#111",
    border: "1px solid #d4af37",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(212,175,55,0.25)",
  },

  title: {
    color: "#d4af37",
    marginBottom: "10px",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  desc: {
    color: "#aaa",
    fontSize: "13px",
    marginBottom: "10px",
  },

  price: {
    color: "#fff",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
    outline: "none",
  },

  payBtn: {
    width: "100%",
    padding: "12px",
    background: "#d4af37",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "8px",
  },

  btn: {
    padding: "10px 15px",
    background: "#d4af37",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },

  empty: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b0b0b",
    color: "#fff",
    textAlign: "center",
  },
};

export default Makepayments;