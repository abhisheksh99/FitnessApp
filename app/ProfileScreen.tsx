import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchExerciseHistory();
  }, [user]);

  useEffect(() => {
    filterHistory();
  }, [searchDate, exerciseHistory]);

  const fetchUserData = async () => {
    if (user?.uid) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
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

  const fetchExerciseHistory = () => {
    if (user?.email) {
      setLoading(true);
      const exerciseLogsRef = collection(db, "exerciseLogs");
      const q = query(exerciseLogsRef, where("userEmail", "==", user.email));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const historyData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate(),
          }));

          historyData.sort((a, b) => b.timestamp - a.timestamp);

          setExerciseHistory(historyData);
          setFilteredHistory(historyData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching exercise history:", error);
          Alert.alert("Error", "Failed to fetch exercise history");
          setLoading(false);
        }
      );

      return unsubscribe; 
    }
  };

  const filterHistory = () => {
    if (!searchDate) {
      setFilteredHistory(exerciseHistory);
      return;
    }

    const filtered = exerciseHistory.filter((exercise) => {
      if (!exercise.timestamp) return false;
      const exerciseDate = exercise.timestamp
        .toLocaleDateString()
        .toLowerCase();
      return exerciseDate.includes(searchDate.toLowerCase());
    });

    setFilteredHistory(filtered);
  };

  const saveExerciseLog = async (exercise) => {
    try {
      await addDoc(collection(db, "exerciseLogs"), {
        exerciseId: exercise.id,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        timestamp: Timestamp.now(),
        userEmail: user.email,
      });
      Alert.alert("Success", "Exercise log saved.");
    } catch (error) {
      console.error("Error saving exercise log:", error);
      Alert.alert("Error", "Failed to save exercise log.");
    }
  };

  const handleImagePick = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        { text: "Take Photo", onPress: takePhotoWithCamera },
        { text: "Choose from Gallery", onPress: pickImageFromGallery },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
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
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
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
    const filename = user.uid + "_profile.jpg";
    const storageRef = ref(storage, `profileImages/${filename}`);

    try {
      setLoading(true);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });
      setUserData((prevData) => ({ ...prevData, photoURL: downloadURL }));
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert(
        "Error",
        "Failed to update profile picture. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#E11D48" />
      </View>
    );
  }

  const InfoItem = ({ label, value, icon }) => (
    <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl mb-3 shadow-sm">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={24} color="#E11D48" />
        <Text className="text-gray-600 text-lg ml-3">{label}</Text>
      </View>
      <Text className="text-gray-800 text-lg font-semibold">
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-rose-600 h-48 rounded-b-[40px] shadow-lg">
        <View className="mt-12 items-center">
          <Text className="text-white text-2xl font-bold mb-2">Profile</Text>
        </View>
      </View>

      <View className="px-6 -mt-20">
        <View className="bg-white rounded-3xl p-6 shadow-lg mb-6 items-center">
          <View className="relative">
            <Image
              source={{
                uri: userData?.photoURL || "https://via.placeholder.com/150",
              }}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-rose-600 p-3 rounded-full shadow-lg"
              onPress={handleImagePick}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mt-4 mb-1">
            {userData?.name || "User Name"}
          </Text>
          <Text className="text-gray-500 text-base mb-2">
            {userData?.email || "user@example.com"}
          </Text>
        </View>

        {/* Personal Information Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3 ml-1">
            Personal Information
          </Text>
          <InfoItem
            label="Height"
            value={userData?.height ? `${userData.height} cm` : "N/A"}
            icon="resize-outline"
          />
          <InfoItem
            label="Weight"
            value={userData?.weight ? `${userData.weight} kg` : "N/A"}
            icon="scale-outline"
          />
          <InfoItem
            label="Gender"
            value={userData?.gender || "N/A"}
            icon="person-outline"
          />
        </View>

        {/* Exercise History Section with Search */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3 ml-1">
            Exercise History
          </Text>

          {/* Search Input */}
          <View className="bg-white rounded-2xl mb-4 shadow-sm flex-row items-center px-4 py-3">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-700"
              placeholder="Search by date (e.g., 10/28/2024)"
              placeholderTextColor="#9CA3AF"
              value={searchDate}
              onChangeText={setSearchDate}
              style={{ outline: "none" }}
            />
            {searchDate !== "" && (
              <TouchableOpacity
                onPress={() => setSearchDate("")}
                className="ml-2"
              >
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
          {filteredHistory.length === 0 ? (
            <Text className="text-gray-500 text-center">
              No exercise history found.
            </Text>
          ) : (
            filteredHistory.map((exercise) => (
              <View
                key={exercise.id}
                className="bg-white p-5 rounded-2xl mb-4 shadow-md border border-gray-100"
              >
                <View className="flex-row items-center mb-2">
                  <Ionicons name="barbell-outline" size={20} color="#E11D48" />
                  <Text className="text-lg font-semibold text-gray-800 ml-2 uppercase">
                    {exercise.name}
                  </Text>
                </View>

                {/* Date Row */}
                <View className="flex-row items-center mb-3">
                  <Ionicons name="calendar-outline" size={16} color="#E11D48" />
                  <Text className="text-gray-600 ml-2 font-medium">Date:</Text>
                  <Text className="text-gray-800 ml-1">
                    {exercise.timestamp?.toLocaleDateString() || "N/A"}
                  </Text>
                </View>

                {/* Details Section */}
                <View className="flex-row flex-wrap">
                  {/* Sets */}
                  <View className="bg-gray-50 rounded-xl px-4 py-2 mr-2 mb-2 flex-row items-center">
                    <Ionicons name="repeat-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-600 ml-2">
                      <Text className="font-medium">Sets:</Text> {exercise.sets}
                    </Text>
                  </View>

                  {/* Reps */}
                  <View className="bg-gray-50 rounded-xl px-4 py-2 mr-2 mb-2 flex-row items-center">
                    <Ionicons
                      name="refresh-outline"
                      size={16}
                      color="#6B7280"
                    />
                    <Text className="text-gray-600 ml-2">
                      <Text className="font-medium">Reps:</Text> {exercise.reps}
                    </Text>
                  </View>

                  {/* Weight */}
                  <View className="bg-gray-50 rounded-xl px-4 py-2 mb-2 flex-row items-center">
                    <Ionicons
                      name="speedometer-outline"
                      size={16}
                      color="#6B7280"
                    />
                    <Text className="text-gray-600 ml-2">
                      <Text className="font-medium">Weight:</Text>{" "}
                      {exercise.weight} kg
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-rose-600 px-6 py-4 rounded-2xl shadow-lg mb-6"
          onPress={handleLogout}
        >
          <View className="flex-row justify-center items-center">
            <Ionicons
              name="log-out-outline"
              size={24}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-lg font-semibold ml-2">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
