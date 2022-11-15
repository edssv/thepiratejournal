import { Button, Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import Error from '@spectrum-icons/illustrations/Error';
import { useNavigate } from 'react-router-dom';

export const ErrorFallback = () => {
    const navigate = useNavigate();

    return (
        <IllustratedMessage height="100vh">
            <Error />
            <Heading>Ошибка 500 - Внутренняя ошибка сервера</Heading>
            <Content>Что-то пошло не так. Пожалуйста, попробуйте позже.</Content>
            <Button onPress={() => navigate('/')} variant="overBackground" marginTop={18}>
                Домой
            </Button>
        </IllustratedMessage>
    );
};
