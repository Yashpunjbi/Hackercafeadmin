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

  // 🔥 Cloudinary upload
  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "hacker_cafe_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
      { method: "POST", body: fd }
    );

    const data = await res.json();
    setUploading(false);

    if (!data.secure_url) {
      alert("Image upload failed");
      return;
    }

    setP((prev) => ({ ...prev, image: data.secure_url }));
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
    await updateDoc(doc(db, "products", id), {
      inStock: !status,
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Products</h2>

      {/* ADD FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          placeholder="Name"
          className="border w-full mb-2 p-2"
          value={p.name}
          onChange={(e) => setP({ ...p, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="border w-full mb-2 p-2"
          value={p.price}
          onChange={(e) => setP({ ...p, price: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="mb-2"
        />

        <input
          placeholder="Category"
          className="border w-full mb-3 p-2"
          value={p.category}
          onChange={(e) => setP({ ...p, category: e.target.value })}
        />

        <button
          onClick={addProduct}
          disabled={uploading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </div>

      {/* 🔥 PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className={`border p-3 rounded ${
              !item.inStock ? "opacity-60" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.name}</h3>
            <p className="text-green-600 font-semibold">₹{item.price}</p>
            <p className="text-sm">Category: {item.category}</p>

            <p
              className={`text-sm font-semibold ${
                item.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => toggleStock(item.id, item.inStock)}
              >
                Toggle Stock
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
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