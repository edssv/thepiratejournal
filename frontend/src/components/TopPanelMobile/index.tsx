import { Button } from '@adobe/react-spectrum';
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './TopPanelMobile.module.scss';

export const TopPanelMobile = ({ children }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location?.state?.from?.pathname;

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Button
                    isQuiet
                    variant="primary"
                    onPress={() => navigate(fromPage ? fromPage : '/')}>
                    <ChevronLeft />
                </Button>
                {children}
            </div>
        </div>
    );
};
