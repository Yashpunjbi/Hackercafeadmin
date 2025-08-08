import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Offers from "./components/OffersAdmin";
import Banners from "./components/Banners";
import Categories from "./components/Categories";
import PromoCodes from "./components/PromoCodes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="offers" element={<Offers />} />
          <Route path="banners" element={<Banners />} />
          <Route path="categories" element={<Categories />} />
          <Route path="promocodes" element={<PromoCodes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;