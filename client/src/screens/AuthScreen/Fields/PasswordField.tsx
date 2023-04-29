import { useState } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { LoginData, SignupData } from '@/store/user/user.interface';

import { VisibilityToggle } from '../VisibilityToggle/VisibilityToggle';

import { ErrorLabel, Field, Input, Label } from './Field/Field';

interface PasswordFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<LoginData | SignupData>;
  strict?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps & React.HTMLProps<HTMLInputElement>> = ({
  register,
  errors,
  strict = true
}) => {
  const [passwordEye, setPasswordEye] = useState(false);

  return (
    <Field>
      <Label>Пароль</Label>
      <div style={{ position: 'relative' }}>
        <Input
          isError={Boolean(errors?.password)}
          name='password'
          type={passwordEye ? 'text' : 'password'}
          register={{
            ...register(
              'password',
              strict
                ? {
                    required: 'Введите пароль.',
                    pattern: {
                      value: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
                      message:
                        'Должен содержать как строчные (a-z), так и прописные буквы (A-Z), хотя бы одну цифру (0-9) и символ.'
                    },
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов.'
                    },
                    maxLength: {
                      value: 32,
                      message: 'Максимум 32 символов.'
                    }
                  }
                : { required: 'Введите пароль.' }
            )
          }}
        />
        <VisibilityToggle
          passwordEye={passwordEye}
          setPasswordEye={setPasswordEye}
          style={{ right: errors?.password ? 20 : 0 }}
        />
      </div>
      {errors?.password && <ErrorLabel>{errors?.password?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default PasswordField;
