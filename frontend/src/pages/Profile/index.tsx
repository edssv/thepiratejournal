import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetUserQuery, Article, Draft } from '../../redux';
import { convertDateDayMonthYear, viewsSumCalc } from '../../helpers';
import { DraftPreview, CreateModule, Avatar, ArticlePreview, Overlay } from '../../components';
import { useDocTitle } from '../../hooks';
import { Button, ButtonGroup, Divider, Text } from '@adobe/react-spectrum';

// icons
import { IoEye } from 'react-icons/io5';
import Location from '@spectrum-icons/workflow/Location';
import Heart from '@spectrum-icons/workflow/Heart';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
    const { id } = useParams();
    useDocTitle(id);
    const location = useLocation();
    const navigate = useNavigate();

    const chapter = location.pathname.split('/')[3];

    const [list, setList] = useState(chapter ? chapter : 'articles');

    const { data, isLoading, refetch } = useGetUserQuery(id);

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
        navigate(`/users/${id}/${chapter}`);
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
                                {/* <div className="icon-center">
                                <IoDocument />
                                <span>{articlesCount} статей</span>
                            </div> */}
                                <div className="icon-center">
                                    <IoEye />
                                    <span>{views ? views : 0} просмотров</span>
                                </div>
                            </div>
                            <div className={styles.location}>
                                <Location size="XS" />{' '}
                                {city && country
                                    ? `${city},
                                ${country}`
                                    : 'Пиратский корабль'}
                            </div>
                        </div>
                        <Button variant="accent">
                            <Heart />
                            <Text>1 999</Text>
                        </Button>
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
