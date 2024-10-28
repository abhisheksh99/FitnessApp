import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext';
import Animated, { FadeIn } from 'react-native-reanimated';

const Welcome = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigation.navigate('HomeTabs');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
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
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: hp(12) }}>
          <View className="items-center space-y-4">
            <View className="flex items-center">
              <Text className="text-white font-bold tracking-wide text-center" style={{ fontSize: hp(4.5) }}>
                Best <Text className="text-rose-500">Workouts</Text>
              </Text>
              <Text className="text-white font-bold tracking-wide text-center" style={{ fontSize: hp(4.5) }}>
                For you
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ height: hp(7), width: wp(80) }}
                className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mt-4"
                onPress={handleGetStarted}
              >
                <Text className="text-white font-bold tracking-widest" style={{ fontSize: hp(3) }}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Welcome;
