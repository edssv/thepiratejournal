import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import { useGetUserQuery, Article, Draft } from '../../redux';
import { useDocTitle } from '../../hooks';
import { DraftPreview, CreateModule, Avatar, ArticlePreview, Overlay, ButtonFollow } from '../../components';
import { UploadAvatar } from './UploadAvatar';
import NotFoundPage from '../NotFound';

import styles from './Profile.module.scss';

const navListData = [
    { category: 'articles', text: 'Статьи', icon: 'book' },
    { category: 'appreciated', text: 'Оценки', icon: 'favorite' },
    { category: 'bookmarks', text: 'Закладки', icon: 'bookmarks' },
    { category: 'drafts', text: 'Черновики', icon: 'edit_document' },
];

export enum ProfileSection {
    Articles = 'articles',
    Appreciated = 'appreciated',
    Bookmarks = 'bookmarks',
    Drafts = 'drafts',
}

export type ProfileSectionType = 'articles' | 'appreciated' | 'bookmarks' | 'drafts';

const Profile: React.FC = () => {
    const { username } = useParams();
    useDocTitle(username ?? '');
    const location = useLocation();
    const currentSection = location.pathname.split('/')[2] || ProfileSection.Articles;
    const [content, setContent] = useState([]);
    const { data, isLoading, isError, refetch } = useGetUserQuery(
        { username, category: currentSection },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data?.content) {
            setContent(data?.content);
        }
    }, [data]);

    if (isLoading) return null;
    if (isError) return <NotFoundPage />;

    const user = data?.user;
    const isOwner = data?.isOwner;

    const contentList = () => {
        if (currentSection !== ProfileSection.Drafts) {
            return content?.map((article: Article, id) => <ArticlePreview article={article} key={id} />);
        }

        if (currentSection === ProfileSection.Drafts) {
            return content?.map((draft: Draft, id) => <DraftPreview draft={draft} refetch={refetch} key={id} />);
        }
    };

    const navListItems = navListData.map((item, i) => (
        <li key={i}>
            <NavLink
                to={`/@${username}/${item.category}`}
                className={({ isActive }) =>
                    [styles.navLink, isActive || currentSection === item.category ? styles.active : '']
                        .filter(Boolean)
                        .join(' ')
                }
            >
                <span className={styles.tabLabel}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.text}
                </span>
            </NavLink>
        </li>
    ));

    const date = moment(user?.timestamp).format('L');

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
                            <div className={styles.location}>
                                <span className="material-symbols-outlined">location_on</span>
                                {data?.user.info.city && data?.user.info.country
                                    ? `${data?.user.info.city},
                                ${data?.user.info.country}`
                                    : 'Пиратский корабль'}
                            </div>
                        </div>
                        {isOwner && <UploadAvatar />}
                        {!isOwner && (
                            <ButtonFollow username={username} hasSubscription={data?.viewer?.hasSubscription} />
                        )}
                    </div>
                    <span className={styles.signupDate}>Дата регистрации: {date}</span>
                </div>
                <section className={`${styles.articlesSection} articles`}>
                    <nav>
                        <ul className={styles.tabList}>
                            {isOwner ? navListItems : [navListItems[0], navListItems[1]]}
                        </ul>
                    </nav>
                    <div className={`${styles[currentSection]}`}>
                        {content.length ? (
                            contentList()
                        ) : isOwner ? (
                            <CreateModule
                                variant={
                                    currentSection === ProfileSection.Articles
                                        ? 'create'
                                        : currentSection === ProfileSection.Drafts
                                        ? 'draft'
                                        : 'find'
                                }
                            />
                        ) : (
                            <h4>
                                {currentSection === ProfileSection.Articles
                                    ? 'Пользователь не опубликовал ни одной статьи'
                                    : currentSection === ProfileSection.Appreciated &&
                                      'Пользователь не оценил ни одной статьи'}
                            </h4>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;
