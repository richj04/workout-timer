import React from 'react';
import { FaCoins } from 'react-icons/fa';

export default function ShopPage({ buyBasicChest, buyAdvancedChest, buyGold }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Shop</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Basic Box</h2>
              <p className="text-sm text-slate-600">Reliable starter pulls.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <FaCoins className="text-amber-500" />
              100
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Your probably going to pull a common...
          </p>
          <button
            onClick={() => buyBasicChest()}
            className="primary-button mt-4 w-full px-4"
          >
            Buy basic box
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Premium Box</h2>
              <p className="text-sm text-slate-600">Higher chance of rare pulls.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <FaCoins className="text-amber-500" />
              1000
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Worth it :)
          </p>
          <button
            onClick={() => buyAdvancedChest()}
            className="primary-button mt-4 w-full px-4"
          >
            Buy premium box
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Support Me</h2>
            <p className="text-sm text-slate-600">test</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <FaCoins className="text-amber-500" />
            1 USD
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Adding Stripe integration soon.
        </p>
        <button
          onClick={() => buyGold(9007199254740991)}
          className="secondary-button mt-4 w-full"
        >
          Add infinite gold
        </button>
      </div>
    </div>
  );
}
