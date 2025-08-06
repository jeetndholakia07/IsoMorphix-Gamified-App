import type { FC } from "react";
import { useTranslation } from "react-i18next";

type hintProps = {
    hint: string;
}

const HintInfo: FC<hintProps> = ({ hint }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-indigo-700 p-4 rounded-lg shadow-md mb-6">
            <p className="text-white text-sm">
                <i className="bi bi-lightbulb text-lg text-yellow-500"></i> <strong>{t("hint")}</strong> {hint}
            </p>
        </div>
    )
}
export default HintInfo;