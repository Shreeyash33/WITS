
export interface Data {
  id: number;
  itemName: string;
  isLent: boolean;
  personName: string;
  storedLocation: string;
  selectedDate: string;
}

export const hardcodedData: Data[] = [
  {
    id: 1000,
    itemName: "item1",
    isLent: false,
    personName: "",
    storedLocation: "loc1",
    selectedDate: (new Date()).toString(),
  },
  {
    id: 1001,
    itemName: "item2",
    isLent: true,
    personName: "per1",
    storedLocation: "",
    selectedDate: (new Date()).toString(),
  },
];

