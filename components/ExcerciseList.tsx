import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

const ExerciseList = ({ data }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {data.map((item, index) => (
        <ExerciseCard key={index} item={item} index={index} />
      ))}
    </View>
  );
};

const ExerciseCard = ({ item, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ExerciseDetails", { item })}
      className="flex py-3 space-y-2"
    >
      <Animated.View
        entering={FadeInDown.delay(index * 100).duration(300)}
        className="bg-neutral-200 shadow rounded-[25px]"
      >
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(44), height: wp(52) }}
          className="rounded-[25px]"
        />
      </Animated.View>
      <Text
        style={{ fontSize: heightPercentageToDP(1.7) }}
        className="text-neutral-700 font-semibold ml-1 tracking-wide"
      >
        {item?.name?.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ExerciseList;
