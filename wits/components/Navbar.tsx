
import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";


const { width } = Dimensions.get("window");


const menuItems = [
  { label: "Dashboard", route: "Dashboard" },
  { label: "Add Data", route: "Adddata" },
  { label: "History", route: "History" },
];


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState("Dashboard");
  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500, // dramatic speed
      useNativeDriver: false,
    }).start();
  };


  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };


  const handleNavigation = (route: string) => {
    closeMenu();
    setCurrentRoute(route);
    router.push(route as any);
  };


  return (
    <View className="w-full bg-red-500 border-b border-gray-300">
      <View className="flex flex-row items-center justify-between bg-gray-500 p-3 px-6">
        <Text className="text-4xl font-bold text-white" onPress={openMenu}>
          ☰
        </Text>
        <Text className=" flex-1 text-center text-white text-lg font-bold">
         {currentRoute}
        </Text>
      </View>
      {isMenuOpen && (
        <>
          <Pressable
            className="absolute top-0 left-0 h-full w-full bg-black/50"
            onPress={closeMenu}
          />
          <Animated.View
            className={
              "absolute top-0 left-0 h-[100vh] w-full bg-black/80 p-6 z-20"
            }
            style={{
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Text
              className="text-xl font-bold text-white mb-6"
              onPress={closeMenu}
            >
              ✕ Close
            </Text>


            {menuItems.map((item) => (
             
              <Pressable
                key={item.route}
                onPress={() => handleNavigation(item.route)}
                className="active:bg-gray-700 bg-white/30 p-1 px-3 rounded-lg mb-2 "
              >
                <Text className="text-white text-lg py-3 ">{item.label}</Text>
              </Pressable>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
}
