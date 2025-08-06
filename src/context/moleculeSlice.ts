import { createSlice } from '@reduxjs/toolkit';

interface Molecule {
    id: string;
    name: string;
    hint: string;
    difficulty: string;
    points: number;
}

interface MoleculesState {
    molecules: { [id: string]: Molecule };
}

const initialState: MoleculesState = {
    molecules: {
        benzene: {
            id: "benzene",
            name: "Benzene",
            hint: "A six-carbon ring with alternating double bonds.",
            difficulty: "Easy",
            points: 100
        },
        phenol: {
            id: "phenol",
            name: "Phenol",
            hint: "Benzene with an OH group attached.",
            difficulty: "Easy",
            points: 200
        },
        toluene: {
            id: "toluene",
            name: "Toluene",
            hint: "Benzene with a methyl group (CH₃).",
            difficulty: "Medium",
            points: 300
        },
        isobutane: {
            id: "isobutane",
            name: "Isobutane",
            hint: "A branched 4-carbon alkane.",
            difficulty: "Easy",
            points: 100
        }
    }
};

const moleculeSlice = createSlice({
    name: 'molecules',
    initialState,
    reducers: {}, 
});

export default moleculeSlice.reducer;