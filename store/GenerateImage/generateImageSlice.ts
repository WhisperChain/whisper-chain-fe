import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppRootState } from "../store";

interface InitialStateInterface {
  count: number;
}

const initialState: InitialStateInterface = {
  count: 0,
};

export const generateImageSlice = createSlice({
  name: "generateImage",

  initialState,

  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setCount } = generateImageSlice.actions;

export const selectCount = (state: AppRootState) => state.generateImage.count;

export default generateImageSlice.reducer;
