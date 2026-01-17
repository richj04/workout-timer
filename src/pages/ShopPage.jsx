import React from 'react';

export default function ShopPage({ buyBasicChest, buyAdvancedChest, buyGold }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Shop</h1>
        <p className="text-sm text-slate-500">Spend gold on loot boxes and upgrades.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Basic Box</h2>
              <p className="text-sm text-slate-600">Reliable starter pulls.</p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              100
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Balanced mix of creatures to build your first collection.
          </p>
          <button
            onClick={() => buyBasicChest()}
            className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              1,000
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Built for collectors who want stronger merges.
          </p>
          <button
            onClick={() => buyAdvancedChest()}
            className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Buy premium box
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Support</h2>
            <p className="text-sm text-slate-600">For quick testing and demos.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Experimental
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Add a large amount of gold for stress testing the economy.
        </p>
        <button
          onClick={() => buyGold(9007199254740991)}
          className="mt-4 w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
        >
          Add infinite gold
        </button>
      </div>
    </div>
  );
}
