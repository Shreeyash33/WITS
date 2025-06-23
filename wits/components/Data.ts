import { DateType } from "react-native-ui-datepicker";

export interface Data {
  itemName: string;
  isLent: boolean;
  personName: string;
  storedLocation: string;
  selectedDate: DateType;
}

const hardcodedData:Data[]=[
{
itemName:"item1",
isLent:false,
personName:"",
storedLocation:"loc1",
selectedDate:new Date()
},{
itemName:"item2",
isLent:true,
personName:"per1",
storedLocation:"",
selectedDate:new Date()
},
];



export const staticData: Data[] = [];
export function setData(data: Data) {
  staticData.push(data);
}

export function getdata() {
  return staticData;
}
