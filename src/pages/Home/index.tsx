import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Index = () => {
    const { t } = useTranslation();
    return (
        <section className="flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t("welcome")} <span className="text-purple-300">{t("isomorphix")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8">
                {t("homeIntro")}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <Link
                    to="/game"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
                >
                    <i className="bi bi-controller mr-2" /> {t("startGame")}
                </Link>
                <Link
                    to="/howToPlay"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
                >
                    <i className="bi bi-journal-text mr-2" /> {t("howToPlay")}
                </Link>
                <Link
                    to="/leaderboard"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
                >
                    <i className="bi bi-trophy mr-2" /> {t("leaderboard")}
                </Link>
            </div>
        </section>
    );
}
export default Index;
