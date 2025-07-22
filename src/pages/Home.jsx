import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Orders from "../components/Orders";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setPage={setPage} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "orders" && <Orders />}
        </div>
      </div>
    </div>
  );
};

export default Home;
