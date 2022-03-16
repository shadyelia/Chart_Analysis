import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import schoolReducer from "../features/schools/schoolStore/schoolsSlice";

export const store = configureStore({
  reducer: {
    schools: schoolReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
