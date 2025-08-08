import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Orders', path: '/orders' },
  { name: 'Products', path: '/products' },
  { name: 'Offers', path: '/offersadmin' },
  { name: 'Banners', path: '/banners' },
  { name: 'Categories', path: '/categories' },
  { name: 'PromoCodes', path: '/promocodes' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-black text-white w-64 p-4 space-y-4 fixed md:relative z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X />
          </button>
        </div>
        <nav className="space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-white hover:text-black ${
                location.pathname === item.path ? 'bg-white text-black font-semibold' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white shadow p-4 flex items-center justify-between md:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu />
          </button>
          <h1 className="text-lg font-bold hidden md:block">Hacker Cafe Admin</h1>
        </div>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}