import { motion, AnimatePresence } from 'framer-motion';
import { PulseLoader } from 'react-spinners';

import styles from './Overlay.module.scss';

const Overlay = () => (
  <AnimatePresence>
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} style={{ height: '100%' }}>
      <div className={styles.root}>
        <div className={styles.container}>
          {' '}
          <PulseLoader
            aria-label='Загрузка'
            color='var(--md-sys-color-primary)'
            margin={6}
            size='15px'
            speedMultiplier={0.7}
          />
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);

export default Overlay;
