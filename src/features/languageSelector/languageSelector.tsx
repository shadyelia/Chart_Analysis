import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div onChange={changeLanguage}>
            <button type="button" onClick={() => changeLanguage("en")}>
                en
            </button>
            <button type="button" onClick={() => changeLanguage("ar")}>
                ar
            </button>
        </div>
    );
};

export default LanguageSelector;
