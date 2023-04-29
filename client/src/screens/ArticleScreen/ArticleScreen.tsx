import type { ArticleQuery, BlogQuery } from '@/gql/__generated__';
import type { ArticlePageMode } from '@/lib/enums';

import styles from './ArticleScreen.module.scss';
import { AuthorInfo } from './AuthorInfo/AuthorInfo';
import { BackTopButton } from './BackTopButton';
import Body from './Body/Body';
import CreatedAt from './CreatedAt/CreatedAt';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import { ShareButtons } from './ShareButtons/ShareButtons';
import { UpNext } from './UpNext/UpNext';

interface ArticleScreenProps {
  data: ArticleQuery['getArticle'] | BlogQuery['getOneBlog'];
  mode: ArticlePageMode;
}

const ArticleScreen: React.FC<ArticleScreenProps> = ({ data, mode }) => {
  const { id, title, description, cover, body, createdAt, user } = data;

  return (
    <>
      <article className={styles.root}>
        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <CreatedAt createdAt={createdAt} />
            <Header description={description} id={id} mode={mode} title={title} />
            <AuthorInfo id={user.id} image={user.image} username={user.username} />
            <div className={styles.shareButtonsWrap}>
              <ShareButtons articleId={String(id)} mode={mode} title={title} />
            </div>
            <Hero cover={cover} />
            <Body body={body} />
            <AuthorInfo id={user.id} image={user.image} username={user.username} />
          </div>
        </div>
      </article>
      <UpNext mode={mode} />
      <BackTopButton />
    </>
  );
};

export default ArticleScreen;
