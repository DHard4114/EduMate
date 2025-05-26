'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiChevronDown, FiChevronUp, FiClock, FiX, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { ModeType, Modes, Session, PomodoroTimerProps } from './types';
import api from '@/app/lib/api';

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ userId }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(1 * 60);
  const [mode, setMode] = useState<ModeType>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<Session[]>([]);
  const [summary, setSummary] = useState<{ total_minutes: number }>({ total_minutes: 0 });
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
const [shouldReset, setShouldReset] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const modes: Modes = useMemo(() => ({
      pomodoro: {
        name: 'Focus',
        duration: 1 * 60,
        color: 'bg-green',
        text: 'text-green',
        ring: 'ring-green',
        bg: 'bg-basegreen'
      },
      short_break: {
        name: 'Short Break',
        duration: 1 * 60,
        color: 'bg-bluetime',
        text: 'text-bluetime',
        ring: 'ring-bluetime',
        bg: 'bg-blue-200'
      },
      long_break: {
        name: 'Long Break',
        duration: 1 * 60,
        color: 'bg-time',
        text: 'text-time',
        ring: 'ring-time',
        bg: 'bg-teal-100'
      },
    }), []);
    
    const updateCompletedPomodoros = useCallback((count: number) => {
      const today = new Date().toDateString();
      localStorage.setItem('lastPomodoroDate', today);
      setCompletedPomodoros(count);
    }, []);

    const showTempNotification = useCallback((message: string): void => {
      setNotification(message);
      setTimeout(() => setNotification(null), 3000);
    }, []);

    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

  const fetchHistory = useCallback(async () => {
      setIsHistoryLoading(true);
      try {
        const response = await api.get('/pomodoro/history');
        setHistory(response.data.payload);
      } catch (error) {
        console.error('Error fetching history:', error);
        showTempNotification('Failed to load history');
      } finally {
        setIsHistoryLoading(false);
      }
    }, [showTempNotification]);


  const fetchSummary = useCallback(async () => {
    try {
      const response = await api.get('/pomodoro/summary');
      setSummary(response.data.payload);
    } catch (error) {
      console.error('Error fetching summary:', error);
      showTempNotification('Failed to load summary');
    }
  }, [showTempNotification]);

  const resetCompletedPomodoros = useCallback(() => {
      const today = new Date().toDateString();
      localStorage.setItem('lastPomodoroDate', today);
      localStorage.setItem('completedPomodoros', '0');
      setCompletedPomodoros(0);
    }, []);
  
  const switchMode = useCallback((newMode: ModeType): void => {
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setMode(newMode);
      setTimer(modes[newMode].duration);
      setProgress(0);

      showTempNotification(`Switched to ${modes[newMode].name} mode`);
    }, [modes, showTempNotification]);


    const handleHistoryToggle = useCallback(() => {
      const newShowHistory = !showHistory;
      setShowHistory(newShowHistory);
      if (newShowHistory) {
        fetchHistory();
      }
    }, [showHistory, fetchHistory]);

    useEffect(() => {
      if (shouldReset && mode === 'pomodoro') {
        resetCompletedPomodoros();       // 👉 reset saat sudah balik ke pomodoro
        setShouldReset(false);           // bersihin flag biar gak keulang
      }
    }, [mode, shouldReset, resetCompletedPomodoros]);


    const handleTimerComplete = useCallback(async () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      try {
        const actualDuration = modes[mode].duration / 60;
        // Save session to database
        await api.post('/pomodoro/done', {
          user_id: userId,
          type: mode,
          duration: actualDuration,
        });

        if (mode === 'pomodoro') {
        const newCount = completedPomodoros + 1;
        updateCompletedPomodoros(newCount); 
        if (newCount % 4 === 0) {
          switchMode('long_break');
          } else {
            switchMode('short_break');
          }
          showTempNotification(`Great job! ${newCount} focus sessions completed`);
        } else {
              // After break, switch back to pomodoro mode
              if (mode === 'long_break') {
                setShouldReset(true);
              } switchMode('pomodoro');
            }
                
            // Refresh data after saving
            await Promise.all([fetchHistory(), fetchSummary()]);
          } catch (error) {
            console.error('Error:', error);
            showTempNotification('Failed to save session');
          }
        }, [
          mode,
          modes,
          userId,
          switchMode,
          showTempNotification,
          fetchHistory,
          fetchSummary,
          audioRef,
          completedPomodoros,
          updateCompletedPomodoros,
        ]);

    const checkDailyReset = useCallback(() => {
      const lastDate = localStorage.getItem('lastPomodoroDate');
      const today = new Date().toDateString();
      
      if (lastDate !== today) {
        updateCompletedPomodoros(0);
        fetchHistory(); // Refresh history to get today's sessions
      }
    }, [updateCompletedPomodoros, fetchHistory]);

    // Add this useEffect to check for daily reset
    useEffect(() => {
      checkDailyReset();
      
      // Check every minute for date change
      const interval = setInterval(checkDailyReset, 60000);
      return () => clearInterval(interval);
    }, [checkDailyReset]);

    const toggleTimer = () => {
      if (timer <= 0) {
        setTimer(modes[mode].duration); // Reset dulu
        setProgress(0);
        return;
      }
      if (!isActive) {
        const now = Date.now();
        setSessionStartTime(now);
        

        timerRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            const newTimer = prevTimer - 1;
            if (newTimer <= 0) {
                clearInterval(timerRef.current!);
                setIsActive(false);
                setSessionStartTime(null);
                handleTimerComplete();
                setProgress(100);
                return 0;
              }
              // Update progress
              const totalDuration = modes[mode].duration;
              const newProgress = ((totalDuration - newTimer) / totalDuration) * 100;
              setProgress(newProgress);
              return newTimer;
            })
        }, 1000);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsActive(!isActive);
    };

    const resetTimer = () => {
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimer(modes[mode].duration);
      setProgress(0);
    };

    const deleteSession = async (id: number) => {
      try {
        await api.delete(`/pomodoro/${id}`);
        await Promise.all([fetchHistory(), fetchSummary()]);
        showTempNotification('Session deleted');
      } catch (error) {
        console.error('Error deleting session:', error);
        showTempNotification('Failed to delete session');
      }
    };

    useEffect(() => {
      const savedState = localStorage.getItem('pomodoroState');
      if (savedState) {
        const state = JSON.parse(savedState);
        
        // If there was an active session
        if (state.isActive && state.sessionStartTime) {
          // Calculate elapsed time
          const elapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
          const remainingTime = Math.max(0, state.timer - elapsed);
          
          // Restore timer with adjusted time
          setTimer(remainingTime);
          setMode(state.mode);
          setIsActive(false); // Don't auto-resume
        } else {
          // Just restore saved state
          setTimer(state.timer);
          setMode(state.mode);
          setCompletedPomodoros(state.completedPomodoros);
        }
      }
    }, []);


    useEffect(() => {
      const lastDate = localStorage.getItem('lastPomodoroDate');
      const today = new Date().toDateString();
      
      if (lastDate !== today) {
        // Reset if it's a new day
        resetCompletedPomodoros();
      } else {
        // Restore today's count
        const saved = localStorage.getItem('completedPomodoros');
        if (saved) {
          setCompletedPomodoros(parseInt(saved, 10));
        }
      }
    }, [resetCompletedPomodoros]);

  useEffect(() => {
      if (userId) {
        // Initial fetch
        fetchSummary();
        fetchHistory();

        // Set up auto-refresh interval (every 1 minute)
        const refreshInterval = setInterval(() => {
          fetchSummary();
          fetchHistory();
        }, 60000); // 60000 ms = 1 minute

        return () => {
          clearInterval(refreshInterval);
          // Clear timer if component unmounts while active
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };
      }
    }, [userId, fetchSummary, fetchHistory]);

    return (
        <div ref={containerRef} className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-xl border-l border-gray-100 z-50 transition-all duration-300 ease-in-out ${isMinimized ? 'translate-x-72' : 'translate-x-0'}`}>
        {/* Add minimize button */}
        <button
          onClick={() => setIsMinimized(prev => !prev)}
          className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white p-2 rounded-l-lg shadow-md border border-r-0 border-gray-100"
        >
          <FiChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
        </button>

        {/* Main content */}
        <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto">
          {/* Mode selector */}
          <div className="flex justify-between gap-2">
            {(Object.keys(modes) as ModeType[]).map((key) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={`flex-1 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                  mode === key 
                    ? `${modes[key].color} text-white shadow-md` 
                    : `${modes[key].bg} text-gray-600 hover:${modes[key].bg} hover:bg-opacity-70`
                }`}
              >
                {modes[key].name}
              </button>
            ))}
          </div>

          {/* Timer display */}
          <div className="flex flex-col items-center justify-center py-6">
            {/* Circular progress */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={modes[mode].color.replace('bg-', 'stroke-')}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (progress * 2.83)}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-4xl font-mono font-bold ${modes[mode].text}`}>
                  {formatTime(timer)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={toggleTimer}
                className={`flex items-center gap-2 px-5 py-2 rounded-full ${
                  isActive 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : `${modes[mode].color} text-white hover:${modes[mode].color} hover:opacity-90`
                } shadow-md transition-all`}
              >
                {isActive ? (
                  <>
                    <FiPause className="w-5 h-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <FiPlay className="w-5 h-5" />
                    <span>Start</span>
                  </>
                )}
              </button>
              <button 
                onClick={resetTimer}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 shadow-md transition-all"
              >
                <FiRefreshCw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Today&apos;s Focus</span>
              <span className="text-sm font-medium text-gray-700">
                {completedPomodoros % 4} / 4 sessions
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${modes[mode].color}`} 
                style={{ width: `${(completedPomodoros % 4) * 25}%` }}
              ></div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Total Focus</span>
              <span className="text-sm font-medium text-gray-700">
                {summary.total_minutes} minutes
              </span>
            </div>
          </div>

          {/* History section */}
          <div className="mt-auto">
            <button 
              onClick={handleHistoryToggle}
              className="flex items-center justify-between w-full py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FiClock className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Session History</span>
              </div>
              {showHistory ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
            </button>

            {showHistory && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {isHistoryLoading ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    Loading history...
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No sessions recorded yet
                  </div>
                ) : (
                  history.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <div>
                        <div className="font-medium text-gray-700 capitalize">
                          {session.type.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(session.started_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${modes[session.type]?.text || 'text-gray-600'}`}>
                          {session.duration_minutes} min
                        </span>
                        <button 
                          onClick={() => deleteSession(session.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )))}
              </div>
            )}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 animate-fade-in">
            <FiCheckCircle className={`w-5 h-5 ${modes[mode].text}`} />
            <span className="text-sm text-gray-700">{notification}</span>
          </div>
        )}

        <audio
          ref={audioRef}
          src="/TimerSound.wav"
          preload="auto"
      />

      </div>
    );
};

export default PomodoroTimer;