import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");

  const fetchBanners = async () => {
    const querySnapshot = await getDocs(collection(db, "banners"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setBanners(items);
  };

  const addBanner = async () => {
    if (!imageUrl) return;
    await addDoc(collection(db, "banners"), {
      imageUrl,
      altText,
      active: true,
    });
    setImageUrl("");
    setAltText("");
    fetchBanners();
  };

  const deleteBanner = async (id) => {
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
          className="border p-2 flex-1"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Alt text"
          className="border p-2 flex-1"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
        <button
          onClick={addBanner}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="relative border rounded overflow-hidden">
            <img src={banner.imageUrl} alt={banner.altText} className="w-full h-28 object-cover" />
            <button
              onClick={() => deleteBanner(banner.id)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;