import { ReactElement } from 'react';

import { NextPageWithLayout } from '../_app';
import Canvas from '@/screens/AuthScreen/components/Canvas/Canvas';
import AuthScreen from '@/screens/AuthScreen/AuthScreen';

const Page: NextPageWithLayout = () => {
    return <AuthScreen />;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Canvas>{page}</Canvas>;
};

export default Page;
