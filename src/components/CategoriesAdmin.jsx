// src/components/CategoryAdmin.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const catData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(catData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      {categories.length === 0 ? (
        <p className="text-gray-400">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg shadow p-4 border"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{cat.name}</h3>
              <p className="text-sm text-gray-500">
                Active: {cat.active ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleDelete(cat.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryAdmin;