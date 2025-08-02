import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
  };

  const handleAdd = async () => {
    if (!name || !image) return;
    await addDoc(collection(db, "categories"), { name, image });
    setName(""); setImage("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-1 rounded">Add</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="relative text-center">
            <img src={cat.image} alt={cat.name} className="rounded-full h-16 w-16 mx-auto object-cover" />
            <p className="text-sm mt-1">{cat.name}</p>
            <button onClick={() => handleDelete(cat.id)} className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;