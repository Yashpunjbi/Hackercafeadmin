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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 REALTIME FETCH
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // 🔥 IMAGE UPLOAD WITH SIZE CHECK
  const uploadImage = async (file) => {
    if (!file) return;

    setError("");
    setUploading(true);

    // 🧠 IMAGE SIZE VALIDATION
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width < 1000 || img.height < 300) {
        setError("Image must be at least 1200×400 px (banner size)");
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

  // 🔥 ADD BANNER
  const addBanner = async () => {
    if (!title || !image) return alert("Title & image required");

    await addDoc(collection(db, "banners"), {
      title,
      image,
      createdAt: Date.now(),
    });

    setTitle("");
    setImage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ Banner Manager</h2>

      {/* ADD BANNER CARD */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 max-w-lg">
        <label className="block text-sm font-semibold mb-1">
          Banner Title
        </label>
        <input
          className="border px-3 py-2 w-full rounded mb-3"
          placeholder="Eg: School Tiffin Offer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-sm font-semibold mb-1">
          Banner Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="mb-2"
        />

        {/* 🧠 SIZE INFO */}
        <p className="text-xs text-gray-500 mb-2">
          Recommended size: <b>1200 × 400 px</b> (wide banner)
        </p>

        {/* ❌ ERROR */}
        {error && (
          <p className="text-sm text-red-600 mb-2">{error}</p>
        )}

        {/* 👁️ IMAGE PREVIEW */}
        {image && (
          <img
            src={image}
            alt="preview"
            className="w-full h-32 object-cover rounded-lg border mb-3"
          />
        )}

        <button
          onClick={addBanner}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
        >
          {uploading ? "Uploading..." : "Add Banner"}
        </button>
      </div>

      {/* BANNER LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow rounded-lg overflow-hidden relative"
          >
            <img
              src={b.image}
              className="h-32 w-full object-cover"
            />
            <p className="p-2 font-semibold text-center">
              {b.title}
            </p>

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