import { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface InputComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function InputComponent({
  label,
  placeholder,
  value,
  onChangeText,
}: InputComponentProps) {

    const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="flex-1 ">
      <Text className="text-xl font-bold text-white">{label}</Text>
      <TextInput
        className="bg-white/50 rounded-md "
        placeholder={placeholder}
        placeholderTextColor={isFocused ? "white" : "black"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
