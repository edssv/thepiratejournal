import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VisibilityToggle } from '../VisibilityToggle/VisibilityToggle';

import { ErrorLabel, Field, Input, Label } from './Field/Field';

interface PasswordFieldProps {
  strict?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps & React.HTMLProps<HTMLInputElement>> = ({ strict = true }) => {
  const {
    formState: { errors },
    register
  } = useFormContext();
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
