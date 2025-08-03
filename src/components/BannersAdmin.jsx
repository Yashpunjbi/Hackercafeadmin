import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ title: "", imageUrl: "" });

  const fetchBanners = async () => {
    const snapshot = await getDocs(collection(db, "banners"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const addBanner = async () => {
    if (!newBanner.title || !newBanner.imageUrl) return;
    await addDoc(collection(db, "banners"), newBanner);
    setNewBanner({ title: "", imageUrl: "" });
    fetchBanners();
  };

  const deleteBanner = async (id) => {
    await deleteDoc(doc(db, "banners", id));
    fetchBanners();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Banners</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Banner Title"
          value={newBanner.title}
          onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Image URL"
          value={newBanner.imageUrl}
          onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
        />
        <button className="bg-green-500 px-4 py-2 text-white" onClick={addBanner}>
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border p-4 rounded">
            <img src={banner.imageUrl} alt={banner.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="font-semibold">{banner.title}</h3>
            <button className="bg-red-500 text-white px-2 py-1 mt-2" onClick={() => deleteBanner(banner.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;