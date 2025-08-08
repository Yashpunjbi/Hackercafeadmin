import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const PromoCodeManager = () => {
  const [codes, setCodes] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    minAmount: "",
    type: "flat",
    maxDiscount: "",
    expiry: "",
    active: true,
  });

  const fetchCodes = async () => {
    const snap = await getDocs(collection(db, "promoCodes"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCodes(data);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleAdd = async () => {
    const data = {
      ...form,
      discount: Number(form.discount),
      minAmount: Number(form.minAmount),
      maxDiscount: Number(form.maxDiscount),
      expiry: form.expiry ? Timestamp.fromDate(new Date(form.expiry)) : null,
    };
    await addDoc(collection(db, "promoCodes"), data);
    setForm({
      code: "",
      discount: "",
      minAmount: "",
      type: "flat",
      maxDiscount: "",
      expiry: "",
      active: true,
    });
    fetchCodes();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "promoCodes", id));
    fetchCodes();
  };

  const handleToggle = async (id, status) => {
    await updateDoc(doc(db, "promoCodes", id), { active: !status });
    fetchCodes();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Promo Code Manager</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Code (e.g. FIRST50)"
          className="border p-2 rounded"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount (e.g. 50)"
          className="border p-2 rounded"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Cart Amount"
          className="border p-2 rounded"
          value={form.minAmount}
          onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="flat">Flat ₹</option>
          <option value="percent">Percentage %</option>
        </select>
        <input
          type="number"
          placeholder="Max Discount (if %)"
          className="border p-2 rounded"
          value={form.maxDiscount}
          onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={form.expiry}
          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-pink-600 text-white py-2 px-4 rounded"
      >
        Add Promo Code
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Active Promo Codes</h3>
        {codes.map((code) => (
          <div
            key={code.id}
            className="flex justify-between items-center border p-2 rounded mb-2"
          >
            <div>
              <p className="font-bold">{code.code}</p>
              <p className="text-sm">
                ₹{code.discount} | Min ₹{code.minAmount} | {code.type}{" "}
                {code.type === "percent" && `(Max ₹${code.maxDiscount})`}{" "}
                {code.expiry && `| Exp: ${new Date(code.expiry.seconds * 1000).toLocaleString()}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`text-xs px-3 py-1 rounded ${
                  code.active ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => handleToggle(code.id, code.active)}
              >
                {code.active ? "Active" : "Inactive"}
              </button>
              <button
                className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                onClick={() => handleDelete(code.id)}
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

export default PromoCodeManager;