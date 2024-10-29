import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import ImageSlider from "../components/ImageSlider";
import BodyParts from "../components/BodyParts";
import { useAuth } from "../context/authContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

const Home = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (user?.uid) {
      const userDocRef = doc(db, 'users', user.uid);

      unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        }
        setLoading(false);
      }, () => setLoading(false));
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const uploadImage = async (uri) => {
    try {
      setLoading(true);
      const blob = await (await fetch(uri)).blob();
      const storageRef = ref(storage, `profileImages/${user.uid}_profile.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });

      setUserData((prevData) => ({ ...prevData, photoURL: downloadURL }));
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <Text className="text-4xl font-bold text-gray-800 mt-5">READY TO</Text>
          <Text className="text-4xl font-bold text-rose-700">Workout</Text>
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
