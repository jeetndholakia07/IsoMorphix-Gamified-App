import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GameInstruction {
    id: string;
    title: string;
    message: string;
    gifSrc: string;
    staticImgSrc: string;
    emoji: string;
}

const initialData: GameInstruction[] = [
    {
        id: "startGame",
        title: "Intuitive Start Gameplay",
        message: "Start the Game 🕹️, Remember the Molecule Pattern ⚛️, aiding your flash memory power 💡🤔, and solve the challenge ✅ !!",
        gifSrc: "/assets/gifs/startGame.gif",
        staticImgSrc: "/assets/gifs/staticImg/startGame.png",
        emoji: "🎮🕹️"
    },
    {
        id: "joinDots",
        title: "Join the Dots",
        message: "Join the dots along the guided lines ➡️  to form the molecule structure.",
        gifSrc: "/assets/gifs/joinDots.gif",
        staticImgSrc: "/assets/gifs/staticImg/joinDots.png",
        emoji: "➖🔲"
    },
    {
        id: "joinHiddenDots",
        title: "Join the Hidden Bonds",
        message: "Find the hidden bonds ❓ and join them to finish the structure of molecule.",
        gifSrc: "/assets/gifs/joinHiddenDots.gif",
        staticImgSrc: "/assets/gifs/staticImg/joinHiddenDots.png",
        emoji: "➖🔲"
    },
    {
        id: "wrongMove",
        title: "Wrong Move",
        message: "Each wrong move formed will call the monster 👾 to eat one of your dots in the grid !! Beware !",
        gifSrc: "/assets/gifs/wrongMove.gif",
        staticImgSrc: "/assets/gifs/staticImg/wrongMove.png",
        emoji: "❌"
    },
    {
        id: "hintMove",
        title: "Hint Move",
        message: "Use Hint Move 💡 powerup to get one random hint for correct bond!",
        gifSrc: "/assets/gifs/hintMove.gif",
        staticImgSrc: "/assets/gifs/staticImg/hintMove.png",
        emoji: "💡"
    },
    {
        id: "reverseMove",
        title: "Reverse Move",
        message: "Use Reverse Move 🔃 powerup to reverse any wrong move!",
        gifSrc: "/assets/gifs/reverseMove.gif",
        staticImgSrc: "/assets/gifs/staticImg/reverseMove.png",
        emoji: "🔃"
    },
    {
        id: "superPower",
        title: "Super Power",
        message: "Use Super Power ⚡ powerup to remove any wrong move if any, and disable the monster 👾 from eating your dots !!",
        gifSrc: "/assets/gifs/superPower.gif",
        staticImgSrc: "/assets/gifs/staticImg/superPower.png",
        emoji: "⚡"
    },
    {
        id: "solutionPower",
        title: "Solution Power",
        message: "Use Solution Power ✅ powerup to solve the whole level and get the final answer for your chemistry molecule!",
        gifSrc: "/assets/gifs/solutionPower.gif",
        staticImgSrc: "/assets/gifs/staticImg/solutionPower.png",
        emoji: "✅"
    }
];

interface GameInstructionsState {
    instructions: GameInstruction[];
}

const initialState: GameInstructionsState = {
    instructions: initialData
};

const gameInstructionsSlice = createSlice({
    name: 'gameInstructions',
    initialState,
    reducers: {
        setInstructions: (state, action: PayloadAction<GameInstruction[]>) => {
            state.instructions = action.payload;
        }
    }
});

export const { setInstructions } = gameInstructionsSlice.actions;

export default gameInstructionsSlice.reducer;