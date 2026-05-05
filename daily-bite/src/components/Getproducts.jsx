import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Getproducts.css";

const BASE_URL = "https://bensontekes.alwaysdata.net";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/get_products`);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // HERO SLIDES
  const slides = [
    {
      img: "bread1.jpg",
      title: "Fresh Artisan Bread 🍞",
      desc: "Baked daily with love & warmth",
      tag: "HOT & FRESH",
    },
    {
      img: "cake1.jpg",
      title: "Luxury Cakes 🎂",
      desc: "Perfect for birthdays & celebrations",
      tag: "BEST SELLER",
    },
    {
      img: "mandazi1.jpg",
      title: "Golden Mandazi ☕",
      desc: "Soft, fluffy & sweet snack",
      tag: "LOCAL FAVORITE",
    },
    {
      img: "biscuit1.jpg",
      title: "Crunchy Biscuits 🍪",
      desc: "Perfect tea-time companion",
      tag: "SNACK TIME",
    },
  ];

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const current = slides[index];

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/300x200";
    return `${BASE_URL}/static/images/${img}`;
  };

  return (
    <div className="page">

      {/* HERO */}
      <header className="hero">
        <div className="hero-box">

          <div className="hero-text">

            <span className="tag">{current.tag}</span>

            <h1 className="hero-title">{current.title}</h1>

            <p className="hero-desc">{current.desc}</p>

            <p className="extra">
              Fresh baked daily • Affordable • Delivered fast 🚀
            </p>

            <div className="hero-buttons">
              <button
                className="secondary-btn"
                onClick={() => alert("Call us at 0796542123 📞")}
              >
                Contact Us
              </button>
            </div>

          </div>

          <div className="hero-img-wrapper">
            <img
              src={getImage(current.img)}
              alt={current.title}
              className="hero-img"
            />
          </div>

        </div>
      </header>

      {/* PRODUCTS */}
      <div className="grid">

        {loading ? (
          <h2 className="center">Loading products...</h2>
        ) : products.length === 0 ? (
          <h2 className="center">No products found 😢</h2>
        ) : (
          products.map((p, i) => {
            const [id, name, desc, price, photo] = p;

            return (
              <div key={i} className="card">

                <img
                  src={getImage(photo)}
                  alt={name}
                  className="image"
                />

                <h3 className="name">{name}</h3>
                <p className="desc">{desc}</p>

                <h2 className="price">Ksh {price}</h2>

                <button
                  className="btn"
                  onClick={() =>
                    navigate("/makepayment", {
                      state: {
                        id,
                        product_name: name,
                        product_cost: price,
                        product_photo: photo,
                      },
                    })
                  }
                >
                  Buy Now ⚡
                </button>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
};

export default Getproducts;