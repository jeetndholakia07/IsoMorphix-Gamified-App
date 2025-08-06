import { createSlice } from '@reduxjs/toolkit';

interface Level {
    id: string;
    name: string;
    difficulty: string;
    points: number;
    emoji: string;
}

interface LevelsState {
    levels: { [id: string]: Level };
}

const initialState: LevelsState = {
    levels: {
        benzene: {
            id: "benzene",
            name: "Benzene",
            difficulty: "Easy",
            points: 100,
            emoji: "🧪"
        },
        phenol: {
            id: "phenol",
            name: "Phenol",
            difficulty: "Easy",
            points: 200,
            emoji: "🔥"
        },
        toluene: {
            id: "toluene",
            name: "Toluene",
            difficulty: "Medium",
            points: 300,
            emoji: "💥"
        },
        isobutane: {
            id: "isobutane",
            name: "Isobutane",
            difficulty: "Easy",
            points: 100,
            emoji: "🧬"
        }
    }
};

const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
});

export default levelsSlice.reducer;