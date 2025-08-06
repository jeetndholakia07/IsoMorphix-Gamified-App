import type { FC } from "react";
import { useTranslation } from "react-i18next";

type levelProps = {
    name: string;
    difficulty: string;
    points: number;
}

const LevelInfo: FC<levelProps> = ({ name, difficulty, points }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t("build")} <span className="text-purple-300">{name}</span>
            </h1>
            <p className="text-white/70 text-md">
                {t("difficulty")} <span className="text-white">{difficulty}</span>
            </p>
            <div className="text-white mb-3">
                <p className="text-white/70 text-md">
                    {t("maxPoints")} {points}
                </p>
            </div>
        </div>
    )
}
export default LevelInfo;