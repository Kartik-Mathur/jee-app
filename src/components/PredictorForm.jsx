import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PredictorForm = () => {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("Gender-Neutral");
  const [quota, setQuota] = useState("AI");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rank) return alert("Please enter your JEE Advanced rank.");

    navigate("/results", {
      state: {
        rank: parseInt(rank),
        category,
        gender,
        quota,
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 px-4 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-300 opacity-30 rounded-full blur-2xl z-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-xl shadow-blue-200/30 rounded-2xl p-8 space-y-6 border border-blue-100 animate-fade-in"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjyyrYYvwsGJUaKWIGOebm7tXrPBA9JtvhTg&s"
              alt="App Logo"
              className="w-10 h-10 object-contain"
            />
            <span>JEE Advanced College Predictor</span>
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Discover where you stand. Your dream college is just a click away.
          </p>
        </div>

        {/* RANK INPUT */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            JEE Advanced Rank
          </label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your rank"
            required
          />
        </div>

        {/* OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="ALL">All Categories</option>
              <option value="EWS">EWS</option>
              <option value="EWS (PwD)">EWS (PwD)</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="OBC-NCL(PwD)">OBC-NCL (PwD)</option>
              <option value="OPEN">OPEN</option>
              <option value="OPEN (PwD)">OPEN (PwD)</option>
              <option value="SC">SC</option>
              <option value="SC (PwD)">SC (PwD)</option>
              <option value="ST">ST</option>
              <option value="ST (PwD)">ST (PwD)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="Gender-Neutral">Gender-Neutral</option>
              <option value="Female-only (including Supernumerary)">
                Female-only
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quota
            </label>
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="AI">All India (AI)</option>
              <option value="HS">Home State (HS)</option>
              <option value="OS">Other State (OS)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-md shadow-md transition-all duration-300"
          >
            🔍 Show My Colleges
          </button>
        </div>
      </form>

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PredictorForm;
