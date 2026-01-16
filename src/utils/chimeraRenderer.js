import React from "react";
import chimeraAssets from "../utils/AssetLoader";

export default function ChimeraRenderer({ seed }){
    const upper = chimeraAssets["upper"][seed[0]["sprite"]];
    const middle = chimeraAssets["middle"][seed[1]["sprite"]];
    const lower = chimeraAssets["lower"][seed[2]["sprite"]];
    const label = `${seed[0]["label"]} ${seed[1]["label"]} ${seed[2]["label"]}`;
    const name = `${seed[0]["namePart"]}${seed[1]["namePart"]}${seed[2]["namePart"]}`
    console.log(seed);
    return (
        <div className="relative w-full h-full flex flex-col items-center">
            <div className="relative mb-2 w-full flex-1">
                <img
                    src={upper}
                    alt="upper part"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain"
                />
                <img
                    src={middle}
                    alt="middle part"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain"
                />
                <img
                    src={lower}
                    alt="lower part"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain"
                />
            </div>

            <div className="text-center space-y-1">
                <div className = "flex gap-1 text-sm font-semibold">
                    <h3 className={`rarity-${seed[0]["rarity"]}`}>{`${seed[0]["label"]}`} </h3>
                    <h3 className={`rarity-${seed[1]["rarity"]}`}>{`${seed[1]["label"]}`} </h3>
                    <h3 className={`rarity-${seed[2]["rarity"]}`}>{`${seed[2]["label"]}`}</h3>
                </div>
                <h3 className="text-lg font-bold">{name}</h3>
            </div>
        </div>
  );
}