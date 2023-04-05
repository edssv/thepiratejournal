import Link from 'next/link';

import { User } from '@/interfaces/user.interface';
import { getShowSubscribersText } from '@/helpers';
import Avatar from '@/components/Avatar/Avatar';

import styles from './AuthorInfo.module.scss';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface AuthorInfoProps {
    user: User;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ user }) => {
    const authorname = user?.username || 'deleted';

    return (
        <div className={styles.root}>
            <Link href={getPublicUrl.profile(user.id)}>
                <Avatar imageSrc={user?.image} width={44} />
            </Link>
            <Link href={getPublicUrl.profile(user.id)}>
                <div className={styles.authorName}>{authorname}</div>
            </Link>
            <span className={styles.subscribersCount}>{getShowSubscribersText(user.followersCount ?? 0)}</span>
        </div>
    );
};
