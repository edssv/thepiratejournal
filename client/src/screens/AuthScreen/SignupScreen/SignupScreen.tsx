import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { SignupData } from '@/store/user/user.interface';
import { useActions, useNetworkStatus } from '@/hooks';
import Button from '@/components/common/Button/Button';
import { ErrorLabel, Field, Input, Label } from '../Field/Field';
import { VisibilityToggle } from '../VisibilityToggle/VisibilityToggle';

import styles from './Signup.module.scss';

const SignupScreen = () => {
    const { isOnline } = useNetworkStatus();
    const { replace } = useRouter();
    const { signup } = useActions();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignupData>({
        mode: 'onTouched',
    });

    const onSubmit = handleSubmit(async (formData: SignupData) => {
        try {
            signup(formData);
            replace('/');
        } catch (error) {}
    });
    const [passwordEye, setPasswordEye] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.instructions}>
                {/* <p style={{ fontWeight: 700 }}>Зарегистрируйтесь с помощью электронной почты</p> */}
                <p>
                    У вас уже есть учетная запись? <Link href="/login">Войти</Link>
                </p>
            </div>
            <form onSubmit={onSubmit} className={styles.emailForm}>
                <div className={styles.fields}>
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
                            // disabled={isLoading}
                            type="text"
                        />
                        {errors?.username && (
                            <ErrorLabel htmlFor="username">{errors?.username?.message?.toString()}</ErrorLabel>
                        )}
                    </Field>
                    <Field>
                        <Label htmlFor="email">Адрес электронной почты</Label>
                        <Input
                            register={{
                                ...register('email', {
                                    required: 'Введите адрес электронной почты.',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                                }),
                            }}
                            isError={Boolean(errors?.email)}
                            // disabled={isLoading}
                            type="email"
                        />
                        {errors?.email && <ErrorLabel htmlFor="email">{errors?.email?.message}</ErrorLabel>}
                    </Field>
                    <Field>
                        <Label htmlFor="password">Пароль</Label>
                        <div className={styles.passwordField}>
                            <Input
                                register={{
                                    ...register('password', {
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
                                    }),
                                }}
                                isError={Boolean(errors?.password)}
                                // disabled={isLoading}
                                type="password"
                            />
                            <VisibilityToggle
                                style={{ right: errors?.password ? 20 : 0 }}
                                passwordEye={passwordEye}
                                setPasswordEye={setPasswordEye}
                            />
                        </div>
                        {errors?.email && <ErrorLabel htmlFor="password">{errors?.password?.message}</ErrorLabel>}
                    </Field>
                    {/* {isError && <ErrorLabel>Не получилось ...</ErrorLabel>} */}
                </div>
                <section className={styles.submit}>
                    <Button type="submit" variant="filled">
                        Создать
                    </Button>
                </section>
            </form>
        </div>
    );
};

export default SignupScreen;
