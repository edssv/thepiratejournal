import dynamic from 'next/dynamic';

import Meta from '@/components/meta/Meta';
import { AuthPage } from '@/lib/enums';
import AuthScreen from '@/screens/AuthScreen/AuthScreen';
import SignupForm from '@/screens/AuthScreen/SignupForm/SignupForm';

import type { NextPageWithLayout } from '../../_app';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet/AuthOutlet'), {
  ssr: false
});

const Page: NextPageWithLayout = () => (
  <Meta noRobots title='Регистрация'>
    <SignupForm step={2} />
  </Meta>
);

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthOutlet>
      <AuthScreen page={AuthPage.SIGNUP} step={2}>
        {page}
      </AuthScreen>
    </AuthOutlet>
  );
};

export default Page;
