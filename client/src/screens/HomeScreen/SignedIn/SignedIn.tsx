import { ArticlesBlock } from './ArticlesBlock/ArticlesBlock';

export enum HomeSection {
  ForYou = 'for_you',
  Following = 'following'
}

const SignedIn = () => <ArticlesBlock />;

export default SignedIn;
