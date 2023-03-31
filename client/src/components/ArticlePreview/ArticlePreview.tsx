import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { Article } from '@/interfaces/article.interface';
import ArticleStats from './ArticleStats/ArticleStats';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Link href={getPublicUrl.article(article.id)}>
                    <div className={styles.image} style={{ backgroundImage: `url(${article.cover})` }} />
                </Link>
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    <Link
                        href={getPublicUrl.article(article.id)}
                        dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
                        className={styles.headline}
                    />
                    <Link href={getPublicUrl.profile(article.user.id)} className={clsx(styles.author, 'tp-text')}>
                        {article.user.username}
                    </Link>
                </div>
                <ArticleStats likesCount={article.likesCount} viewsCount={article.viewsCount} />
            </div>
        </div>
    );
};

export default ArticlePreview;
