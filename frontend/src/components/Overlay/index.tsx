import { ProgressCircle } from '@adobe/react-spectrum';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}>
                <div className={styles.root}>
                    <ProgressCircle isIndeterminate size="M" aria-label="Загрузка" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
