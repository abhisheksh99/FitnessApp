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
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <Text className="text-3xl font-bold text-center text-rose-600 mb-8">
            BMI Calculator
          </Text>

          <View className="space-y-6">
            {/* Weight Input Section */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-lg">
                Weight
              </Text>
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <TextInput
                    className="h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-base text-gray-800"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChangeText={(value) => updateFormData("weight", value)}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View className="w-28">
                  <View className="h-12 border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                    <Picker
                      selectedValue={formData.weightUnit}
                      onValueChange={(value) => updateFormData("weightUnit", value)}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Picker.Item label="kg" value="kg" />
                      <Picker.Item label="lbs" value="lbs" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            {/* Height Input Section */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2 text-lg">
                Height
              </Text>
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <TextInput
                    className="h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-base text-gray-800"
                    placeholder="Feet"
                    value={formData.heightFeet}
                    onChangeText={(value) => updateFormData("heightFeet", value)}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View className="flex-1">
                  <TextInput
                    className="h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-base text-gray-800"
                    placeholder="Inches"
                    value={formData.heightInches}
                    onChangeText={(value) => updateFormData("heightInches", value)}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="bg-rose-600 py-4 rounded-xl mt-8 shadow-sm"
            onPress={calculateBMI}
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-bold text-center">
              Calculate BMI
            </Text>
          </TouchableOpacity>

          {result.bmi && (
            <View className="mt-8 p-6 bg-rose-50 rounded-2xl border border-rose-100">
              <Text className="text-2xl font-bold text-rose-600 text-center mb-3">
                Your BMI: {result.bmi.toFixed(1)}
              </Text>
              <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
                {result.category}
              </Text>
              <Text className="text-base text-gray-600 text-center">
                {result.advice}
              </Text>
            </View>
          )}

          <View className="mt-8 bg-gray-50 rounded-2xl p-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              BMI Categories
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-3 px-4 bg-white rounded-xl">
                <Text className="text-gray-700 font-medium">Underweight</Text>
                <Text className="text-rose-600 font-semibold">&lt; 18.5</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3 px-4 bg-white rounded-xl">
                <Text className="text-gray-700 font-medium">Normal weight</Text>
                <Text className="text-rose-600 font-semibold">18.5 – 24.9</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3 px-4 bg-white rounded-xl">
                <Text className="text-gray-700 font-medium">Overweight</Text>
                <Text className="text-rose-600 font-semibold">25 – 29.9</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-3 px-4 bg-white rounded-xl">
                <Text className="text-gray-700 font-medium">Obesity</Text>
                <Text className="text-rose-600 font-semibold">&ge; 30</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BMICalculator;