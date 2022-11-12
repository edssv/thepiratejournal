import React from 'react';
import { IoDocument, IoEye } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { ButtonLike } from '../../components/Buttons/ButtonLike';
import { useAuth } from '../../hooks/useAuth';
import { useGetUserQuery } from '../../redux/services/user';
import { Article } from '../../redux/services/article';

import styles from './Profile.module.scss';
import { ArticlePreview } from '../../components/ArticlePreview';
import { viewsSumCalc } from '../../helpers/viewsSum';
import { Avatar } from '../../components/Avatar';

const Profile: React.FC = () => {
    const { id } = useParams();

    const { data, isLoading } = useGetUserQuery(id);

    if (isLoading) return <></>;

    const avatar = data?.user.avatar;
    const username = data?.user.username;
    const articlesCount = data?.articles.length;
    const views = viewsSumCalc(data?.articles);

    const articles = data?.articles.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Avatar imageSrc={avatar} width={200} />
                <div className={styles.wrapper}>
                    <div className={styles.top__info}>
                        <h2 className={styles.info__headline}>{username}</h2>
                        <div className={styles.info__count_articles}></div>
                        <div className="icon-center">
                            <IoDocument />
                            <span>{articlesCount} статей</span>
                        </div>
                        <div className="icon-center">
                            <IoEye />
                            <span>{views} просмотров</span>
                        </div>
                    </div>
                    {/* <ButtonLike /> */}
                </div>
            </div>
            <section className="articles">
                <h4 className="headline">Все статьи пользователя</h4>
                <div className="articles__list">{articles}</div>
            </section>
        </div>
    );
};

export default Profile;
