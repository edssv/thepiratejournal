import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { SignupData } from '@/store/user/user.interface';
import { ErrorLabel, Field, Input, Label } from './Field/Field';

interface UsernameFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<SignupData>;
  strict?: boolean;
}

const UsernameField: React.FC<UsernameFieldProps & React.HTMLProps<HTMLInputElement>> = ({ register, errors }) => {
  return (
    <Field>
      <Label htmlFor="username">Имя пользователя</Label>
      <Input
        register={{
          ...register('username', {
            required: 'Введите имя пользователя.',
            pattern: {
              value: /^(?=.{3,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
              message: 'Введите имя пользователя.',
            },
            minLength: {
              value: 3,
              message: 'Минимум 3 символа.',
            },
            maxLength: {
              value: 16,
              message: 'Максимум 16 символов.',
            },
          }),
        }}
        isError={Boolean(errors?.username)}
        type="text"
      />
      {errors?.username && <ErrorLabel htmlFor="username">{errors?.username?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default UsernameField;
