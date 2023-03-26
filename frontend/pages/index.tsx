import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { Article } from '@/shared/interfaces/article.interface';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from './_app';
import { ArticleService } from '@/store';

interface HomeProps {
    articles: Article[];
}

const HomePage: NextPageWithLayout<HomeProps> = ({ articles }) => {
    return <HomeScreen articles={articles} />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const articles = await ArticleService.getAll();

    return {
        props: { articles },
    };
};

export default HomePage;
