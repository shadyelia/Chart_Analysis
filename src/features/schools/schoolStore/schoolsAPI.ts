import schoolData from "../../../data.json";
import { ISchoolData } from "../Interfaces/ISchoolData";

// A mock function to mimic making an async request for data
export function fetchData() {
  return new Promise<{ data: any[] }>((resolve) => {
    var schools = JSON.parse(JSON.stringify(schoolData)) as any[];
    setTimeout(() => resolve({ data: schools }), 500);
  });
}
