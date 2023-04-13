import { useActions, useAuth } from '@/hooks';
import { getAccessToken } from '@/services/auth/auth.helper';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const GoogleOneTap = () => {
  const { pathname } = useRouter();

  const { user } = useAuth();

  const { googleOneTap } = useActions();

  const currentLocation = pathname.split('/')[1];

  return (
    <div className="hidden">
      {!user && currentLocation !== 'login' && currentLocation !== 'signup' && (
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
