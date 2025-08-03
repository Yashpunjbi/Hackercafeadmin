import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "banners"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBanners(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Banners</h1>
      {banners.length === 0 ? (
        <p>No banners found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map(banner => (
            <div key={banner.id} className="p-2 border rounded shadow">
              <img src={banner.imageUrl} alt={banner.title} className="w-full h-40 object-cover" />
              <h2 className="mt-2 font-semibold">{banner.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;