import dynamic from 'next/dynamic';

import Meta from '@/components/meta/Meta';
import { AuthPage } from '@/lib/enums';
import AuthScreen from '@/screens/AuthScreen/AuthScreen';
import LoginForm from '@/screens/AuthScreen/LoginForm/LoginForm';

import type { NextPageWithLayout } from '../_app';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet/AuthOutlet'), {
  ssr: false
});

const Page: NextPageWithLayout = () => (
  <Meta noRobots title='Войти'>
    <AuthOutlet>
      <AuthScreen page={AuthPage.LOGIN}>
        <LoginForm />
      </AuthScreen>
    </AuthOutlet>
  </Meta>
);

export default Page;
