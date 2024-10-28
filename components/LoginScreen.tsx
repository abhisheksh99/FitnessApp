import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-4xl font-bold mb-10">Fitverse</Text>
      <View className="w-4/5">
        <TextInput
          className="bg-white rounded-full p-4 mb-4"
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-white rounded-full p-4 mb-4"
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity 
        className="bg-red-500 rounded-full p-4 w-4/5 mb-4" 
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-bold text-center">Login</Text>
      </TouchableOpacity>
      <Text className="text-white text-lg">Don't have an Account?</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text className="text-blue-500 text-lg">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;