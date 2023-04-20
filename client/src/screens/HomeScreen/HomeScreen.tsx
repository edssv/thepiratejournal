import { HomeSignedOutQuery } from '@/gql/__generated__';
import SignedOut from './SignedOut/SignedOut';

import './Home.module.scss';
import styles from './Home.module.scss';

const HomeScreen: React.FC<{ data: HomeSignedOutQuery }> = ({ data }) => {
  return (
    <div className={styles.root}>
      <SignedOut data={data} />
    </div>
  );
};

export default HomeScreen;
