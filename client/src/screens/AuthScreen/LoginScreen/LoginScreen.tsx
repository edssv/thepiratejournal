import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';

import { LoginData } from '@/store/user/user.interface';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useActions, useNetworkStatus } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Button from '@/components/common/Button/Button';
import PasswordField from '../Fields/PasswordField/PasswordField';
import EmailField from '../Fields/EmailField/EmailField';
import { ErrorLabel } from '../Fields/Field/Field';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import FacebookButton from '../Buttons/FacebookButton/FacebookButton';

import styles from './LoginPage.module.scss';

const LoginScreen = () => {
  const { replace } = useRouter();

  const { isOnline } = useNetworkStatus();
  const { user, isLoading, error } = useTypedSelector((state) => state.user);

  const { login, googleLogin } = useActions();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: 'all',
  });

  const onSubmit = handleSubmit((formData: LoginData) => {
    try {
      login(formData);
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
          {error && <ErrorLabel style={{ marginTop: '8px' }}>{error}</ErrorLabel>}
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
        {/* <FacebookButton /> */}
      </section>
    </section>
  );
};

export default LoginScreen;
