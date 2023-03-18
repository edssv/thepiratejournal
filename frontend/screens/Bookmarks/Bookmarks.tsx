import { useAuth } from '../../hooks';
import { SignOut } from './components';

import styles from './Bookmarks.module.scss';

const Bookmarks = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <h3>Раздел в разработке.</h3>;
    else {
        return <SignOut />;
    }
};

export default Bookmarks;
