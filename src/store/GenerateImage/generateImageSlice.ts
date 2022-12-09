import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialStateinterface {
  count: number;
}

const initialState: initialStateinterface = {
  count: 0,
};

const generateImageSlice = createSlice({
  name: "generateImage",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = generateImageSlice.actions;

export const selectCount = (state: RootState) => state.generateImage.count;

export default generateImageSlice.reducer;
