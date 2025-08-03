// src/components/CategoriesAdmin.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded shadow p-4 text-center">
              <img src={cat.imageUrl} alt={cat.title} className="w-20 h-20 mx-auto object-cover rounded-full" />
              <p className="mt-2 font-semibold">{cat.title}</p>
              <button
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteCategory(cat.id)}
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

export default CategoriesAdmin;