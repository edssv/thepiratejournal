import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { LoginData, SignupData } from '@/store/user/user.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ErrorLabel, Field, Input, Label } from '../Field/Field';
import { VisibilityToggle } from '../../VisibilityToggle/VisibilityToggle';

import styles from './PasswordField.module.scss';

interface PasswordFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<LoginData | SignupData>;
  strict?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ register, errors, strict = true }) => {
  const { isLoading } = useTypedSelector((state) => state.user);
  const [passwordEye, setPasswordEye] = useState(false);

  return (
    <Field>
      <Label>Пароль</Label>
      <div className={styles.content}>
        <Input
          register={{
            ...register(
              'password',
              strict
                ? {
                    required: 'Введите пароль.',
                    pattern: {
                      value: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
                      message:
                        'Должен содержать как строчные (a-z), так и прописные буквы (A-Z), хотя бы одну цифру (0-9) и символ.',
                    },
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов.',
                    },
                    maxLength: {
                      value: 32,
                      message: 'Максимум 32 символов.',
                    },
                  }
                : { required: 'Введите пароль.' }
            ),
          }}
          name="password"
          isError={Boolean(errors?.password)}
          disabled={isLoading}
          type={passwordEye ? 'text' : 'password'}
        />
        <VisibilityToggle
          style={{ right: errors?.password ? 20 : 0 }}
          passwordEye={passwordEye}
          setPasswordEye={setPasswordEye}
        />
      </div>
      {errors?.password && <ErrorLabel>{errors?.password?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default PasswordField;
