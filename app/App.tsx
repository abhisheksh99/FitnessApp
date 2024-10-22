import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style="light" />
      {!imageLoaded && (
        <View className="absolute w-full h-full flex items-center justify-center bg-gray-900">
          <ActivityIndicator size="large" color="#e11d48" />
        </View>
      )}
      <Animated.Image 
        entering={FadeIn.duration(1000)}
        className="absolute w-full h-full" 
        source={require("../assets/images/welcome.png")} 
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <Animated.View entering={FadeIn.delay(500).duration(1000)} style={{flex: 1}}>
          <LinearGradient 
            colors={['transparent', '#18181b']} 
            style={{width: wp(100), height: hp(100)}} 
            start={{x: 0.5, y: 0}} 
            end={{x: 0.5, y: 0.8}} 
            className='flex justify-end pb-12 space-y-8'
          >
            <Animated.View entering={FadeInDown.delay(1000).springify()} className='flex items-center'>
              <Text className='text-white font-bold tracking-wide' style={{fontSize: hp(5)}}>
                Best <Text className='text-rose-500'>Workouts</Text>
              </Text>
              <Text className='text-white font-bold tracking-wide' style={{fontSize: hp(5)}}>
                For you
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(1200).springify()}>
              <TouchableOpacity
                style={{height:hp(7), width: wp(80)}}
                className='bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200'
              >
                <Text className='text-white font-bold tracking-widest' style={{fontSize:hp(3)}}>Get Started</Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
}