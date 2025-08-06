export type Point = { row: number; col: number };
export type GridBond = { from: Point; to: Point };
export type Atom = {
    id: number;
    type: string;
    bond: GridBond;
    align: string;
}

// Function to check if two points match a bond
export const isSameBond = (a: Point, b: Point, bond: GridBond) =>
    (a.row === bond.from.row && a.col === bond.from.col && b.row === bond.to.row && b.col === bond.to.col) ||
    (a.row === bond.to.row && a.col === bond.to.col && b.row === bond.from.row && b.col === bond.from.col);

// Convert grid position to svg pixel coords
export const getDotCenter = (row: number, col: number,spacing:number) => ({
    x: col * spacing + spacing,
    y: row * spacing + spacing
});

// Function to check if a bond already exists
export const connectionExists = (a: Point, b: Point, connections: GridBond[]) =>
    connections.some((bond) => isSameBond(a, b, bond));
