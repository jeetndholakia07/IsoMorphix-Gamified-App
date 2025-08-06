import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice.js";
import levelSlice from "../levelSlice.js";
import moleculeSlice from "../moleculeSlice.js";
import moleculeData from "../moleculeData.js";
import gameInstructions from "../gameInstructions.js";

export const store = configureStore({
    reducer: {
        userData: userSlice,
        levels: levelSlice,
        molecules: moleculeSlice,
        moleculeData: moleculeData,
        gameInstructions: gameInstructions
    }
});

// Types for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;