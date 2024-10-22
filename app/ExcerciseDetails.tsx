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

  const InfoSection = ({ title, data }) => (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-gray-700 mb-2">{title}:</Text>
      <View className="flex-row flex-wrap">
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <View
              key={index}
              className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-fuchsia-700">{item}</Text>
            </View>
          ))
        ) : (
          <View className="bg-fuchsia-100 rounded-full px-3 py-1 mr-2 mb-2">
            <Text className="text-fuchsia-700">{data}</Text>
          </View>
        )}
      </View>
    </View>
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
          <View
            className="bg-white rounded-3xl shadow-lg"
            style={{ width: wp(90), maxHeight: hp(80) }}
          >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View className="relative">
                <Image
                  source={{ uri: item.gifUrl }}
                  contentFit="cover"
                  style={{ width: wp(90), height: hp(40) }}
                  className="rounded-t-3xl"
                />
                <TouchableOpacity
                  onPress={closeModal}
                  className="absolute top-4 right-4 bg-white rounded-full p-2"
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View className="p-6">
                <Text
                  className="text-3xl font-extrabold mb-3 text-gray-800 tracking-wide text-center uppercase"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.1)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {item.name}
                </Text>
                <View className="h-1 w-20 bg-fuchsia-600 mb-4" />

                <InfoSection title="Equipment" data={item.equipment} />
                <InfoSection title="Target Muscle" data={item.target} />
                <InfoSection
                  title="Secondary Muscles"
                  data={item.secondaryMuscles}
                />

                <Text className="text-lg font-semibold mb-2 text-gray-700">
                  Instructions:
                </Text>
                {item.instructions.map((instruction, index) => (
                  <View key={index} className="flex-row mb-3">
                    <Text className="text-fuchsia-600 font-bold mr-2">
                      {index + 1}.
                    </Text>
                    <Text className="text-base text-gray-600 flex-1">
                      {instruction}
                    </Text>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={closeModal}
                  className="bg-fuchsia-600 rounded-full py-3 px-6 mt-6"
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseDetails;
