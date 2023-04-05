import { AuthorChoice } from './AuthorChoice/AuthorChoice';
import { BestOfWeek } from './BestOfWeek/BestOfWeek';
import { FindMore } from './FindMore/FindMore';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { NewestArticles } from './NewestArticles/NewestArticles';

const SignedOut: React.FC = () => {
    return (
        <>
            <HomeHeader />
            <AuthorChoice />
            <BestOfWeek />
            <NewestArticles />
            <FindMore />
        </>
    );
};

export default SignedOut;
