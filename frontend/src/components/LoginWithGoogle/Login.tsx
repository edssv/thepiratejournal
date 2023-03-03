import { GoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';

import { useGoogleloginMutation } from '../../redux';

export const Login = () => {
    const token = localStorage.getItem('token');
    const [googleLogin] = useGoogleloginMutation();
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];

    return (
        <div className="hidden">
            {!token && currentLocation !== 'login' && currentLocation !== 'signup' && (
                <GoogleLogin
                    onSuccess={async ({ credential }) => {
                        await googleLogin({ credential: credential ?? '' });
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                    cancel_on_tap_outside={false}
                />
            )}
        </div>
    );
};
