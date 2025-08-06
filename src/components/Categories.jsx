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
  const [categories, setCategories] = useState([]);

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

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Category name"
          className="border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border px-2 py-1 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border p-2 rounded shadow text-center bg-white"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover rounded mb-2" />
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