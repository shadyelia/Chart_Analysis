import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import "./languageSelector.css";

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const changeLanguage = (lng: any) => {
        setSelectedLanguage(lng);
        i18n.changeLanguage(lng);
    };

    return (
        <div onChange={changeLanguage}>
            {selectedLanguage == "ar" && (
                <Button className="whiteColor" onClick={() => changeLanguage("en")}>
                    en
                </Button>
            )}
            {selectedLanguage == "en" && (
                <Button className="whiteColor" onClick={() => changeLanguage("ar")}>
                    ar
                </Button>
            )}
        </div>
    );
};

export default LanguageSelector;
