import {
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Heading,
} from '@adobe/react-spectrum';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
                <Dialog>
                    <Heading>{title}</Heading>
                    <Content>
                        <p>{paragraph}</p>
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
