import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { SignupData } from '@/store/user/user.interface';

import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import styles from './SignupForm.module.scss';

const SignupForm: React.FC<{ step: number }> = ({ step }) => {
  const [formState, setFormState] = useState<SignupData>();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignupData>({
    defaultValues: formState,
    mode: 'onTouched'
  });

  return (
    <div className={styles.root}>
      {step === 1 ? (
        <FirstStep
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          setFormState={setFormState}
        />
      ) : (
        step === 2 && (
          <SecondStep
            errors={errors}
            formState={formState}
            handleSubmit={handleSubmit}
            register={register}
          />
        )
      )}
    </div>
  );
};

export default SignupForm;
