import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    // Apply the theme when `dark` changes
    useEffect(() => {
        const root = document.documentElement;
        const theme = dark ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="p-2 bg-gray-700 dark:bg-white text-white dark:text-black rounded z-50 flex items-center justify-center"
        >
            {dark ? '☀️' : '🌙'}
        </button>
    );
};

export default DarkModeToggle;
