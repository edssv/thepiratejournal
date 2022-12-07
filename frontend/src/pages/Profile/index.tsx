import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetUserQuery, Article, Draft } from '../../redux';
import { convertDateDayMonthYear, viewsSumCalc } from '../../helpers';
import { DraftPreview, CreateModule, Avatar, ArticlePreview, Overlay } from '../../components';
import { useDocTitle } from '../../hooks';
import { ActionButton, Button, ButtonGroup, Divider, Text } from '@adobe/react-spectrum';

// icons
import Location from '@spectrum-icons/workflow/Location';
import Heart from '@spectrum-icons/workflow/Heart';

import styles from './Profile.module.scss';
import { ButtonFollow } from '../../components/Buttons/ButtonFollow';

const Profile: React.FC = () => {
    const { username } = useParams();
    useDocTitle(username);
    const location = useLocation();
    const navigate = useNavigate();

    const activeSection = location.pathname.split('/')[3];
    console.log(activeSection);

    const [list, setList] = useState(activeSection ? activeSection : 'articles');

    const { data, isLoading, isFetching, refetch } = useGetUserQuery(username);

    if (isLoading) return <Overlay />;

    const user = data?.user;
    const articles = data?.articles;
    const isOwner = data?.isOwner;
    const views = viewsSumCalc(articles);
    const city = user?.info.city;
    const country = user?.info.country;

    const articlesList = articles?.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const appreciatedList = data?.appreciated?.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const bookmarksList = data?.bookmarks?.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const draftsList = data?.drafts?.map((draft: Draft, id) => (
        <DraftPreview draft={draft} refetch={refetch} key={id} />
    ));

    const appreciatedBlock = () => {
        if (appreciatedList?.length === 0 && !isOwner) return '';
        if ((appreciatedList?.length === 0 && isOwner) || appreciatedList?.length !== 0)
            return (
                <Button
                    onPress={() => changeChapter('appreciated')}
                    variant={list === 'appreciated' ? 'primary' : 'secondary'}
                    style={list === 'appreciated' ? 'fill' : 'outline'}>
                    Оценки
                </Button>
            );
    };

    const changeChapter = (chapter: string) => {
        setList(chapter);
        navigate(`/users/${username}/${chapter}`);
    };

    const date = convertDateDayMonthYear(user?.timestamp);
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <Avatar imageSrc={user?.avatar} width={110} />
                    <div className={styles.top__wrapper}>
                        <div className={styles.top__info}>
                            <h3 className={styles.info__headline}>{user?.username}</h3>
                            <div className={styles.info__counters}>
                                Подписчики: <span>{data?.user.followersCount}</span>
                            </div>
                            {/* <div className={styles.location}>
                                <Location size="XS" />{' '}
                                {city && country
                                    ? `${city},
                                ${country}`
                                    : 'Пиратский корабль'}
                            </div> */}
                        </div>
                        {!isOwner && (
                            <ButtonFollow
                                username={username}
                                hasSubscription={data?.viewer.hasSubscription}
                            />
                        )}
                    </div>
                    <span className={styles.signupDate}>Дата регистрации: {date}</span>
                </div>
                <section className={`${styles.articlesSection} articles`}>
                    <ButtonGroup flex UNSAFE_className={styles.buttonGroup}>
                        <Button
                            onPress={() => changeChapter('articles')}
                            variant={list === 'articles' ? 'primary' : 'secondary'}
                            style={list === 'articles' ? 'fill' : 'outline'}>
                            Статьи
                        </Button>
                        {appreciatedBlock()}{' '}
                        {isOwner && (
                            <>
                                <Button
                                    onPress={() => changeChapter('bookmarks')}
                                    variant={list === 'bookmarks' ? 'primary' : 'secondary'}
                                    style={list === 'bookmarks' ? 'fill' : 'outline'}>
                                    Закладки
                                </Button>
                                <Divider
                                    orientation="vertical"
                                    alignSelf="center"
                                    size="S"
                                    height="20px"
                                    margin="0 10px"
                                />{' '}
                                <Button
                                    onPress={() => changeChapter('drafts')}
                                    variant={list === 'drafts' ? 'primary' : 'secondary'}
                                    style={list === 'drafts' ? 'fill' : 'outline'}>
                                    Черновики
                                </Button>
                            </>
                        )}
                    </ButtonGroup>
                    {list === 'articles' && (
                        <div className="articles__list">
                            {articlesList?.length !== 0
                                ? articlesList
                                : isOwner && <CreateModule create />}
                        </div>
                    )}
                    {list === 'appreciated' &&
                        (appreciatedList?.length !== 0 ? (
                            <div className="appreciated__list">{appreciatedList}</div>
                        ) : (
                            isOwner && (
                                <div className="articles__list">
                                    <CreateModule find />
                                </div>
                            )
                        ))}
                    {list === 'bookmarks' &&
                        (bookmarksList?.length !== 0 ? (
                            <div className="appreciated__list">{bookmarksList}</div>
                        ) : (
                            isOwner && (
                                <div className="articles__list">
                                    <CreateModule find />
                                </div>
                            )
                        ))}
                    {list === 'drafts' && (
                        <div className="articles__list">
                            {draftsList}
                            <CreateModule draft />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profile;
