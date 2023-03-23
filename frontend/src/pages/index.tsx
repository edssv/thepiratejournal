import { ReactElement } from 'react';

import { NextPageWithLayout } from './_app';
import { Article, wrapper } from '@/store';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Layout from '@/components/Layout/Layout';
import { setSignout } from '@/store/slices/home-page';

interface HomeProps {
    articles: Article[];
}

const Home: NextPageWithLayout<HomeProps> = ({ articles }) => {
    // console.log(articles);

    return <HomeScreen />;
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/authorChoice`);
    const data = await req.json();
    store.dispatch(setSignout(data));

    return {
        props: {},
    };
});
