import Link from 'next/link';

import Avatar from '@/components/Avatar/Avatar';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './AuthorInfo.module.scss';

interface AuthorInfoProps {
  id: string;
  username: string;
  image: string | null | undefined;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ id, image, username }) => {
  const authorname = username || 'deleted';

  return (
    <div className={styles.root}>
      <Link href={getPublicUrl.profile(id)}>
        <Avatar imageSrc={image} width={44} />
      </Link>
      <Link href={getPublicUrl.profile(id)}>
        <div className={styles.authorName}>{authorname}</div>
      </Link>
      {/* <span className={styles.subscribersCount}>{getShowSubscribersText(user.followersCount ?? 0)}</span> */}
    </div>
  );
};
