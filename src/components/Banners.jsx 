import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState("");

  const fetchBanners = async () => {
    const snap = await getDocs(collection(db, "banners"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBanners(data);
  };

  const handleAdd = async () => {
    if (!image) return;
    await addDoc(collection(db, "banners"), { image });
    setImage("");
    fetchBanners();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "banners", id));
    fetchBanners();
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Banners</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {banners.map((item) => (
          <div key={item.id} className="relative">
            <img src={item.image} alt="banner" className="rounded-lg h-24 w-full object-cover" />
            <button onClick={() => handleDelete(item.id)} className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;