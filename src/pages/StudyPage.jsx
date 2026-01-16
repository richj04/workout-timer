import React from 'react';

export default function StudyPage(){

    return(
        <div className="flex flex-col items-center">
            <StudyButtons />
        </div>
    );
}

export function StudyButtons(){
    return(
    <div className="flex flex-col gap-4 w-full max-w-md">
        <button className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 
            transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95
            border border-blue-400/20">
            <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">Sprint</h1>
            <h2 className="text-sm opacity-90">15 minutes on / 5 minutes break</h2>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300"></div>
        </button>

        <button className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 
            hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-6 
            transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95
            border border-purple-400/20">
            <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">Focus</h1>
            <h2 className="text-sm opacity-90">25 minutes on / 5 minutes break</h2>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300"></div>
        </button>
        
        <button className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 
            hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl p-6 
            transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95
            border border-indigo-400/20">
            <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold">Deep</h1>
            <h2 className="text-sm opacity-90">60 minutes on / 15 minutes break</h2>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300"></div>
        </button>
    </div>
    );
    
}

export function SmallStudy(){

}

export function MediumStudy(){

}

export function LargeStudy(){

}