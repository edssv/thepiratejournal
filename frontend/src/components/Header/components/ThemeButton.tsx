import { motion } from 'framer-motion';

import { Button } from '../../Buttons';
import { useThemeMode } from '../../../hooks';

export const ThemeButton = () => {
    const { mode, handleTheme } = useThemeMode();
    return (
        <Button onClick={handleTheme} icon variant="outlined">
            {mode === 'dark' ? (
                <motion.div
                    animate={{ translateY: 0 }}
                    style={{
                        translateY: 15,
                        height: '20px',
                    }}
                >
                    <span className="material-symbols-outlined">light_mode</span>
                </motion.div>
            ) : (
                <motion.div animate={{ translateY: 0 }} style={{ translateY: -15, height: '20px' }}>
                    <span className="material-symbols-outlined">dark_mode</span>
                </motion.div>
            )}
        </Button>
    );
};
