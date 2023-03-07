import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useSignupMutation } from '../../../redux';
import { useDocTitle, useNetworkStatus } from '../../../hooks';
import { Button, CardLayout } from '../../../components';
import { ErrorLabel, Field, Input, Label, VisibilityToggle } from '../components';

import styles from './Signup.module.scss';

// type FormValues = {
//     username: string,
//     email: string,
//     password: string,
// };

export const Signup = () => {
    useDocTitle('Зарегистрироваться');
    const { isOnline } = useNetworkStatus();
    const navigate = useNavigate();
    const [signup, { isLoading, isError, error }] = useSignupMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = handleSubmit(async (formData) => {
        try {
            await signup(formData).unwrap();
            navigate('/');
        } catch (error) {}
    });
    const [passwordEye, setPasswordEye] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.instructions}>
                {/* <p style={{ fontWeight: 700 }}>Зарегистрируйтесь с помощью электронной почты</p> */}
                <p>
                    У вас уже есть учетная запись? <Link to="/login">Войти</Link>
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
                                        value: /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                                        message: 'Введите имя пользователя.',
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'Минимум 4 символа.',
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
                            disabled={isLoading}
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
                                            value: 20,
                                            message: 'Максимум 20 символов.',
                                        },
                                    }),
                                }}
                                isError={Boolean(errors?.password)}
                                disabled={isLoading}
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
                    {isError && <ErrorLabel>{error?.data.message}</ErrorLabel>}
                </div>
                <section className={styles.submit}>
                    <Button isLoading={isLoading} disabled={!isOnline || isLoading} type="submit" variant="filled">
                        Создать
                    </Button>
                </section>
            </form>
        </div>
    );
};
