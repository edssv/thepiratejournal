import { useEffect, useMemo, useState } from 'react';

export const useThemeMode = () => {
    const theme: 'light' | 'dark' =
        localStorage.getItem('theme') === 'light'
            ? 'light'
            : 'dark' || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    const [mode, setMode] = useState<'light' | 'dark'>(theme);
    console.log(mode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleTheme() {
        if (mode === 'light') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setMode('dark');
        } else if (mode === 'dark') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            setMode('light');
        }
    }
    return useMemo(() => ({ mode, handleTheme }), [handleTheme, mode]);
};
