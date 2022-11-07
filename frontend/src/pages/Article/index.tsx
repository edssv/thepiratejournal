import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toHtml } from './toHtml';
import { BtnLeftFixed } from '../../components/Buttons/BtnLeftFixed';
import { ButtonClose } from '../../components/Buttons/ButtonClose';
import { ButtonLike } from '../../components/Buttons/ButtonLike';
import { Block, useGetArticleQuery } from '../../redux';

import styles from './Article.module.scss';
import { convertDateLong } from './convertDate';
import { Avatar } from '../../components/Avatar';

const Article: React.FC = () => {
    const location = useLocation();
    const { id } = useParams();

    const { data, isLoading } = useGetArticleQuery(id);

    if (isLoading) {
        return <span>Загрузка...</span>;
    }

    const fromPage = location?.state?.from?.pathname;

    const article = data.article;
    const avatar = article.author.avatar;
    const title = article.blocks.find((block: Block) => block.type === 'header')?.data.text;
    const author = article.author.userName;
    const cover = article.cover;
    const timestamp = article.timestamp;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    const date = convertDateLong(timestamp);

    return (
        <div className={styles.root}>
            {fromPage && <BtnLeftFixed />}
            <div className="container-720">
                <div className={styles.top}>
                    <div className={styles.top__content}>
                        <Link to="/profile">
                            <Avatar imageSrc={avatar} />
                        </Link>
                        <div className={styles.content__text}>
                            <Link to="/profile">
                                <div className={styles.headline}>{author}</div>
                            </Link>
                            <div className={`${styles.date} tp-text`}>{date}</div>
                        </div>
                    </div>
                    {/* <ButtonLike /> */}
                </div>
                <ButtonClose location={fromPage} />
                <div className={styles.content}>
                    <div
                        dangerouslySetInnerHTML={{ __html: toHtml(data.article.blocks) }}
                        className={styles.content__blocks}></div>
                </div>
            </div>
        </div>
    );
};

export default Article;
