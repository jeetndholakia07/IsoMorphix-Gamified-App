import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../context/store/store.js";
import GifPlayer from "./GifPlayer.js";

const HowToPlay = () => {
    const gameInstructions = useSelector(
        (state: RootState) => state.gameInstructions.instructions
    );
    const { t } = useTranslation();

    return (
        <div className="pt-2 pb-2 px-8 rounded-lg shadow-lg max-w-7xl mx-auto">
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-center text-white mb-8">
                {t("howToPlay")}
            </h2>

            {/* Instructions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {gameInstructions.map((instruction) => (
                    <div
                        className="bg-purple-700 rounded-lg shadow-xl overflow-hidden flex flex-col items-center"
                        key={instruction.id}
                    >
                        {/* GifPlayer */}
                        <div className="mb-0"> {/* Adjusted size */}
                            <GifPlayer
                                gifSrc={instruction.gifSrc}
                                staticImgSrc={instruction.staticImgSrc}
                                alt={instruction.title}
                            />
                        </div>

                        {/* Instruction Text */}
                        <div className="flex flex-col items-start justify-between px-6 pt-2 pb-3">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {instruction.emoji} {instruction.title}
                            </h3>
                            <p className="text-lg font-semibold text-gray-300">{instruction.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowToPlay;
