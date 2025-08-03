// src/components/BannerAdmin.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banner"), (snapshot) => {
      setBanners(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const deleteBanner = async (id) => {
    await deleteDoc(doc(db, "banner", id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Banners</h2>
      {banners.length === 0 ? (
        <p className="text-gray-500">No banners found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded shadow p-4">
              <img src={banner.imageUrl} alt={banner.title} className="w-full h-40 object-cover rounded" />
              <p className="mt-2 font-semibold">{banner.title}</p>
              <button
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteBanner(banner.id)}
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