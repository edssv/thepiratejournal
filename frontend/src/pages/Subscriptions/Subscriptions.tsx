import React from 'react';

import { useAuth } from '../../hooks';
import { SignOut } from './components/SignOut';

import styles from './Subscriptions.module.scss';

const Subscriptions: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <h3>Раздел в разработке.</h3>;

    return <SignOut />;
};
export default Subscriptions;
