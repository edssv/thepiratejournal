import { useRouter } from 'next/router';

import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { UserAccountNav } from '@/components/UserAccountNav/UserAccountNav';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './BlogHeader.module.scss';
import Brand from './Brand/Brand';
import ThemeButton from './ThemeButton/ThemeButton';

const BlogHeader = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.leftPart}>
          <Brand />
        </div>
        <div className={styles.rightPart}>
          <ClientOnly>
            <ThemeButton />
            {user ? (
              <UserAccountNav className='ml-5' />
            ) : (
              <Button icon className='ml-2' color='secondary' onClick={() => push(getPublicUrl.login())}>
                <span className='material-symbols-outlined'>account_circle</span>
              </Button>
            )}
          </ClientOnly>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
