import React from 'react';
import {useState, useEffect} from 'react';


export default function StudyPage(){
    const [selectedMode, setSelectedMode] = useState(null);
    const [studyTime, setStudyTime] = useState(0);

    if (selectedMode) {
        return <StudyTimer initialTime={studyTime} />;
    }

    return(
        <div className="flex flex-col items-center">
            <StudyButtons 
                onSelectMode={(mode, time) => {
                    setSelectedMode(mode);
                    setStudyTime(time);
                }} 
            />
        </div>
    );
}

export function StudyButtons({ onSelectMode }){
    return(
    <div className="flex flex-col gap-4 w-full max-w-md">
        <button className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 
            transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95
            border border-blue-400/20" 
            onClick={() => onSelectMode('sprint', 15 * 60)}>
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
            border border-purple-400/20"
            onClick={() => onSelectMode('focus', 25 * 60)}>
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
            border border-indigo-400/20"
            onClick={() => onSelectMode('deep', 60 * 60)}>
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

function StudyTimer({ initialTime }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div>
      <div>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTimeLeft(initialTime)}>Reset</button>
    </div>
  );
}