"use client"
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div className='flex justify-end mx-10 my-2'>
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={!isDarkMode ?"p-2 bg-gray-800 text-white rounded-full" : "p-2 bg-gray-50 text-black rounded-full"}
            >
                {isDarkMode ? (
                    <span role="img" aria-label="light mode">🌞</span> // Light Mode Icon
                ) : (
                    <span role="img" aria-label="dark mode">🌙</span> // Dark Mode Icon
                )}
            </button>
        </div>

    );
};

export default DarkModeToggle;
