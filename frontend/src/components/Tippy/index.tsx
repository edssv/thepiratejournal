import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Heading,
} from '@adobe/react-spectrum';

import styles from './Tippy.module.scss';

interface TippyProps {
    children: any;
    tooltipPosition: any;
    paragraph: string;
    title: string;
    offset?: number;
}

export const Tippy: React.FC<TippyProps> = ({
    children,
    tooltipPosition,
    paragraph,
    title,
    offset,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <DialogTrigger type="popover" mobileType="tray" offset={offset} placement={tooltipPosition}>
            {children}
            {(close) => (
                <Dialog UNSAFE_className={styles.tippyDialog}>
                    <div className={styles.root}></div>
                    <Heading UNSAFE_className={styles.headline}>{title}</Heading>
                    <Content>
                        <p className={styles.text}>{paragraph}</p>
                    </Content>
                    <ButtonGroup>
                        <Button onPress={close} variant="secondary" staticColor="white">
                            Не сейчас
                        </Button>
                        <Button
                            onPress={() =>
                                navigate('/login', {
                                    state: { from: location },
                                })
                            }
                            variant="accent"
                            staticColor="white">
                            Войти
                        </Button>
                    </ButtonGroup>
                </Dialog>
            )}
        </DialogTrigger>
    );
};
