import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { ArticleService, BlogService } from '@/services';
import { ArticlePageMode } from '@/lib/enums';
import NotFoundPage from 'pages/404';
import CreatedAt from './CreatedAt/CreatedAt';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Body from './Body/Body';
import { AuthorInfo } from './AuthorInfo/AuthorInfo';
import { BackTopButton } from './BackTopButton';
import { ShareButtons } from './ShareButtons/ShareButtons';
import { UpNext } from './UpNext/UpNext';

import styles from './ArticleScreen.module.scss';

const ArticleScreen: React.FC<{ mode: ArticlePageMode }> = ({ mode }) => {
  const { query } = useRouter();

  const { data, isLoading, isError } = useQuery(
    [`get ${mode === ArticlePageMode.ARTICLE ? 'article' : 'blog'} ${query.id}`],
    () =>
      mode === ArticlePageMode.ARTICLE ? ArticleService.getOne(String(query.id)) : BlogService.getOne(String(query.id))
  );

  if (isLoading) return null;
  if (isError) return <NotFoundPage />;

  return (
    <>
      <article className={styles.root}>
        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <CreatedAt createdAt={data.createdAt} />
            <Header data={data} mode={mode} />
            <AuthorInfo user={data.user} />
            <div className={styles.shareButtonsWrap}>
              <ShareButtons mode={mode} title={data.title} articleId={String(data.id)} />
            </div>
            <Hero data={data} />
            <Body body={data.body} />
            <AuthorInfo user={data.user} />
          </div>
        </div>
      </article>
      <UpNext mode={mode} />
      <BackTopButton />
    </>
  );
};

export default ArticleScreen;
