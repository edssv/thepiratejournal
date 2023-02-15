import { motion } from 'framer-motion';

import { Button } from '../../../Buttons';
import { useThemeMode } from '../../../../hooks';

import styles from './ThemeButton.module.scss';

export const ThemeButton = () => {
    const { mode, handleTheme } = useThemeMode();
    return (
        <Button onClick={handleTheme} icon variant="outlined">
            {mode === 'dark' ? (
                <motion.div initial={{ translateY: 15 }} animate={{ translateY: 0 }} className={styles.motionContainer}>
                    <span className="material-symbols-outlined">light_mode</span>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ translateY: -15 }}
                    animate={{ translateY: 0 }}
                    className={styles.motionContainer}
                >
                    <span className="material-symbols-outlined">dark_mode</span>
                </motion.div>
            )}
        </Button>
    );
};
