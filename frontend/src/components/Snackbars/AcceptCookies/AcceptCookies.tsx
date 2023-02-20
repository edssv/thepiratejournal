import { Snackbar } from '../..';

export const AcceptCookies = () => {
    const isAcceptCookies = localStorage.getItem('isAcceptCookies');

    if (isAcceptCookies) {
        return (
            <Snackbar
                isOpen={true}
                permanent
                close
                onClose={() => localStorage.setItem('isAcceptCookies', 'true')}
                position="center"
            >
                Статья отправлена на проверку и в скором времени будет опубликована.
            </Snackbar>
        );
    } else return null;
};
