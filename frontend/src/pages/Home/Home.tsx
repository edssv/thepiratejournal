import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Article, useGetArticlesQuery } from '../../redux';
import { useDocTitle } from '../../hooks';
import { AiryArticlePreview, AiryArticleSkeleton, HomeSectionPrompt, TabPanel } from './';

import styles from './Home.module.scss';

export enum HomeSection {
    ForYou = 'for_you',
    Following = 'following',
}

export default function Home() {
    useDocTitle('');
    const location = useLocation();

    const sectionFromUrl = location.pathname.split('/')[1];
    const [activeSection, setActiveSection] = useState<HomeSection>(
        sectionFromUrl === (HomeSection.ForYou || HomeSection.Following) ? sectionFromUrl : HomeSection.ForYou
    );
    const { data, isLoading, isSuccess, isError } = useGetArticlesQuery({
        section: activeSection,
        queryParams: `limit=15&page=0`,
    });

    const articlesList = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;
        if (isError) return <h3>Здесь появятся статьи для тебя</h3>;
        if (isSuccess) {
            return data?.map((article: Article, id: number) => <AiryArticlePreview key={id} article={article} />);
        }
    };

    const articles = () => {
        if (activeSection === 'for_you') {
            return articlesList();
        }
        if (activeSection === 'following' && isSuccess && !data) {
            return (
                <HomeSectionPrompt
                    headline="Ты еще не подписан ни на одного автора."
                    text="Подписавшись на автора, ты увидишь все его проекты, которые автор делает доступными для подписчиков."
                />
            );
        } else return articlesList();
    };

    return (
        <div className={styles.root}>
            <TabPanel activeSection={activeSection} setActiveSection={setActiveSection}>
                {articles()}
            </TabPanel>
        </div>
    );
}
