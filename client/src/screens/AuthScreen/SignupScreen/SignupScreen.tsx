import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSignupMutation } from '@/gql/__generated__';
import { useNetworkStatus } from '@/hooks';
import { SignupData } from '@/store/user/user.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import Button from '@/components/common/Button/Button';
import PasswordField from '../Fields/PasswordField/PasswordField';
import EmailField from '../Fields/EmailField/EmailField';
import UsernameField from '../Fields/UsernameField/UsernameField';
import { ErrorLabel } from '../Fields/Field/Field';

import styles from './Signup.module.scss';

const SignupScreen = () => {
  const { replace } = useRouter();

  const { isOnline } = useNetworkStatus();
  const { user } = useTypedSelector((state) => state.user);

  const [signup, { loading, error }] = useSignupMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupData>({
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (formData: SignupData) => {
    try {
      signup({ variables: { signupInput: formData } });
      user && replace(getPublicUrl.home());
    } catch (error) {}
  });

  return (
    <div className={styles.root}>
      <div className={styles.instructions}>
        <p style={{ fontWeight: 700 }}>Зарегистрируйтесь с помощью электронной почты</p>
        <p>
          У вас уже есть учетная запись? <Link href={getPublicUrl.login()}>Войти</Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className={styles.emailForm}>
        <div className={styles.fields}>
          <UsernameField register={register} errors={errors} />
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          {error && <ErrorLabel>{error.message}</ErrorLabel>}
        </div>
        <section className={styles.submit}>
          <Button isLoading={loading} disabled={!isOnline || loading} type="submit" variant="filled">
            Создать
          </Button>
        </section>
      </form>
    </div>
  );
};

export default SignupScreen;
