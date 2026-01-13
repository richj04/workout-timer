import React from "react";
export default function ChimeraRenderer({ upper, middle, lower}){
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
                <h3 className="text-sm font-semibold">Dusty Aura God-Slayer</h3>
                <h3 className="text-lg font-bold">Eagerrk</h3>
            </div>
        </div>
  );
}