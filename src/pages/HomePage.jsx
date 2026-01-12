// src/pages/HomePage.jsx
import React from 'react';
import { FaHome, FaBook, FaStore, FaBoxOpen, FaTrophy, FaCoins } from 'react-icons/fa';

// Props: 
// - username (string)
// - gold (number)
// - onStartStudy (function) -> navigate to Study page
export default function HomePage({ username, gold, onStartStudy }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Username */}
        <div className="font-semibold text-gray-800">{username}</div>

        {/* Gold display */}
        <div className="flex items-center gap-1">
          <FaCoins className="text-yellow-500" />
          <span className="font-medium">{gold}</span>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-900">Evo Study</h1>

        {/* App Descriptor */}
        <p className="text-gray-600 text-center max-w-xs">
          Track your study sessions, grow your chimera, and compete on the leaderboard!
        </p>

        {/* Sign-in Placeholder */}
        <div className="w-64 h-12 bg-gray-200 rounded-md flex items-center justify-center">
          Sign In Placeholder
        </div>

        {/* Chimera Display Box */}
        <div className="w-72 h-72 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
          {/* Chimera will render here later */}
          <span className="text-gray-400">Your Chimera Appears Here</span>
        </div>

        {/* Start Studying Button */}
        <button
          onClick={onStartStudy}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Start Studying
        </button>
      </div>

      {/* ===== Bottom Navigation Bar ===== */}
      <nav className="fixed bottom-0 w-full flex justify-around items-center h-16 bg-white shadow-inner">
        {/* Each button: icon on top, text below */}
        <NavButton icon={<FaHome />} label="Home" />
        <NavButton icon={<FaBook />} label="Study" />
        <NavButton icon={<FaStore />} label="Shop" />
        <NavButton icon={<FaBoxOpen />} label="Inventory" />
        <NavButton icon={<FaTrophy />} label="Leaderboard" />
      </nav>
    </div>
  );
}

// ===== Helper Component for Bottom Nav Buttons =====
function NavButton({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center w-16 h-full text-gray-700 hover:text-blue-500 cursor-pointer">
      <div className="text-3xl md:text-3xl">{icon}</div>
      <span className="text-xs md:text-sm truncate">{label}</span>
    </div>
  );
}