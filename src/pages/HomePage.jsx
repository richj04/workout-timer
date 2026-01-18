// src/pages/HomePage.jsx
import React from 'react';
import { FaHome, FaBook, FaStore, FaBoxOpen, FaTrophy, FaCoins } from 'react-icons/fa';
import ChimeraRenderer from '../utils/chimeraRenderer';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this


// Props: 
// - username (string)
// - gold (number)
// - onStartStudy (function) -> navigate to Study page
export default function HomePage({ username, gold, onStartStudy, seed }) {

  const handleLoginSuccess = async (credentialResponse) => {
    // credentialResponse.credential is the token from Google
    const decoded = jwtDecode(credentialResponse.credential);
    
    console.log("User info:", decoded);
    // decoded contains: sub (Google ID), email, name, picture
    try {
      const response = await fetch ('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id: decoded.sub,
          email: decoded.email,
          name: decoded.name
        })
      });

      const data = await response.json();
      console.log("Backend response:", data);

      localStorage.setItem('user', JSON.stringify(data.user));

    } catch (error) {
      console.error("Login error: ", error);
    }




  };

  const handleLoginFailure = () => {
    console.log("Login failed");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-7 gap-6">
        

        {/* App Descriptor */}
        <p className="text-gray-600 text-center max-w-xs">
          Track your study sessions, grow your chimera, and compete on the leaderboard!
        </p>

        {/* Sign-in Placeholder */}
        <div className="w-64 h-12 bg-gray-200 rounded-md flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>

        {/* Chimera Display Box */}
        <div className="relative w-72 h-[28rem] bg-white border rounded-lg flex items-center justify-center">
          {seed != null ? <ChimeraRenderer seed={seed}/> : <h3>Unbox a Chimera!</h3>}
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
