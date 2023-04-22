import { useTheme } from 'next-themes';

import Button from '@/components/common/Button/Button';
import { ThemeMode } from '@/lib/enums';

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT)}
      icon
      color="secondary"
    >
      <span className="material-symbols-outlined">{theme === ThemeMode.LIGHT ? 'dark_mode' : 'light_mode'}</span>
    </Button>
  );
};

export default ThemeButton;
