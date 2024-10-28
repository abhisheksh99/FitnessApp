import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../Home";
import BMICalculator from "../../components/BmiCalculator";
import ProfileScreen from "../ProfileScreen";
import BMRCalculator from "../../components/BMRCalculator";


const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home";
              break;
            case "BMI Calculator":
              iconName = focused ? "calculator" : "calculator";
              break;
            case "BMR Calculator":
              iconName = focused ? "flame" : "flame"; 
              break;
            case "Profile":
              iconName = focused ? "person" : "person";
              break;
            default:
              iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#E57373",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarStyle: {
          paddingVertical: 5,
          borderTopWidth: 0,
          elevation: 8,
          backgroundColor: "white",
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="BMI Calculator" component={BMICalculator} options={{ tabBarLabel: "BMI Calc" }} />
      <Tab.Screen name="BMR Calculator" component={BMRCalculator} options={{ tabBarLabel: "BMR Calc" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
