import { Slot } from "expo-router";
import "./globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeSelector";
import {View } from "react-native";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <View className="flex-1 bg-black/70">
        <SafeAreaView className="flex-1 ">
          <Navbar />
          <Slot />
        </SafeAreaView>
      </View>
    </ThemeProvider>
  );
}
