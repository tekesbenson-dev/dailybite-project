import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const AdminDashboard = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem("user"));
  const token = adminData?.token;

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/get_products`);
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders`);
      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // =========================
  // LOAD EVERYTHING ON ENTER
  // =========================
  useEffect(() => {

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);

    Promise.all([fetchProducts(), fetchOrders()])
      .finally(() => setLoading(false));

  }, [token, navigate, fetchProducts, fetchOrders]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.post(
      `${BASE_URL}/api/delete_product`,
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProducts();
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const editProduct = (product) => {
    const newName = prompt("Edit name", product.product_name);
    const newPrice = prompt("Edit price", product.product_cost);

    if (!newName || !newPrice) return;

    axios.post(
      `${BASE_URL}/api/update_product`,
      {
        id: product.id,
        product_name: newName,
        product_cost: newPrice,
        product_description: product.product_description,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(fetchProducts);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

  // =========================
  // ANALYTICS
  // =========================
  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total_amount || 0),
    0
  );

  const pendingOrders = orders.filter(o => o.status === "pending");
  const completedOrders = orders.filter(o => o.status === "completed");

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>🛠️ Admin Dashboard</h2>
          <p style={{ color: "#aaa" }}>
            Products: {products.length} | Orders: {orders.length} | Revenue: Ksh {totalRevenue}
          </p>
        </div>

        <div style={styles.actions}>
          <button style={styles.btn} onClick={() => { fetchProducts(); fetchOrders(); }}>
            🔄 Refresh
          </button>

          <button style={styles.btnGold} onClick={() => navigate("/addproducts")}>
            ➕ Add Product
          </button>

          <button style={styles.btnRed} onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p style={{ color: "#d4af37" }}>Loading dashboard...</p>}

      {/* PRODUCTS */}
      <h3 style={{ color: "#d4af37" }}>Products</h3>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={`${BASE_URL}/static/images/${p.product_photo}`}
              style={styles.image}
              alt=""
            />

            <h3>{p.product_name}</h3>
            <p>Ksh {p.product_cost}</p>

            <div style={{ display: "flex", gap: "5px" }}>
              <button style={styles.editBtn} onClick={() => editProduct(p)}>✏️</button>
              <button style={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h3 style={{ color: "#d4af37", marginTop: 30 }}>Orders</h3>

      <p>⏳ Pending: {pendingOrders.length}</p>
      <p>✅ Completed: {completedOrders.length}</p>

    </div>
  );
};

// =========================
// STYLES
// =========================
const styles = {

  page: {
    background: "#0b0b0b",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "1px solid #d4af37",
    cursor: "pointer",
  },

  btnGold: {
    padding: "10px",
    background: "#d4af37",
    border: "none",
    cursor: "pointer",
  },

  btnRed: {
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
  },

  card: {
    background: "#1a120b",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  editBtn: {
    background: "blue",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminDashboard;