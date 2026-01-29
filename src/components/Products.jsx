import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [p, setP] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
  });

  // 🔥 Cloudinary upload with validation + preview
  const uploadImage = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image size must be less than 1MB");
      return;
    }

    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "hacker_cafe_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
        { method: "POST", body: fd }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error();

      setP((prev) => ({ ...prev, image: data.secure_url }));
    } catch {
      alert("Image upload failed");
    }

    setUploading(false);
  };

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!p.name || !p.price || !p.image || !p.category)
      return alert("Fill all fields");

    await addDoc(collection(db, "products"), {
      ...p,
      price: Number(p.price),
    });

    setP({ name: "", price: "", image: "", category: "", inStock: true });
    fetchProducts();
  };

  const toggleStock = async (id, status) => {
    await updateDoc(doc(db, "products", id), { inStock: !status });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📦 Products Manager</h2>

      {/* ➕ ADD PRODUCT */}
      <div className="bg-white p-5 rounded-xl shadow mb-8 max-w-xl">
        <h3 className="font-semibold mb-4">Add New Product</h3>

        <input
          placeholder="Product Name"
          className="border w-full mb-3 p-2 rounded"
          value={p.name}
          onChange={(e) => setP({ ...p, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="border w-full mb-3 p-2 rounded"
          value={p.price}
          onChange={(e) => setP({ ...p, price: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border w-full mb-3 p-2 rounded"
          value={p.category}
          onChange={(e) => setP({ ...p, category: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="mb-3"
        />

        {/* 🖼️ IMAGE PREVIEW */}
        {p.image && (
          <img
            src={p.image}
            alt="preview"
            className="h-32 w-full object-cover rounded mb-3 border"
          />
        )}

        <button
          onClick={addProduct}
          disabled={uploading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {uploading ? "Uploading Image..." : "Add Product"}
        </button>
      </div>

      {/* 📋 PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow p-4 ${
              !item.inStock ? "opacity-60" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-36 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.name}</h3>
            <p className="text-green-600 font-semibold">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>

            <span
              className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                item.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {item.inStock ? "In Stock" : "Out of Stock"}
            </span>

            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-yellow-500 text-white py-1 rounded"
                onClick={() => toggleStock(item.id, item.inStock)}
              >
                Toggle
              </button>
              <button
                className="flex-1 bg-red-600 text-white py-1 rounded"
                onClick={() => deleteProduct(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;