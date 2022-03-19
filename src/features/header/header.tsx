import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LanguageSelector from "../languageSelector/languageSelector";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTheme, setTheme } from "./headerSlice";

export default function Header() {
    const dispatch = useAppDispatch();
    const [themeColor, setThemeColor] = useState(useAppSelector(getTheme));
    const handleSetThemeColor = () => {
        if (themeColor === "dark") {
            setThemeColor("light");
        } else {
            setThemeColor("dark");
        }
    };
    useEffect(() => {
        debugger
        dispatch(setTheme(themeColor))
    }, [themeColor]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <LanguageSelector />
                    <IconButton
                        sx={{ ml: 1 }}
                        onClick={handleSetThemeColor}
                        color="inherit"
                    >
                        {themeColor === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
