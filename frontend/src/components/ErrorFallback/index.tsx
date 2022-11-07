import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import Error from '@spectrum-icons/illustrations/Error';

export const ErrorFallback = () => {
    return (
        <IllustratedMessage height="100vh">
            <Error />
            <Heading>Ошибка 500 - Внутренняя ошибка сервера</Heading>
            <Content>Что-то пошло не так. Пожалуйста, попробуйте позже.</Content>
        </IllustratedMessage>
    );
};
