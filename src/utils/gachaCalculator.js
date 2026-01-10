import { basicCrateOdds, advancedCrateOdds } from "../data/gachaConstants";
import { rarityCalculator } from "./rarityCalculator";


export function gachaCalculator( chestType ){
    let rarityOutput = "";

    if(chestType === "basic"){
        rarityOutput = rarityCalculator(basicCrateOdds);
    }else if(chestType === "advanced"){
        rarityOutput = rarityCalculator(advancedCrateOdds);
    }

    return rarityOutput;
}