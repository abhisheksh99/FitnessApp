import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Timer = ({ onTimerComplete, initialTime = 0, interval = 60 }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // Format time to display in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          // Check if timer interval is reached
          if (newTime > 0 && newTime % interval === 0) {
            onTimerComplete();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, interval, onTimerComplete]);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <View className="flex items-center p-5 w-full">
      {/* Timer Display */}
      <View className="bg-gray-100 rounded-xl p-6 mb-6 w-40 items-center shadow-md">
        <Text className="text-3xl font-bold text-gray-800 font-['Helvetica Neue']">
          {formatTime(time)}
        </Text>
      </View>

      {/* Control Buttons */}
      <View className="flex flex-row space-x-4">
        <TouchableOpacity
          onPress={toggleTimer}
          activeOpacity={0.7}
          className={`
            px-8 py-3 rounded-full shadow-md
            ${isRunning ? 'bg-red-500' : 'bg-emerald-500'}
            active:opacity-80
          `}
        >
          <Text className="text-white font-semibold text-base text-center">
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetTimer}
          activeOpacity={0.7}
          className="px-8 py-3 bg-blue-500 rounded-full shadow-md active:opacity-80"
        >
          <Text className="text-white font-semibold text-base text-center">
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;