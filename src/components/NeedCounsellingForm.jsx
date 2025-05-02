import React, { useState } from "react";

const NeedCounsellingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rank: "",
    preferences: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/counselling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Error submitting form");
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 text-green-700 p-4 rounded">
        🎉 Thank you! Our counsellors will reach out soon.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold text-gray-800">Need Counselling?</h3>
      <p className="text-sm text-gray-500 mb-2">
        We’ll help you shortlist colleges.
      </p>

      <input
        name="name"
        required
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        name="phone"
        required
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        name="rank"
        placeholder="Your JEE Rank"
        value={formData.rank}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        name="preferences"
        placeholder="Program/College Preferences (optional)"
        value={formData.preferences}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default NeedCounsellingForm;
