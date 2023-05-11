import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import Button from '@/components/common/Button/Button';
import { ThemeMode } from '@/lib/enums';

const ThemeButton: React.FC = () => {
  const { setTheme, systemTheme, theme } = useTheme();

  const getTheme = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return ThemeMode.DARK;
    if (theme === ThemeMode.DARK) return ThemeMode.LIGHT;
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return ThemeMode.DARK;
      if (systemTheme === ThemeMode.DARK) return ThemeMode.LIGHT;
    }
    return null;
  }, [theme, systemTheme]);

  const getIcon = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return 'dark_mode';
    if (theme === ThemeMode.DARK) return 'light_mode';
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return 'dark_mode';
      if (systemTheme === ThemeMode.DARK) return 'light_mode';
    }
    return null;
  }, [theme, systemTheme]);

  return (
    <Button
      icon
      color='secondary'
      onClick={() => {
        setTheme(getTheme() ?? '');
      }}
    >
      <span className='material-symbols-outlined'>{getIcon()}</span>
    </Button>
  );
};

export default ThemeButton;
