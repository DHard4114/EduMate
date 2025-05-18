import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiPlay, FiPause, FiRefreshCw, FiChevronDown, FiChevronUp, FiChevronRight, FiClock, FiX, FiCheckCircle } from 'react-icons/fi';

const PomodoroTimer = ({ userId }) => {
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(25 * 60);
    const [mode, setMode] = useState('pomodoro');
    const [completedPomodoros, setCompletedPomodoros] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [summary, setSummary] = useState({ total_minutes: 0 });
    const [isMinimized, setIsMinimized] = useState(false);
    const [progress, setProgress] = useState(0);
    const [notification, setNotification] = useState(null);

    const timerRef = useRef(null);
    const audioRef = useRef(null);
    const containerRef = useRef(null);

    const modes = {
      pomodoro: { 
        name: 'Focus', 
        duration: 25 * 60, 
        color: 'bg-green', 
        text: 'text-green',
        ring: 'ring-green',
        bg: 'bg-basegreen'
      },
      short_break: { 
        name: 'Short Break', 
        duration: 5 * 60, 
        color: 'bg-bluetime', 
        text: 'text-bluetime',
        ring: 'ring-bluetime',
        bg: 'bg-blue-200'
      },
      long_break: { 
        name: 'Long Break', 
        duration: 15 * 60, 
        color: 'bg-time', 
        text: 'text-time',
        ring: 'ring-time',
        bg: 'bg-teal-100'
      },
    };

    const showTempNotification = (message) => {
      setNotification(message);
      setTimeout(() => setNotification(null), 3000);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const switchMode = (newMode, resetCompleted = false) => {
      setIsActive(false);
      clearInterval(timerRef.current);
      setMode(newMode);
      setTimer(modes[newMode].duration);
      setProgress(0);
      if (resetCompleted) {
        setCompletedPomodoros(0);
      }
      showTempNotification(`Switched to ${modes[newMode].name} mode`);
    };

    const toggleTimer = () => {
      if (!isActive) {
        timerRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(timerRef.current);
              setIsActive(false);
              handleTimerComplete();
              return 0;
            }
            return prevTimer - 1;
          });
          
          // Update progress
          const totalDuration = modes[mode].duration;
          const remaining = timer - 1;
          const newProgress = ((totalDuration - remaining) / totalDuration) * 100;
          setProgress(newProgress);
        }, 1000);
      } else {
        clearInterval(timerRef.current);
      }
      setIsActive(!isActive);
    };

    const handleTimerComplete = async () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      try {
        await axios.post(
          'http://localhost:5001/pomodoro/done',
          {
            type: mode,
            duration: modes[mode].duration / 60,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Automatic mode switching logic
        if (mode === 'pomodoro') {
          const newCount = completedPomodoros + 1;
          setCompletedPomodoros(newCount);
          showTempNotification(`Great job! ${newCount} focus sessions completed`);
          
          if (newCount % 4 === 0) {
            switchMode('long_break');
          } else {
            switchMode('short_break');
          }
        } else if (mode === 'short_break' || mode === 'long_break') {
          if (mode === 'long_break') {
            // Reset cycle after long break
            switchMode('pomodoro', true);
          } else {
            // After short break, go to next pomodoro
            switchMode('pomodoro');
          }
        }

        fetchHistory();
        fetchSummary();
      } catch (error) {
        console.error('Error saving session:', error);
        showTempNotification('Failed to save session');
      }
    };

    const resetTimer = () => {
      setIsActive(false);
      clearInterval(timerRef.current);
      setTimer(modes[mode].duration);
      setProgress(0);
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5001/pomodoro/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHistory(response.data.payload);
      } catch (error) {
        console.error('Error fetching history:', error);
        showTempNotification('Failed to load history');
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5001/pomodoro/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSummary(response.data.payload);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    const deleteSession = async (id) => {
      try {
        await axios.delete(`http://localhost:5001/pomodoro/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchHistory();
        fetchSummary();
        showTempNotification('Session deleted');
      } catch (error) {
        console.error('Error deleting session:', error);
        showTempNotification('Failed to delete session');
      }
    };

    useEffect(() => {
      if (userId) {
        fetchHistory();
        fetchSummary();
      }
    }, [userId]);

    useEffect(() => {
      return () => clearInterval(timerRef.current);
    }, []);

    return (
      <div 
        ref={containerRef}
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-xl border-l border-gray-100 z-50 transition-all duration-300 ease-in-out ${
          isMinimized ? 'translate-x-72' : 'translate-x-0'
        }`}
      >

        {/* Main content */}
        <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto">
          {/* Mode selector */}
          <div className="flex justify-between gap-2">
            {Object.keys(modes).map((key) => (
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
              <span className="text-sm font-medium text-gray-500">Today's Focus</span>
              <span className="text-sm font-medium text-gray-700">
                {completedPomodoros} / 4 sessions
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
              onClick={() => setShowHistory(!showHistory)}
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
                {history.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No sessions recorded yet
                  </div>
                ) : (
                  history.map((session) => (
                    <div 
                      key={session.id} 
                      className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                    >
                      <div>
                        <div className="font-medium text-gray-700 capitalize">
                          {session.type.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(session.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${modes[session.type]?.text || 'text-gray-600'}`}>
                          {session.duration} min
                        </span>
                        <button 
                          onClick={() => deleteSession(session.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
          src="https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3" 
        />
      </div>
    );
};

export default PomodoroTimer;