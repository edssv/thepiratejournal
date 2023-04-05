import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { Blog } from '@/interfaces/blog.interface';
import { robotoMono } from '@/components/fonts/roboto-mono';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    data: Blog | null;
    featured?: boolean;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ data, featured = false }) => {
    const TitleTag = featured ? 'h1' : 'h2';
    const createdAt = moment(data?.createdAt).format('DD.MM.YY');

    return (
        <div className={clsx(styles.root, featured && styles.featured)}>
            <Link href={`blog/${data?.id}`}>
                <div className={styles.article}>
                    <div className={styles.articleContent}>
                        <TitleTag className={styles.title}>{data?.title}</TitleTag>
                        <div className={styles.subcontent}>
                            <div
                                className={clsx(
                                    styles.date,
                                    robotoMono.style.fontFamily,
                                    robotoMono.className,
                                    robotoMono.variable,
                                    robotoMono.style.fontWeight
                                )}
                            >
                                {createdAt}
                            </div>
                            <div className={styles.description}>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.articleImage}>
                        <img src={data?.cover} alt="Обложка" />
                    </div>
                </div>
            </Link>
        </div>
    );
};
