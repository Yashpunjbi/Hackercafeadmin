import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-5 z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:block`}
    >
      <h2 className="text-2xl font-bold mb-5">Hacker Cafe</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" onClick={toggleSidebar}>Dashboard</Link>
        <Link to="/orders" onClick={toggleSidebar}>Orders</Link>
        <Link to="/products" onClick={toggleSidebar}>Products</Link>
        <Link to="/offers" onClick={toggleSidebar}>Offers</Link>
        <Link to="/banners" onClick={toggleSidebar}>Banners</Link>
        <Link to="/categories" onClick={toggleSidebar}>Categories</Link>
        <Link to="/promocodes" onClick={toggleSidebar}>Promo Codes</Link>
      </nav>
    </div>
  );
};

export default Sidebar;