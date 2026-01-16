import React from 'react';
import { seedDecoder } from '../utils/seedDecoder';

export default function InventoryPage({ allChimera, setDisplaySeed }){

    const decodedChimeras = [];
    for(let chimeraSeed of allChimera){
        decodedChimeras.push(seedDecoder(chimeraSeed));
    }
    //need to display label title
    //then next line display -> A fusion between a blank blank and blank
    //when you click button run function that runs setDisplaySeed
    
    console.log(decodedChimeras);


    return(
        <div className="flex flex-col items-center p-2 pb-16">
            {decodedChimeras.map((chimera, index) => (
                <div key={index}>
                    <button className="px-8 py-3 rounded-full border border-black/40 
                    font-medium transition active:scale-95"
                    onClick={() => setDisplaySeed(chimera)}>
                          <h2>{chimera[0]["label"]} {chimera[1]["label"]} {chimera[2]["label"]} {chimera[0]["namePart"]}{chimera[1]["namePart"]}{chimera[2]["namePart"]}</h2>
                          <h3>A fusion between: {chimera[0]["sprite"]}, {chimera[1]["sprite"]}, {chimera[2]["sprite"]}</h3>
                    </button>
                </div>
            ))}
        </div>
    );
}