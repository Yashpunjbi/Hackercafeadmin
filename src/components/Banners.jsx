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

  useEffect(() => {
    return onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const uploadImage = async (file) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "hacker_cafe_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
      { method: "POST", body: fd }
    );

    const data = await res.json();
    setUploading(false);
    setImage(data.secure_url);
  };

  const addBanner = async () => {
    if (!title || !image) return alert("Fill all fields");
    await addDoc(collection(db, "banners"), { title, image });
    setTitle("");
    setImage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Banners</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Banner title"
          className="border px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />

        <button
          onClick={addBanner}
          disabled={uploading}
          className="bg-blue-600 text-white px-4"
        >
          {uploading ? "Uploading..." : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map(b => (
          <div key={b.id} className="border p-2 relative">
            <img src={b.image} className="h-32 w-full object-cover" />
            <p className="mt-2">{b.title}</p>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-2"
              onClick={() => deleteDoc(doc(db, "banners", b.id))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;