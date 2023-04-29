import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/common/Button/Button';
import { useActions } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

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
            color='secondary'
            variant='text'
            onClick={() => {
              logout();
              push(getPublicUrl.login());
            }}
          >
            <span className='material-symbols-outlined'>logout</span>
          </Button>
        </>
      );
    }

    return (
      <Button icon color='secondary' variant='filledTonal' onClick={() => push(getPublicUrl.login())}>
        <span className='material-symbols-outlined'>account_circle</span>Войти
      </Button>
    );
  };

  return <div className={styles.root}>{getContent()}</div>;
};

export default UserControls;
