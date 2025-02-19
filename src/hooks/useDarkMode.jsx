import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') || "light");


    useEffect(() => {

        if (darkMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newMode = darkMode === "light" ? "dark" : "light"
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode)
    };

    return [darkMode, toggleDarkMode];
};

export default useDarkMode;
