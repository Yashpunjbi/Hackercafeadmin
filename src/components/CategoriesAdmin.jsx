import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(list);
  };

  const handleSubmit = async () => {
    if (!newCategory.name || !newCategory.image) return alert("All fields required");
    if (editingId) {
      await updateDoc(doc(db, "categories", editingId), newCategory);
    } else {
      await addDoc(collection(db, "categories"), newCategory);
    }
    setNewCategory({ name: "", image: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setNewCategory({ name: cat.name, image: cat.image });
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          value={newCategory.image}
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
        />
        <Button onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="border p-3 rounded-md shadow">
            <img src={cat.image} alt={cat.name} className="h-24 w-full object-cover rounded" />
            <h4 className="mt-2 font-semibold text-center">{cat.name}</h4>
            <div className="flex justify-center mt-2 gap-2">
              <Button onClick={() => handleEdit(cat)} size="sm">Edit</Button>
              <Button onClick={() => handleDelete(cat.id)} size="sm" variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;