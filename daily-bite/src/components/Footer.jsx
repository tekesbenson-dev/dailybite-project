import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* ================= BRAND ================= */}
        <div>
          <h2 style={styles.logo}>🍰 DAILY BITE</h2>
          <p style={styles.text}>
            Fresh bakery products made with love, delivered daily across Kenya.
          </p>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h3 style={styles.title}>Contact Us</h3>

          <p>📧 Dailybite@gmail.com</p>
          <p>📞 0743600525</p>
          <p>🏭 Main Shop: Nairobi</p>
        </div>

        {/* ================= BRANCHES ================= */}
        <div>
          <h3 style={styles.title}>Branches</h3>

          <p>📍 Nairobi (Head Office)</p>
          <p>📍 Naivasha</p>
          <p>📍 Ongata Rongai</p>
          <p>📍 Kiambu</p>
          <p>📍 Thika</p>
        </div>

        {/* ================= SOCIALS ================= */}
        <div>
          <h3 style={styles.title}>Reach Us</h3>

          <p>📸 Instagram: @dailybite</p>
          <p>📘 Facebook: Daily Bite Bakery</p>
          <p>𝕏 Twitter/X: @dailybite</p>

          <button style={styles.feedbackBtn}>
            Send Feedback
          </button>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div style={styles.bottom}>
        © 2026 Daily Bite | All Rights Reserved
      </div>

    </footer>
  );
};

const styles = {
  footer: {
    background: "#0b0b0b",
    borderTop: "2px solid #d4af37",
    marginTop: "40px",
    color: "#ccc",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "40px",
  },

  logo: {
    color: "#d4af37",
    marginBottom: "10px",
  },

  text: {
    fontSize: "14px",
    color: "#aaa",
  },

  title: {
    color: "#d4af37",
    marginBottom: "10px",
  },

  feedbackBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#d4af37",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  bottom: {
    textAlign: "center",
    padding: "15px",
    borderTop: "1px solid #333",
    fontSize: "13px",
    color: "#777",
  },
};

export default Footer;