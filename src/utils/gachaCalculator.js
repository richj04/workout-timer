import { basicCrateOdds, advancedCrateOdds } from "../data/gachaConstants";
import { rarityCalculator } from "./rarityCalculator";
import { getRandomKey } from "./objectCalculator";
import { speciesData } from "../data/speciesData";
import { commonEffects, rareEffects, epicEffects, legendaryEffects } from "../data/effectData";

export function gachaCalculator( chestType ){
    if(chestType === "basic"){
        const crateOdds = basicCrateOdds;
    }else if(chestType === "advanced"){
        const crateOdds = advancedCrateOdds;
    }

    

    const newChimera = {};
    const newChimeraSeed = "";
    const newChimeraTitle = "";
    const newChimerName = "";

    function createPart(){
        const newPart = {
            species: {},
            effect: {}
        }
        const partSpeciesKey = getRandomKey(speciesData);
        newPart[species] = speciesData[partSpeciesKey];
        const rarity = rarityCalculator(crateOdds);
        


    }

    const newUpper = {};
    const upperSpeciesKey = getRandomKey(speciesData);
    newUpper = speciesData[upperSpeciesKey];
    
}