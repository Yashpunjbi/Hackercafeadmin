import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // image URL
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBanners(list);
    });

    return () => unsub();
  }, []);

  // 🔥 IMAGE UPLOAD HANDLER
  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const imageRef = ref(
        storage,
        `banners/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImage(url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!title || !image) return alert("Please fill all fields");
    await addDoc(collection(db, "banners"), { title, image });
    setTitle("");
    setImage("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "banners", id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Banners</h2>

      {/* ADD BANNER */}
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Banner Title"
          className="border px-2 py-1 rounded w-1/3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 🔥 GALLERY UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="border px-2 py-1 rounded w-1/3 text-sm"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleAdd}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Banner"}
        </button>
      </div>

      {/* BANNER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded p-2 relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="mt-2 font-semibold">{banner.title}</h4>
            <button
              className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 text-sm rounded"
              onClick={() => handleDelete(banner.id)}
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