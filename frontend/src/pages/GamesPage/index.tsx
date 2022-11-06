import { Poster } from '../../components/Poster';

import styles from './GamesPage.module.scss';

const GamesPage = () => {
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
