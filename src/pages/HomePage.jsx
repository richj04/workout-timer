import React from 'react';
import ChimeraRenderer from '../utils/chimeraRenderer';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Props:
// - username (string)
// - gold (number)
// - onStartStudy (function) -> navigate to Study page
export default function HomePage({ username, gold, onStartStudy, seed, onUserLogin, isSignedIn }) {
  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      onUserLogin(data.user);
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  const handleLoginFailure = () => {
    console.log('Login failed');
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-4">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Grow a chimera while you focus
            </h1>
            <p className="max-w-xl text-sm text-slate-600">
              Track your study sessions, unlock creatures, and keep your streak alive with a calm,
              minimal routine.
            </p>
          </div>

          {!isSignedIn && (
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Sign in
              </div>
              <div className="mt-2 flex items-center justify-start sm:justify-center">
                <div className="origin-left scale-90 sm:origin-center sm:scale-100">
                  <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onStartStudy}
            className="primary-button w-fit"
          >
            Start studying
          </button>
        </section>

        <section className="rounded-3x3 border border-slate-200 bg-white/80 p-4 shadow-sm">
          
          <div className="mt-3-1 flex h-[20rem] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white sm:h-[24rem]">
            {seed != null ? (
              <ChimeraRenderer seed={seed} />
            ) : (
              <p className="text-sm text-slate-500">Unbox a chimera to begin.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
