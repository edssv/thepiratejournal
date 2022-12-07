import { ProgressCircle } from '@adobe/react-spectrum';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <div className={styles.root}>
            <ProgressCircle
                isIndeterminate
                size={window.screen.width <= 768 ? 'M' : 'L'}
                aria-label="Загрузка..."
            />
        </div>
    );
};
