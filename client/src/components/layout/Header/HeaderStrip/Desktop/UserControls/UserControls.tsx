import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useActions } from '@/hooks';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/common/Button/Button';

import styles from './UserControls.module.scss';

const UserControls = () => {
  const { push } = useRouter();

  const { user } = useAuth();

  const { logout } = useActions();

  const getContent = () => {
    if (user) {
      return (
        <>
          <Link href={getPublicUrl.profile(user.id)}>
            <Avatar imageSrc={user?.image} width={32} />
          </Link>
          <Button
            icon
            color="secondary"
            variant="text"
            onClick={() => {
              try {
                logout();
                push(getPublicUrl.login());
              } catch (error) {}
            }}
          >
            <span className="material-symbols-outlined">logout</span>
          </Button>
        </>
      );
    }

    return (
      <Button onClick={() => push(getPublicUrl.login())} icon variant="filledTonal" color="secondary">
        <span className="material-symbols-outlined">account_circle</span>Войти
      </Button>
    );
  };

  return <div className={styles.root}>{getContent()}</div>;
};

export default UserControls;
