// src/components/CategoryAdmin.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteDoc(doc(db, "categories", id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded p-3 text-center shadow">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 object-cover mx-auto rounded-full"
            />
            <p className="mt-2 font-semibold">{cat.name}</p>
            <button
              onClick={() => handleDelete(cat.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAdmin;