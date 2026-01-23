import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function StudyPage({ finishSmallStudy, finishMediumStudy, finishLargeStudy }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [studyTime, setStudyTime] = useState(0);

  if (selectedMode) {
    const reward =
      selectedMode === 'sprint'
        ? finishSmallStudy
        : selectedMode === 'focus'
        ? finishMediumStudy
        : selectedMode === 'deep'
        ? finishLargeStudy
        : null;

    return <StudyTimer initialTime={studyTime} reward={reward} />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Study</h1>
        <p className="text-sm text-slate-600">Choose a focus mode to start the timer.</p>
      </div>
      <StudyButtons
        onSelectMode={(mode, time) => {
          setSelectedMode(mode);
          setStudyTime(time);
        }}
      />
    </div>
  );
}

export function StudyButtons({ onSelectMode }) {
  const modes = [
    { key: 'sprint', title: 'Sprint', detail: '15 minutes on / 5 minutes break', time: 10 * 60, badge: '10 min' },
    { key: 'focus', title: 'Focus', detail: '25 minutes on / 5 minutes break', time: 25 * 60, badge: '25 min' },
    { key: 'deep', title: 'Deep', detail: '60 minutes on / 15 minutes break', time: 60 * 60, badge: '60 min' },
  ];

  return (
    <div className="grid gap-4">
      {modes.map((mode) => (
        <button
          key={mode.key}
          className="action-card group flex w-full items-center justify-between p-5"
          onClick={() => onSelectMode(mode.key, mode.time)}
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{mode.title}</h2>
            <p className="text-sm text-slate-500">{mode.detail}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition group-hover:bg-slate-900 group-hover:text-white">
            {mode.badge}
          </span>
        </button>
      ))}
    </div>
  );
}

function StudyTimer({ initialTime, reward }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isBreak, setIsBreak] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasRewarded = useRef(false);

  const breakTime = initialTime === 10 * 60 ? 5 * 60 : initialTime === 25 * 60 ? 5 * 60 : 15 * 60;

  useEffect(() => {
    if (isComplete && !hasRewarded.current) {
      hasRewarded.current = true;
      reward();
    }
  }, [isComplete, reward]);

  useEffect(() => {
    if (isComplete) return;

    if (timeLeft <= 0) {
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(breakTime);
      } else {
        setIsComplete(true);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isBreak, breakTime, isComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isComplete) {
    return (
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Session complete</h1>
        <p className="mt-2 text-sm text-slate-600">Great work. Ready for another round?</p>
        <button
          className="primary-button mt-4 px-6"
          onClick={() => {
            setTimeLeft(initialTime);
            setIsBreak(false);
            setIsComplete(false);
            hasRewarded.current = false;
          }}
        >
          Start another set
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {isBreak ? 'Break time' : 'Focus time'}
      </div>
      <div className="mt-4 text-6xl font-semibold tabular-nums text-slate-900">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>
      <p className="mt-3 text-sm text-slate-500">No pausing. Stay focused.</p>
    </div>
  );
}
