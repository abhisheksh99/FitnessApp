import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const ExerciseTimer = ({ route }) => {
  const { exercise } = route.params;
  const navigation = useNavigation();
  const [timer, setTimer] = useState(30);
  const [isResting, setIsResting] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 3;
  const repsPerSet = 12;
  const restPeriod = 10; // Set rest period to 10 seconds

  useEffect(() => {
    if (!isRunning) return; // Pause the timer if isRunning is false

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Transition logic when timer hits 0
          if (isResting) {
            if (currentSet < totalSets) {
              setCurrentSet((prevSet) => prevSet + 1);
              setIsResting(false);
              return 30;
            } else {
              clearInterval(interval);
              return 0;
            }
          } else {
            setIsResting(true);
            return restPeriod;
          }
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting, currentSet, isRunning]);

  const stopTimer = () => {
    setIsRunning(false);
  };

  const restartTimer = () => {
    setIsRunning(true);
  };

  return (
    <ScrollView>
        <View className="flex-1 bg-gray-50 pt-12">
      <View className="items-center px-4">
        <Text className="text-3xl font-extrabold text-gray-800 mb-6 text-center">{exercise.name}</Text>
        
        <View className="w-72 h-72 rounded-2xl overflow-hidden shadow-lg mb-8">
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        {currentSet <= totalSets ? (
          <View className="items-center mb-8">
            <Text className="text-xl text-gray-700 mb-2">Set {currentSet} of {totalSets}</Text>
            {isResting ? (
              <Text className="text-lg text-gray-500 mb-6">Rest for {timer} seconds</Text>
            ) : (
              <Text className="text-lg text-gray-500 mb-6">Do {repsPerSet} reps</Text>
            )}
            <View className="w-48 h-48 rounded-full bg-blue-500 items-center justify-center shadow-md mb-8">
              <Text className="text-6xl font-bold text-white">{timer}</Text>
            </View>
          </View>
        ) : (
          <View className="items-center mb-8">
            <Ionicons name="checkmark-circle" size={80} color="#10B981" />
            <Text className="text-2xl font-bold text-green-500 mt-4">Exercise Completed!</Text>
          </View>
        )}

        {isRunning ? (
          <TouchableOpacity 
            onPress={stopTimer}
            className="flex-row items-center bg-red-500 px-8 py-3 rounded-full shadow-md mb-4"
          >
            <Ionicons name="stop-circle" size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">Stop Exercise</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={restartTimer}
            className="flex-row items-center bg-green-500 px-8 py-3 rounded-full shadow-md mb-4"
          >
            <Ionicons name="play-circle" size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">Restart Exercise</Text>
          </TouchableOpacity>
        )}

        {/* Button to navigate back to Exercise page */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Exercise')}
          className="flex-row items-center bg-gray-300 px-6 py-3 rounded-full shadow-md mt-2"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text className="text-black text-lg font-semibold ml-2">Back to Exercises</Text>
        </TouchableOpacity>
      </View>
    </View>

    </ScrollView>
    
  );
};

export default ExerciseTimer;
