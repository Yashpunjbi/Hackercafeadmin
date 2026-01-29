import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [page, setPage] = useState("home"); // 🧠 Select page
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const uploadImage = async (file) => {
    if (!file) return;
    setError("");
    setUploading(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width < 1200 || img.height < 400) {
        setError("Minimum size 1200×400 px required");
        setUploading(false);
        return;
      }

      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "hacker_cafe_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
        { method: "POST", body: fd }
      );

      const data = await res.json();
      setImage(data.secure_url);
      setUploading(false);
    };
  };

  const addBanner = async () => {
    if (!title || !image) return alert("Title & Image required");

    await addDoc(collection(db, "banners"), {
      title,
      image,
      page, // 🧠 Save page type
      createdAt: Date.now(),
    });

    setTitle("");
    setImage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ Banner Manager</h2>

      <div className="bg-white rounded-xl shadow p-4 mb-6 max-w-lg">
        <input
          className="border px-3 py-2 w-full rounded mb-3"
          placeholder="Banner Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="mb-2"
        />

        <p className="text-xs text-gray-500 mb-2">
          Minimum size: 1200 × 400 px
        </p>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {image && (
          <img
            src={image}
            className="w-full h-32 object-cover rounded mb-3 border"
          />
        )}

        {/* 🧠 Select page */}
        <select
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="border px-2 py-1 w-full mb-3 rounded"
        >
          <option value="home">Home Page</option>
          <option value="tiffin">Tiffin Page</option>
        </select>

        <button
          onClick={addBanner}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
        >
          {uploading ? "Uploading..." : "Add Banner"}
        </button>
      </div>

      {/* Banner List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="bg-white shadow rounded-lg overflow-hidden relative">
            <img src={b.image} className="h-32 w-full object-cover" />
            <p className="p-2 font-semibold text-center">{b.title}</p>
            <p className="text-center text-sm text-gray-500 mb-2">{b.page}</p>

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