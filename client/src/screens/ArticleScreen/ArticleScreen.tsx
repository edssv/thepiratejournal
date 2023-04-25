import { ArticleQuery, BlogQuery } from '@/gql/__generated__';
import { ArticlePageMode } from '@/lib/enums';

import CreatedAt from './CreatedAt/CreatedAt';
import ViewsCounter from './ViewsCounter/ViewsCounter';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Body from './Body/Body';
import { AuthorInfo } from './AuthorInfo/AuthorInfo';
import { BackTopButton } from './BackTopButton';
import { ShareButtons } from './ShareButtons/ShareButtons';
import { UpNext } from './UpNext/UpNext';

import styles from './ArticleScreen.module.scss';

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
            <Header id={id} title={title} description={description} mode={mode} />
            <AuthorInfo id={user.id} username={user.username} image={user.image} />
            <div className={styles.shareButtonsWrap}>
              <ShareButtons mode={mode} title={title} articleId={String(id)} />
            </div>
            <Hero cover={cover} />
            <Body body={body} />
            <AuthorInfo id={user.id} username={user.username} image={user.image} />
          </div>
        </div>
      </article>
      <UpNext mode={mode} />
      <BackTopButton />
    </>
  );
};

export default ArticleScreen;
