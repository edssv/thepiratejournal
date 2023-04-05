import clsx from 'clsx';

import { useThemeMode } from '@/hooks';

import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
    const { mode, handleTheme } = useThemeMode();

    return (
        <div className={styles.root}>
            {' '}
            <button
                onClick={handleTheme}
                aria-label={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
                <div className={clsx(styles.track, mode === 'dark' && styles.isDarkMode)}>
                    <div className={styles.switch}>
                        <span className="material-symbols-outlined">dark_mode</span>
                    </div>
                    <div className={styles.switch}>
                        <span className="material-symbols-outlined">light_mode</span>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ThemeButton;