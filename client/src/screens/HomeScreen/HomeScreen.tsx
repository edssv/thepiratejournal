import SignedOut from './SignedOut/SignedOut';

import './Home.module.scss';
import styles from './Home.module.scss';

const HomeScreen: React.FC = () => {
    return <div className={styles.root}>{<SignedOut />}</div>;
};

export default HomeScreen;
