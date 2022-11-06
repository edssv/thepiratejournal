import { IoEye, IoDocument } from 'react-icons/io5';
import { Button } from '@adobe/react-spectrum';

import img from '../../assets/img/Metro_Exodus.png';

import styles from './GamePage.module.scss';
import { useGetArticlesQuery } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { viewsSumCalc } from '../../helpers/viewsSum';

const GamePage = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetArticlesQuery('');

    const views = viewsSumCalc(data);

    return (
        <div className={styles.top}>
            <img src={img} alt="Изоображение" className={styles.top__img} />
            <div className={styles.wrapper}>
                <div className={styles.top__info}>
                    <h2 className={styles.info__headline}>Metro Exodus</h2>
                    <div className={styles.info__count_articles}></div>
                    <div className="icon-center">
                        <IoDocument />
                        <span>{data.length} статей</span>
                    </div>
                    <div className="icon-center">
                        <IoEye />
                        <span>{views} просмотров</span>
                    </div>
                </div>
                <Button onPress={() => navigate('/article_edit')} variant="cta">
                    Написать статью
                </Button>
            </div>
        </div>
    );
};

export default GamePage;
