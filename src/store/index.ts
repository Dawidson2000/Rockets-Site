import { configureStore } from "@reduxjs/toolkit";

import spacecraftsSlice from "./spacecrafts-slice";

const store = configureStore({
  reducer: {
    spacecrafts: spacecraftsSlice.reducer
  }
});
export type RootState = ReturnType<typeof store.getState>
export default store;