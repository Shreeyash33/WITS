import { Alert, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/components/ThemeSelector";
import formatDate from "@/components/formatDate";
import DateModal from "@/components/dateModal";
import InputComponent from "@/components/InputComponent";
import { Data } from "@/components/Data";
const APIURL = "http://192.168.1.200/backend/";

export default function Adddata() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const hasEdited = params.hasEdited === "true";
  const editItemName = Array.isArray(params.editItemName)
    ? params.editItemName[0]
    : (params.editItemName ?? "");
  const editPersonName = Array.isArray(params.editPersonName)
    ? params.editPersonName[0]
    : (params.editPersonName ?? "");
  const editItemLocation = Array.isArray(params.editItemLocation)
    ? params.editItemLocation[0]
    : (params.editItemLocation ?? "");
  const editIslent = params.editIslent === "true";

  const [isLent, setIsLent] = useState(hasEdited ? editIslent : true);
  const [itemName, setItemName] = useState(hasEdited ? editItemName : "");
  const [personName, setPersonName] = useState(hasEdited ? editPersonName : "");
  const [itemLocation, setItemLocation] = useState(
    hasEdited ? editItemLocation : ""
  );

  // const editSelectedDate = Array.isArray(params.editSelectedDate)
  //   ? params.editSelectedDate[0]
  //   : (params.editSelectedDate ?? new Date().toString());
  const editSelectedDate = useMemo(() => {
    return params.editSelectedDate;
  }, [params]);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    // @ts-ignore
    hasEdited ? new Date(editSelectedDate).toString() : new Date().toString()
  );

  useEffect(() => {
    editSelectedDate && setSelectedDate(editSelectedDate as any);
  }, [editSelectedDate]);
  const [isCurrentDate, setIsCurrentDate] = useState(true);

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  

  const handleDelete = async (item: Data) => {
    const datasended = JSON.stringify({
      itemName: item.itemName,
      personName: item.personName,
      itemLocation: item.storedLocation,
      isLent: item.isLent,
      selectedDate: item.selectedDate,
    });
    try {
      const res = await fetch(APIURL + "deleteitem.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: datasended,
      });
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Server error during deletion.");
    }
  };

  const handleSubmit = async (item: Data) => {
    if (isLent) setItemLocation("");
    else setPersonName("");

    const payload = { ...item };
    try {
      const response = await fetch(APIURL + "additem.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (json.success) {
        alert("Item saved successfully!");
        handleDelete(item);
        clearData();
      } else {
        alert("Failed to save item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  const dateModal = () => {
    return (
      <DateModal
        isDateModalVisible={isDateModalVisible}
        setIsDateModalVisible={setIsDateModalVisible}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsCurrentDate={setIsCurrentDate}
      />
    );
  };

  function clearData() {
    setIsLent(true);
    setItemName("");
    setPersonName("");
    setItemLocation("");
    setSelectedDate(new Date().toString());
    setIsCurrentDate(true);
    setIsDateModalVisible(false);
  }
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
            {hasEdited ? selectedDate : formatDate(selectedDate) || "No Date "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${theme === "dark" ? "bg-teal-700" : "bg-blue-300"}  p-2 pt-3 rounded-lg mt-4`}
          onPress={() =>
            handleSubmit({
              isLent,
              itemName,
              personName,
              storedLocation: itemLocation,
              selectedDate: selectedDate ?? "",
            })
          }
        >
          <Text className={`text-white text-lg mb-2 text-center`}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
