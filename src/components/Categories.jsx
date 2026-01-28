import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const Categories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  // 🔥 Cloudinary Upload
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hacker_cafe_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setUploading(false);

    if (!data.secure_url) throw new Error("Upload failed");
    setImage(data.secure_url);
  };

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name || !image) return alert("Name & image required");
    await addDoc(collection(db, "categories"), { name, image });
    setName("");
    setImage("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Category name"
          className="border px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />

        <button
          onClick={addCategory}
          disabled={uploading}
          className="bg-green-600 text-white px-4"
        >
          {uploading ? "Uploading..." : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="border p-2 text-center">
            <img src={cat.image} className="h-24 w-full object-cover mb-2" />
            <p>{cat.name}</p>
            <button
              className="text-red-500 text-sm"
              onClick={() => deleteCategory(cat.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;