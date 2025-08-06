import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
    return (
        <footer className="mt-auto text-center text-white/70 py-4 border-t border-white/10">
            <div className="text-sm">
                {t("copyright")} {new Date().getFullYear()} <strong className="text-white">{t("isomorphix")}</strong>
                {t("rightsReserved")}
                <span className="block mt-1 text-xs">
                    {t("createdBy")} <a className="hover:cursor-pointer underline hover:text-white">{t("isomorphix")}</a>
                </span>
            </div>
        </footer>
    )
}
export default Index;