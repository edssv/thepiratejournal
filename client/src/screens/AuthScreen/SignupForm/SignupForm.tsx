import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useSignupMutation } from '@/gql/__generated__';
import { useActions } from '@/hooks';
import { SignupData } from '@/store/user/user.interface';
import { saveToStorage } from '@/services/auth/auth.helper';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import PasswordField from '../Fields/PasswordField';
import EmailField from '../Fields/EmailField';
import UsernameField from '../Fields/UsernameField';
import { ErrorLabel } from '../Fields/Field/Field';

import styles from './SignupForm.module.scss';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';

const SignupForm = () => {
  const { replace } = useRouter();

  const { setUser } = useActions();
  const [signup, { loading, error, data }] = useSignupMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupData>({
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((formData: SignupData) => {
    signup({
      variables: { signupInput: formData },
      onCompleted: ({ signup }) => {
        setUser(signup.user), saveToStorage(signup);
        replace(getPublicUrl.home());
      },
    });
  });

  return (
    <div className={styles.root}>
      <div className={styles.socialButtons}>
        <GoogleButton size="small" />
      </div>
      <div className={styles.separator}>Или</div>
      <div className={styles.instructions}>
        <p className={styles.withEmail}>С помощью электронной почты</p>
        <p>
          Уже есть учетная запись? <Link href={getPublicUrl.login()}>Войти</Link>
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
          <Button isLoading={loading} disabled={loading} type="submit" variant="filled">
            Создать
          </Button>
        </section>
      </form>
    </div>
  );
};

export default SignupForm;
