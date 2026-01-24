import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(0); // in seconds
    const [isActive, setIsActive] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(10);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0 && isActive) {
            setIsActive(false);
            // Play sound or alert
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.log('Audio play failed', e));
            alert("⏰ Timer Done!");
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const toggleTimer = () => {
        setIsOpen(!isOpen);
    };

    const startTimer = () => {
        setTime(inputMinutes * 60);
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (!isOpen) {
        return (
            <button className="floating-timer-btn" onClick={toggleTimer} title="Kitchen Timer">
                ⏱️
                {isActive && <span className="timer-badge">{formatTime(time)}</span>}
            </button>
        );
    }

    return (
        <div className="timer-widget">
            <div className="timer-header">
                <h3>Kitchen Timer</h3>
                <button className="close-timer" onClick={toggleTimer}>✕</button>
            </div>

            {isActive || time > 0 ? (
                <div className="timer-display">
                    <h1>{formatTime(time)}</h1>
                    <div className="timer-controls">
                        <button onClick={isActive ? pauseTimer : () => setIsActive(true)} className="control-btn">
                            {isActive ? "⏸️ Pause" : "▶️ Resume"}
                        </button>
                        <button onClick={resetTimer} className="control-btn reset">⏹️ Reset</button>
                    </div>
                </div>
            ) : (
                <div className="timer-setup">
                    <label>Set Minutes:</label>
                    <div className="time-input-wrapper">
                        <button onClick={() => setInputMinutes(Math.max(1, inputMinutes - 1))}>-</button>
                        <span>{inputMinutes}</span>
                        <button onClick={() => setInputMinutes(inputMinutes + 1)}>+</button>
                    </div>
                    <button onClick={startTimer} className="start-btn">Start Timer</button>
                </div>
            )}
        </div>
    );
};

export default Timer;
