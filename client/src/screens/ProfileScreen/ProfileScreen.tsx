import clsx from 'clsx';
import { useRouter } from 'next/router';

import type { UserQuery } from '@/gql/__generated__';
import { useAuth } from '@/hooks';
import { ProfileSection } from '@/lib/enums';

import ContentBlock from './ContentBlock/ContentBlock';
import styles from './Profile.module.scss';
import SectionList from './SectionList/SectionList';
import UserBlock from './UserBlock/UserBlock';

export type ProfileSectionType = 'articles' | 'likes' | 'bookmarks' | 'drafts';

const ProfileScreen: React.FC<{ data: UserQuery }> = ({ data }) => {
  const { asPath } = useRouter();
  const currentSection = asPath.split('/')[4] || ProfileSection.Articles;

  const { user } = useAuth();

  const isOwner = user?.id === +data.getUser.id;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <UserBlock
          createdAt={data.getUser.createdAt}
          image={data.getUser.image ?? undefined}
          username={data.getUser.username}
        />
        <section className={clsx(styles.articlesSection, 'articles')}>
          <SectionList currentSection={currentSection} isOwner={isOwner} />
          <ContentBlock content={data?.getUserContent} currentSection={currentSection} isOwner={isOwner} />
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
