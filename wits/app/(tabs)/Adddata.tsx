import InputComponent from "@/components/InputComponent";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

function formatDate(date: Date | undefined): string {
  if (!date) return "";

  const formatter = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(date);
}

export default function Adddata() {
  const [isLent, setIsLent] = useState(true);
  const [itemName, setItemName] = useState("");
  const [personName, setPersonName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateType | undefined>(
    undefined
  );
  const [dataChanged, setDataChanged] = useState(false);
  const handleSubmit = async () => {
    const payload = {
      itemName,
      personName,
      itemLocation,
      isLent,
      selectedDate: formatDate(
        selectedDate instanceof Date ? selectedDate : undefined
      ),
    };

    try {
      const response = await fetch(
        "http://localhost/wits-backend/addItem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      if (json.status === "success") {
        alert("Item saved successfully!");
        setDataChanged(true);
      } else {
        alert("Failed to save item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };
const buttonsize=150;
  return (
    <ScrollView className="flex-1 bg-gray-800 p-4">
      <View className="items-center mb-4 flex-row justify-between flex-1">
        <TouchableOpacity
          className={`h-[${buttonsize}px] w-[${buttonsize}px] justify-center items-center bg-gray-500 p-4 rounded-full mb-4`}
          onPress={() => setIsLent(true)}
        >
          <Text>Lent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[${buttonsize}px] w-[${buttonsize}px] justify-center items-center bg-gray-500 p-4 rounded-full mb-4`}
          onPress={() => setIsLent(false)}
        >
          <Text>Stored</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-gray-700 p-4 rounded-lg">
        <InputComponent
          label="Item Name"
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />
        <InputComponent
          label="Stored Location"
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />
        <InputComponent
          label="Person Name"
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />
      </View>
    </ScrollView>
  );
}
