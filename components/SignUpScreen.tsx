import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!name || !email || !password || !height || !weight || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        height,
        weight,
        gender,
        createdAt: new Date()
      });
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="min-h-screen justify-center items-center px-6 py-10 space-y-8">
        <View className="w-full items-center space-y-4">
          <Text className="text-white text-5xl font-extrabold tracking-wider">
            Join Fitverse
          </Text>
          <Text className="text-gray-400 text-lg">
            Create your account
          </Text>
        </View>

        <View className="w-full space-y-4">
          <TextInput
            className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
            placeholder="Height (cm)"
            placeholderTextColor="#9CA3AF"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
            placeholder="Weight (kg)"
            placeholderTextColor="#9CA3AF"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <View className="bg-gray-800/60 rounded-2xl overflow-hidden">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              dropdownIconColor="white"
              className="text-white h-14 px-4"
              style={{ color: gender ? '#FFFFFF' : '#9CA3AF' }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
        
        <TouchableOpacity 
          className="w-full bg-rose-500 rounded-2xl py-4 shadow-lg" 
          onPress={handleSignUp}
        >
          <Text className="text-white text-lg font-bold text-center">
            CREATE ACCOUNT
          </Text>
        </TouchableOpacity>
        
        <View className="flex-row space-x-2 items-center">
          <Text className="text-gray-400 text-base">
            Already have an Account?
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-rose-500 text-base font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;