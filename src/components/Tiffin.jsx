import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const Tiffin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [tiffins, setTiffins] = useState([]);

  const fetchTiffins = async () => {
    const snap = await getDocs(collection(db, "Tiffins"));
    setTiffins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const addTiffin = async () => {
    if (!name || !price) return alert("Name & price required");

    await addDoc(collection(db, "Tiffins"), {
      name,
      price: Number(price),
      image,
      available: true,
      category: "school",
      createdAt: serverTimestamp(),
    });

    setName("");
    setPrice("");
    setImage("");
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
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={addTiffin}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Tiffin
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiffins.map((t) => (
          <div key={t.id} className="border p-3 rounded">
            <img
              src={t.image}
              className="h-32 w-full object-cover rounded"
            />
            <h2 className="font-bold mt-2">{t.name}</h2>
            <p className="text-green-600">₹{t.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;