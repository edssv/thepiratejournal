import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Snackbar from '@/components/common/Snackbar/Snackbar';

const Alert: React.FC = () => {
    const alert = useTypedSelector((state) => state.ui.alert);

    const { setAlert } = useActions();

    return (
        <Snackbar isOpen={Boolean(alert)} close onClose={() => setAlert(null)} position="center" timeout={6000}>
            {alert}
        </Snackbar>
    );
};

export default Alert;
