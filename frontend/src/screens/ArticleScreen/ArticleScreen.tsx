import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMediaPredicate } from 'react-media-hook';
import moment from 'moment';
import 'moment/locale/ru';
import '@fontsource/roboto-mono';

import {
    ActionButtons,
    AuthorInfo,
    CommentsBlock,
    toHtml,
    ScrollControls,
    UpNext,
    BackTopButton,
    ShareButtons,
} from './components';

import styles from './Article.module.scss';
import { ArticleService } from '@/services';

const Sidebar = dynamic(() => import('@/components/Tippy/Tippy'), { ssr: false });

const ArticleScreen: React.FC = () => {
    const { data } = useQuery({ queryKey: ['article'], queryFn: () => ArticleService.getOne() });
    const { pathname } = useRouter();
    const articleContentRef = useRef<HTMLDivElement>(null);
    const [isOpenSidebar, setOpenSidebar] = useState(false);
    const isBlog = Boolean(pathname.split('/')[1] === 'blog');

    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const createdOn = moment(data?.createdAt).format('L');

    return (
        <article className={styles.root}>
            <div className={styles.container}>
                <div className={`${styles.content} ${isOpenSidebar ? 'open-sidebar' : ''}`}>
                    <div className={styles.contentContainer}>
                        <div className={styles.articleDate}>{createdOn}</div>
                        <header className={styles.top}>
                            <div className={styles.topContent}>
                                <h1 className={styles.articleHeadline}>{data?.title}</h1>
                                <div className={styles.subHeader}>
                                    {/* <div className={styles.readingTime}>
                                        {article.readingTime
                                            ? `${getShowMinutesText(article.readingTime)} чтения`
                                            : 'время чтения не подсчитано'}
                                        {}{' '}
                                    </div> */}
                                    <p className={styles.description}>{data?.description}</p>
                                    {!isTablet && <ShareButtons />}
                                </div>
                            </div>
                        </header>
                        <AuthorInfo />
                        {isTablet && <ShareButtons />}
                        <div className={styles.hero}>
                            <figure>
                                <div className={styles.coverContainer}>
                                    <Image
                                        src={data?.cover ?? ''}
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }}
                                        priority
                                        className={styles.articleCover}
                                        alt="Обложка"
                                    />
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
                                <AuthorInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isBlog && <ScrollControls setOpenSidebar={setOpenSidebar} />}
            <div id="articleBottom" className={styles.bottom}>
                {!isBlog && <ActionButtons />}
                <UpNext />
            </div>
            {!isBlog && (
                <Sidebar isOpenSidebar={isOpenSidebar} setOpenSidebar={setOpenSidebar} title="Комментарии">
                    <CommentsBlock />
                </Sidebar>
            )}
            <BackTopButton />
        </article>
    );
};

export default ArticleScreen;
