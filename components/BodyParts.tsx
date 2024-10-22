import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const BodyPartCard = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(600)}
    >
      <TouchableOpacity
        style={{ 
          width: wp(44), 
          height: wp(52), 
          margin: wp(2) 
        }}
        className="flex justify-end"
        onPress={() => navigation.navigate("Exercise", { item })}
      >
        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Animated.Image
            entering={FadeIn.delay(index * 200 + 300).duration(600)}
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
              position: 'absolute',
              bottom: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="rounded-b-[35px]"
          />
          <Animated.Text 
            entering={FadeIn.delay(index * 200 + 600).duration(600)}
            style={{ 
              fontSize: hp(2.3), 
              position: 'absolute', 
              bottom: hp(2), 
              left: 0, 
              right: 0,
              textTransform: 'uppercase',
              textShadowColor: 'rgba(0, 0, 0, 0.7)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 3,
              paddingHorizontal: wp(1),
            }} 
            className="text-white font-semibold text-center tracking-wide"
          >
            {item?.name}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const BodyParts = () => {
  return (
    <View style={{ flex: 1 }}>
      <Animated.Text 
        entering={FadeInDown.duration(600)}
        className="text-4xl font-bold text-neutral-900 text-center mb-4"
      >
        Exercises
      </Animated.Text>
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
        renderItem={({ item, index }) => <BodyPartCard item={item} index={index} />}
      />
    </View>
  );
};

export default BodyParts;