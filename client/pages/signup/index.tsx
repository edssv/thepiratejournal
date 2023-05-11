import dynamic from 'next/dynamic';

import Meta from '@/components/meta/Meta';
import AuthScreen from '@/components/screens/AuthScreen/AuthScreen';
import SignupForm from '@/components/screens/AuthScreen/SignupForm/SignupForm';

import type { NextPageWithLayout } from '../_app';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet'), {
  ssr: false
});

const SignupPage: NextPageWithLayout = () => (
  <Meta noRobots title='Регистрация'>
    <SignupForm />
  </Meta>
);

SignupPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthOutlet>
      <AuthScreen>{page}</AuthScreen>
    </AuthOutlet>
  );
};

export default SignupPage;
