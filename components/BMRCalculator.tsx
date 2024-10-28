import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const BMRCalculator: React.FC = () => {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [bmr, setBmr] = useState<number | null>(null);

  const activityLevels = [
    { level: "Sedentary: little or no exercise", factor: 1.2 },
    { level: "Exercise 1-3 times/week", factor: 1.375 },
    { level: "Exercise 4-5 times/week", factor: 1.465 },
    {
      level: "Daily exercise or intense exercise 3-4 times/week",
      factor: 1.55,
    },
    { level: "Intense exercise 6-7 times/week", factor: 1.725 },
    { level: "Very intense exercise daily, or physical job", factor: 1.9 },
  ];

  const calculateBMR = () => {
    if (!age || !weight || !height) {
      Alert.alert("Please enter all the required fields");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age, 10);

    let bmrValue: number;
    if (gender === "male") {
      bmrValue =
        88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum;
    } else {
      bmrValue =
        447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    }

    setBmr(bmrValue);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white p-6"
    >
      <Text className="text-3xl font-bold text-center text-rose-600 mb-6">
        BMR Calculator
      </Text>

      <View className="mb-6 space-y-4">
        <View>
          <Text className="text-lg font-semibold mb-2">Age</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Enter your age"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">Weight (kg)</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter your weight in kg"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">Height (cm)</Text>
          <TextInput
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Enter your height in cm"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">Gender</Text>
          <View className="border border-gray-300 rounded-lg">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              className="w-full px-4 py-2"
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={calculateBMR}
        className="bg-rose-500 py-3 rounded-full shadow-md w-full items-center"
      >
        <Text className="text-white font-bold text-md">Calculate BMR</Text>
      </TouchableOpacity>

      {bmr !== null && (
        <View className="mt-8 p-4 bg-gray-100 rounded-lg shadow-xl">
          <Text className="text-xl text-center font-bold text-rose-600 mb-4">
            Your BMR is: {Math.round(bmr)} kcal/day
          </Text>

          <Text className="text-lg font-bold mb-4 text-center">
            Daily Calorie Needs Based on Activity Level:
          </Text>

          {activityLevels.map((activity) => (
            <View
              key={activity.level}
              className="mb-5 flex-row justify-between items-center"
            >
              <Text className="text-xs font-medium text-gray-700 flex-1 pr-2">
                {activity.level}
              </Text>
              <Text className="text-rose-500 font-semibold text-xs">
                {Math.round(bmr * activity.factor)} kcal/day
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BMRCalculator;
