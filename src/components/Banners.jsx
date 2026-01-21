import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Tiffins = () => {
  const [tiffins, setTiffins] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchTiffins = async () => {
    const snap = await getDocs(collection(db, "tiffins"));
    setTiffins(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  const addTiffin = async () => {
    if (!name || !price || !image) return alert("All fields required");

    await addDoc(collection(db, "tiffins"), {
      name,
      price: Number(price),
      image,
      available: true,
    });

    setName("");
    setPrice("");
    setImage("");
    fetchTiffins();
  };

  const deleteTiffin = async (id) => {
    await deleteDoc(doc(db, "tiffins", id));
    fetchTiffins();
  };

  const toggleAvailability = async (id, status) => {
    await updateDoc(doc(db, "tiffins", id), {
      available: !status,
    });
    fetchTiffins();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍱 School Tiffin Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <input placeholder="Tiffin Name" className="border p-2" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Price" type="number" className="border p-2" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Image URL" className="border p-2" value={image} onChange={e => setImage(e.target.value)} />
        <button onClick={addTiffin} className="bg-green-600 text-white rounded">Add</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiffins.map(t => (
          <div key={t.id} className="border rounded p-2">
            <img src={t.image} className="h-32 w-full object-cover rounded" />
            <h3 className="font-semibold mt-1">{t.name}</h3>
            <p>₹{t.price}</p>
            <p className="text-sm">{t.available ? "Available ✅" : "Unavailable ❌"}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => toggleAvailability(t.id, t.available)} className="bg-yellow-500 text-white px-2 rounded">Toggle</button>
              <button onClick={() => deleteTiffin(t.id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffins;