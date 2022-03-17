import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";
import { fetchData } from "./schoolsAPI";
import { ISchoolData, ISchoolDetails } from "../Interfaces/ISchoolData";

export interface CounterState {
  fullData: ISchoolData;
  filteredSchools: ISchoolData;
  selectedSchoolDetails: ISchoolDetails;
  countries: string[];
  selectedCountry: string;
  camps: string[];
  selectedCamp: string;
  schools: string[];
  selectedSchool: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CounterState = {
  fullData: {} as ISchoolData,
  filteredSchools: { schools: [], totallessons: 0 } as ISchoolData,
  selectedSchoolDetails: {} as ISchoolDetails,
  countries: [],
  selectedCountry: "",
  camps: [],
  selectedCamp: "",
  schools: [],
  selectedSchool: "",
  status: "idle",
};

export const getDataAsync = createAsyncThunk("schools/fetchData", async () => {
  const response = await fetchData();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const schoolsSlice = createSlice({
  name: "schools",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCountry: (state, action: PayloadAction<string>) => {
      var campsArray = getCampsByCounter(
        state.fullData.schools.filter((item) => item.country == action.payload)
      );
      var schoolsArray = getSchoolsByCamp(
        state.fullData.schools.filter((item) => item.country == action.payload && item.camp == campsArray[0])
      );
      let filteredSchoolsData = updateFilteredSchool(
        state.fullData.schools,
        action.payload,
        campsArray[0]
      );
      return {
        ...state,
        camps: campsArray,
        selectedCamp: campsArray[0],
        schools: schoolsArray,
        selectedSchool: schoolsArray[0],
        selectedCountry: action.payload,
        filteredSchools:filteredSchoolsData
      };
    },
    setCamp: (state, action: PayloadAction<string>) => {
      var schoolsArray = getSchoolsByCamp(
        state.fullData.schools.filter((item) => item.country == state.selectedCountry && item.camp == action.payload)
      );
      let filteredSchoolsData = updateFilteredSchool(
        state.fullData.schools,
        state.selectedCountry,
        action.payload
      );
      return {
        ...state,
        selectedCamp: action.payload,
        schools: schoolsArray,
        selectedSchool: schoolsArray[0],
        filteredSchools:filteredSchoolsData
      };
    },
    setSchool: (state, action: PayloadAction<string>) => {
      let filteredSchoolsData = updateFilteredSchool(
        state.fullData.schools,
        state.selectedCountry,
        state.selectedCamp,
        action.payload
      );
      return {
        ...state,
        selectedSchool: action.payload,
        filteredSchools:filteredSchoolsData
      };
    },
    setSchoolDetails: (state, action: PayloadAction<ISchoolDetails>) => {
      return {
        ...state,
        selectedSchoolDetails: action.payload,
      };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(getDataAsync.fulfilled, (state, action) => {
        //state.status = "idle";
        var data: ISchoolDetails[] = action.payload.map(function (item) {
          return item;
        });

        var fullData = {} as ISchoolData;
        fullData.schools = data as ISchoolDetails[];
        let countries = new Set<string>();

        fullData.schools.forEach((school: ISchoolDetails) => {
          if (!countries.has(school.country)) countries.add(school.country);
        });

        var countriesArray = Array.from(countries);
        var campsArray = getCampsByCounter(
          fullData.schools.filter((item) => item.country == countriesArray[0])
        );
        var schoolsArray = getSchoolsByCamp(
          fullData.schools.filter((item) => item.camp == campsArray[0])
        );
        let filteredSchoolsData = updateFilteredSchool(
          fullData.schools,
          countriesArray[0],
          campsArray[0]
        );

        return {
          ...state,
          status: "succeeded",
          fullData: fullData,
          countries: countriesArray,
          selectedCountry: countriesArray[0],
          camps: campsArray,
          selectedCamp: campsArray[0],
          schools: schoolsArray,
          selectedSchool: schoolsArray[0],
          filteredSchools: filteredSchoolsData,
        };
      });
  },
});

const getCampsByCounter = (data: ISchoolDetails[]) => {
  let camps = new Set<string>();
  data.forEach((school: ISchoolDetails) => {
    if (!camps.has(school.camp)) camps.add(school.camp);
  });
  return Array.from(camps);
};

const getSchoolsByCamp = (data: ISchoolDetails[]) => {
  let schools = new Set<string>();
  data.forEach((school: ISchoolDetails) => {
    if (!schools.has(school.school)) schools.add(school.school);
  });
  return ["All"].concat(Array.from(schools));
};

const updateFilteredSchool = (
  data: ISchoolDetails[],
  selectedCountry: string,
  selectedCamp: string,
  selectedSchool: string = "All"
) => {
  let filteredSchoolsData = { schools: [], totallessons: 0 } as ISchoolData;
  data.forEach((school: ISchoolDetails) => {
    if (
      school.country == selectedCountry &&
      school.camp == selectedCamp &&
      (selectedSchool == "All" || school.school == selectedSchool)
    ) {
      filteredSchoolsData.schools.push(school);
      filteredSchoolsData.totallessons += school.lessons;
    }
  });
  return filteredSchoolsData;
};

export const { setCountry, setCamp, setSchool, setSchoolDetails } =
  schoolsSlice.actions;

export const getSelectedCountry = (state: RootState) =>
  state.schools.selectedCountry;
export const getSelectedCamp = (state: RootState) => state.schools.selectedCamp;
export const getSelectedSchool = (state: RootState) =>
  state.schools.selectedSchool;

export default schoolsSlice.reducer;
