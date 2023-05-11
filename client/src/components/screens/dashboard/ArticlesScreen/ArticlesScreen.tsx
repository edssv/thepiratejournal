import { useRouter } from 'next/router';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import Button from '@/components/common/Button/Button';
import type { UserArticlesQuery } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import ArticlePreview from './ArticlePreview/ArticlePreview';
import styles from './ArticleScreen.module.scss';

const ArticlesScreen: React.FC<{ data: UserArticlesQuery }> = ({ data }) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className='grid w-full flex-col'>
        {data.getUserArticles.length ? (
          <ul className={styles.articleList}>
            {data.getUserArticles.map((article) => (
              <li key={article.id} className={styles.listItem}>
                <ArticlePreview
                  cover={article.cover}
                  createdAt={article.createdAt}
                  id={article.id}
                  title={article.title}
                  viewsCount={article.viewsCount}
                />
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

export default ArticlesScreen;
