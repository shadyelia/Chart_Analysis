import schoolData from "../../../../data.json";
import { ISchoolData } from "../Interfaces/ISchoolData";

// A mock function to mimic making an async request for data
export function fetchData() {
  return new Promise<{ data: ISchoolData }>((resolve) => {
    var schools = JSON.parse(JSON.stringify(schoolData)) as ISchoolData;
    resolve({ data: schools });
  });
}
