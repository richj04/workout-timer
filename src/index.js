import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "2811787176-0fv4ib2a9bo6pnrsq1cuhue8jsi2p4oe.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
