import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Makepayments = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart;
  const product = state?.product_name ? state : null;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("mpesa");

  const total =
    cart && Array.isArray(cart) && cart.length > 0
      ? cart.reduce((sum, item) => {
          const price = Number(item.price || 0);
          const qty = Number(item.qty || 1);
          return sum + price * qty;
        }, 0)
      : Number(product?.product_cost || 0);

  // =========================
  // PAYMENT FUNCTION
  // =========================
  const pay = async (e) => {
    e.preventDefault();

    if (method === "mpesa" && (!phone || phone.trim().length < 9)) {
      alert("Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("phone", phone);
      formdata.append("amount", total);
      formdata.append("method", method);

      await axios.post(`${BASE_URL}/api/mpesa_payment`, formdata);

      alert(`Payment initiated via ${method.toUpperCase()} ✅`);

      setPhone("");
    } catch (err) {
      console.log(err);
      alert("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!cart && !product) {
    return (
      <div style={styles.empty}>
        <h2 style={{ color: "#d4af37" }}>No order selected</h2>
        <button style={styles.btn} onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ⬅ Back Home
      </button>

      <div style={styles.card}>
        <h2 style={styles.title}>Checkout</h2>

        {/* ================= PRODUCT ================= */}
        {!cart ? (
          <>
            <img
              src={`${BASE_URL}/static/images/${product?.product_photo}`}
              style={styles.image}
              alt=""
            />
            <h3 style={styles.price}>
              Ksh {Number(product?.product_cost || 0).toFixed(2)}
            </h3>
          </>
        ) : (
          <div style={styles.cartBox}>
            {cart.map((item, i) => (
              <div key={i} style={styles.cartItem}>
                <p>{item.name}</p>
                <p style={styles.gold}>
                  Ksh {item.price * item.qty}
                </p>
              </div>
            ))}

            <h3 style={styles.total}>Total: Ksh {total}</h3>
          </div>
        )}

        {/* ================= PAYMENT OPTIONS ================= */}
        <h3 style={styles.sectionTitle}>Select Payment Method</h3>

        <div style={styles.methodBox}>
          <button
            onClick={() => setMethod("mpesa")}
            style={{
              ...styles.methodBtn,
              border: method === "mpesa" ? "2px solid #d4af37" : "1px solid #333",
            }}
          >
            📱 M-Pesa
          </button>

          <button
            onClick={() => setMethod("cash")}
            style={{
              ...styles.methodBtn,
              border: method === "cash" ? "2px solid #d4af37" : "1px solid #333",
            }}
          >
            💵 Cash
          </button>

          <button
            onClick={() => setMethod("card")}
            style={{
              ...styles.methodBtn,
              border: method === "card" ? "2px solid #d4af37" : "1px solid #333",
            }}
          >
            💳 Debit Card
          </button>

          <button
            onClick={() => setMethod("delivery")}
            style={{
              ...styles.methodBtn,
              border: method === "delivery" ? "2px solid #d4af37" : "1px solid #333",
            }}
          >
            🚚 Pay on Delivery
          </button>
        </div>

        {/* ================= PHONE ONLY FOR MPESA ================= */}
        {method === "mpesa" && (
          <input
            style={styles.input}
            placeholder="Enter phone number (2547...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}

        {/* ================= PAY BUTTON ================= */}
        <button style={styles.payBtn} onClick={pay} disabled={loading}>
          {loading ? "Processing..." : `Pay Ksh ${total}`}
        </button>
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
    background: "#0b0b0b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },

  backBtn: {
    alignSelf: "flex-start",
    marginBottom: "10px",
    background: "#d4af37",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "#111",
    border: "1px solid #d4af37",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
  },

  title: { color: "#d4af37" },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  price: { color: "#d4af37" },

  sectionTitle: {
    color: "#d4af37",
    marginTop: "15px",
  },

  methodBox: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },

  methodBtn: {
    padding: "10px",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#000",
    color: "#fff",
  },

  payBtn: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#d4af37",
    border: "none",
    fontWeight: "bold",
    borderRadius: "8px",
    cursor: "pointer",
  },

  cartBox: { textAlign: "left" },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #333",
    padding: "5px 0",
  },

  gold: { color: "#d4af37" },

  total: { color: "#d4af37", marginTop: "10px" },

  btn: {
    padding: "10px 15px",
    background: "#d4af37",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },

  empty: {
    minHeight: "100vh",
    background: "#0b0b0b",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Makepayments;