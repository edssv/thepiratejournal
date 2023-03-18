'use client';

import { PulseLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ height: '100%' }}>
                <div className={styles.root}>
                    <div className={styles.container}>
                        {' '}
                        <PulseLoader
                            size="15px"
                            aria-label="Загрузка"
                            color="var(--md-sys-color-primary)"
                            margin={6}
                            speedMultiplier={0.7}
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
