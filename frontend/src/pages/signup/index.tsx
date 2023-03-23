import { ReactElement } from 'react';

import { NextPageWithLayout } from '../_app';
import Canvas from '@/screens/AuthScreen/components/Canvas/Canvas';
import Auth from '@/screens/AuthScreen/AuthScreen';

const Page: NextPageWithLayout = () => {
    return <Auth />;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Canvas>{page}</Canvas>;
};

export default Page;
