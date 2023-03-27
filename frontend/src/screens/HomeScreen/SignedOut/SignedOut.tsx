import { Article } from '@/interfaces/article.interface';
import { AuthorChoice } from './components/AuthorChoice/AuthorChoice';
import { BestOfWeek } from './components/BestOfWeek/BestOfWeek';
import { FindMore } from './components/FindMore/FindMore';
import { HomeHeader } from './components/HomeHeader/HomeHeader';
import { NewestArticles } from './components/NewestArticles/NewestArticles';

interface SignedOutProps {
    articles: Article[];
}

const SignedOut: React.FC<SignedOutProps> = ({ articles }) => {
    return (
        <>
            <HomeHeader />
            <AuthorChoice articles={articles} />
            <BestOfWeek />
            <NewestArticles />
            <FindMore />
        </>
    );
};

export default SignedOut;
