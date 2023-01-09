import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Article, useGetArticlesQuery } from '../../redux';
import { useDocTitle } from '../../hooks/useDocTitle';
import { ArticlePreview, ArticleSkeleton } from '../../components';
import { ArticlePreview as Ap } from '../../components/ArticlePreview copy';
import { HomeSectionPrompt } from './HomeSectionPrompt';
import { TabPanel } from './TabPanel';

import styles from './Home.module.scss';

const Home = () => {
    useDocTitle('');
    const location = useLocation();

    const sectionFromUrl = location.pathname.split('/')[1];
    const [activeSection, setActiveSection] = useState(sectionFromUrl ? sectionFromUrl : 'for_you');
    const { data, isLoading, isSuccess, isError } = useGetArticlesQuery({
        section: activeSection,
    });

    const articlesList = isLoading ? (
        <ArticleSkeleton counts={12} />
    ) : isError ? (
        <h3>Здесь появятся статьи для тебя</h3>
    ) : (
        isSuccess && data?.map((article: Article, id: number) => <Ap key={id} article={article} />)
    );

    const articles =
        activeSection === 'for_you' ? (
            articlesList
        ) : activeSection === 'following' && !data && isSuccess ? (
            <HomeSectionPrompt
                headline="Ты еще не подписан ни на одного автора."
                text="Подписавшись на автора, ты увидишь все его проекты, которые автор делает доступными для подписчиков."
            />
        ) : (
            articlesList
        );
    return (
        <div className={styles.root}>
            <TabPanel activeSection={activeSection} setActiveSection={setActiveSection}>
                {articles}
            </TabPanel>
        </div>
    );
};

export default Home;
