import React from "react";
import "./App.css";
import { SchoolsData } from "./features/schools/schoolsData/schoolsData";
import { Routes, Route, Navigate } from "react-router-dom";
import { SchoolsDetails } from "./features/schools/schoolDetails/schoolDetails";
import Header from "./features/header/header";
import Footer from "./features/footer/footer"

function App() {
  const [darkMode, setDarkMode] = React.useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const userPrefersDark = getPrefColorScheme();

    // if mode was saved --> dark / light
    if (isReturningUser) {
      var saveDarkMode: string | null = localStorage.getItem("dark");
      const savedMode = JSON.parse(saveDarkMode != null ? saveDarkMode : "");
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    }
    // return savedMode || false;
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    // <div className={darkMode ? "dark-mode" : "light-mode"}>
    //   <nav>
    //     <div className="toggle-container">
    //       <span className="title">Analysis Chart</span>
    //       <span className="toggle">
    //         <input
    //           checked={darkMode}
    //           onChange={() => setDarkMode((prevMode: any) => !prevMode)}
    //           id="checkbox"
    //           className="checkbox"
    //           type="checkbox"
    //         />
    //         <label htmlFor="checkbox" />
    //       </span>

    //       {/* <button onClick={() => setDarkMode(prevMode => !prevMode)}>
    //       Toggle
    //     </button> */}
    //     </div>
    //   </nav>

    //   <SchoolsData />
    // </div>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<SchoolsData />} />
        <Route path="/schoolDetails" element={<SchoolsDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
