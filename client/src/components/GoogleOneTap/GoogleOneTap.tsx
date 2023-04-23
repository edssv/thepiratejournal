import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useGoogleOneTapMutation } from '@/services/auth/auth.service';

const GoogleOneTap = () => {
  const { pathname } = useRouter();

  const { user } = useAuth();

  const [login] = useGoogleOneTapMutation();

  const currentLocation = pathname.split('/')[1];

  return (
    <div className="hidden">
      {!user && currentLocation !== getPublicUrl.login() && currentLocation !== getPublicUrl.signup() && (
        <GoogleLogin
          onSuccess={({ credential }) => {
            login(credential ?? '');
          }}
          useOneTap
          cancel_on_tap_outside={false}
        />
      )}
    </div>
  );
};

export default GoogleOneTap;
