import { basicCrateOdds, advancedCrateOdds } from "../data/gachaConstants";
import { rarityCalculator } from "./rarityCalculator";
import { getRandomKey } from "./objectCalculator";
import { speciesData } from "../data/speciesData";
import { commonEffects, rareEffects, epicEffects, legendaryEffects } from "../data/effectData";

export function gachaCalculator( chestType ){
    if(chestType === "basic"){
        rarityOutput = rarityCalculator(basicCrateOdds);
    }else if(chestType === "advanced"){
        rarityOutput = rarityCalculator(advancedCrateOdds);
    }

    const newChimera = {};
    const newChimeraSeed = "";
    const newChimeraTitle = "";
    const newChimerName = "";

    const newUpper = {};
    const upperSpeciesKey = getRandomKey(speciesData);
    newUpper = speciesData[upperSpeciesKey];
}