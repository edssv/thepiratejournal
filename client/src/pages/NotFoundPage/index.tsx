import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';

const NotFoundPage = () => {
    return (
        <IllustratedMessage alignSelf="center" height="75vh">
            <NotFound />
            <Heading>Ошибка 404 - Страница не найдена</Heading>
            <Content>
                Эта страница недоступна. Попробуйте проверить URL-адрес или перейдите на другую
                страницу.
            </Content>
        </IllustratedMessage>
    );
};

export default NotFoundPage;
