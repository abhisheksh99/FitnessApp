import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [user]);

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

  const handleImagePick = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        { text: "Take Photo", onPress: takePhotoWithCamera },
        { text: "Choose from Gallery", onPress: pickImageFromGallery },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = user.uid + '_profile.jpg';
    const storageRef = ref(storage, `profileImages/${filename}`);

    try {
      setLoading(true);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', user.uid), { photoURL: downloadURL });
      setUserData(prevData => ({ ...prevData, photoURL: downloadURL }));
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert('Error', 'Failed to update profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#F43F5E" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="items-center justify-center px-6 py-10">
        
        {/* Profile Image */}
        <View className="relative mb-8">
          <Image
            source={{ uri: userData?.photoURL || 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full border-4 border-rose-500"
          />
          <TouchableOpacity 
            className="absolute bottom-0 right-0 bg-rose-500 p-2 rounded-full shadow-lg"
            onPress={handleImagePick}
          >
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Name */}
        <Text className="text-3xl font-bold text-white mb-2">
          {userData?.name || 'User Name'}
        </Text>

        {/* User Email */}
        <Text className="text-gray-400 text-lg mb-8">
          {userData?.email || 'user@example.com'}
        </Text>

        {/* User Details */}
        <View className="bg-gray-800 rounded-xl p-6 w-full mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg">Height:</Text>
            <Text className="text-rose-500 text-lg font-bold">{userData?.height || 'N/A'} cm</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg">Weight:</Text>
            <Text className="text-rose-500 text-lg font-bold">{userData?.weight || 'N/A'} kg</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-lg">Gender:</Text>
            <Text className="text-rose-500 text-lg font-bold">{userData?.gender || 'N/A'}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          className="bg-rose-500 px-8 py-4 rounded-full shadow-lg w-full"
          onPress={handleLogout}
        >
          <Text className="text-white text-xl font-bold text-center">Logout</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
