import { HomeSignedOutQuery } from '@/gql/__generated__';
import { AuthorChoice } from './AuthorChoice/AuthorChoice';
import { BestOfWeek } from './BestOfWeek/BestOfWeek';
import { FindMore } from './FindMore/FindMore';
import { HomeHeader } from './HomeHeader/HomeHeader';
import { NewestArticles } from './NewestArticles/NewestArticles';

const SignedOut: React.FC<{ data: HomeSignedOutQuery }> = ({ data }) => {
  return (
    <>
      <HomeHeader />
      <AuthorChoice data={data.getAuthorChoiceArticles} />
      <BestOfWeek data={data.getBestOfWeekArticles} />
      <NewestArticles data={data.getNewestArticles} />
      <FindMore />
    </>
  );
};

export default SignedOut;
