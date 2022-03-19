import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IHeaderState {
    lng: string;
    theme: string;
}

const initialState: IHeaderState = {
    lng: "en",
    theme: "light"
}

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                lng: action.payload,
            };
        },
        setTheme: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                theme: action.payload,
            };
        },
    }
})

export const { setLanguage, setTheme } =
    headerSlice.actions;

export const getLanguage = (state: RootState) =>
    state.header.lng;

export const getTheme = (state: RootState) =>
    state.header.theme;

export default headerSlice.reducer;
