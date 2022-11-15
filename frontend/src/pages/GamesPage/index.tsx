import { Poster } from '../../components/Poster';
import { useDocTitle } from '../../hooks/useDocTitle';

import styles from './GamesPage.module.scss';

const GamesPage = () => {
    const [doctitle, setDocTitle] = useDocTitle('Игры');

    return (
        <div className={styles.root}>
            <ul className={styles.gamesList}>
                <li>
                    <Poster />
                </li>
            </ul>
        </div>
    );
};

export default GamesPage;
