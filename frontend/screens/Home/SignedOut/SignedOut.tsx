import { AuthorChoice } from './components/AuthorChoice/AuthorChoice';
import { BestOfWeek } from './components/BestOfWeek/BestOfWeek';
import { FindMore } from './components/FindMore/FindMore';
import { HomeHeader } from './components/HomeHeader/HomeHeader';
import { NewestArticles } from './components/NewestArticles/NewestArticles';

const SignedOut = () => {
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
