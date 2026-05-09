import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Makepayments = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart;
  const product = state;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("mpesa");
  const [success, setSuccess] = useState(false);

  // ================= TOTAL =================
  const total =
    cart && Array.isArray(cart) && cart.length > 0
      ? cart.reduce((sum, item) => {
          return sum + Number(item.price || 0) * Number(item.qty || 1);
        }, 0)
      : Number(product?.product_cost || 0);

  // ================= FORMAT PHONE =================
  const formatPhone = (num) => {
    if (!num) return "";
    num = num.trim();

    if (num.startsWith("0")) return "254" + num.slice(1);
    if (num.startsWith("254")) return num;

    return "254" + num;
  };

  // ================= PAYMENT =================
  const pay = async (e) => {
    e.preventDefault();

    if (method === "mpesa" && phone.length < 9) {
      alert("Enter valid phone number");
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("phone", formatPhone(phone));
      formdata.append("amount", total);

      const res = await axios.post(
        `${BASE_URL}/api/mpesa_payment`,
        formdata
      );

      console.log("MPESA RESPONSE:", res.data);

      // ================= FIXED SUCCESS CHECK =================
      if (res.data?.success === true) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 8000);
      } else {
        alert(res.data?.message || "Payment failed");
        console.log("STK ERROR:", res.data);
      }

    } catch (err) {
      console.log("PAYMENT ERROR:", err.response?.data || err.message);
      alert("Payment request failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SUCCESS SCREEN =================
  if (success) {
    return (
      <div style={styles.successPage}>
        <Confetti numberOfPieces={500} recycle={false} />

        <div style={styles.successBox}>
          <h1>Payment Successful 🎉</h1>

          <p>We’ve received your payment.</p>
          <p>Your order will be delivered shortly 🚚</p>
          <p>Please check your phone for M-Pesa confirmation 📱</p>

          <p style={{ marginTop: 10, opacity: 0.7 }}>
            Redirecting you soon...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ⬅ Back Home
      </button>

      <div style={styles.card}>
        <h2 style={styles.title}>Secure Checkout</h2>

        {/* PRODUCT */}
        {!cart ? (
          <div style={styles.productBox}>
            <img
              src={`${BASE_URL}/static/images/${product?.product_photo}`}
              style={styles.image}
              alt="product"
            />
            <h3 style={styles.price}>Ksh {total}</h3>
          </div>
        ) : (
          <div>
            {cart.map((item, i) => (
              <div key={i} style={styles.cartItem}>
                <span>{item.name}</span>
                <span>Ksh {item.price * item.qty}</span>
              </div>
            ))}
            <h3 style={styles.total}>Total: Ksh {total}</h3>
          </div>
        )}

        {/* PAYMENT METHOD */}
        <h3 style={styles.sectionTitle}>Payment Method</h3>

        <div style={styles.methods}>
          <button
            onClick={() => setMethod("mpesa")}
            style={{
              ...styles.methodBtn,
              background: method === "mpesa" ? "#1f7a1f" : "#222",
            }}
          >
            📱 M-Pesa
          </button>
        </div>

        {/* PHONE */}
        {method === "mpesa" && (
          <div style={styles.phoneWrapper}>
            <div style={styles.prefix}>+254</div>

            <input
              style={styles.phoneInput}
              placeholder="712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}

        {/* PAY */}
        <button style={styles.payBtn} onClick={pay} disabled={loading}>
          {loading ? "Processing..." : `Pay Ksh ${total}`}
        </button>
      </div>
    </div>
  );
};

// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle, #0f0f0f, #000)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    color: "white",
  },

  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 15,
    background: "#d4af37",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },

  card: {
    width: "100%",
    maxWidth: 480,
    background: "rgba(20,20,20,0.95)",
    borderRadius: 18,
    padding: 25,
    border: "1px solid #d4af37",
  },

  title: { textAlign: "center", color: "#d4af37" },

  productBox: { textAlign: "center" },

  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 12,
  },

  price: { color: "#d4af37" },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #333",
  },

  total: { color: "#d4af37" },

  sectionTitle: { marginTop: 20 },

  methods: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
  },

  methodBtn: {
    padding: 10,
    border: "none",
    borderRadius: 8,
    color: "white",
    cursor: "pointer",
  },

  phoneWrapper: {
    display: "flex",
    marginTop: 15,
    border: "1px solid #d4af37",
    borderRadius: 8,
    overflow: "hidden",
  },

  prefix: {
    padding: 12,
    background: "#222",
    color: "#d4af37",
    fontWeight: "bold",
  },

  phoneInput: {
    flex: 1,
    padding: 12,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
  },

  payBtn: {
    width: "100%",
    marginTop: 20,
    padding: 12,
    background: "#d4af37",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },

  successPage: {
    height: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  successBox: {
    textAlign: "center",
    color: "white",
  },
};

export default Makepayments;