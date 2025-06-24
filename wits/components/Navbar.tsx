import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useTheme } from "./ThemeSelector";
const { width } = Dimensions.get("window");

const menuItems = [
  { label: "Dashboard", route: "Dashboard" },
  { label: "Add Data", route: "Adddata" },
  { label: "History", route: "History" },
  { label: "Settings", route: "Settings" },
];

export function Navbar() {
  let router = useRouter();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const segments = useSegments();
  const currentRoute = segments[segments.length - 1] || "Dashboard";

const handleNavigation = (route: string) => {
  Animated.timing(slideAnim, {
    toValue: -width,
    duration: 300,
    useNativeDriver: true,  
  }).start(() => {
    setIsMenuOpen(false);
    router.push(route as any);
  });
};


  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuOpen(false); // unmount after the animation is fully done
    });
  };

  return (
    <View className="w-full">
      <View
        className={`flex flex-row items-center justify-between ${theme === "dark" ? "bg-gray-900" : "bg-blue-200"} p-3 px-6`}
      >
        <TouchableOpacity className="w-full flex-row" onPress={openMenu}>
          <Text className="text-4xl w-fit font-bold text-white">☰</Text>
          <Text
            className={`absolute w-full text-center ${theme === "dark" ? "text-white" : "text-black"}  text-lg pt-2 font-bold`}
          >
            {currentRoute}
          </Text>
        </TouchableOpacity>
      </View>
      {isMenuOpen && (
        <>
          <Animated.View
            pointerEvents={isMenuOpen ? "auto" : "none"}
            className={`absolute top-0 left-0 h-[100vh] w-full ${theme === "dark" ? "bg-black/80" : "bg-blue-200"}  p-6 z-20`}
            style={{
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Text
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mb-6`}
              onPress={closeMenu}
            >
              ✕ Close
            </Text>
            {menuItems.map((item,index) => (
              <TouchableOpacity
              key={index}
                onPress={() => handleNavigation(item.route)}
                className={`p-1 px-3 rounded-lg mb-2 ${
                  theme === "dark" ? "bg-gray-800 active:bg-gray-500 " : "bg-blue-100 active:bg-blue-300" 
                }`}
              >
                <Text
                  className={`text-lg py-3 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
}
