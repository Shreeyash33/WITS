import formatDate from "@/components/formatDate";
import InputComponent from "@/components/InputComponent";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";

//from https://github.com/farhoudshapouran/react-native-ui-datepicker?tab=readme-ov-file
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

export default function Adddata() {
  const defaultClassNames = useDefaultClassNames();

  const [isLent, setIsLent] = useState(true);
  const [itemName, setItemName] = useState("");
  const [personName, setPersonName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateType | undefined>(
    new Date()
  );
  let today = new Date();
  const [isCurrentDate, setIsCurrentDate] = useState(true);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
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
  const buttonsize = 100;

  const dateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDateModalVisible}
      >
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-gray-700 rounded-lg p-5 w-11/12">
            <Text className="text-white text-lg mb-2 text-center">
              Set Date and Time
            </Text>

            <View className=" border border-gray-500 rounded-md">
              <DateTimePicker
                classNames={{
                  ...defaultClassNames,
                  today: "border border-white",
                  today_label: "text-blue-500",
                  selected: "border bg-gray-500 border-gray-300",
                  selected_label: "text-white",
                  day_label: "text-gray-200",
                  year_label: "text-gray-200",
                  month_label: "text-gray-200",
                  time_label: "text-gray-200",
                  weekday_label: "text-gray-200",
                  header: "text-gray-200",
                  disabled: "opacity-50",
                }}
                minDate={today}
                mode="single"
                date={selectedDate ?? new Date()}
                onChange={({ date }: { date: DateType }) =>
                  setSelectedDate(date)
                }
                timePicker={true}
                use12Hours
              />
            </View>

            <TouchableOpacity
              className="bg-white/60 p-3 rounded-lg mt-4"
              onPress={() => {
                setIsDateModalVisible(false);
                setIsCurrentDate(false);
              }}
            >
              <Text className="text-center text-black text-lg ">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView className="flex-1 bg-black p-4 ">
      {isDateModalVisible && dateModal()}
      <View className="items-center flex-row justify-between flex-1 h-[150px] mb-9">
        <TouchableOpacity
          className={`h-full w-[45%] justify-center items-center
          ${isLent ? "bg-teal-700 border-gray-500" : "bg-gray-500"} p-4 rounded-full mb-4`}
          onPress={() => setIsLent(true)}
        >
          <Text>Lent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-full w-[45%] justify-center items-center
            ${isLent ? "bg-gray-500" : "bg-teal-700"}  p-4 rounded-full mb-4`}
          onPress={() => setIsLent(false)}
        >
          <Text>Stored</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-gray-900 p-4 rounded-lg">
        <InputComponent
          label="Item Name"
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
        />
        {!isLent ? (
          <InputComponent
            label="Stored Location"
            value={itemLocation}
            onChangeText={setItemLocation}
            placeholder="Enter Stored Location"
          />
        ) : (
          <InputComponent
            label="Person Name"
            value={personName}
            onChangeText={setPersonName}
            placeholder="Enter Person Name"
          />
        )}
        <TouchableOpacity
          className="rounded-lg "
          onPress={() => {
            if (isCurrentDate) {
              setIsDateModalVisible(true);
              setIsCurrentDate(false);
            } else {
              setSelectedDate(new Date());
              setIsCurrentDate(true);
            }
          }}
        >
          <Text className="text-white text-lg bg-teal-700/60 p-2 pt-3 rounded-lg">
            {formatDate(
              selectedDate instanceof Date ? selectedDate : undefined
            ) || "No Date "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-teal-700 p-2 pt-3 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg mb-2 text-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
