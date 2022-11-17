import React from 'react';
import { IoEye } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useGetUserQuery } from '../../redux/services/user';
import { Article } from '../../redux/services/article';

import styles from './Profile.module.scss';
import { ArticlePreview } from '../../components/ArticlePreview';
import { viewsSumCalc } from '../../helpers/viewsSum';
import { Avatar } from '../../components/Avatar';
import { useDocTitle } from '../../hooks/useDocTitle';
import Location from '@spectrum-icons/workflow/Location';
import Heart from '@spectrum-icons/workflow/Heart';
import { Button, ButtonGroup, Text } from '@adobe/react-spectrum';
import { convertDateDayMonthYear, convertDateShort } from '../../helpers/convertDate';

const Profile: React.FC = () => {
    const { id } = useParams();

    const [doctitle, setDocTitle] = useDocTitle(id);

    const { data, isLoading } = useGetUserQuery(id);

    if (isLoading) return <></>;

    const avatar = data?.user.avatar;
    const username = data?.user.username;
    const articlesCount = data?.articles.length;
    const views = viewsSumCalc(data?.articles);

    const articles = data?.articles.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const date = convertDateDayMonthYear(data?.user.timestamp);
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <Avatar imageSrc={avatar} width={160} />
                    <div className={styles.top__wrapper}>
                        <div className={styles.top__info}>
                            <h3 className={styles.info__headline}>{username}</h3>
                            <div className={styles.info__counters}>
                                {/* <div className="icon-center">
                                <IoDocument />
                                <span>{articlesCount} статей</span>
                            </div> */}
                                <div className="icon-center">
                                    <IoEye />
                                    <span>{views} просмотров</span>
                                </div>
                            </div>
                            <div className={styles.location}>
                                <Location size="XS" /> {data?.user.info.city},{' '}
                                {data?.user.info.country}
                            </div>
                        </div>
                        <Button variant="accent">
                            <Heart />
                            <Text>1 999</Text>
                        </Button>
                    </div>
                    <span className={styles.signupDate}>Дата регистрации: {date}</span>
                </div>
                <section className="articles">
                    <ButtonGroup>
                        <Button variant="primary" style="fill">
                            Статьи
                        </Button>
                        <Button variant="primary">Оценки</Button>
                    </ButtonGroup>
                    <div className="articles__list">{articles}</div>
                </section>
            </div>
        </div>
    );
};

export default Profile;
