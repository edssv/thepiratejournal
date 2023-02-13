import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useGetUserQuery, Article, Draft } from '../../redux';
import { useDocTitle } from '../../hooks';
import { convertDateDayMonthYear } from '../../helpers';
import { DraftPreview, CreateModule, Avatar, ArticlePreview, Overlay, ButtonFollow } from '../../components';
import { UploadAvatar } from './UploadAvatar';
import NotFoundPage from '../NotFound';

import styles from './Profile.module.scss';

const navListData = [
    { activeSection: 'articles', text: 'Статьи', icon: 'book' },
    { activeSection: 'appreciated', text: 'Оценки', icon: 'favorite' },
    { activeSection: 'bookmarks', text: 'Закладки', icon: 'bookmarks' },
    { activeSection: 'drafts', text: 'Черновики', icon: 'edit_document' },
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
    useDocTitle(username);
    const location = useLocation();
    const activeSection = location.pathname.split('/')[2] ?? ProfileSection.Articles;
    const [list, setList] = useState<ProfileSection>();
    const [content, setContent] = useState([]);
    const { data, isLoading, isError, refetch } = useGetUserQuery(
        { username, category: activeSection },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (
            activeSection ===
            (ProfileSection.Articles || ProfileSection.Appreciated || ProfileSection.Bookmarks || ProfileSection.Drafts)
        ) {
            setList(activeSection);
            setContent(data?.content || []);
        }
        console.log(activeSection);
    }, [activeSection]);

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const user = data?.user;
    const isOwner = data?.isOwner;

    const contentList = () => {
        if (activeSection === ProfileSection.Articles || ProfileSection.Appreciated || ProfileSection.Bookmarks) {
            return content.map((article: Article, id) => <ArticlePreview article={article} key={id} />);
        }

        if (activeSection === ProfileSection.Drafts) {
            return content?.map((draft: Draft, id) => <DraftPreview draft={draft} refetch={refetch} key={id} />);
        }
    };

    const navListItems = navListData.map((item, i) => (
        <li key={i}>
            <NavLink
                to={`/@${username}/${item.activeSection}`}
                className={({ isActive }) =>
                    [styles.navLink, isActive || activeSection === item.activeSection ? styles.active : '']
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
    console.log(contentList());
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
                    {list === 'articles' && (
                        <div className="articles__list">
                            {data?.content.length ? (
                                contentList()
                            ) : isOwner ? (
                                <CreateModule create />
                            ) : (
                                <h4>Пользователь не опубликовал ни одной статьи</h4>
                            )}
                        </div>
                    )}
                    {list === 'appreciated' &&
                        (data?.content.length ? (
                            <div className="appreciated__list">{contentList()}</div>
                        ) : isOwner ? (
                            <div className="articles__list">
                                <CreateModule find />
                            </div>
                        ) : (
                            <h4>Пользователь не оценил ни одной статьи</h4>
                        ))}
                    {list === 'bookmarks' &&
                        (data?.content.length ? (
                            <div className="appreciated__list">{contentList()}</div>
                        ) : (
                            isOwner && (
                                <div className="articles__list">
                                    <CreateModule find />
                                </div>
                            )
                        ))}
                    {list === 'drafts' && (
                        <div className="articles__list">
                            {contentList()}
                            <CreateModule draft />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profile;
