// src/components/BannerAdmin.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "banners"), (snapshot) => {
      const bannerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBanners(bannerData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "banners", id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Banners</h2>
      {banners.length === 0 ? (
        <p className="text-gray-400">No banners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-lg shadow p-4 border"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{banner.title}</h3>
              <p className="text-sm text-gray-500">
                Active: {banner.active ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleDelete(banner.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;