import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddTiffin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("All fields required");
      return;
    }

    try {
      await addDoc(collection(db, "tiffins"), {
        name: name,
        price: Number(price),
        image: image,
        description: description,
        available: true,
        category: "school",
        createdAt: serverTimestamp(),
      });

      alert("✅ Tiffin Added Successfully");
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error adding tiffin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        placeholder="Tiffin Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add Tiffin
      </button>
    </form>
  );
};

export default AddTiffin;