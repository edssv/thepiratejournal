import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { LoginData } from '@/store/user/user.interface';
import { useLoginMutation } from '@/services/auth/auth.service';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import Button from '@/components/common/Button/Button';
import { ErrorLabel } from '../Fields/Field/Field';
import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { replace } = useRouter();

  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: 'all',
  });

  const onSubmit = handleSubmit((formData: LoginData) => {
    login(formData)
      .unwrap()
      .then(() => replace(getPublicUrl.home()));
  });

  return (
    <div className={styles.root}>
      {' '}
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.content}>
          <p className={styles.instructions}>
            Новый пользователь? <Link href={getPublicUrl.signup()}>Создать учетную запись</Link>
          </p>
          <div className={styles.fields}>
            <EmailField disabled={isLoading} register={register} errors={errors} strict={false} />
            <PasswordField disabled={isLoading} register={register} errors={errors} strict={false} />
          </div>
          {error && <ErrorLabel style={{ marginTop: '8px' }}>Неверные данные для входа.</ErrorLabel>}
        </div>
        <div className={styles.submit}>
          <Button isLoading={isLoading} disabled={isLoading} variant="filled" type="submit">
            Войти
          </Button>
        </div>
      </form>
      <div className={styles.separator}>Или</div>
      <GoogleButton size="large" />
    </div>
  );
};

export default LoginForm;
