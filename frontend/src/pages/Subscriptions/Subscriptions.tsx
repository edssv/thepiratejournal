import React from 'react';

import { useAuth } from '../../hooks';
import { Component } from './Component';
import { SignOut } from './components/SignOut';

import styles from './Subscriptions.module.scss';

const Subscriptions: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <Component />;

    return <SignOut />;
};
export default Subscriptions;
