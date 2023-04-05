import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { ArticleService, BlogService } from '@/services';
import { toHtml } from '@/helpers/toHtml';
import { robotoMono } from '@/components/fonts/roboto-mono';
import NotFoundPage from 'pages/404';
import { AuthorInfo } from './AuthorInfo/AuthorInfo';
import { BackTopButton } from './BackTopButton';
import { ShareButtons } from './ShareButtons/ShareButtons';
import { UpNext } from './UpNext/UpNext';

import styles from './Article.module.scss';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

interface ArticleScreenProps {
  mode: 'default' | 'blog';
}

const ArticleScreen: React.FC<ArticleScreenProps> = ({ mode }) => {
  const { query } = useRouter();
  const { data, isLoading, isError } = useQuery([mode === 'default' ? 'article' : 'blog', query.id], () =>
    mode === 'default' ? ArticleService.getOne(query.id as string) : BlogService.getOne(query.id as string)
  );
  const articleContentRef = useRef<HTMLDivElement>(null);
  const [isOpenSidebar, setOpenSidebar] = useState(false);

  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  const createdOn = moment(data?.createdAt).format('L');

  if (isLoading) return null;
  if (isError) return <NotFoundPage />;

  return (
    <article className={styles.root}>
      <div className={styles.container}>
        <div className={clsx(styles.content, isOpenSidebar && 'open-sidebar')}>
          <div className={styles.contentContainer}>
            <div className={clsx(styles.articleDate, robotoMono.className)}>{createdOn}</div>
            <header className={styles.top}>
              <div className={styles.topContent}>
                <h1 className={styles.articleHeadline}>{data?.title}</h1>
                <div className={styles.subHeader}>
                  <p className={styles.description}>{data?.description}</p>
                  {/* {!isTablet && <ShareButtons />} */}
                </div>
              </div>
            </header>
            {data?.user && <AuthorInfo user={data.user} />}
            {isTablet && <ShareButtons />}
            <div className={styles.hero}>
              <figure>
                <div className={styles.coverContainer}>
                  <img src={data?.cover ?? ''} className={styles.articleCover} alt="Обложка" />
                </div>
              </figure>
            </div>
            <div className={styles.contentWrapper}>
              <div ref={articleContentRef} className={styles.articleContent}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: toHtml(data?.body),
                  }}
                  className={styles.contentBlocks}
                />
                {data?.user && <AuthorInfo user={data.user} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {mode === 'default' && <ScrollControls setOpenSidebar={setOpenSidebar} />} */}
      <div id="articleBottom" className={styles.bottom}>
        {/* {mode === 'default' && <ActionButtons />} */}
        <UpNext />
      </div>
      {/* {mode === 'default' && (
                <Sidebar isOpenSidebar={isOpenSidebar} setOpenSidebar={setOpenSidebar} title="Комментарии">
                    <CommentsBlock />
                </Sidebar>
            )} */}
      <BackTopButton />
    </article>
  );
};

export default ArticleScreen;
