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
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, { displayName: name });

      // Store user data in Firestore
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black">
      <View className="flex-1 justify-center items-center py-10">
        <Text className="text-white text-4xl font-extrabold mb-8">Join Fitverse</Text>
        <View className="w-4/5 space-y-4">
          <TextInput
            className="bg-white rounded-full py-3 px-5 text-gray-800"
            placeholder="Name"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-white rounded-full py-3 px-5 text-gray-800"
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-white rounded-full py-3 px-5 text-gray-800"
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="bg-white rounded-full py-3 px-5 text-gray-800"
            placeholder="Height (cm)"
            placeholderTextColor="#A0A0A0"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            className="bg-white rounded-full py-3 px-5 text-gray-800"
            placeholder="Weight (kg)"
            placeholderTextColor="#A0A0A0"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <View className="bg-white rounded-full overflow-hidden">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ color: gender ? '#000' : '#A0A0A0', height: 45 }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
        
        <TouchableOpacity 
          className="bg-rose-500 rounded-full py-3 w-4/5 mt-6" 
          onPress={handleSignUp}
        >
          <Text className="text-white text-lg font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
        
        <Text className="text-white text-base mt-4">Already have an Account?</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-blue-400 text-base font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;