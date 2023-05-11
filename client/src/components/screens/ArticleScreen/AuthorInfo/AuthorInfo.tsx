import Avatar from '@/components/Avatar/Avatar';

import styles from './AuthorInfo.module.scss';

interface AuthorInfoProps {
  id: string;
  username: string;
  image: string | null | undefined;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ image, username }) => {
  const authorname = username || 'deleted';

  return (
    <div className={styles.root}>
      <Avatar imageSrc={image} width={44} />
      <div className={styles.authorName}>{authorname}</div>

      {/* <span className={styles.subscribersCount}>{getShowSubscribersText(user.followersCount ?? 0)}</span> */}
    </div>
  );
};
