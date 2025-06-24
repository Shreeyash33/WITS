import formatDate from "@/components/formatDate";
import InputComponent from "@/components/InputComponent";
import { useTheme } from "@/components/ThemeSelector";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";

//from https://github.com/farhoudshapouran/react-native-ui-datepicker?tab=readme-ov-file
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";


const APIURL="http://192.168.1.200/";
export default function Adddata() {
  const defaultClassNames = useDefaultClassNames();

  const [isLent, setIsLent] = useState(true);
  const [itemName, setItemName] = useState("");
  const [personName, setPersonName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date().toString()
  );
  let today = new Date();
  const [isCurrentDate, setIsCurrentDate] = useState(true);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  function clearData() {
    setIsLent(true);
    setItemName("");
    setPersonName("");
    setItemLocation("");
    setSelectedDate(new Date().toString());
    setIsCurrentDate(true);
    setIsDateModalVisible(false);
  }

  const handleSubmit = async () => {
    if (isLent) setItemLocation("");
    else setPersonName("");

    const payload = {
      itemName,
      personName,
      itemLocation,
      isLent,
      selectedDate: formatDate(selectedDate || "No Date"),
    };
    try {
      const response = await fetch(
        APIURL+"additem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      if (json.success) {
        alert("Item saved successfully!");
        clearData();
      } else {
        alert("Failed to save item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };
  const buttonsize = 100;
  const { theme } = useTheme();

  const dateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDateModalVisible}
      >
        <View className={`flex-1 bg-black/60 justify-center items-center`}>
          <View
            className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} rounded-lg p-5 w-11/12`}
          >
            <Text
              className={`${theme === "dark" ? "text-white/70" : "text-black"}  text-lg mb-2 text-center font-bold`}
            >
              Set Date and Time
            </Text>

            <View
              className={` border border-gray-500 rounded-md ${theme === "dark" ? "" : "bg-sky-50"} `}
            >
              <DateTimePicker
                classNames={{
                  ...defaultClassNames,
                  today: theme==="dark"?"border border-white":"border border-black",
                  today_label: theme==="dark"?"text-blue-200":"text-blue-800",
                  selected:
                    theme === "dark"
                      ? "border bg-gray-500 border-gray-300"
                      : "bg-sky-300",
                  selected_label: "text-white",
                  day_label: theme==="dark"?"text-gray-200":"text-gray-800",
               
                  time_label:theme==="dark"?"text-gray-200":"text-gray-800",
                  weekday_label: theme==="dark"?"text-gray-200":"text-gray-800",
                  disabled: "opacity-50",
                  

                }}
                minDate={today}
                mode="single"
                date={selectedDate ?? new Date()}
                onChange={({ date }: { date: DateType }) =>
                  setSelectedDate(date?.toString())
                }
                timePicker={true}
                use12Hours
              />
            </View>

            <TouchableOpacity
              className={`${theme === "dark" ? "bg-white/60 " : "bg-sky-400"} p-3 rounded-lg mt-4`}
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
    <ScrollView
      className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-sky-50"} p-4 `}
    >
      {isDateModalVisible && dateModal()}
      <View className="items-center flex-row justify-between flex-1 h-[150px] mb-9">
        <TouchableOpacity
          className={`h-full w-[45%] justify-center items-center
          ${isLent ? (theme === "dark" ? "bg-teal-700 border-gray-500" : " bg-blue-300") : "bg-sky-100"} p-4 rounded-full mb-4`}
          onPress={() => setIsLent(true)}
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"}text-white text-xl font-bold`}
          >
            Lent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-full w-[45%] justify-center items-center
          ${isLent ? "bg-sky-100" : theme === "dark" ? "bg-teal-700 border-gray-500" : " bg-blue-300"} p-4 rounded-full mb-4`}
          onPress={() => setIsLent(false)}
        >
          <Text
            className={`${theme === "dark" ? "text-white" : "text-black"}text-white text-xl font-bold`}
          >
            Stored
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className={`${theme === "dark" ? "bg-gray-900" : "bg-sky-100"} p-4 rounded-lg`}
      >
        <InputComponent
          label="Item Name"
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
          theme={theme}
        />
        {!isLent ? (
          <InputComponent
            label="Stored Location"
            value={itemLocation}
            onChangeText={setItemLocation}
            placeholder="Enter Stored Location"
            theme={theme}
          />
        ) : (
          <InputComponent
            label="Person Name"
            value={personName}
            onChangeText={setPersonName}
            placeholder="Enter Person Name"
            theme={theme}
          />
        )}
        <TouchableOpacity
          className="rounded-lg "
          onPress={() => {
            if (isCurrentDate) {
              setIsDateModalVisible(true);
              setIsCurrentDate(false);
            } else {
              setSelectedDate(new Date().toString());
              setIsCurrentDate(true);
            }
          }}
        >
          <Text
            className={`${theme === "dark" ? "text-white bg-teal-700/60" : "text-black bg-sky-50 border border-sky-300"} text-lg  p-2 pt-3 rounded-lg`}
          >
            {formatDate(selectedDate) || "No Date "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${theme === "dark" ? "bg-teal-700" : "bg-blue-300"}  p-2 pt-3 rounded-lg mt-4`}
          onPress={handleSubmit}
        >
          <Text className={`text-white text-lg mb-2 text-center`}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
