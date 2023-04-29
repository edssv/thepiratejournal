import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import type { SignupData } from '@/store/user/user.interface';

import GoogleButton from '../../Buttons/GoogleButton/GoogleButton';
import EmailField from '../../Fields/EmailField';
import PasswordField from '../../Fields/PasswordField';

import styles from './FirstStep.module.scss';

interface FirstStepProps {
  errors: FieldErrors<SignupData>;
  register: UseFormRegister<any>;
  setFormState: React.Dispatch<React.SetStateAction<SignupData | undefined>>;
  handleSubmit: UseFormHandleSubmit<SignupData>;
}

const FirstStep: React.FC<FirstStepProps> = ({ errors, register, setFormState, handleSubmit }) => {
  const { push } = useRouter();

  const saveData = (data: any) => {
    setFormState(data);
    push(getPublicUrl.signupStepSecond());
  };

  return (
    <div className={styles.root}>
      <div className={styles.socialButtons}>
        <GoogleButton size='small' />
      </div>
      <div className={styles.separator}>Или</div>
      <div className={styles.instructions}>
        <p className={styles.withEmail}>С помощью электронной почты</p>
        <p>
          Уже есть учетная запись? <Link href={getPublicUrl.login()}>Войти</Link>
        </p>
      </div>
      <form className={styles.emailForm} onSubmit={handleSubmit(saveData)}>
        <div className={styles.fields}>
          <EmailField errors={errors} register={register} />
          <PasswordField errors={errors} register={register} />
        </div>
        <section className={styles.submit}>
          <Button disabled={Boolean(errors.email) || Boolean(errors.password)} type='submit' variant='filled'>
            Продолжить
          </Button>
        </section>
      </form>
    </div>
  );
};

export default FirstStep;
