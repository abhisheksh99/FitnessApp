import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const ExerciseDetails = ({ route }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const InfoSection = ({ title, data, delay }) => (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(500)}
      className="mb-4"
    >
      <Text className="text-lg font-semibold text-gray-700 mb-2">{title}:</Text>
      <View className="flex-row flex-wrap">
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeIn.delay(delay + 100 + index * 50).duration(300)}
              className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-fuchsia-700">{item}</Text>
            </Animated.View>
          ))
        ) : (
          <Animated.View
            entering={FadeIn.delay(delay + 100).duration(300)}
            className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2"
          >
            <Text className="text-fuchsia-700">{data}</Text>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Animated.View
            entering={FadeInUp.duration(500)}
            className="bg-white rounded-3xl shadow-lg"
            style={{ width: wp(90), maxHeight: hp(80) }}
          >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View className="relative">
                <Animated.View entering={FadeIn.delay(300).duration(500)}>
                  <Image
                    source={{ uri: item.gifUrl }}
                    contentFit="cover"
                    style={{ width: wp(90), height: hp(40) }}
                    className="rounded-t-3xl"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeIn.delay(500).duration(300)}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={closeModal}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      padding: 8,
                    }}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <View className="p-6">
                <Animated.Text
                  entering={FadeInDown.delay(600).duration(500)}
                  className="text-3xl font-extrabold mb-3 text-gray-800 tracking-wide text-center uppercase"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.1)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {item.name}
                </Animated.Text>
                <Animated.View
                  entering={FadeIn.delay(700).duration(300)}
                  className="h-1 w-20 bg-fuchsia-600 mb-4"
                />

                <InfoSection
                  title="Equipment"
                  data={item.equipment}
                  delay={800}
                />
                <InfoSection
                  title="Target Muscle"
                  data={item.target}
                  delay={1000}
                />
                <InfoSection
                  title="Secondary Muscles"
                  data={item.secondaryMuscles}
                  delay={1200}
                />

                <Animated.Text
                  entering={FadeInDown.delay(1400).duration(500)}
                  className="text-lg font-semibold mb-2 text-gray-700"
                >
                  Instructions:
                </Animated.Text>
                {item.instructions.map((instruction, index) => (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.delay(1500 + index * 100).duration(
                      500
                    )}
                    className="flex-row mb-3"
                  >
                    <Text className="text-fuchsia-600 font-bold mr-2">
                      {index + 1}.
                    </Text>
                    <Text className="text-base text-gray-600 flex-1">
                      {instruction}
                    </Text>
                  </Animated.View>
                ))}
                <Animated.View entering={FadeInUp.delay(1800).duration(500)}>
                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-fuchsia-600 rounded-full py-3 px-6 mt-6"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Close
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseDetails;
