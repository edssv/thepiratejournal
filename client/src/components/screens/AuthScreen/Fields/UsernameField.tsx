import { useFormContext } from 'react-hook-form';

import { ErrorLabel, Field, Input, Label } from './Field/Field';

const UsernameField: React.FC<React.HTMLProps<HTMLInputElement>> = () => {
  const {
    formState: { errors },
    register
  } = useFormContext();

  return (
    <Field>
      <Label htmlFor='username'>Имя пользователя</Label>
      <Input
        isError={Boolean(errors?.username)}
        type='text'
        register={{
          ...register('username', {
            required: 'Введите имя пользователя.',
            pattern: {
              value: /^(?=.{3,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
              message: 'Введите имя пользователя.'
            },
            minLength: {
              value: 3,
              message: 'Минимум 3 символа.'
            },
            maxLength: {
              value: 16,
              message: 'Максимум 16 символов.'
            }
          })
        }}
      />
      {errors?.username && <ErrorLabel htmlFor='username'>{errors?.username?.message?.toString()}</ErrorLabel>}
    </Field>
  );
};

export default UsernameField;
