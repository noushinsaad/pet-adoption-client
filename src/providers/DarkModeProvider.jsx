/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useDarkMode from "../hooks/useDarkMode";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkModeContext = () => {
    return useContext(DarkModeContext);
};
