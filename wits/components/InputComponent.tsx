import { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface InputComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  theme?: string;
}

export default function InputComponent({
  label,
  placeholder,
  value,
  onChangeText,
  theme = "dark",
}: InputComponentProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="flex-1 mb-2">
      <Text
        className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"} `}
      >
        {label}
      </Text>
      <TextInput
        className={`${theme === "dark" ? "bg-teal-500/10 text-white" : "border border-sky-300 bg-sky-50 text-black"}  rounded-md h-[50px] text-lg `}
        placeholder={placeholder}
        placeholderTextColor={theme === "dark" ? "white" : "black"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
