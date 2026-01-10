export function streakCalculator ( streaks, studyType ){
    
    const newStreaks = {
        small: studyType === "small" ? streaks.small + 1 : 0,
        medium: studyType === "medium" ? streaks.medium + 1 : 0,
        large: studyType === "large" ? streaks.large + 1 : 0
    };

    const max_streaks = {
        small: 8,
        medium: 4,
        large: 2
    };

    //check hit max, if hit max return to 1
    if (newStreaks[studyType] > max_streaks[studyType]){
        newStreaks[studyType] = 1;
    }
    return newStreaks;
}