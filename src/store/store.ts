import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import generateImageReducer from "./GenerateImage/generateImageSlice";

export const store = configureStore({
  //redux store slices goes here
  reducer: {
    generateImage: generateImageReducer,
  },

  //middlewares goes here (if any)
  // middleware: () => {}
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
