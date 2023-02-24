import { lazy } from 'react';

import { useAuth, useDocTitle } from '../../hooks';

import './Home.scss';
import styles from './Home.module.scss';

const SignedIn = lazy(() => import(/* webpackChunkName: "SignedInHome" */ './SignedIn/SignedIn'));
const SignedOut = lazy(() => import(/* webpackChunkName: "SignedOutHome" */ './SignedOut/SignedOut'));

export default function Home() {
    useDocTitle('');
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    return <div className={styles.root}>{user ? <SignedIn /> : <SignedOut />}</div>;
}
