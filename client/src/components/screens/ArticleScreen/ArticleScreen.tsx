import type { ArticleQuery } from '@/gql/__generated__';

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
  data: ArticleQuery['getArticle'];
}

const ArticleScreen: React.FC<ArticleScreenProps> = ({ data }) => {
  const { body, cover, createdAt, description, id, title, user } = data;

  return (
    <>
      <article className={styles.root}>
        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <CreatedAt createdAt={createdAt} />
            <Header description={description} id={id} title={title} />
            <AuthorInfo id={user.id} image={user.image} username={user.username} />
            <div className={styles.shareButtonsWrap}>
              <ShareButtons articleId={String(id)} title={title} />
            </div>
            <Hero cover={cover} />
            <Body body={body} />
            <AuthorInfo id={user.id} image={user.image} username={user.username} />
          </div>
        </div>
      </article>
      <UpNext />
      <BackTopButton />
    </>
  );
};

export default ArticleScreen;
