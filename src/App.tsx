import React from "react";
import "./App.css";
import { SchoolsData } from "./features/schools/schoolsData/schoolsData";
import { Routes, Route, Navigate } from "react-router-dom";
import { SchoolsDetails } from "./features/schools/schoolDetails/schoolDetails";
import Header from "./features/header/header";
import Footer from "./features/footer/footer";
import "./118n";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppSelector } from "./app/hooks";
import { getTheme } from "./features/header/headerSlice";

function App() {
  const themColor = useAppSelector(getTheme);
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${themColor})`);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "light" : "dark",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<SchoolsData />} />
          <Route path="/schoolDetails" element={<SchoolsDetails />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
