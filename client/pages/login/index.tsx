import dynamic from 'next/dynamic';

import Meta from '@/components/meta/Meta';
import AuthScreen from '@/components/screens/AuthScreen/AuthScreen';
import LoginForm from '@/components/screens/AuthScreen/LoginForm/LoginForm';

import type { NextPageWithLayout } from '../_app';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet'), {
  ssr: false
});

const LoginPage: NextPageWithLayout = () => (
  <Meta noRobots title='Войти'>
    <LoginForm />
  </Meta>
);

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthOutlet>
      <AuthOutlet>
        <AuthScreen>{page}</AuthScreen>
      </AuthOutlet>
    </AuthOutlet>
  );
};

export default LoginPage;
