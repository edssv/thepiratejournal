import { GoogleLogin } from '@react-oauth/google';
import { usePathname } from 'next/navigation';

import { useGoogleloginMutation } from '@/store';

const Login = () => {
    const token = localStorage.getItem('token');
    const [googleLogin] = useGoogleloginMutation();
    const pathname = usePathname();
    const currentLocation = pathname.split('/')[1];

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

export default Login;
