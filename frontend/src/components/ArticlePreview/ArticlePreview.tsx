import { Article } from '@/services/article.service';
import { ArticleStats } from './components/ArticleStats';

import styles from './ArticlePreview.module.scss';
import Link from 'next/link';

interface ArticlePreviewProps {
    article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Link href={`/articles/${article.author._id}`}>
                    <div className={styles.top__img} style={{ backgroundImage: `url(${article.cover})` }}></div>
                </Link>
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    <Link
                        href={`/articles/${article.author._id}`}
                        dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
                        className={styles.headline}
                    ></Link>
                    <Link href={`/@${article.author}`} className={`${styles.author} tp-text`}>
                        {article.author.username}
                    </Link>
                </div>
                <ArticleStats likesCount={article.likesCount} viewsCount={article.viewsCount} />
            </div>
        </div>
    );
};

export default ArticlePreview;
