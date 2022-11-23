import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/services/user';
import { Article, Draft } from '../../redux/services/article';

import styles from './Profile.module.scss';
import { useDocTitle } from '../../hooks/useDocTitle';
import Location from '@spectrum-icons/workflow/Location';
import Heart from '@spectrum-icons/workflow/Heart';
import { Button, ButtonGroup, Divider, Text } from '@adobe/react-spectrum';
import { convertDateDayMonthYear, viewsSumCalc } from '../../helpers';
import { DraftPreview, CreateModule, Avatar, ArticlePreview } from '../../components';
import { IoEye } from 'react-icons/io5';

const Profile: React.FC = () => {
    const { id } = useParams();
    const [doctitle, setDocTitle] = useDocTitle(id);
    const [list, setList] = useState('articles');

    const { data, isLoading } = useGetUserQuery(id);

    if (isLoading) return <></>;

    const user = data?.user;
    const articles = data?.articles;
    const liked = data?.liked;
    const drafts = data?.drafts;
    const isOwner = data?.isOwner;

    const avatar = user?.avatar;
    const username = user?.username;
    const articlesCount = articles?.length;
    const views = viewsSumCalc(articles);
    const city = user?.info.city;
    const country = user?.info.country;

    const articlesList = articles?.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const likedList = liked?.map((article: Article, id) => (
        <ArticlePreview article={article} key={id} />
    ));
    const draftsList = drafts?.map((draft: Draft, id) => <DraftPreview draft={draft} key={id} />);

    const likedBlock = () => {
        if (likedList?.length === 0 && !isOwner) return '';
        if ((likedList?.length === 0 && isOwner) || likedList?.length !== 0)
            return (
                <Button
                    onPress={() => setList('liked')}
                    variant={list === 'liked' ? 'primary' : 'secondary'}
                    style={list === 'liked' ? 'fill' : 'outline'}>
                    Оценки
                </Button>
            );
    };

    const date = convertDateDayMonthYear(user?.timestamp);
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <Avatar imageSrc={avatar} width={110} />
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
                            onPress={() => setList('articles')}
                            variant={list === 'articles' ? 'primary' : 'secondary'}
                            style={list === 'articles' ? 'fill' : 'outline'}>
                            Статьи
                        </Button>
                        {likedBlock()}{' '}
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
                                    onPress={() => setList('drafts')}
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
                    {list === 'liked' &&
                        (likedList?.length !== 0 ? (
                            <div className="liked__list">{likedList}</div>
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
