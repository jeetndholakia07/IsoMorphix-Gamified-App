# IsoMorphix Gamified App

Welcome to IsoMorphix - A web-based Gamified App for school students to learn organic chemistry with fun animations and powerups ! This game is designed to solve the pain points of various students who don't like organic chemistry and make them fall in love ❤️ with it. 

This game is basically a grid-based dot-matching game, where users need to join dots between two atoms to form a "bond". Each bond combines together to form a molecule. But, there are many other things which make it a bit "interesting" and "exciting" with gamification.

Please Note: This is a Minimum Viable Product(MVP), it can be developed fully in the future.

# Modules

The game has following modules or core functionalities:-

1) Game Initialization 🎮🕹️: On the start of the game, user(which in this case are school students) can see the "whole" solution of the molecular structure for a few seconds, and then start playing the game to join dots to form the structure. This aids in increase in the "flash memory" power of school students, similiar to how flash cards work. It also increases one's memory and concentration power.

2) Dot Joining Mechanism ➖🔲: As discussed, users have to join lines between two dots(atoms) to form a bond. Some bonds are given as "hint bonds" as guiding underlined lines to help with the structure for some molecules. And the remaining bonds will remain hidden ❓ for the user to find the solution.

3) Monster Eating Mechanism: Yes, you heard it right !! Each wrong ❌ move or "bond" creation will call a cute, little chemistry monster 👾(called IsoMorph, in this game). The monster will eat one of the random dots(or atoms) in the grid, adding more constraints for the user. This will create more motivation and "alertness" for users to avoid playing the wrong move. 

4) Powerups(which act like boosters): There are a total of 4 powerups in this game, which can help users from getting stuck from monster moves, or help find the correct solution in case of any confusion. This inturn creates a "gamification" feeling, with some nice animations.

The powerups are as follows:-

1. Hint Move 💡: A hint move 💡 can be used to get one random correct move(or bond) from the molecule.
2. Reverse Move 🔃: A reverse move 🔃 can be used to reverse any wrong move(or bond), and revert any eaten dot(created by the monster), if any.
3. Super Power ⚡: The Super Power ⚡ can be activated to disable the monster eating mechanism, allowing the users to take their time to solve the challenge, without worrying about consequences of wrong moves. It by default removes all wrong bonds(if any), and reverts all the eaten dots(if any) back.
4. Solution ✅: The Solution Power ✅ is the final powerup which can be used to solve the whole molecule challenge, in case if user is still stuck to solve the problem.

# Tech Stack

The project is created using React JS + Vite + TypeScript. React Router is used for the routing, Redux Toolkit for state and data management and Tailwind CSS for the styling and design.

# Steps to run this Project:

There are two different ways to run this project: 

1) Running Locally:-

1. Clone this repo by applying the command "git clone" in your terminal. Or download the ZIP file.

2. Change the directory to client. Run "npm install" or "npm i" in the terminal to download the dependencies.

3. Run the script "npm run dev" for running it locally on development mode. Or use script "npm run build" for running it on production.

2) You can also access this Project LIVE ON:

© IsoMorphix 2025, All Rights Reserved.