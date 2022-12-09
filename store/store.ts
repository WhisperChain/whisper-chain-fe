import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { generateImageSlice } from "./GenerateImage/generateImageSlice";

export const makeStore = () => configureStore({
  //redux store slices goes here
  reducer: {
    [generateImageSlice.name]: generateImageSlice.reducer,
  },

  // devTools option
  devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;

export type AppRootState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action>;

export const reduxWrapper = createWrapper<Store>(makeStore);

