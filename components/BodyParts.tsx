import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const BodyPartCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ 
        width: wp(44), 
        height: wp(52), 
        margin: wp(2) 
      }}
      className="flex justify-end"
      onPress={() => navigation.navigate("Exercise", { item })} // Pass the item here
    >
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
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
            position: 'absolute', // Add position absolute
            bottom: 0, // Position gradient at the bottom
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="rounded-b-[35px]"
        />
        <Text 
          style={{ 
            fontSize: hp(2.3), 
            position: 'absolute', 
            bottom: hp(2), 
            left: 0, 
            right: 0,
            textTransform: 'uppercase', // Make text uppercase
            textShadowColor: 'rgba(0, 0, 0, 0.7)', // Add shadow color
            textShadowOffset: { width: 0, height: 1 }, // Shadow offset
            textShadowRadius: 3, // Shadow blur radius
            paddingHorizontal: wp(1), // Add horizontal padding
          }} 
          className="text-white font-semibold text-center tracking-wide"
        >
          {item?.name}
        </Text>
      </View>
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
          justifyContent: 'center', 
          gap: wp(2) 
        }}
        renderItem={({ item }) => <BodyPartCard item={item} />}
      />
    </View>
  );
};

export default BodyParts;
