import { Data, hardcodedData } from "@/components/Data";
import formatDate from "@/components/formatDate";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeSelector";
import { ScrollView, View, Text, Alert, TouchableOpacity } from "react-native";

const APIURL="http://192.168.1.200/";

export default function History() {
  // const [data, setData] = useState<Data[]>(hardcodedData);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const { theme } = useTheme();
  const fetchData = async () => {
    try {
      const res = await fetch(
        APIURL+"Hackathon/WITS/backend/getitem.php"
      );
      const json = await res.json();

      const transformedData = json
        .filter((item: any) => item.Item_Name) // skip if no item name
        .map((item: any) => ({
          itemName: item.Item_Name,
          isLent: item.Lent,
          storedLocation: item.Location,
          personName: item.Person_Name,
          selectedDate: item.Date ?? "",
        }));

      setData(transformedData);
      // console.log(transformedData);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load history from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: Data) => {
    const datasended = JSON.stringify({
      itemName: item.itemName,
      personName: item.personName,
      itemLocation: item.storedLocation,
      isLent: item.isLent,
      selectedDate: item.selectedDate,
    });
    try {
      const res = await fetch(
        APIURL+"Hackathon/WITS/backend/deleteitem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: datasended,
        }
      );

      const json = await res.json();
      if (json.success) {
        fetchData();
      }
      else
      {
        Alert.alert("Delete Failed", "Could not delete item from server.");

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
    fetchData();
    setIsRefreshed(false);
  }, [isRefreshed]);
  return (
    <ScrollView
      className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-sky-50"} p-4`}
    >
      <View className="flex-1 justify-between flex-col ">
        <View>
          {loading ? (
            <View className="flex-1 items-center justify-center ">
              <Text>Loading...</Text>
            </View>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <View
                key={index}
                className={`${theme === "dark" ? "bg-gray-900" : "bg-sky-100"} flex-row border justify-between rounded-md w-full mb-2 pl-3`}
              >
                <View className="py-2">
                  <Text
                    className={`${theme === "dark" ? "text-white" : "text-black"} font-bold text-lg`}
                  >
                    {item.itemName}
                  </Text>
                  {item.isLent ? (
                    <Text
                      className={`${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                      {item.personName}
                    </Text>
                  ) : (
                    <Text
                      className={`${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                      {item.storedLocation}
                    </Text>
                  )}
                  <Text
                    className={`${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    {item.selectedDate}
                  </Text>
                </View>
                <View className="w-[100px] h-[55px] right-0 justify-center items-end pr-2">
                  <TouchableOpacity
                    className="bg-red-500  right-0 items-center justify-center rounded-md py-3 w-20"
                    onPress={() => handleDelete(item)}
                  >
                    <Text className={`text-white text-center`}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            !loading && (
              <Text
                className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-xl text-center mt-10`}
              >
                No data available
              </Text>
            )
          )}
        </View>
        <TouchableOpacity
          className={`${theme === "dark" ? "bg-teal-700" : "bg-blue-300"} rounded-md mt-4`}
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
