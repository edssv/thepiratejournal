import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '../_app';
import { AuthPage } from '@/lib/enums';
import AuthScreen from '@/screens/AuthScreen/AuthScreen';
import Meta from '@/components/meta/Meta';
import LoginForm from '@/screens/AuthScreen/LoginForm/LoginForm';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet/AuthOutlet'), { ssr: false });

const Page: NextPageWithLayout = () => {
  return (
    <Meta noRobots>
      <AuthOutlet>
        <AuthScreen page={AuthPage.LOGIN}>
          <LoginForm />
        </AuthScreen>
      </AuthOutlet>
    </Meta>
  );
};

export default Page;
