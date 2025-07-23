import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-pink-200 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        🎉 Welcome to Ddos Kitchen Admin Panel
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        You are successfully logged in!
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;