import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Getproducts.css";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  // ================= CART (UNCHANGED LOGIC FIX ONLY) =================
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    let updated;

    if (existing) {
      updated = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [
        ...cart,
        {
          id: product.id,
          name: product.product_name,
          desc: product.product_description,
          price: Number(product.product_cost),
          image: product.product_photo,
          qty: 1,
        },
      ];
    }

    setCart(updated);
    setShowCart(true);
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ================= PRODUCTS FIX (ONLY THIS PART CHANGED) =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/get_products`);

        // ✅ FIX: backend returns { products: [...] }
        setProducts(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= CAROUSEL (UNCHANGED) =================
  const slides = useMemo(
    () => [
      {
        img: "bread1.jpg",
        title: "Fresh Artisan Bread 🍞",
        desc: "Baked daily",
        tag: "HOT & FRESH",
      },
      {
        img: "cake1.jpg",
        title: "Luxury Cakes 🎂",
        desc: "Celebration cakes",
        tag: "BEST SELLER",
      },
      {
        img: "mandazi1.jpg",
        title: "Golden Mandazi ☕",
        desc: "Soft & sweet",
        tag: "LOCAL FAVORITE",
      },
      {
        img: "biscuit1.jpg",
        title: "Crunchy Biscuits 🍪",
        desc: "Tea time snack",
        tag: "SNACK TIME",
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const current = slides[index];

  const getImage = (img) =>
    `${BASE_URL}/static/images/${img}`;

  return (
    <div className="page">

      {/* ================= CAROUSEL (UNCHANGED) ================= */}
      <header className="hero">
        <div className="hero-box">
          <div className="hero-text">
            <span className="tag">{current.tag}</span>
            <h1>{current.title}</h1>
            <p>{current.desc}</p>
          </div>

          <img
            src={getImage(current.img)}
            className="hero-img"
            alt={current.title}
          />
        </div>
      </header>

      {/* ================= PRODUCTS (UNCHANGED STRUCTURE) ================= */}
      <div className="grid">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          products.map((p) => (
            <div className="card" key={p.id}>
              <img
                src={getImage(p.product_photo)}
                className="image"
                alt={p.product_name}
              />

              <h3 className="name">{p.product_name}</h3>
              <p className="desc">{p.product_description}</p>

              <h2 className="price">Ksh {p.product_cost}</h2>

              <button className="btn" onClick={() => addToCart(p)}>
                Add to Cart 🛒
              </button>

              <button
                className="buy-btn"
                onClick={() =>
                  navigate("/makepayment", {
                    state: {
                      id: p.id,
                      product_name: p.product_name,
                      product_cost: p.product_cost,
                      product_photo: p.product_photo,
                    },
                  })
                }
              >
                Buy Now ⚡
              </button>
            </div>
          ))
        )}
      </div>

      {/* ================= CART (UNCHANGED) ================= */}
      {showCart && (
        <div className="cart-popup">

          <div className="cart-header">
            <h3 style={{ fontSize: "18px" }}>🛒 Cart</h3>
            <button
              style={{ fontSize: "14px" }}
              onClick={() => setShowCart(false)}
            >
              ✖
            </button>
          </div>

          <div className="cart-body">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p className="mini-price">
                    Ksh {item.price * item.qty}
                  </p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: Ksh {total}</h3>

            <button
              onClick={() =>
                navigate("/makepayment", {
                  state: {
                    cart,
                    total,
                  },
                })
              }
            >
              Checkout ⚡
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Getproducts;