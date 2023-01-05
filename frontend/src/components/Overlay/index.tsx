import { ProgressCircle } from '@adobe/react-spectrum';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <div className={styles.root}>
            <ProgressCircle isIndeterminate size="M" aria-label="Загрузка..." />
        </div>
    );
};
