import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ArticlesBlock } from './components';

export enum HomeSection {
    ForYou = 'for_you',
    Following = 'following',
}

const SignedIn = () => {
    const location = useLocation();
    const sectionFromUrl = location.pathname.split('/')[1];

    return <ArticlesBlock />;
};

export default SignedIn;
