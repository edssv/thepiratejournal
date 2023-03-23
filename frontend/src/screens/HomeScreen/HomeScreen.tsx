import { lazy } from 'react';

import { useAuth, useDocTitle } from '@/hooks';

import './Home.module.scss';
import styles from './Home.module.scss';

const SignedIn = lazy(() => import(/* webpackChunkName: "SignedInHome" */ './SignedIn/SignedIn'));
const SignedOut = lazy(() => import(/* webpackChunkName: "SignedOutHome" */ './SignedOut/SignedOut'));

export default function Home() {
    return <div className={styles.root}>{<SignedOut />}</div>;
}
