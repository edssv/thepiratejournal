import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import GoogleButton from '../../Buttons/GoogleButton/GoogleButton';
import EmailField from '../../Fields/EmailField';
import PasswordField from '../../Fields/PasswordField';

import styles from './FirstStep.module.scss';

const FirstStep: React.FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const { push } = useRouter();
  const {
    formState: { isDirty, isValid },
    getValues
  } = useFormContext();

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
      <form className={styles.emailForm}>
        <div className={styles.fields}>
          <EmailField />
          <PasswordField />
        </div>
        <section className={styles.submit}>
          <Button disabled={!isValid} variant='filled' onClick={() => setStep(2)}>
            Продолжить
          </Button>
        </section>
      </form>
    </div>
  );
};

export default FirstStep;
