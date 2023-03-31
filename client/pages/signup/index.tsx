import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '../_app';
import Canvas from '@/screens/AuthScreen/Canvas/Canvas';
import Auth from '@/screens/AuthScreen/AuthScreen';
import Meta from '@/components/meta/Meta';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet/AuthOutlet'), { ssr: false });

const Page: NextPageWithLayout = () => {
    return (
        <Meta noRobots>
            <Auth />
        </Meta>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthOutlet>
            <Canvas>{page}</Canvas>
        </AuthOutlet>
    );
};

export default Page;
