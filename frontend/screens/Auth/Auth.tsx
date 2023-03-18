import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { CardLayout } from './components';
import { LoginPage } from './LoginPage';
import { Signup } from './SignupPage';

const Auth = () => {
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];
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
                <CardLayout>{page === 'login' ? <LoginPage /> : page === 'signup' ? <Signup /> : null}</CardLayout>
            </motion.div>
        </AnimatePresence>
    );
};

export default Auth;
