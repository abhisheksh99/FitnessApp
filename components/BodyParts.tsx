import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const BodyPartCard = ({ item }) => {
  return (
    <TouchableOpacity
      style={{ 
        width: wp(44), 
        height: wp(52), 
        margin: wp(2) 
      }}
      className="flex justify-end"
    >
      <Image
        source={item.image}
        resizeMode="cover"
        style={{ 
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        className="rounded-[25px]"
      />
      <LinearGradient 
        colors={["transparent", "rgba(0,0,0,0.9)"]} 
        style={{ 
          width: wp(44), 
          height: hp(15), 
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0 rounded-b-[35px]"
      />
      <Text style={{fontSize:hp(2.3)}} className="text-white font-semibold text-center tracking-wide">
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

const BodyParts = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text className="text-4xl font-bold text-neutral-900 text-center mb-4">
        Exercises
      </Text>
      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 20,
          alignItems: 'center'
        }}
        columnWrapperStyle={{
          justifyContent: 'center', // Center the items
          gap: wp(2) // Gap between columns
        }}
        renderItem={({ item }) => <BodyPartCard item={item} />}
      />
    </View>
  );
};

export default BodyParts;
