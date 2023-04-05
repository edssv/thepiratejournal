import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import CardLayout from './CardLayout/CardLayout';
import LoginScreen from './LoginScreen/LoginScreen';
import SignupScreen from './SignupScreen/SignupScreen';

const Auth = () => {
  const { pathname } = useRouter();
  const currentLocation = pathname.split('/')[1];
  const [page, setPage] = useState<'login' | 'signup'>(
    currentLocation === 'login' || currentLocation === 'signup' ? currentLocation : 'login'
  );

  useEffect(() => {
    if (currentLocation === 'login' || currentLocation === 'signup') {
      setPage(currentLocation);
    }
  }, [currentLocation]);

  return <CardLayout>{page === 'login' ? <LoginScreen /> : page === 'signup' ? <SignupScreen /> : null}</CardLayout>;
};

export default Auth;
