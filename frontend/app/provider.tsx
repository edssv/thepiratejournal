import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import { store, wrapper } from '@/redux';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { Login } from '@/components/Login';

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
                {children}
                <Login />
            </GoogleOAuthProvider>
        </>
    );
};

export default wrapper.withRedux(RootProvider);
