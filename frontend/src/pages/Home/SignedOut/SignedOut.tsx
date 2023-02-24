import { NewestArticles, AuthorChoice, BestOfWeek, HomeHeader, FindMore } from './components';

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
