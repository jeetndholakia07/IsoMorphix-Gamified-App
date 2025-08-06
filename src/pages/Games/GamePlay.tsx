import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AtomGrid from "./components/AtomGrid";
import { type Point } from "./components/bondUtils";
import type { AtomGridRef } from "./components/AtomGrid";
import { useSelector } from "react-redux";
import PowerButtons from "../../components/Gameplay/PowerButtons";
import LevelInfo from "../../components/Gameplay/LevelInfo";
import HintInfo from "../../components/Gameplay/HintInfo";
import MonsterDisplay from "../../components/Animations/Monster/MonsterDisplay";
import { type RootState } from "../../context/store/store";
import { useMediaQuery } from "../../utils/useMediaQuery";

const GamePlay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id || typeof id !== 'string') {
        navigate("/game"); // redirect to level select if invalid id
    }
    const molecule = useSelector((state: RootState) => state.molecules.molecules[`${id}`]);
    const moleculeData = useSelector((state: RootState) => state.moleculeData.molecules[`${id}`]);
    const atomGridRef = useRef<AtomGridRef>(null);

    const [monsterAppeared, setMonsterAppeared] = useState<boolean>(false); // Trigger monster appearance
    const [monsterMessage, setMonsterMessage] = useState<string>(""); // Message to show with the monster
    const [monsterPosition, setMonsterPosition] = useState<Point | null>(null); // Position of the monster

    const handleReset = () => {
        atomGridRef.current?.resetGame();
    };

    const handleReverse = () => {
        atomGridRef.current?.reverseMove();
    };

    const handleHintMove = () => {
        atomGridRef.current?.hintMove();
    }

    const handleSuperPower = () => {
        atomGridRef.current?.superPower();
    }

    const showSolution = () => {
        atomGridRef.current?.showSolution();
    }

    const spacing = atomGridRef.current?.spacing;

    if (!id || !molecule || !moleculeData) {
        return null;
    }

    const matches = useMediaQuery('(max-width: 800px)');

    useEffect(() => {
        if (!molecule || !moleculeData || !id) {
            navigate("/game"); // redirect to level select if invalid id
            return;
        }
        if (!moleculeData) {
            navigate("/");
            return;
        }
    }, [moleculeData, id, molecule]);

    return (
        <section className="relative px-6 max-w-4xl mx-auto">
            {
                matches && (
                    <>
                        <div className="flex flex-col md:flex-row items-start justify-between z-10 md:flex-nowrap">
                            <LevelInfo name={molecule.name} difficulty={molecule.difficulty} points={molecule.points} />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center md:mt-0">
                            <PowerButtons handleReverseMove={handleReverse} handleHintMove={handleHintMove}
                                handleSuperPower={handleSuperPower} handleReset={handleReset} handleSolution={showSolution} />
                        </div>
                        <HintInfo hint={molecule.hint} />
                    </>
                )
            }
            {
                !matches && (
                    <>
                        <div className="flex flex-col md:flex-row items-start justify-between z-10 md:flex-nowrap">
                            <LevelInfo name={molecule.name} difficulty={molecule.difficulty} points={molecule.points} />
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-4 md:mt-0">
                                <PowerButtons handleReverseMove={handleReverse} handleHintMove={handleHintMove}
                                    handleSuperPower={handleSuperPower} handleReset={handleReset} handleSolution={showSolution} />
                            </div>
                        </div>
                        <HintInfo hint={molecule.hint} />
                    </>
                )
            }

            {/* Render Monster Animation */}
            <div className="bg-purple-800 rounded-lg h-[70vh] max-h-[70vh] pb-0 flex items-center justify-center text-white text-lg font-bold shadow-inner border border-white/10">
                {monsterAppeared && monsterPosition && (
                    <MonsterDisplay monsterPosition={monsterPosition} spacing={spacing} monsterMessage={monsterMessage} />
                )}

                {/* Game Canvas */}
                <AtomGrid
                    ref={atomGridRef}
                    rows={moleculeData.rows}
                    cols={moleculeData.cols}
                    points={molecule.points}
                    hintBonds={moleculeData.bonds}
                    validBonds={moleculeData.challengeBonds}
                    specialAtoms={moleculeData.specialAtoms}
                    setMonsterAppeared={setMonsterAppeared}
                    setMonsterMessage={setMonsterMessage}
                    setMonsterPosition={setMonsterPosition}
                />
            </div>
        </section >
    );
};

export default GamePlay;
