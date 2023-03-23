import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import CardLayout from './components/CardLayout/CardLayout';
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

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={page}
                initial={{ x: 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -12, opacity: 0 }}
                style={{ width: '100%' }}
                transition={{ duration: 0.2 }}
            >
                <CardLayout>
                    {page === 'login' ? <LoginScreen /> : page === 'signup' ? <SignupScreen /> : null}
                </CardLayout>
            </motion.div>
        </AnimatePresence>
    );
};

export default Auth;
