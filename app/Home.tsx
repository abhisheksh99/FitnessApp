import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import ImageSlider from "../components/ImageSlider";
import BodyParts from "../components/BodyParts";
import { useAuth } from "../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Home = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#F43F5E" />
      </View>
    );
  }

  return (
    <View className="flex-1 pt-5 bg-gray-100">
      <StatusBar style="dark" />

      {/* Header Section */}
      <View className="flex-row justify-between items-center px-5">
        <View>
          <Text className="text-4xl font-bold text-gray-800 mt-5">
            READY TO
          </Text>
          <Text className="text-4xl font-bold text-rose-700">
            Workout
          </Text>
        </View>

        {/* Profile Image */}
        <View>
          <Image
            source={{ uri: userData?.photoURL || 'https://via.placeholder.com/150' }}
            className="w-20 h-20 rounded-full border-4 border-rose-500 mt-5"
          />
        </View>
      </View>

      {/* Welcome Message */}
      <View className="px-5 mt-2">
        <Text className="text-lg text-gray-600">
          Welcome, {userData?.name || user?.displayName || user?.email}!
        </Text>
      </View>

      {/* Image Slider */}
      <View className="my-4">
        <ImageSlider />
      </View>

      {/* Body Parts Section */}
      <View className="flex-1 px-5">
        <BodyParts />
      </View>
    </View>
  );
};

export default Home;
