import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useLoginMutation } from '@/services/auth/auth.service';
import type { LoginData } from '@/store/user/user.interface';

import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import EmailField from '../Fields/EmailField';
import { ErrorLabel } from '../Fields/Field/Field';
import PasswordField from '../Fields/PasswordField';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { replace } = useRouter();

  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginData>({
    mode: 'all'
  });

  const onSubmit = handleSubmit((formData: LoginData) => {
    login(formData)
      .unwrap()
      .then(() => replace(getPublicUrl.home()))
      .catch(() => {});
  });

  return (
    <div className={styles.root}>
      {' '}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.content}>
          <p className={styles.instructions}>
            Новый пользователь? <Link href={getPublicUrl.signup()}>Создать учетную запись</Link>
          </p>
          <div className={styles.fields}>
            <EmailField disabled={isLoading} errors={errors} register={register} strict={false} />
            <PasswordField
              disabled={isLoading}
              errors={errors}
              register={register}
              strict={false}
            />
          </div>
          {error && (
            <ErrorLabel style={{ marginTop: '8px' }}>Неверные данные для входа.</ErrorLabel>
          )}
        </div>
        <div className={styles.submit}>
          <Button disabled={isLoading} isLoading={isLoading} type='submit' variant='filled'>
            Войти
          </Button>
        </div>
      </form>
      <div className={styles.separator}>Или</div>
      <GoogleButton size='large' />
    </div>
  );
};

export default LoginForm;
