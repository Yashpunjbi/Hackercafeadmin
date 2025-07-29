
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const OffersAdmin = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "offers"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOffers(data);
    });

    return () => unsub();
  }, []);

  const handleAddOffer = async () => {
    if (!title || !imageUrl || !price) return alert("Please fill all fields");

    try {
      await addDoc(collection(db, "offers"), {
        title,
        imageUrl,
        price,
      });
      setTitle("");
      setImageUrl("");
      setPrice("");
    } catch (err) {
      console.error("Error adding offer:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "offers", id));
    } catch (err) {
      console.error("Error deleting offer:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Manage Offers</h2>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Offer Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleAddOffer}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={offer.imageUrl}
              alt={offer.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2 text-lg">{offer.title}</h3>
            <p className="text-green-600 font-bold">₹{offer.price}</p>
            <button
              onClick={() => handleDelete(offer.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersAdmin;