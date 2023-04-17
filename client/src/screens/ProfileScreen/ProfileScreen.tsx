import { useRouter } from 'next/router';
import clsx from 'clsx';

import { UserQuery } from '@/gql/__generated__';
import { ProfileSection } from '@/lib/enums';
import { useAuth } from '@/hooks';
import UserBlock from './UserBlock/UserBlock';
import ContentBlock from './ContentBlock/ContentBlock';
import SectionList from './SectionList/SectionList';

import styles from './Profile.module.scss';

export type ProfileSectionType = 'articles' | 'likes' | 'bookmarks' | 'drafts';

const ProfileScreen: React.FC<{ data: UserQuery }> = ({ data }) => {
  const { asPath } = useRouter();
  const currentSection = asPath.split('/')[3] || ProfileSection.Articles;

  const { user } = useAuth();

  const isOwner = user?.id === data.getUser.id;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <UserBlock
          username={data.getUser.username}
          image={data.getUser.image ?? undefined}
          createdAt={data.getUser.createdAt}
        />
        <section className={clsx(styles.articlesSection, 'articles')}>
          <SectionList isOwner={isOwner} currentSection={currentSection} />
          <ContentBlock currentSection={currentSection} content={data?.getUserContent} isOwner={isOwner} />
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
