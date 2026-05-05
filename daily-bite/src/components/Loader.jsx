import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

// =========================
// 🎨 STYLES
// =========================
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  spinner: {
    width: "60px",
    height: "60px",
    border: "5px solid #333",
    borderTop: "5px solid #d4af37", // gold brand color
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  text: {
    marginTop: "15px",
    color: "#d4af37",
    fontSize: "16px",
    letterSpacing: "1px",
  },
};

export default Loader;