import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from "nativewind";
import Welcome from './app/Welcome';
import Excercise from './app/Excercise';
import ExcerciseDetails from './app/ExcerciseDetails';
import TabNavigator from './app/navigation/TabNavigator';
import { AuthProvider } from './context/authContext';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';


NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Exercise"
            component={Excercise}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExerciseDetails" 
            component={ExcerciseDetails}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
