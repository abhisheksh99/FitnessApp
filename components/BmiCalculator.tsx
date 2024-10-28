import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    heightFeet: "",
    heightInches: "",
    weightUnit: "kg",
  });

  const [result, setResult] = useState({
    bmi: null,
    category: "",
    advice: "",
  });

  const getBMICategory = (bmi) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        advice: "Consider gaining weight through a balanced diet.",
      };
    if (bmi < 24.9)
      return {
        category: "Normal Weight",
        advice: "Maintain your healthy lifestyle!",
      };
    if (bmi < 29.9)
      return {
        category: "Overweight",
        advice: "Consider a balanced diet and regular exercise.",
      };
    return {
      category: "Obese",
      advice: "Please consult with a healthcare provider.",
    };
  };

  const calculateBMI = () => {
    let weightInKg = parseFloat(formData.weight);
    if (formData.weightUnit === "lbs") {
      weightInKg *= 0.453592;
    }

    const feet = parseFloat(formData.heightFeet) || 0;
    const inches = parseFloat(formData.heightInches) || 0;
    const heightInM = feet * 0.3048 + inches * 0.0254;

    if (!isNaN(weightInKg) && heightInM > 0) {
      const bmiValue = weightInKg / (heightInM * heightInM);
      const { category, advice } = getBMICategory(bmiValue);
      setResult({ bmi: bmiValue, category, advice });
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="bg-white p-6 rounded-3xl shadow-md mb-6">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
            BMI Calculator
          </Text>

          <View className="space-y-4">
            <View className="flex-row space-x-2">
              <View className="flex-1">
                <TextInput
                  className="h-10 bg-gray-100 border border-gray-300 rounded-lg px-3 text-base text-gray-700"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChangeText={(value) => updateFormData("weight", value)}
                  keyboardType="numeric"
                  placeholderTextColor="#B0B0B0"
                />
              </View>
              <View className="w-24">
                <View className="h-10 border border-gray-300 rounded-lg bg-gray-100">
                  <Picker
                    selectedValue={formData.weightUnit}
                    onValueChange={(value) =>
                      updateFormData("weightUnit", value)
                    }
                    style={{ height: "100%", width: "100%" }}
                  >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="lbs" value="lbs" />
                  </Picker>
                </View>
              </View>
            </View>

            <View className="flex-row space-x-2">
              <View className="flex-1">
                <TextInput
                  className="h-10 bg-gray-100 border border-gray-300 rounded-lg px-3 text-base text-gray-700"
                  placeholder="Feet"
                  value={formData.heightFeet}
                  onChangeText={(value) => updateFormData("heightFeet", value)}
                  keyboardType="numeric"
                  placeholderTextColor="#B0B0B0"
                />
              </View>
              <View className="flex-1">
                <TextInput
                  className="h-10 bg-gray-100 border border-gray-300 rounded-lg px-3 text-base text-gray-700"
                  placeholder="Inches"
                  value={formData.heightInches}
                  onChangeText={(value) =>
                    updateFormData("heightInches", value)
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#B0B0B0"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="bg-green-500 py-4 rounded-lg mt-6"
            onPress={calculateBMI}
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Calculate BMI
            </Text>
          </TouchableOpacity>

          {result.bmi && (
            <View className="mt-8 p-6 bg-gray-200 rounded-lg shadow-sm">
              <Text className="text-2xl font-semibold text-gray-800 mb-2">
                Your BMI: {result.bmi.toFixed(1)}
              </Text>
              <Text className="text-xl text-gray-600 mb-1">
                {result.category}
              </Text>
              <Text className="text-lg text-gray-500 text-center">
                {result.advice}
              </Text>
            </View>
          )}

          <View className="mt-8 p-6 bg-gray-200 rounded-lg shadow-sm">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              BMI Categories:
            </Text>
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-gray-600">Underweight</Text>
              <Text className="text-gray-800">&lt; 18.5</Text>
            </View>
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-gray-600">Normal weight</Text>
              <Text className="text-gray-800">18.5 – 24.9</Text>
            </View>
            <View className="flex-row justify-between py-2 border-b border-gray-300">
              <Text className="text-gray-600">Overweight</Text>
              <Text className="text-gray-800">25 – 29.9</Text>
            </View>
            <View className="flex-row justify-between py-2">
              <Text className="text-gray-600">Obesity</Text>
              <Text className="text-gray-800">&ge; 30</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BMICalculator;
