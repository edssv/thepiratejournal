import { useActions } from '@/hooks';
import { getAccessToken } from '@/services/auth/auth.helper';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const GoogleOneTap = () => {
    const accessToken = getAccessToken();
    const { googleOneTap } = useActions();
    const { pathname } = useRouter();
    const currentLocation = pathname.split('/')[1];

    return (
        <div className="hidden">
            {!accessToken && currentLocation !== 'login' && currentLocation !== 'signup' && (
                <GoogleLogin
                    onSuccess={({ credential }) => {
                        googleOneTap(credential ?? '');
                    }}
                    useOneTap
                    cancel_on_tap_outside={false}
                />
            )}
        </div>
    );
};

export default GoogleOneTap;
