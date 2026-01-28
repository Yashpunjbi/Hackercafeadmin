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

  const uploadImage = async (file) => {
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
    setP({ ...p, image: data.secure_url });
  };

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!p.name || !p.price || !p.image || !p.category)
      return alert("Fill all");

    await addDoc(collection(db, "products"), {
      ...p,
      price: Number(p.price),
    });

    setP({ name: "", price: "", image: "", category: "", inStock: true });
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <input placeholder="Name" className="border w-full mb-2"
        value={p.name} onChange={e => setP({ ...p, name: e.target.value })} />

      <input placeholder="Price" type="number" className="border w-full mb-2"
        value={p.price} onChange={e => setP({ ...p, price: e.target.value })} />

      <input type="file" onChange={e => uploadImage(e.target.files[0])} />

      <input placeholder="Category" className="border w-full mb-2"
        value={p.category} onChange={e => setP({ ...p, category: e.target.value })} />

      <button onClick={addProduct}
        disabled={uploading}
        className="bg-green-600 text-white px-4 py-2">
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
};

export default Products;