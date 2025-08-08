import React from 'react';
import { Menu } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
      <button onClick={toggleSidebar}>
        <Menu className="w-6 h-6 text-black" />
      </button>
      <h1 className="text-xl font-semibold">Admin Panel</h1>
    </div>
  );
};

export default Topbar;