export function rarityCalculator( odds ){

    //range of Odds is a range to be used in random algo
    const rangeOfOdds = {};
    let total = 0;
    for(let rarity in odds){
        total += odds[rarity];
        rangeOfOdds[rarity] = total;
    }
    
    //0 to 1
    const randInt = Math.random();
    for(let range in rangeOfOdds){
        if(randInt < rangeOfOdds[range]){
            return range;
        }
    }

    return "uhh som didn work";
}