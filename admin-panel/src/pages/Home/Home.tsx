import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

import { Article, useGetArticlesQuery } from '../../redux';
import { ArticlePreview, Overlay } from '../../components';

import styles from './Home.module.scss';

export type SectionHome = 'new' | 'removed';

const Home = () => {
    const location = useLocation();
    const currentSectionFromUrl = location.pathname.split('/')[1];
    console.log(currentSectionFromUrl);
    const [currentSection, setCurrentSection] = useState<SectionHome>(
        currentSectionFromUrl === ('new' || 'removed') ? currentSectionFromUrl : 'new'
    );
    const [articles, setArticles] = useState<Article[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadNext, setLoadNext] = useState(false);
    const { data, isLoading, isFetching } = useGetArticlesQuery({
        limit: 40,
        page: currentPage,
        category: currentSection,
    });
    console.log(currentSection);

    useEffect(() => {
        if (currentSectionFromUrl === ('new' || 'removed')) {
            setCurrentSection(currentSectionFromUrl);
        }

        setArticles([]);
        setCurrentPage(0);
        // console.log(currentSection);
    }, [currentSectionFromUrl]);

    useEffect(() => {
        if (data?.articles) {
            setArticles((prevState) => [...prevState, ...data.articles]);
        }

        if (data?.totalCount) {
            setTotalCount(data.totalCount);
        }

        setLoadNext(true);
    }, [data]);

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.screen.height;

        if (scrollHeight - (scrollTop + windowHeight) <= 0 && articles.length < totalCount && loadNext) {
            setCurrentPage((prevState) => prevState + 1);
            setLoadNext(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (isLoading) return <Overlay />;

    const articlesList = articles.map((article: Article) => <ArticlePreview key={article._id} article={article} />);

    return (
        <div className={`${styles.root} ${isFetching ? styles.isLoadingContent : ''}`}>
            <section className={styles.tabPanel}>
                <div className={styles.container}>
                    <div className={styles.tabs}>
                        <NavLink to="/new" className={styles.tab}>
                            Новые
                        </NavLink>
                        <NavLink to="/removed" className={styles.tab}>
                            Удаленные
                        </NavLink>
                    </div>
                </div>
            </section>
            <section className={styles.articlesList}>{articlesList}</section>
            {(isLoading || isFetching) && (
                <div className={styles.loader}>
                    <MoonLoader size={36} />
                </div>
            )}
        </div>
    );
};

export default Home;
