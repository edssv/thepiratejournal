import { ArticlesBlock } from './ArticlesBlock/ArticlesBlock';

export enum HomeSection {
    ForYou = 'for_you',
    Following = 'following',
}

const SignedIn = () => {
    return <ArticlesBlock />;
};

export default SignedIn;
