import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Tiffin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tiffins, setTiffins] = useState([]);

  // 🔹 Cloudinary upload
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hacker_cafe_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkdkq23w7/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setUploading(false);

    if (!data.secure_url) throw new Error("Upload failed");
    return data.secure_url;
  };

  const fetchTiffins = async () => {
    const snap = await getDocs(collection(db, "Tiffins"));
    setTiffins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const addTiffin = async () => {
    if (!name || !price || !image)
      return alert("Name, price & image required");

    await addDoc(collection(db, "Tiffins"), {
      name,
      price: Number(price),
      image,
      available: true,
      createdAt: serverTimestamp(),
    });

    setName("");
    setPrice("");
    setImage("");
    fetchTiffins();
  };

  const toggleStock = async (id, status) => {
    await updateDoc(doc(db, "Tiffins", id), {
      available: !status,
    });
    fetchTiffins();
  };

  const deleteTiffin = async (id) => {
    if (!window.confirm("Delete this tiffin?")) return;
    await deleteDoc(doc(db, "Tiffins", id));
    fetchTiffins();
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍱 Tiffin Manager</h1>

      {/* Add form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          placeholder="Tiffin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full mb-2"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
              const url = await uploadImage(file);
              setImage(url);
            } catch {
              alert("Image upload failed");
            }
          }}
        />

        {uploading && (
          <p className="text-sm text-blue-600">Uploading image...</p>
        )}

        {image && (
          <img
            src={image}
            className="h-32 w-32 object-cover rounded mb-2"
          />
        )}

        <button
          onClick={addTiffin}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Tiffin
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiffins.map((t) => (
          <div
            key={t.id}
            className={`border p-3 rounded ${
              !t.available ? "opacity-60" : ""
            }`}
          >
            <img
              src={t.image}
              className="h-32 w-full object-cover rounded"
            />

            <h2 className="font-bold mt-2">{t.name}</h2>
            <p className="text-green-600 font-bold">₹{t.price}</p>

            <p
              className={`text-sm mt-1 font-semibold ${
                t.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {t.available ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => toggleStock(t.id, t.available)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded"
              >
                {t.available ? "Out of Stock" : "In Stock"}
              </button>

              <button
                onClick={() => deleteTiffin(t.id)}
                className="flex-1 bg-red-600 text-white py-1 rounded"
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

export default Tiffin;