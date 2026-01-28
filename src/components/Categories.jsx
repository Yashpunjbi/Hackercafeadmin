import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Categories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hacker_cafe_u");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
};


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(list);
  };

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const imageRef = ref(
        storage,
        `categories/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImage(url);
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!name || !image) return alert("Name & image required");
    await addDoc(collection(db, "categories"), { name, image });
    setName("");
    setImage("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      {/* ADD CATEGORY */}
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Category name"
          className="border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 🔥 GALLERY UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="border px-2 py-1 rounded text-sm"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-1 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add"}
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border p-2 rounded shadow text-center bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="font-semibold">{cat.name}</p>
            <button
              onClick={() => handleDelete(cat.id)}
              className="mt-2 text-sm text-red-500"
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