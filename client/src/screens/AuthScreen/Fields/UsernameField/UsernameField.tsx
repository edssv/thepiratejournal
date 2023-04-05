import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { SignupData } from '@/store/user/user.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ErrorLabel, Field, Input, Label } from '../Field/Field';

interface UsernameFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<SignupData>;
  strict?: boolean;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ register, errors }) => {
  const { isLoading } = useTypedSelector((state) => state.user);

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
        disabled={isLoading}
        type="text"
      />
      {errors?.username && <ErrorLabel htmlFor="username">{errors?.username?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default UsernameField;
