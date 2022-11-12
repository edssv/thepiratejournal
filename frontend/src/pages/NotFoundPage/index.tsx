import { Button, Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <IllustratedMessage alignSelf="center" height="75vh">
            <NotFound />
            <Heading>Ошибка 404 - Страница не найдена</Heading>
            <Content>
                Эта страница недоступна. Попробуйте проверить URL-адрес или перейдите на другую
                страницу.
            </Content>
            <Button onPress={() => navigate('/')} variant="overBackground" marginTop={18}>
                Домой
            </Button>
        </IllustratedMessage>
    );
};

export default NotFoundPage;
