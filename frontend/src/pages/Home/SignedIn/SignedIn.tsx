import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ArticlesBlock, TabPanel } from './components';

export enum HomeSection {
    ForYou = 'for_you',
    Following = 'following',
}

const SignedIn = () => {
    const location = useLocation();
    const sectionFromUrl = location.pathname.split('/')[1];
    const [activeSection, setActiveSection] = useState<HomeSection>(
        sectionFromUrl === (HomeSection.ForYou || HomeSection.Following) ? sectionFromUrl : HomeSection.ForYou
    );
    return (
        <>
            <TabPanel activeSection={activeSection} setActiveSection={setActiveSection} />
            <ArticlesBlock activeSection={activeSection} />
        </>
    );
};

export default SignedIn;
