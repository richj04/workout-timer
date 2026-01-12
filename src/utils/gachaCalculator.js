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

    const newChimera = [];
    const newChimeraSeed = "";
    const newChimeraTitle = "";
    const newChimeraName = "";

    //creates a part with random species and effect
    function createPart(){
        const newPart = {
            species: {},
            effect: {}
        }
        const partSpeciesKey = getRandomKey(speciesData);
        newPart["species"] = speciesData[partSpeciesKey];
        const rarity = rarityCalculator(crateOdds);

        const effectPool = {
            common: commonEffects,
            rare: rareEffects,
            epic: epicEffects,
            legendary: legendaryEffects
        }

        const partEffectKey = getRandomKey(effectPool[rarity]);
        newPart["effect"] = effectPool[rarity][partEffectKey];

        return newPart;
    }

    //maps to map index of for loop to object key name
    const speciesNameMap = {
        "0": "prefix",
        "1": "infix",
        "2": "suffix"
    }
    const effectNameMap = {
        "0": "prefix",
        "1": "adjective",
        "2": "title"
    }

    //loop 3 times, creates 3 random parts
    for(let i = 0; i < 3; i++){
        newChimera[i] = createPart();
        newChimeraSeed += (newChimera[i]["species"]["key"] + newChimera[i]["effect"]["key"]);

        let titleKey = effectNameMap[i];
        newChimeraTitle += newChimera[i]["effect"]["data"][`${titleKey}`];
        let nameKey = speciesNameMap[i];
        newChimeraName += newChimera[i]["species"]["data"][`${nameKey}`];

        if(i != 2){
            newChimeraTitle +=  " ";
        }
    }

    
    
}