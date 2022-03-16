import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";
import { fetchData } from "./schoolsDataAPI";
import { ISchoolData } from "../Interfaces/ISchoolData";

export interface CounterState {
  value: ISchoolData;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: {} as ISchoolData,
  status: "idle",
};
