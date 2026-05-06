import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// =========================
// COMPONENTS
// =========================
import Navbar from './components/Header';
import Footer from './components/Footer';

import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayments from './components/Makepayments';
import Adminlogin from './components/Adminlogin';
import AdminDashboard from './components/AdminDashboard'; // ✅ ADDED
import Notfound from './components/Notfound';

function App() {
  return (
    <Router>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}
        <Route path="/" element={<Getproducts />} />
        <Route path="/getproducts" element={<Getproducts />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* =========================
            ADMIN AUTH
        ========================= */}
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* =========================
            ADMIN DASHBOARD (NEW 🔥)
        ========================= */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* =========================
            PRODUCT MANAGEMENT
        ========================= */}
        <Route path="/addproducts" element={<Addproducts />} />

        {/* =========================
            PAYMENTS
        ========================= */}
        <Route path="/makepayment" element={<Makepayments />} />

        {/* =========================
            404
        ========================= */}
        <Route path="*" element={<Notfound />} />

      </Routes>

      {/* GLOBAL FOOTER */}
      <Footer />

    </Router>
  );
}

export default App;