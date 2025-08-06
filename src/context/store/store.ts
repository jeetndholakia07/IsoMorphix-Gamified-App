import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import levelSlice from "../levelSlice";
import moleculeSlice from "../moleculeSlice";
import moleculeData from "../moleculeData";
import gameInstructions from "../gameInstructions";

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