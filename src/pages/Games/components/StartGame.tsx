import type { FC } from "react";
import { useTranslation } from "react-i18next";

type btnProps = {
    handleClick: any;
}

const StartGame: FC<btnProps> = ({ handleClick }) => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-center bg-indigo-800 bg-opacity-60 z-50">
            <button
                onClick={handleClick}
                className="px-6 py-3 bg-blue-600 hover:cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
            >
                {t("startBtn")}
            </button>
        </div>
    )
}
export default StartGame;