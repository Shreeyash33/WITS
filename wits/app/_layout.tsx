import { Slot } from "expo-router";
import "./globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import {Navbar} from "@/components/Navbar";
export default function RootLayout() {
  return (
    
    <SafeAreaView className="flex-1 bg-black/30">
      <Navbar />
      <Slot />
    </SafeAreaView>
  );
}
