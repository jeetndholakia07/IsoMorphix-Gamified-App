import { useTranslation } from "react-i18next";
import { Link } from "react-router"

const QuitButton = () => {
    const { t } = useTranslation();
    return (
        <Link to="/game">
            <button className="px-3 py-2 text-center text-lg text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer rounded-sm transition-all duration-300 transform hover:scale-105">
                <i className="bi bi-sign-turn-right-fill text-lg mr-2"></i>{t("quit")}
            </button>
        </Link>
    )
}
export default QuitButton;