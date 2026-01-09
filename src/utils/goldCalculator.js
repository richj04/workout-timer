export function studyTimeToGoldMedium( streak ){
    //multiplier handles consecutive studying capping at 4
    const period = 30;
    const streakMultipliers = {
        1: 1.0,
        2: 1.2,
        3: 1.8,
        4: 2.2
    };

    //base gold gives about 100 gold per 30 min study
    const baseGold = 8.78 * Math.pow(period, 0.7);
    const randomMultiplier = Math.random() * 0.5 + 0.9;
    const finalGold = baseGold * streakMultipliers[streak] * randomMultiplier;

    return Math.round(finalGold);
}

export function studyTimeToGoldSmall( streak ){
    //multiplier handles consecutive studying capping at 4
    const period = 15;
    const streakMultipliers = {
        1: 1.0,
        2: 1.1,
        3: 1.2,
        4: 1.3,
        5: 1.4,
        6: 1.5,
        7: 1.8,
        8: 2.0
    };

    //base gold gives about 100 gold per 30 min study
    const baseGold = 8.78 * Math.pow(period, 0.7);
    const randomMultiplier = Math.random() * 0.5 + 0.9;
    const finalGold = baseGold * streakMultipliers[streak] * randomMultiplier;

    return Math.round(finalGold);
}

export function studyTimeToGoldLarge( streak ){
    //multiplier handles consecutive studying capping at 4
    const period = 60;
    const streakMultipliers = {
        1: 1.5,
        2: 3
    };

    //base gold gives about 100 gold per 30 min study
    const baseGold = 8.78 * Math.pow(period, 0.7);
    const randomMultiplier = Math.random() * 0.5 + 0.9;
    const finalGold = baseGold * streakMultipliers[streak] * randomMultiplier;

    return Math.round(finalGold);
}