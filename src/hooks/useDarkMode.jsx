import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        const savedMode = localStorage.getItem('theme');
        if (savedMode) {
            setDarkMode(savedMode === 'dark');
        } else {

            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);


    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return [darkMode, toggleDarkMode];
};

export default useDarkMode;
