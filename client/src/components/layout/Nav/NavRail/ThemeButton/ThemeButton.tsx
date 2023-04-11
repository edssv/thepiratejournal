import clsx from 'clsx';
import { useTheme } from 'next-themes';

import { ThemeMode } from '@/lib/enums';

import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.root}>
      <button
        onClick={() => setTheme(theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT)}
        aria-label={theme === ThemeMode.LIGHT ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        <div className={clsx(styles.track, theme === ThemeMode.DARK && styles.isDarkMode)}>
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
