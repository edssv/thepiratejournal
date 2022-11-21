import { Button, ButtonGroup } from '@adobe/react-spectrum';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './TippyBox.module.scss';

interface TippyBoxProps {
    visibility?: boolean;
}

export const TippyBox: React.FC<TippyBoxProps> = ({ visibility }) => {
    const navigate = useNavigate();

    const [isVisible, setVisible] = useState(visibility);

    useEffect(() => {
        setVisible(visibility);
    }, [visibility]);

    return (
        <div className={styles.root} style={isVisible ? { visibility: 'visible' } : {}}>
            <div className={styles.tippy}>
                <div className={styles.content}>
                    <div className={styles.headline}>Добавляй в избранное</div>
                    <p>Чтобы добавлять статьи в понравившиеся, войди в аккаунт.</p>
                    <ButtonGroup marginTop="24px" UNSAFE_className={styles.buttonGroup}>
                        <Button
                            onPress={() => setVisible(false)}
                            variant="secondary"
                            staticColor="white">
                            Не сейчас
                        </Button>
                        <Button
                            onPress={() => navigate('/login')}
                            variant="accent"
                            staticColor="white">
                            Войти
                        </Button>
                    </ButtonGroup>
                </div>
                <div className={styles.arrow}></div>
            </div>
        </div>
    );
};
