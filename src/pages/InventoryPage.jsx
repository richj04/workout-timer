import React from 'react';
import { seedDecoder } from '../utils/seedDecoder';

export default function InventoryPage({ allChimera, setDisplaySeed }) {
  const decodedChimeras = [];
  for (let chimeraSeed of allChimera) {
    decodedChimeras.push(seedDecoder(chimeraSeed));
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Inventory</h1>
        <span className="text-sm text-slate-500">{decodedChimeras.length} chimeras</span>
      </div>

      {decodedChimeras.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-sm text-slate-500">
          No chimeras yet. Visit the shop to unbox your first companion.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decodedChimeras.map((chimera, index) => (
            <button
              type="button"
              key={index}
              className="group w-full rounded-2xl border border-slate-200 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => setDisplaySeed(chimera)}
            >
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Chimera {index + 1}</div>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                {chimera[0]['label']} {chimera[1]['label']} {chimera[2]['label']}{' '}
                {chimera[0]['namePart']}
                {chimera[1]['namePart']}
                {chimera[2]['namePart']}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Fusion of {chimera[0]['sprite']}, {chimera[1]['sprite']}, {chimera[2]['sprite']}
              </p>
              <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition group-hover:bg-slate-900 group-hover:text-white">
                Set as display
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
