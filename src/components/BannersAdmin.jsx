// src/components/BannerAdmin.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBanners(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteDoc(doc(db, "banners", id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Banners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded p-4 shadow">
            <img
              src={banner.image}
              alt="Banner"
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 font-medium">{banner.name || "No Title"}</p>
            <button
              onClick={() => handleDelete(banner.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;