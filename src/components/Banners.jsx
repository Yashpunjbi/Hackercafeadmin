import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("half"); // 👈 NEW
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // 🔥 IMAGE UPLOAD
  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "hacker_cafe_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
        { method: "POST", body: fd }
      );
      const data = await res.json();
      setImage(data.secure_url);
    } catch {
      setError("Upload failed");
    }

    setUploading(false);
  };

  // ➕ ADD BANNER
  const addBanner = async () => {
    if (!title || !image) return alert("Title & image required");

    await addDoc(collection(db, "banners"), {
      title,
      image,
      type, // 👈 SAVE TYPE
      createdAt: Date.now(),
    });

    setTitle("");
    setImage("");
    setType("half");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ Banner Manager</h2>

      {/* ADD */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 max-w-lg">
        <input
          placeholder="Banner Title"
          className="border p-2 w-full rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 🔽 BANNER TYPE */}
        <select
          className="border p-2 w-full rounded mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="half">Half Screen Banner</option>
          <option value="full">Full Screen Banner</option>
        </select>

        {/* ℹ️ INFO */}
        <p className="text-xs text-gray-500 mb-3">
          {type === "half"
            ? "User panel height: ~200px (recommended 1200×400)"
            : "User panel height: ~300px (recommended 1200×600)"}
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="mb-3"
        />

        {image && (
          <img
            src={image}
            className={`w-full object-cover rounded mb-3 ${
              type === "half" ? "h-32" : "h-48"
            }`}
          />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={addBanner}
          disabled={uploading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {uploading ? "Uploading..." : "Add Banner"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded shadow relative">
            <img
              src={b.image}
              className={`w-full object-cover ${
                b.type === "half" ? "h-32" : "h-48"
              }`}
            />
            <p className="text-center font-semibold py-2">
              {b.title}
            </p>
            <span className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded">
              {b.type === "half" ? "Half Screen" : "Full Screen"}
            </span>
            <button
              onClick={() => deleteDoc(doc(db, "banners", b.id))}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
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