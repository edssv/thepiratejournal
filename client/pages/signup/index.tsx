import dynamic from 'next/dynamic';

import { NextPageWithLayout } from '../_app';
import { AuthPage } from '@/lib/enums';
import Meta from '@/components/meta/Meta';
import AuthScreen from '@/screens/AuthScreen/AuthScreen';
import SignupForm from '@/screens/AuthScreen/SignupForm/SignupForm';

const AuthOutlet = dynamic(() => import('@/components/outlets/AuthOutlet/AuthOutlet'), { ssr: false });

const Page: NextPageWithLayout = () => {
  return (
    <Meta noRobots>
      <AuthScreen page={AuthPage.SIGNUP}>
        <SignupForm />
      </AuthScreen>
    </Meta>
  );
};

export default Page;
