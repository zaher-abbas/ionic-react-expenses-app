import React from "react";

export const DarkMode = () => {

    const [isDark, setIsDark] = React.useState<boolean>(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    React.useEffect(() => {
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
    };
    return { isDark, toggleDarkMode }

}