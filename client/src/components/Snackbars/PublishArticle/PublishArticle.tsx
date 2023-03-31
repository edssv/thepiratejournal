import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Snackbar from '@/components/common/Snackbar/Snackbar';

const PublishArticle = () => {
    const { setPublishSnackbarVisible } = useActions();
    const { isPublishSnackbarVisible } = useTypedSelector((state) => state.ui);

    return (
        <Snackbar
            isOpen={isPublishSnackbarVisible}
            close
            onClose={() => setPublishSnackbarVisible(false)}
            position="center"
        >
            Статья отправлена на проверку и в скором времени будет опубликована.
        </Snackbar>
    );
};

export default PublishArticle;
