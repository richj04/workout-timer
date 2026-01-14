import { speciesData } from "../data/speciesData";
import { commonEffects, rareEffects, epicEffects, legendaryEffects } from "../data/effectData";

// maps index → body part
const indexToPart = {
  0: "upper",
  1: "middle",
  2: "lower"
};

// maps index → name piece
const speciesNameMap = {
  0: "prefix",
  1: "infix",
  2: "suffix"
};

const effectNameMap = {
  0: "prefix",
  1: "adjective",
  2: "title"
};

// rarity → effect dataset
const effectPool = {
  common: commonEffects,
  rare: rareEffects,
  epic: epicEffects,
  legendary: legendaryEffects
};

export function seedDecoder( gachaSeed ) {
  const renderChimera = [];

  for (let i = 0; i < 3; i++) {
    // each part uses 6 characters
    const partSeed = gachaSeed.slice(i * 6, i * 6 + 6);

    const speciesKey = partSeed.slice(0, 3);
    const effectKey = partSeed.slice(3, 6);

    const species = speciesData[speciesKey];

    // find which rarity pool contains this effect key
    let effect;
    let rarity;

    for (const rarityKey in effectPool) {
      if (effectPool[rarityKey][effectKey]) {
        effect = effectPool[rarityKey][effectKey];
        rarity = rarityKey;
        break;
      }
    }

    // build display label
    const effectName =
      effect.data[effectNameMap[i]];
    const speciesName =
      species.data[speciesNameMap[i]];

    renderChimera.push({
      type: indexToPart[i],
      sprite: `${species.data.name.toLowerCase()}`, 
      namePart: `${speciesName}`,
      label: `${effectName}`,
      rarity: rarity,
      effect: effect.data.name
    });
  }

  return renderChimera;
}