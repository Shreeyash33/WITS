import { Data, hardcodedData } from "@/components/Data";
import formatDate from "@/components/formatDate";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity } from "react-native";

export default function History() {
  const [data, setData] = useState<Data[]>(hardcodedData);
  const [loading, setLoading] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("getitemlink");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load history from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemName: string) => {
    try {
      // Optimistically update UI
      setData((prev) => prev.filter((item) => item.itemName !== itemName));

      const res = await fetch("deleteitemlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName }),
      });

      const json = await res.json();
      if (json.status !== "success") {
        Alert.alert("Delete Failed", "Could not delete item from server.");
        fetchData();
      }
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Server error during deletion.");
      fetchData();
    }
  };

  useEffect(() => {
    setIsRefreshed(false);
  }, []);
  useEffect(() => {
    // setData(getdefdata());
    // fetchData();
    setIsRefreshed(false);
  }, [isRefreshed]);
  const textclassname = `text-black text-center text-md`;
  return (
    <ScrollView className="flex-1  bg-black p-4">
      <View className="flex-1 justify-between flex-col max-h-screen h-[90vh] ">
        <View>
          {loading ? (
            <View className="flex-1 items-center justify-center ">
              <Text>Loading...</Text>
            </View>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <View
                key={index}
                className="bg-blue-400/20 flex-row border justify-between  rounded-md w-full mb-2 pl-3 "
              >
                <View className="py-2">
                  <Text className={"text-white font-bold text-lg"}>{item.itemName}</Text>
                  {item.isLent ? (
                    <Text className={"text-white "}>{item.personName}</Text>
                  ) : (
                    <Text className={"text-white "}>{item.storedLocation}</Text>
                  )}
                  <Text className={"text-white "}>
                    {formatDate(
                      item.selectedDate instanceof Date
                        ? item.selectedDate
                        : undefined
                    ) || "No Date "}
                  </Text>
                </View>
                <View className="w-[100px] h-[55px] right-0 justify-center items-end pr-2">
                  <TouchableOpacity
                    className="bg-red-500  right-0 items-center justify-center rounded-md py-3 w-20"
                    // onPress={() => handleDelete(item.itemName)}
                  >
                    <Text
                      className={`text-white text-center`}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-400 text-xl">No data available</Text>
          )}
        </View>
        <TouchableOpacity
          className="bg-teal-700 rounded-md mb-4"
          onPress={() => {
            setIsRefreshed(true);
          }}
        >
          <Text className="p-3 text-center text-white">Refresh </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
