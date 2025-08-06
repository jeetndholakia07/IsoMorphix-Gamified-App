import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PowerupsState {
    hintMoves: number;
    reverseMoves: number;
    superPowers: number;
    solutionPower: number;
}

interface UserState {
    user: {
        username: string;
        country: string;
        powerups: PowerupsState;
        score: number;
        rank: number;
    }
}

const initialState: UserState = {
    user:
    {
        username: "User(You)",
        powerups: {
            hintMoves: 3,
            reverseMoves: 1,
            superPowers: 1,
            solutionPower: 1,
        },
        country: "India",
        score: 0,
        rank: 1
    },
};

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ username: string, country: string }>) => {
            state.user = {
                username: action.payload.username,
                powerups: {
                    hintMoves: 3,
                    reverseMoves: 1,
                    superPowers: 1,
                    solutionPower: 1,
                },
                country: action.payload.country,
                score: 0,
                rank: 1
            };
        },
        useHint: (state) => {
            if (state.user.powerups.hintMoves > 0) {
                state.user.powerups.hintMoves -= 1;
            }
        },
        useReverseMove: (state) => {
            if (state.user.powerups.reverseMoves > 0) {
                state.user.powerups.reverseMoves -= 1;
            }
        },
        useSuperPower: (state) => {
            if (state.user.powerups.superPowers > 0) {
                state.user.powerups.superPowers -= 1;
            }
        },
        useSolutionPower: (state) => {
            if (state.user.powerups.solutionPower > 0) {
                state.user.powerups.solutionPower -= 1;
            }
        },
        useScore: (state, action: PayloadAction<number>) => {
            state.user = {
                ...state.user,
                score: state.user.score + action.payload,
              };
        },
        resetPowerups: (state) => {
            state.user.powerups = {
                hintMoves: 3,
                reverseMoves: 1,
                superPowers: 1,
                solutionPower: 1,
            };
        },
        resetScore: (state) => {
            state.user.score = 0;
        },
        increaseHintMoves: (state, action: PayloadAction<number>) => {
            state.user = {
                ...state.user,
                score: state.user.powerups.hintMoves + action.payload,
              };
        },
        increaseReverseMoves: (state, action: PayloadAction<number>) => {
            state.user = {
                ...state.user,
                score: state.user.powerups.reverseMoves + action.payload,
              };
        },
        increaseSuperPowers: (state, action: PayloadAction<number>) => {
            state.user = {
                ...state.user,
                score: state.user.powerups.superPowers + action.payload,
              };
        },
        increaseSolutionPower: (state, action: PayloadAction<number>) => {
            state.user = {
                ...state.user,
                score: state.user.powerups.solutionPower + action.payload,
              };
        },
    },
});

export const { useHint, useReverseMove, useSuperPower, useSolutionPower, increaseHintMoves, increaseReverseMoves,
    increaseSolutionPower, increaseSuperPowers, resetPowerups, resetScore, useScore } = userSlice.actions;
export default userSlice.reducer;