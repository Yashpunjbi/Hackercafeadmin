import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const CategoryManager = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    const items = [];
    snap.forEach((doc) =>
      items.push({ id: doc.id, ...doc.data() })
    );
    setCategories(items);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!title || !image) return alert("Please fill both fields");
    await addDoc(collection(db, "categories"), { title, image });
    setTitle("");
    setImage("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Category Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Category Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Category
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border p-3 rounded-xl text-center relative bg-gray-50"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
            />
            <p className="font-semibold">{cat.title}</p>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500 mt-2 text-sm"
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;