import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import { useSignupMutation } from '@/gql/__generated__';
import { useActions } from '@/hooks/useActions';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { saveToStorage } from '@/services/auth/auth.helper';
import type { SignupData } from '@/store/user/user.interface';

import { ErrorLabel } from '../../Fields/Field/Field';
import UsernameField from '../../Fields/UsernameField';

import styles from './SecondStep.module.scss';

const SecondStep: React.FC = () => {
  const { replace } = useRouter();
  const {
    formState: { isValid },
    handleSubmit
  } = useFormContext<SignupData>();

  const { setUser } = useActions();
  const [signup, { error, loading }] = useSignupMutation();

  const onSubmit = handleSubmit((formData: SignupData) => {
    signup({
      variables: { signupInput: formData },
      onCompleted: ({ signup }) => {
        setUser(signup.user);
        saveToStorage(signup);
        replace(getPublicUrl.home());
      }
    });
  });

  return (
    <div className={styles.root}>
      <div className={styles.instructions}>
        <p>
          Уже есть учетная запись? <Link href={getPublicUrl.login()}>Войти</Link>
        </p>
      </div>
      <form className={styles.emailForm} onSubmit={onSubmit}>
        <div className={styles.fields}>
          <UsernameField />
          {error && <ErrorLabel>{error.message}</ErrorLabel>}
        </div>
        <div className={styles.info}>
          <p>
            Нажимая Создать, я соглашаюсь с тем, что прочитал и принял <br />{' '}
            <Link href={getPublicUrl.terms()} target='_blank'>
              Условия использования
            </Link>{' '}
            и{' '}
            <Link href={getPublicUrl.privacy()} target='_blank'>
              Политику конфиденциальности
            </Link>
            .
          </p>
        </div>
        <section className={styles.submit}>
          <Button disabled={loading || !isValid} isLoading={loading} type='submit' variant='filled'>
            Создать
          </Button>
        </section>
      </form>
    </div>
  );
};

export default SecondStep;
