import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
    return (
        <div className="h-auto md:ml-4 w-full">
            <h1 className="text-2xl font-bold mb-1">{t("header")}</h1>
            <p className="text-white/70">{t("isomorphixMission")}</p>
        </div>
    );
}
export default Index;