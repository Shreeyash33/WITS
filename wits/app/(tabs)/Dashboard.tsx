import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/components/ThemeSelector";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Suggestions = [
  "It's been a while — maybe check if they still have your stuff.",
  "Might be time to follow up on that thing you lent out a few weeks ago.",
  "That borrowed item's been out there for a bit. Think it's coming back?",
  "Still waiting to get something back? A little reminder can't hurt.",
  "You haven't updated this in a while. Is it still out there?",
  "Can't find what you're looking for? Might be in your stored list.",
  "Before assuming it's lost — check your logs.",
  "Already bought a second one? Oops — maybe you just forgot you lent it.",
  "Your memory's great. This just helps when it isn't.",
  "You've got a bunch of items still open — might be time to clean it up.",
  "Keeping track means never wondering where stuff went.",
  "If it's still showing up here, it's probably not back yet.",
  "Storage or black hole? Let's not find out the hard way.",
  "Someone asked to borrow something again? Maybe double-check what's still with them.",
  "Thinking about blaming someone? Check the logs first.",
  "No need to panic — just check where you last put it.",
  "Before you start the hunt — check if you lent it out.",
  "Still out there?",
  "Time to check on it?",
  "Logged. Forgotten?",
  "Maybe clean up the list?",
  "Did they give it back?",
  "Is it still in storage?",
];

export default function Dashboard() {
  const randomsuggestion =
    Suggestions[Math.floor(Math.random() * Suggestions.length)];
  const router = useRouter();
  const handlepress = () => {
    console.log("button pressed");
    router.push("Adddata" as any);
  };
  
  const { theme } = useTheme();
  return (
    <View className={`flex-1 h-full items-center  ${theme === "dark" ? "bg-black" : " bg-sky-50 "} p-4 `}>
      <View className=" items-center justify-center h-[95%] w-full ">
        <Text className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-black"} italic  `}>
          Welcome to WITS!
        </Text>
        <Text className={`text-md font-light ${theme === "dark" ? "text-white" : "text-black"} mt-4 italic `} >
          {randomsuggestion} 
        </Text>
      </View>
      <View className=" w-full ">
        <TouchableOpacity
          onPress={handlepress}
          className={`${theme === "dark" ? " bg-white/10 " : " bg-black/10 "} w-full items-center py-3 rounded-md`} >
          <Text className={`${theme === "dark" ? " text-white " : " text-black "}`}>
            Add an Item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
