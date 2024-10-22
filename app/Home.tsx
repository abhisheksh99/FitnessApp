import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageSlider from "../components/ImageSlider";
import BodyParts from "../components/BodyParts";

const Home = () => {
  return (
    <View className="flex-1 space-y-5">
      <StatusBar style="dark" />

      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-wider text-neutral-700"
          >
            READY TO
          </Text>
          <Text
            style={{ fontSize: hp(5) }}
            className="font-bold tracking-wider text-rose-700"
          >
            Workout
          </Text>
        </View>

        <View className="flex justify-center items-center space-y-2">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(6), width: hp(6) }}
            className="rounded-full"
          />
        </View>
      </View>
      <View>
        <ImageSlider/>
      </View>
      <View className="flex-1">
        <BodyParts/>

      </View>
    </View>
  );
};

export default Home;
