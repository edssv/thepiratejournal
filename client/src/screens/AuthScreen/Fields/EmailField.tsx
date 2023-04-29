import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { LoginData, SignupData } from '@/store/user/user.interface';

import { ErrorLabel, Field, Input, Label } from './Field/Field';

interface EmailFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<LoginData | SignupData>;
  strict?: boolean;
}

const EmailField: React.FC<EmailFieldProps & React.HTMLProps<HTMLInputElement>> = ({
  register,
  errors,
  strict = true
}) => (
  <Field>
    <Label>Адрес электронной почты</Label>
    <Input
      autoComplete='email'
      isError={Boolean(errors?.email)}
      name='email'
      type='email'
      register={{
        ...register(
          'email',
          strict
            ? {
                required: 'Введите адрес электронной почты.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Введите email'
                },
                minLength: {
                  value: 5,
                  message: 'Минимум 5 символов.'
                },
                maxLength: {
                  value: 32,
                  message: 'Максимум 32 символa.'
                }
              }
            : {
                required: 'Введите адрес электронной почты.'
              }
        )
      }}
    />
    {errors?.email && <ErrorLabel>{errors?.email?.message?.toString()}</ErrorLabel>}
  </Field>
);

export default EmailField;
