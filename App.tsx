import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import Welcome from './app/Welcome';


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Welcome />
    </View>
  );
}