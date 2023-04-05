import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { LoginData, SignupData } from '@/store/user/user.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ErrorLabel, Field, Input, Label } from '../Field/Field';

interface EmailFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<LoginData | SignupData>;
  strict?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ register, errors, strict = true }) => {
  const { isLoading } = useTypedSelector((state) => state.user);

  return (
    <Field>
      <Label>Адрес электронной почты</Label>
      <Input
        register={{
          ...register(
            'email',
            strict
              ? {
                  required: 'Введите адрес электронной почты.',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Введите email',
                  },
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов.',
                  },
                  maxLength: {
                    value: 32,
                    message: 'Максимум 32 символa.',
                  },
                }
              : {
                  required: 'Введите адрес электронной почты.',
                }
          ),
        }}
        name="email"
        isError={Boolean(errors?.email)}
        disabled={isLoading}
        type="email"
      />
      {errors?.email && <ErrorLabel>{errors?.email?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default EmailField;
