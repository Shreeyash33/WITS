import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/components/ThemeSelector";
import { useState } from "react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [usernameclicked, setUsernameClicked] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-sky-50"} flex-col items-center space-y-4 p-4`}
    >
      <View className="h-[20%] w-full  flex-col justify-between items-start">
        <View
          className={`${theme === "dark" ? "bg-gray-700" : "bg-blue-200"} w-full pl-3 rounded-md flex-row justify-between `}
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} text-lg font-bold py-2`}
          >
            Username
          </Text>
          {usernameclicked ? (
            <TextInput
              className={`w-2/3 ${theme === "dark" ? "bg-gray-600 text-white" : "bg-blue-300 text-black"} rounded-md py-2`}
              onBlur={() => {
                setUsernameClicked(false);
                setIsFocused(false);
              }}
              onChangeText={setUserName}
              placeholder="Enter user Name"
              placeholderTextColor={theme === "dark" ? "gray" : "black"}
              
              onFocus={() => setIsFocused(true)}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setUsernameClicked(true)}
              className={`w-2/3 ${theme === "dark" ? "bg-gray-600" : "bg-blue-300"} rounded-md py-2`}
            >
              <Text
                className={`text-lg ${theme === "dark" ? "text-white " : "text-black"} font-bold text-center`}
              >
                {userName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          className={`justify-between flex-row items-center rounded-md px-3 py-1 ${theme === "dark" ? "bg-gray-700" : "bg-blue-200"}`}
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold text-lg w-2/5`}
          >
            Theme
          </Text>
          <View
            className={`w-3/5 flex-row rounded-3xl justify-between ${theme === "dark" ? "bg-gray-700" : "bg-blue-300"}  p-1`}
          >
            <TouchableOpacity
              className={`flex-1 rounded-3xl py-2 ${
                theme === "dark" ? "bg-transparent" : "bg-blue-200"
              }`}
              onPress={() => setTheme("light")}
            >
              <Text
                className={`text-center font-semibold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 rounded-3xl py-2 ${
                theme === "dark" ? "bg-gray-900" : "bg-transparent"
              }`}
              onPress={() => setTheme("dark")}
            >
              <Text
                className={`text-center font-semibold ${
                  theme === "light" ? "text-black" : "text-gray-200"
                }`}
              >
                Dark
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-4 flex-row justify-between items-center">
        <Text></Text>
      </View>
    </View>
  );
}
