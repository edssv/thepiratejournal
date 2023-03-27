import { Article } from '@/interfaces/article.interface';
import SignedOut from './SignedOut/SignedOut';

import './Home.module.scss';
import styles from './Home.module.scss';

interface HomeProps {
    articles: Article[];
}

const HomeScreen: React.FC<HomeProps> = ({ articles }) => {
    return <div className={styles.root}>{<SignedOut articles={articles} />}</div>;
};

export default HomeScreen;
