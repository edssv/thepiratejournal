import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SignupData } from '@/store/user/user.interface';

import StepsIndicator from '../StepsIndicator/StepsIndicator';

import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import styles from './SignupForm.module.scss';

const SignupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<SignupData>({
    mode: 'onTouched'
  });

  return (
    <div className={styles.root}>
      <StepsIndicator step={step} />
      <h1 className='text-[32px] font-medium'>Создать аккаунт</h1>
      <FormProvider {...methods}>
        {' '}
        {step === 1 ? <FirstStep setStep={setStep} /> : step === 2 && <SecondStep />}
      </FormProvider>
    </div>
  );
};

export default SignupForm;
