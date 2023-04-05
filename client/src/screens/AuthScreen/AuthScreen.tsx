import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthPage } from '@/lib/enums';
import CardLayout from './CardLayout/CardLayout';
import LoginScreen from './LoginScreen/LoginScreen';
import SignupScreen from './SignupScreen/SignupScreen';

const Auth = () => {
  const { pathname } = useRouter();
  const currentLocation = pathname.split('/')[1];

  const [page, setPage] = useState<AuthPage>(
    currentLocation === AuthPage.LOGIN || currentLocation === AuthPage.SIGNUP ? currentLocation : AuthPage.LOGIN
  );

  useEffect(() => {
    if (currentLocation === AuthPage.LOGIN || currentLocation === AuthPage.SIGNUP) {
      setPage(currentLocation);
    }
  }, [currentLocation]);

  return (
    <CardLayout>
      {page === AuthPage.LOGIN ? <LoginScreen /> : page === AuthPage.SIGNUP ? <SignupScreen /> : null}
    </CardLayout>
  );
};

export default Auth;
