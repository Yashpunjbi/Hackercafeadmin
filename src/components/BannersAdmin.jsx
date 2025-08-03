import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const BannerForm = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      const snap = await getDocs(collection(db, "banner"));
      snap.forEach((doc) => setImage(doc.data().image));
    };
    fetchBanner();
  }, []);

  const handleUpdate = async () => {
    const bannerRef = doc(db, "banner", "main");
    await setDoc(bannerRef, { image });
    alert("✅ Banner updated successfully!");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Banner Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      {image && (
        <img src={image} alt="Banner" className="w-full rounded-lg shadow" />
      )}
      <button
        onClick={handleUpdate}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Save Banner
      </button>
    </div>
  );
};

export default BannerForm;