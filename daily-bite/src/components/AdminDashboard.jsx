import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem("admin"));
  const token = adminData?.token;

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/get_products`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      console.log("Orders endpoint missing or error");
    }
  }, []);

  // =========================
  // FETCH ALL
  // =========================
  const fetchAll = useCallback(async () => {
    await Promise.all([fetchProducts(), fetchOrders()]);
  }, [fetchProducts, fetchOrders]);

  // =========================
  // AUTH CHECK
  // =========================
  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
      return;
    }

    fetchAll();
  }, [token, navigate, fetchAll]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.post(
        `${BASE_URL}/api/delete_product`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Deleted ✅");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT PRODUCT (TEMP)
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
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(() => {
      alert("Updated ✅");
      fetchProducts();
    });
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  // =========================
  // REVENUE
  // =========================
  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total_amount || 0),
    0
  );

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
          <button style={styles.refreshBtn} onClick={fetchAll}>
            🔄 Refresh
          </button>

          <button
            style={styles.addBtn}
            onClick={() => navigate("/addproducts")}
          >
            ➕ Add Product
          </button>

          <button style={styles.logoutBtn} onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <h3 style={{ color: "#d4af37" }}>Products</h3>

      {loading && <p>Loading...</p>}

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>

            <img
              src={`${BASE_URL}/static/images/${p.product_photo}`}
              alt={p.product_name || "product"}
              style={styles.image}
            />

            <h3>{p.product_name}</h3>
            <p>Ksh {p.product_cost}</p>

            <div style={{ display: "flex", gap: "5px" }}>
              <button
                style={styles.editBtn}
                onClick={() => editProduct(p)}
              >
                ✏️ Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(p.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h3 style={{ color: "#d4af37", marginTop: "30px" }}>Orders</h3>

      <div style={styles.orders}>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((o, i) => (
            <div key={i} style={styles.orderCard}>
              <p>👤 {o.customer_name}</p>
              <p>💰 Ksh {o.total_amount}</p>
            </div>
          ))
        )}
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
    color: "#fff",
    padding: "20px",
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

  addBtn: {
    background: "#d4af37",
    border: "none",
    padding: "10px",
    fontWeight: "bold",
  },

  refreshBtn: {
    background: "#333",
    color: "#fff",
    border: "1px solid #d4af37",
    padding: "10px",
  },

  logoutBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
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
    flex: 1,
    background: "blue",
    color: "#fff",
    border: "none",
    padding: "6px",
  },

  deleteBtn: {
    flex: 1,
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px",
  },

  orders: {
    marginTop: "10px",
  },

  orderCard: {
    background: "#111",
    padding: "10px",
    marginBottom: "8px",
    borderLeft: "3px solid #d4af37",
  },
};

export default AdminDashboard;