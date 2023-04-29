import { useTheme } from 'next-themes';

import Button from '@/components/common/Button/Button';
import { ThemeMode } from '@/lib/enums';

import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const getButtonContent = () => {
    if (theme === ThemeMode.DARK) {
      return (
        <>
          <span className='material-symbols-outlined'>light_mode</span> Светлая тема
        </>
      );
    }

    return (
      <>
        <span className='material-symbols-outlined'>dark_mode</span> Темная тема
      </>
    );
  };
  return (
    <Button
      className={styles.root}
      color='secondary'
      variant='outlined'
      onClick={() => setTheme(theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT)}
    >
      {getButtonContent()}
    </Button>
  );
};

export default ThemeButton;
