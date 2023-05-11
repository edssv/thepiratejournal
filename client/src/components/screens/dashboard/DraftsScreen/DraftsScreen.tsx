import { useRouter } from 'next/router';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import Button from '@/components/common/Button/Button';
import type { UserDraftsQuery } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import DraftPreview from './DraftPreview/DraftPreview';
import styles from './DraftsScreen.module.scss';

const DashboardScreen: React.FC<{ data: UserDraftsQuery }> = ({ data }) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className='grid w-full flex-col'>
        {data.getUserDrafts.length ? (
          <ul className={styles.articleList}>
            {data.getUserDrafts.map((draft) => (
              <li key={draft.id} className={styles.listItem}>
                <DraftPreview cover={draft.cover} createdAt={draft.createdAt} id={draft.id} title={draft.title} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='article' />
            <EmptyPlaceholder.Title>Нет созданных статей</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              У тебя пока нет статей, начни создавать контент.
            </EmptyPlaceholder.Description>
            <Button variant='outlined' onClick={() => router.push(getPublicUrl.editor())}>
              Создать статью
            </Button>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
