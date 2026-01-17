import React from 'react';
import {useState, useEffect, useRef} from 'react';


export default function StudyPage({ finishSmallStudy, finishMediumStudy, finishLargeStudy }){
    const [selectedMode, setSelectedMode] = useState(null);
    const [studyTime, setStudyTime] = useState(0);

    if (selectedMode) {
        const reward = selectedMode === 'sprint' ? finishSmallStudy :
        selectedMode === 'focus' ? finishMediumStudy : selectedMode === 'deep' ? finishLargeStudy : null;

        return <StudyTimer initialTime={studyTime} reward={reward} />;
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
            onClick={() => onSelectMode('sprint', 10)}>
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

function StudyTimer({ initialTime, reward }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isBreak, setIsBreak] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const breakTime = initialTime === 10 ? 5 : 
                    initialTime === 25 * 60 ? 5 * 60 : 
                    15 * 60;

    useEffect(() => {
        if (isComplete) {
            reward();
        }
    }, [isComplete]);

    useEffect(() => {
    if (isComplete) return; // Don't run if complete

    if (timeLeft <= 0) {
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(breakTime);
      } else {
        setIsComplete(true);
      }
      return; // Don't set up interval
    }
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return 0; // Stop at 0, don't go negative
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft, isBreak, breakTime, isComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Session Complete! 🎉</h1>
        <p>Great work! Ready for another round?</p>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          onClick={() => {
            setTimeLeft(initialTime);
            setIsBreak(false);
            setIsComplete(false);
          }}
        >
          Start Another Set
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">
        {isBreak ? '☕ Break Time' : '📚 Focus Time'}
      </h2>
      <div className="text-6xl font-bold">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>
      <p className="text-sm opacity-70">No pausing - stay focused!</p>
    </div>
  );
}