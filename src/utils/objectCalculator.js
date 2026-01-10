export function getRandomKey ( object ){
    const arrayKeys = Object.keys(object);
    const randInt = Math.floor(Math.random() * arrayKeys.length);

    return arrayKeys[randInt];
}
