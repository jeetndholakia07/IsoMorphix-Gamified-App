import { useState, useRef, useEffect, type FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHint, useReverseMove, useSuperPower, useSolutionPower } from "../../context/userSlice.js";
import { type RootState } from "../../context/store/store.js";
import { useToast } from "../Toast/ToastContext.js";
import { useTranslation } from "react-i18next";

type buttonProps = {
    handleReverseMove: () => void;
    handleHintMove: () => void;
    handleSuperPower: () => void;
    handleReset: () => void;
    handleSolution: () => void;
}

const PowerButtons: FC<buttonProps> = ({ handleReverseMove, handleHintMove, handleSuperPower, handleSolution, handleReset }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userData.user);
    const { hintMoves, reverseMoves, superPowers, solutionPower } = user.powerups;
    const { showToast } = useToast();
    const { t } = useTranslation();

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const UseHint = () => {
        if (hintMoves === 0) {
            showToast("alert", t("alert"), t("Messages.alertHintMove"));
            return;
        }
        dispatch(useHint());
        handleHintMove();
    };

    const UseReverseMove = () => {
        if (reverseMoves === 0) {
            showToast("alert", t("alert"), t("Messages.alertReverseMove"));
            return;
        }
        dispatch(useReverseMove());
        handleReverseMove();
    };

    const UseSuperPower = () => {
        if (superPowers === 0) {
            showToast("alert", t("alert"), t("Messages.alertSuperPower"));
            return;
        }
        dispatch(useSuperPower());
        handleSuperPower();
    };

    const UseSolution = () => {
        if (solutionPower === 0) {
            showToast("alert", t("alert"), t("Messages.alertSolutionPower"));
            return;
        }
        dispatch(useSolutionPower());
        handleSolution();
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => setMenuOpen((prev) => !prev)}
            onKeyDown={(e) => e.key === 'Enter' && setMenuOpen((prev) => !prev)}
            className="absolute md:right-7 right-7 md:top-0 top-10 hover:cursor-pointer rounded-sm bg-blue-700 px-3 py-2 text-yellow-500 font-semibold shadow-xl transition-all duration-300 hover:bg-blue-800"
        >
            {menuOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute w-35 top-14 right-0 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-sm shadow-lg ring-black/5 z-20"
                >
                    <div className="flex flex-col w-35 items-center justify-center">
                        {/* Hint Button */}
                        <button
                            className="w-35 px-3 text-center text-nowrap py-2 text-lg text-white bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105"
                            onClick={() => UseHint()}
                            disabled={hintMoves === 0}
                        >
                            <i className="bi bi-lightbulb text-lg mr-2"></i>{t("hint")} ({hintMoves})
                        </button>

                        {/* Power Button */}
                        <button
                            className="w-35 px-3 py-2 text-center text-nowrap text-lg text-white bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105"
                            onClick={() => UseSuperPower()}
                            disabled={superPowers === 0}
                        >
                            <i className="bi bi-rocket text-lg mr-2"></i>{t("superPower")} ({superPowers})
                        </button>

                        {/* Reverse Move Button */}
                        <button
                            className="w-35 px-3 py-2 text-center text-nowrap text-lg text-white bg-teal-500 hover:bg-teal-600 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105"
                            onClick={() => UseReverseMove()}
                            disabled={reverseMoves === 0}
                        >
                            <i className="bi bi-arrow-counterclockwise text-lg mr-2"></i>{t("reverse")} ({reverseMoves})
                        </button>

                        {/* Solution Button */}
                        <button
                            className="w-35 px-3 py-2 text-center text-nowrap text-lg text-white bg-green-600 hover:bg-green-700 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105"
                            onClick={() => UseSolution()}
                        >
                            <i className="bi bi-check-circle-fill text-lg mr-2"></i>{t("solutionPower")}({solutionPower})
                        </button>

                        {/* Reset Button */}
                        <button className="w-35 px-3 py-2 text-center text-nowrap text-lg text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleReset()}>
                            <i className="bi bi-arrow-repeat text-lg mr-2"></i>{t("reset")}
                        </button>
                    </div>
                </div>
            )}
            <i className="bi bi-lightning-fill text-2xl pr-0"></i>
            <i className="bi bi-chevron-compact-down"></i>
        </div>
    )
}
export default PowerButtons;