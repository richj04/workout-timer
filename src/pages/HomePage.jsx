// src/pages/HomePage.jsx
import React from 'react';
import { FaHome, FaBook, FaStore, FaBoxOpen, FaTrophy, FaCoins } from 'react-icons/fa';
import ChimeraRenderer from '../utils/chimeraRenderer';

// Props: 
// - username (string)
// - gold (number)
// - onStartStudy (function) -> navigate to Study page
export default function HomePage({ username, gold, onStartStudy, seed }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Username */}
        <div className="font-semibold text-gray-800">{username}</div>
        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-900">Evo Study</h1>
        {/* Gold display */}
        <div className="flex items-center gap-1">
          <FaCoins className="text-yellow-500" />
          <span className="font-medium">{gold}</span>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-7 gap-6">
        

        {/* App Descriptor */}
        <p className="text-gray-600 text-center max-w-xs">
          Track your study sessions, grow your chimera, and compete on the leaderboard!
        </p>

        {/* Sign-in Placeholder */}
        <div className="w-64 h-12 bg-gray-200 rounded-md flex items-center justify-center">
          Sign In Placeholder
        </div>

        {/* Chimera Display Box */}
        <div className="relative w-72 h-[28rem] bg-white border rounded-lg flex items-center justify-center">
          {/* Chimera will render here later */}
            <ChimeraRenderer
                seed={seed}
            />
        </div>

        {/* Start Studying Button */}
        <button
          onClick={onStartStudy}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Start Studying
        </button>
      </div>
    </div>
  );
}

// ===== Helper Component for Bottom Nav Buttons =====
