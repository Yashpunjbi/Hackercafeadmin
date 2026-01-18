import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
  });

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const imageRef = ref(
        storage,
        `products/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setNewProduct({ ...newProduct, image: url });
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  };

  const addProduct = async () => {
    const { name, price, image, category } = newProduct;
    if (!name || !price || !image || !category) {
      alert("Please fill all fields.");
      return;
    }

    await addDoc(collection(db, "products"), {
      ...newProduct,
      price: Number(price),
      category: category.toLowerCase(),
    });

    setNewProduct({
      name: "",
      price: "",
      image: "",
      category: "",
      inStock: true,
    });

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const toggleStock = async (id, status) => {
    await updateDoc(doc(db, "products", id), {
      inStock: !status,
    });
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Products</h2>

      {/* ADD PRODUCT */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 w-full"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border px-3 py-2 w-full"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        {/* 🔥 GALLERY UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="border px-3 py-2 w-full text-sm"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Category (pizza, sandwich)"
          className="border px-3 py-2 w-full"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />

        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={addProduct}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image}
              alt=""
              className="h-32 object-cover w-full mb-2"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>₹{product.price}</p>
            <p>Category: {product.category}</p>
            <p>
              Status:{" "}
              {product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 px-3 py-1 text-white"
                onClick={() =>
                  toggleStock(product.id, product.inStock)
                }
              >
                Toggle Stock
              </button>
              <button
                className="bg-red-500 px-3 py-1 text-white"
                onClick={() => deleteProduct(product.id)}
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