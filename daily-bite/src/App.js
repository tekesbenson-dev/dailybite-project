import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// =========================
// COMPONENTS
// =========================
import Navbar from './components/Header';
import Footer from './components/Footer';   // ✅ ADD THIS
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayments from './components/Makepayments';
import Adminlogin from './components/Adminlogin';
import Notfound from './components/Notfound';

function App() {
  return (
    <Router>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Getproducts />} />
        <Route path="/getproducts" element={<Getproducts />} />

        {/* AUTH */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* ADMIN */}
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* PRODUCTS */}
        <Route path="/addproducts" element={<Addproducts />} />

        {/* PAYMENT */}
        <Route path="/makepayment" element={<Makepayments />} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />

      </Routes>

      {/* GLOBAL FOOTER (IMPORTANT ✅) */}
      <Footer />

    </Router>
  );
}

export default App;