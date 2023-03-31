import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { useGetUser } from '@/services';
import { profileNavData } from '@/lib/profileNavData';
import { ProfileSection } from '@/lib/enums';
import { Article } from '@/interfaces/article.interface';
import Avatar from '@/components/Avatar/Avatar';
import ButtonFollow from '@/components/Buttons/ButtonFollow';
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview';
import DraftPreview from '@/components/DraftPreview/DraftPreview';
import CreateModule from './CreateModule/CreateModule';
import { UploadAvatar } from './UploadAvatar/UploadAvatar';
import NotFoundPage from '../NotFoundScreen/NotFoundScreen';

import styles from './Profile.module.scss';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

export type ProfileSectionType = 'articles' | 'likes' | 'bookmarks' | 'drafts';

const ProfileScreen: React.FC = () => {
    const { asPath } = useRouter();
    const currentSection = asPath.split('/')[3] || ProfileSection.Articles;
    const [content, setContent] = useState<Article[]>([]);
    const { data, isLoading, isError } = useGetUser(asPath.split('/')[2] as string, currentSection);

    useEffect(() => {
        if (data?.content) {
            setContent(data.content);
        }
    }, [data?.content]);

    if (isLoading) return null;
    if (isError) return <NotFoundPage />;

    const isOwner = true;

    const contentList = () => {
        if (currentSection !== ProfileSection.Drafts) {
            return content?.map((article: Article) => <ArticlePreview article={article} key={article.id} />);
        }

        if (currentSection === ProfileSection.Drafts) {
            return content.map((draft: Partial<Article>) => <DraftPreview draft={draft} key={draft.id} />);
        }
    };

    const navListItems = profileNavData.map((item, i) => (
        <li key={i} className={styles.tabItem}>
            <Link
                href={getPublicUrl.profileWithCategory(asPath.split('/')[2], item.category)}
                className={clsx(currentSection === item.category && styles.active)}
            >
                <span className={styles.tabLabel}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.text}
                </span>
            </Link>
        </li>
    ));

    const date = moment(data?.createdAt).format('L');

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <Avatar imageSrc={data.image} width={110} />
                    <div className={styles.top__wrapper}>
                        <div className={styles.top__info}>
                            <h3 className={styles.info__headline}>{data.username}</h3>
                            <div className={styles.info__counters}>
                                Подписчики: <span>{data.followersCount}</span>
                            </div>
                            <div className={styles.location}>Пиратский корабль</div>
                        </div>
                        {/* {isOwner && <UploadAvatar />} */}
                        {/* {!isOwner && (
                            <ButtonFollow username={data.username} hasSubscription={data?.viewer?.hasSubscription} />
                        )} */}
                    </div>
                    <span className={styles.signupDate}>Дата регистрации: {date}</span>
                </div>
                <section className={clsx(styles.articlesSection, 'articles')}>
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
                                    : currentSection === ProfileSection.Likes &&
                                      'Пользователь не оценил ни одной статьи'}
                            </h4>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfileScreen;
