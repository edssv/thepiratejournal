import Snackbar from '@/components/common/Snackbar/Snackbar';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Alert: React.FC = () => {
  const alert = useTypedSelector((state) => state.ui.alert);

  const { setAlert } = useActions();

  return (
    <Snackbar close isOpen={Boolean(alert)} position='center' timeout={6000} onClose={() => setAlert(null)}>
      {alert}
    </Snackbar>
  );
};

export default Alert;
