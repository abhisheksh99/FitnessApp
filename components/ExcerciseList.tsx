import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ExerciseList = ({ data }) => {
  return (
    <Animated.View 
      entering={FadeInDown.duration(500)}
      style={{ flex: 1 }}
    >
      <Text className="text-4xl font-bold text-neutral-900 text-center mb-4">
      
      </Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 20,
          alignItems: "center",
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: wp(2),
        }}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100).duration(500)}
          >
            <ExerciseCard item={item} />
          </Animated.View>
        )}
      />
    </Animated.View>
  );
};

const ExerciseCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("ExerciseDetails", { item })} 
      className="flex py-3 space-y-2"
    >
      <Animated.View 
        entering={FadeInDown.duration(300)}
        className="bg-neutral-200 shadow rounded-[25px]"
      >
        <Image 
          source={{ uri: item.gifUrl }} 
          contentFit="cover" 
          style={{ width: wp(44), height: wp(52) }} 
          className="rounded-[25px]" 
        />
      </Animated.View>
      <Animated.Text 
        entering={FadeInDown.delay(150).duration(300)}
        style={{ fontSize: heightPercentageToDP(1.7) }} 
        className="text-neutral-700 font-semibold ml-1 tracking-wide"
      >
        {item?.name?.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default ExerciseList;