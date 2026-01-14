// This file loads ALL chimera images and organizes them
// so the renderer can grab them by name.
// You write this ONCE and never touch asset paths again.

// ---- LOAD FOLDERS ----
const upperContext = require.context(
  "../assets/chimera-parts/upper",
  false,
  /\.png$/
);

const middleContext = require.context(
  "../assets/chimera-parts/middle",
  false,
  /\.png$/
);

const lowerContext = require.context(
  "../assets/chimera-parts/lower",
  false,
  /\.png$/
);

// ---- REGISTRY OBJECT ----
const registry = {
  upper: {},
  middle: {},
  lower: {}
};

// ---- HELPER FUNCTION ----
function loadIntoRegistry(context, target) {
  context.keys().forEach((file) => {
    // "./Cobra.png" → "Cobra"
    const name = file.replace("./", "").replace(".png", "");
    target[name] = context(file);
  });
}

// ---- BUILD REGISTRY ----
loadIntoRegistry(upperContext, registry.upper);
loadIntoRegistry(middleContext, registry.middle);
loadIntoRegistry(lowerContext, registry.lower);

// ---- EXPORT ----
export default registry;
