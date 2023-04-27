import clsx from 'clsx';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

import { useGoogleLoginMutation } from '@/services/auth/auth.service';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './GoogleButton.module.scss';

interface GoogleButtonProps {
  size: 'small' | 'large';
}

const GoogleButton: React.FC<GoogleButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  size,
  ...props
}) => {
  const { replace } = useRouter();

  const [googleLogin] = useGoogleLoginMutation();

  const loginGoogle = useGoogleLogin({
    onSuccess: ({ code }) => {
      try {
        googleLogin(code)
          .unwrap()
          .then(() => replace(getPublicUrl.home()));
      } catch (error) {}
    },
    flow: 'auth-code',
    redirect_uri: 'postmessage',
  });

  return (
    <button onClick={loginGoogle} className={clsx(styles.root, styles[size])} {...props}>
      <svg viewBox="0 0 1152 1152" focusable="false" aria-hidden="true" role="img" data-social-button-type="icon">
        <path
          d="M1055.994 594.42a559.973 559.973 0 0 0-8.86-99.684h-458.99V683.25h262.28c-11.298 60.918-45.633 112.532-97.248 147.089v122.279h157.501c92.152-84.842 145.317-209.78 145.317-358.198z"
          fill="#4285f4"
        ></path>
        <path
          d="M588.144 1070.688c131.583 0 241.9-43.64 322.533-118.07l-157.5-122.28c-43.64 29.241-99.463 46.52-165.033 46.52-126.931 0-234.368-85.728-272.691-200.919H152.636v126.267c80.19 159.273 245 268.482 435.508 268.482z"
          fill="#34a853"
        ></path>
        <path
          d="M315.453 675.94a288.113 288.113 0 0 1 0-185.191V364.482H152.636a487.96 487.96 0 0 0 0 437.724z"
          fill="#fbbc05"
        ></path>
        <path
          d="M588.144 289.83c71.551 0 135.792 24.589 186.298 72.88l139.78-139.779C829.821 144.291 719.504 96 588.143 96c-190.507 0-355.318 109.21-435.508 268.482L315.453 490.75c38.323-115.19 145.76-200.919 272.691-200.919z"
          fill="#ea4335"
        ></path>
      </svg>
      {size === 'large' && <span>Продолжить с Google</span>}
    </button>
  );
};

export default GoogleButton;
