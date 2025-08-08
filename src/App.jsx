import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Offers from "./components/Offers";
import Banners from "./components/Banners";
import Categories from "./components/Categories";
import PromoCodes from "./components/PromoCodes";
import Layout from './Layout';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />

        <div className="md:ml-64 pt-16 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/promocodes" element={<PromoCodes />} />
<Route path="/" element={<Layout />}>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;