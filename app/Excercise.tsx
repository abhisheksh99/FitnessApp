import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchExercisesByBodyPart } from "../api/excerciseDb";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import ExerciseList from "../components/ExcerciseList";


const Exercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (item) {
      getExercises(item.name);
    }
  }, [item]);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    console.log(data);
    setExercises(data);
  };

  const bodyPartImage = bodyParts.find((part) => part.name === item.name)?.image;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      {bodyPartImage && (
        <Image
          source={bodyPartImage}
          style={{ width: wp(100), height: hp(45) }}
          className="rounded-b-[40px]"
        />
      )}
      <TouchableOpacity
        className="bg-rose-600 mx-4 absolute rounded-full flex justify-center items-center pr-1"
        style={{
          height: hp(6),
          width: hp(6),
          marginTop: hp(7),
          borderWidth: 2,
          borderColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="chevron-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
          className="text-neutral-700"
        >
          {item.name} Exercises
        </Text>
      </View>

      
      <FlatList
        data={exercises}
        keyExtractor={(exercise) => exercise.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        renderItem={({ item }) => <ExerciseList data={[item]} />} 
      />
    </View>
  );
};

export default Exercise;
