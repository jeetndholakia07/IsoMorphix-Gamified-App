import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../context/store/store.js";
import { useTranslation } from "react-i18next";

const Games = () => {
    const levels = useSelector((state: RootState) => state.levels.levels);
    const {t} = useTranslation();
    return (
        <section className="px-6 !md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                {t("gameIntro")}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {Object.values(levels).map((level) => (
                    <div
                        key={level.id}
                        className="bg-indigo-700 rounded-lg shadow-lg p-5 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
                    >
                        <div className="text-5xl mb-3 text-center">{level.emoji}</div>
                        <h2 className="text-xl font-bold text-white text-center mb-2">{level.name}</h2>
                        <p className="text-sm text-white/70 text-center mb-1">
                            {t("difficulty")} <span className="text-white">{level.difficulty}</span>
                        </p>
                        <p className="text-sm text-white/70 text-center mb-4">
                            {t("points")} <span className="text-white">{level.points}</span>
                        </p>
                        <Link
                            to={`/game/${level.id}`}
                            className="mt-auto bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md font-semibold"
                        >
                            {t("start")}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default Games;