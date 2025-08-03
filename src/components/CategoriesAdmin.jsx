import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: "", imageUrl: "" });

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.title || !newCategory.imageUrl) return;
    await addDoc(collection(db, "categories"), newCategory);
    setNewCategory({ title: "", imageUrl: "" });
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Category Title"
          value={newCategory.title}
          onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Image URL"
          value={newCategory.imageUrl}
          onChange={(e) => setNewCategory({ ...newCategory, imageUrl: e.target.value })}
        />
        <button className="bg-green-500 px-4 py-2 text-white" onClick={addCategory}>
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded">
            <img src={category.imageUrl} alt={category.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="font-semibold">{category.title}</h3>
            <button className="bg-red-500 text-white px-2 py-1 mt-2" onClick={() => deleteCategory(category.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesAdmin;