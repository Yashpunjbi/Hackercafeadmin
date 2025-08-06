import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

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

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Banner Title"
          className="border px-2 py-1 rounded w-1/3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border px-2 py-1 rounded w-1/3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleAdd}
        >
          Add Banner
        </button>
      </div>

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