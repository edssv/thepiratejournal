import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useGoogleOneTapMutation } from '@/services/auth/auth.service';

const GoogleOneTap = () => {
  const { pathname } = useRouter();

  const { user } = useAuth();

  const [login] = useGoogleOneTapMutation();

  const currentLocation = pathname.split('/')[1];

  return (
    <div className='full-hidden'>
      {!user && currentLocation !== getPublicUrl.login() && currentLocation !== getPublicUrl.signup() && (
        <GoogleLogin
          useOneTap
          cancel_on_tap_outside={false}
          onSuccess={({ credential }) => {
            login(credential ?? '');
          }}
        />
      )}
    </div>
  );
};

export default GoogleOneTap;
