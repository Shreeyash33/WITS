import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./ThemeSelector";

//from https://github.com/farhoudshapouran/react-native-ui-datepicker?tab=readme-ov-file
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";

interface ModalProps {
  isDateModalVisible: boolean;
  setIsDateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsCurrentDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DateModal({
  isDateModalVisible,
  setIsDateModalVisible,
  selectedDate,
  setSelectedDate,
  setIsCurrentDate,
}: ModalProps) {
  const { theme } = useTheme();
  const defaultClassNames = useDefaultClassNames();
  let today = new Date();

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
                today:
                  theme === "dark"
                    ? "border border-white"
                    : "border border-black",
                today_label:
                  theme === "dark" ? "text-blue-200" : "text-blue-800",
                selected:
                  theme === "dark"
                    ? "border bg-gray-500 border-gray-300"
                    : "bg-sky-300",
                selected_label: "text-white",
                day_label: theme === "dark" ? "text-gray-200" : "text-gray-800",

                time_label:
                  theme === "dark" ? "text-gray-200" : "text-gray-800",
                weekday_label:
                  theme === "dark" ? "text-gray-200" : "text-gray-800",
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
}
