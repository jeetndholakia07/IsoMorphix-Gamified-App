import { createSlice } from '@reduxjs/toolkit';

interface Atom {
    id: number;
    type: string;
    bond: Bond;
    align: string;
}

interface Bond {
    from: { row: number; col: number };
    to: { row: number; col: number };
}

interface Molecule {
    id: string;
    name: string;
    bonds: Bond[];
    challengeBonds: Bond[];
    specialAtoms?: Atom[];
    specialBonds?: Bond[];
    rows: number;
    cols: number;
}

interface MoleculesState {
    molecules: { [id: string]: Molecule };
}

const initialState: MoleculesState = {
    molecules: {
        benzene: {
            id: "benzene",
            name: "Benzene",
            rows: 7,
            cols: 7,
            bonds: [
                { from: { row: 0, col: 3 }, to: { row: 2, col: 6 } },
                { from: { row: 2, col: 6 }, to: { row: 4, col: 6 } },
                { from: { row: 4, col: 6 }, to: { row: 6, col: 3 } },
                { from: { row: 6, col: 3 }, to: { row: 4, col: 0 } },
                { from: { row: 4, col: 0 }, to: { row: 2, col: 0 } },
                { from: { row: 2, col: 0 }, to: { row: 0, col: 3 } }
            ],
            challengeBonds: [
                { from: { row: 0, col: 3 }, to: { row: 2, col: 6 } },
                { from: { row: 2, col: 6 }, to: { row: 4, col: 6 } },
                { from: { row: 4, col: 6 }, to: { row: 6, col: 3 } },
                { from: { row: 6, col: 3 }, to: { row: 4, col: 0 } },
                { from: { row: 4, col: 0 }, to: { row: 2, col: 0 } },
                { from: { row: 2, col: 0 }, to: { row: 0, col: 3 } },
                { from: { row: 1, col: 3 }, to: { row: 3, col: 1 } },
                { from: { row: 4, col: 1 }, to: { row: 5, col: 4 } },
                { from: { row: 2, col: 5 }, to: { row: 4, col: 5 } }
            ]
        },
        phenol: {
            id: "phenol",
            name: "Phenol",
            rows: 8,
            cols: 7,
            bonds: [
                { from: { row: 1, col: 3 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 7, col: 3 } },
                { from: { row: 7, col: 3 }, to: { row: 5, col: 0 } },
                { from: { row: 5, col: 0 }, to: { row: 3, col: 0 } },
                { from: { row: 3, col: 0 }, to: { row: 1, col: 3 } },
            ],
            challengeBonds: [
                { from: { row: 1, col: 3 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 7, col: 3 } },
                { from: { row: 7, col: 3 }, to: { row: 5, col: 0 } },
                { from: { row: 5, col: 0 }, to: { row: 3, col: 0 } },
                { from: { row: 3, col: 0 }, to: { row: 1, col: 3 } },
                { from: { row: 2, col: 3 }, to: { row: 4, col: 1 } },
                { from: { row: 5, col: 1 }, to: { row: 6, col: 4 } },
                { from: { row: 3, col: 5 }, to: { row: 5, col: 5 } },
                { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } }
            ],
            specialAtoms: [
                {
                    id: 1,
                    type: "OH",
                    bond: { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } },
                    align: "top"
                }
            ],
            specialBonds: [
                { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } }
            ]
        },
        toluene: {
            id: "toluene",
            name: "Toluene",
            rows: 8,
            cols: 7,
            bonds: [
                { from: { row: 1, col: 3 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 7, col: 3 } },
                { from: { row: 7, col: 3 }, to: { row: 5, col: 0 } },
                { from: { row: 5, col: 0 }, to: { row: 3, col: 0 } },
                { from: { row: 3, col: 0 }, to: { row: 1, col: 3 } },
            ],
            challengeBonds: [
                { from: { row: 1, col: 3 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 3, col: 6 } },
                { from: { row: 5, col: 6 }, to: { row: 7, col: 3 } },
                { from: { row: 7, col: 3 }, to: { row: 5, col: 0 } },
                { from: { row: 5, col: 0 }, to: { row: 3, col: 0 } },
                { from: { row: 3, col: 0 }, to: { row: 1, col: 3 } },
                { from: { row: 2, col: 3 }, to: { row: 4, col: 1 } },
                { from: { row: 5, col: 1 }, to: { row: 6, col: 4 } },
                { from: { row: 3, col: 5 }, to: { row: 5, col: 5 } },
                { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } }
            ],
            specialAtoms: [
                {
                    id: 1,
                    type: "CH3",
                    bond: { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } },
                    align: "top"
                }
            ],
            specialBonds: [
                { from: { row: 1, col: 3 }, to: { row: 0, col: 3 } }
            ]
        },
        isobutane: {
            id: "isobutane",
            name: "Isobutane",
            rows: 3,
            cols: 3,
            bonds: [],
            challengeBonds: [
                { from: { row: 1, col: 0 }, to: { row: 1, col: 1 } },
                { from: { row: 1, col: 1 }, to: { row: 1, col: 2 } },
                { from: { row: 1, col: 1 }, to: { row: 2, col: 1 } }
            ],
            specialAtoms: [
                {
                    id: 1,
                    type: "CH3",
                    bond: { from: { row: 1, col: 0 }, to: { row: 1, col: 1 } },
                    align: "top"
                },
                {
                    id: 2,
                    type: "CH",
                    bond: { from: { row: 1, col: 1 }, to: { row: 1, col: 2 } },
                    align: "top"
                },
                {
                    id: 3,
                    type: "CH3",
                    bond: { from: { row: 1, col: 2 }, to: { row: 1, col: 2 } },
                    align: "top"
                },
                {
                    id: 4,
                    type: "CH3",
                    bond: { from: { row: 1, col: 1 }, to: { row: 2, col: 1 } },
                    align: "bottom"
                }
            ],
            specialBonds: []
        }
    }
};

const moleculeDataSlice = createSlice({
    name: 'moleculeData',
    initialState,
    reducers: {},
});

export default moleculeDataSlice.reducer;
