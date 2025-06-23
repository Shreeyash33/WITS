import { View, Text } from "react-native";

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

  return (
    <View className="flex-1 items-center  bg-gray-800 p-4 ">
      <View className=" items-center justify-center h-[90%]">
        <Text className="text-4xl font-bold text-gray-300 italic  ">
          Welcome to WITS!
        </Text>
        <Text className="text-md font-light text-white mt-4 italic ">
          {randomsuggestion}
        </Text>
      </View>
    </View>
  );
}
