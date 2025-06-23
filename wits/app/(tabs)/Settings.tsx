import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  return (
    <View className="flex-1 bg-black">
      <View className="w-full bg-white/30 flex-row ">
        <View className="w-[40%] bg-blue-500 py-3">
          <Text className="text-white  text-lg text-center  ">Username</Text>
        </View>
        <View className="w-[60%] bg-green-500 flex-row justify-between items-center px-2">
          <Text className="text-white text-lg">Theme</Text>
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}

function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <View className="w-3/5 flex-row justify-between bg-gray-500 rounded-3xl p-1">
      <TouchableOpacity
        className={`flex-1 rounded-3xl py-2 ${!isDarkTheme ? "bg-black" : ""}`}
        onPress={() => setIsDarkTheme(false)}
      >
        <Text className={`text-center ${!isDarkTheme ? "text-white" : "text-black"}`}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 rounded-3xl py-2 ${isDarkTheme ? "bg-black" : ""}`}
        onPress={() => setIsDarkTheme(true)}
      >
        <Text className={`text-center ${isDarkTheme ? "text-white" : "text-black"}`}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
}