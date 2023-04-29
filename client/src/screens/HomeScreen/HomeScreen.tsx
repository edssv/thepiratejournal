import type { HomeSignedOutQuery } from '@/gql/__generated__';

import styles from './Home.module.scss';
import SignedOut from './SignedOut/SignedOut';

const HomeScreen: React.FC<{ data: HomeSignedOutQuery }> = ({ data }) => (
  <div className={styles.root}>
    <SignedOut data={data} />
  </div>
);

export default HomeScreen;
