import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';

import { useLoginMutation } from '@/gql/__generated__';
import { LoginData } from '@/store/user/user.interface';
import { useGoogleLoginMutation } from '@/services/auth/auth.service';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useNetworkStatus } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Button from '@/components/common/Button/Button';
import PasswordField from '../Fields/PasswordField/PasswordField';
import EmailField from '../Fields/EmailField/EmailField';
import { ErrorLabel } from '../Fields/Field/Field';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';

import styles from './LoginPage.module.scss';

const LoginScreen = () => {
  const { replace } = useRouter();

  const { isOnline } = useNetworkStatus();
  const { user, isLoading } = useTypedSelector((state) => state.user);

  const [login, { error }] = useLoginMutation();
  const [googleLogin, { error: googleLoginError }] = useGoogleLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: 'all',
  });

  const onSubmit = handleSubmit((formData: LoginData) => {
    try {
      login({ variables: { loginInput: formData } });
      user && replace(getPublicUrl.home());
    } catch (error) {}
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: ({ code }) => {
      try {
        googleLogin(code);
        user && replace(getPublicUrl.home());
      } catch (error) {}
    },
    onError: (error) => {},
    flow: 'auth-code',
    redirect_uri: 'postmessage',
  });

  return (
    <section className={styles.root}>
      <form onSubmit={onSubmit} className={styles.emailForm}>
        <section className={styles.emailField}>
          <p className={styles.instructions}>
            Новый пользователь? <Link href={getPublicUrl.signup()}>Создать учетную запись</Link>
          </p>
          <div className={styles.fields}>
            <EmailField register={register} errors={errors} strict={false} />
            <PasswordField register={register} errors={errors} strict={false} />
          </div>
          {error && <ErrorLabel style={{ marginTop: '8px' }}>{error.message}</ErrorLabel>}
        </section>
        <section className={styles.submit}>
          <Button isLoading={isLoading} disabled={!isOnline || isLoading} variant="filled" type="submit">
            Войти
          </Button>
        </section>
      </form>
      <div className={styles.socials__separator}>Или</div>
      <section className={styles.social__buttons}>
        <GoogleButton onClick={loginGoogle} />
      </section>
    </section>
  );
};

export default LoginScreen;
