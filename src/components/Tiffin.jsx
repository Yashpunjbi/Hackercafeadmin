import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const Tiffin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [tiffins, setTiffins] = useState([]);

  const fetchTiffins = async () => {
    const snap = await getDocs(collection(db, "tiffins"));
    setTiffins(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  const addTiffin = async () => {
    if (!name || !price || !image) return alert("Fill all fields");

    await addDoc(collection(db, "tiffins"), {
      name,
      price: Number(price),
      image,
      available: true,
      createdAt: new Date(),
    });

    setName(""); setPrice(""); setImage("");
    fetchTiffins();
  };

  const deleteTiffin = async (id) => {
    await deleteDoc(doc(db, "tiffins", id));
    fetchTiffins();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍱 Manage Tiffins</h2>

      <input placeholder="Tiffin Name" value={name}
        onChange={e => setName(e.target.value)} className="border p-2 w-full mb-2" />

      <input placeholder="Price" value={price}
        onChange={e => setPrice(e.target.value)} className="border p-2 w-full mb-2" />

      <input placeholder="Image URL" value={image}
        onChange={e => setImage(e.target.value)} className="border p-2 w-full mb-2" />

      <button onClick={addTiffin}
        className="bg-green-600 text-white px-4 py-2 rounded">
        Add Tiffin
      </button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {tiffins.map(t => (
          <div key={t.id} className="border p-2 rounded">
            <img src={t.image} className="h-24 w-full object-cover rounded" />
            <h3 className="font-bold">{t.name}</h3>
            <p>₹{t.price}</p>
            <button onClick={() => deleteTiffin(t.id)}
              className="text-red-600 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;