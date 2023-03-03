import { useAuth } from '../../hooks';
import { SignOut } from './components';

import styles from './History.module.scss';

const History = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <h3>Раздел в разработке.</h3>;
    else {
        return <SignOut />;
    }
};

export default History;
