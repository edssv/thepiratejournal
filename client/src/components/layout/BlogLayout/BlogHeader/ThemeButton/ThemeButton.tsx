import { useCallback } from 'react';
import { useTheme } from 'next-themes';

import Button from '@/components/common/Button/Button';
import { ThemeMode } from '@/lib/enums';

const ThemeButton: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const getTheme = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return ThemeMode.DARK;
    if (theme === ThemeMode.DARK) return ThemeMode.LIGHT;
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return ThemeMode.DARK;
      if (systemTheme === ThemeMode.DARK) return ThemeMode.LIGHT;
    }
  }, [theme, systemTheme]);

  const getIcon = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return 'dark_mode';
    if (theme === ThemeMode.DARK) return 'light_mode';
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return 'dark_mode';
      if (systemTheme === ThemeMode.DARK) return 'light_mode';
    }
  }, [theme, systemTheme]);

  return (
    <Button
      onClick={() => {
        setTheme(getTheme() ?? '');
      }}
      icon
      color="secondary"
    >
      <span className="material-symbols-outlined">{getIcon()}</span>
    </Button>
  );
};

export default ThemeButton;
