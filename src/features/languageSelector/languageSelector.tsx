import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import "./languageSelector.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getLanguage, setLanguage } from "../header/headerSlice";

const LanguageSelector = () => {
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(
        useAppSelector(getLanguage)
    );
    const setPageDirection = (language: any) => {
        const dir = language == "ar" ? "rtl" : "ltr";
        document.documentElement.dir = dir;
    };
    const changeLanguage = (lng: any) => {
        setSelectedLanguage(lng);
    };

    useEffect(() => {
        if (selectedLanguage != "") {
            dispatch(setLanguage(selectedLanguage));
            i18n.changeLanguage(selectedLanguage);
            setPageDirection(selectedLanguage);
        }
    }, [selectedLanguage]);

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
