import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { useGetUser } from '@/services';
import { ProfileSection } from '@/lib/enums';
import { Article } from '@/interfaces/article.interface';
import { useAuth } from '@/hooks';
import NotFoundPage from '../NotFoundScreen/NotFoundScreen';
import UserBlock from './UserBlock/UserBlock';
import ContentBlock from './ContentBlock/ContentBlock';
import SectionList from './SectionList/SectionList';

import styles from './Profile.module.scss';

export type ProfileSectionType = 'articles' | 'likes' | 'bookmarks' | 'drafts';

const ProfileScreen: React.FC = () => {
  const { asPath } = useRouter();
  const currentSection = asPath.split('/')[3] || ProfileSection.Articles;

  const { user } = useAuth();
  const [content, setContent] = useState<Article[]>([]);

  const { data, isLoading, isError } = useGetUser(asPath.split('/')[2] as string, currentSection);

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data?.content]);

  if (isLoading) return null;
  if (isError) return <NotFoundPage />;

  const isOwner = user?.id === data.id;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <UserBlock data={data} />
        <section className={clsx(styles.articlesSection, 'articles')}>
          <SectionList isOwner={isOwner} currentSection={currentSection} />
          <ContentBlock currentSection={currentSection} content={content} isOwner={isOwner} />
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
