import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import { useNetworkStatus, useDocTitle } from '../../hooks';
import { useGoogleloginMutation, useLoginMutation } from '../../redux';
import { Canvas, CardLayout, ErrorLabel, Field, GoogleButton, Input, Label, VisibilityToggle } from './components';

import styles from './LoginPage.module.scss';

type FormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    useDocTitle('Войти');
    const navigate = useNavigate();
    const location = useLocation();
    const { isOnline } = useNetworkStatus();
    const [login, { isLoading, isError }] = useLoginMutation();
    const [googleLogin] = useGoogleloginMutation();
    const [passwordEye, setPasswordEye] = useState(false);
    const fromPage = location.state?.from?.pathname;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>({
        mode: 'all',
    });

    const onSubmit = handleSubmit(async (formData: FormValues) => {
        try {
            await login(formData).unwrap();
            navigate(fromPage ?? '/');
        } catch (error) {}
    });

    const loginGoogle = useGoogleLogin({
        onSuccess: async ({ code }) => {
            try {
                await googleLogin({ code });
                navigate(fromPage ?? '/');
            } catch (error) {}
        },
        onError: (error) => {
            console.log('Login Failed', error);
        },
        flow: 'auth-code',
        redirect_uri: 'postmessage',
    });

    return (
        <Canvas>
            {' '}
            <CardLayout>
                <section className={styles.root}>
                    <form onSubmit={onSubmit} className={styles.emailForm}>
                        <section className={styles.emailField}>
                            <div className={styles.fields}>
                                <Field>
                                    <Label>Адрес электронной почты</Label>
                                    <Input
                                        register={{
                                            ...register('email', {
                                                required: 'Введите адрес электронной почты.',
                                            }),
                                        }}
                                        name="email"
                                        isError={Boolean(errors?.email)}
                                        disabled={isLoading}
                                        type="email"
                                    />
                                    {errors?.email && <ErrorLabel>{errors?.email?.message?.toString()}</ErrorLabel>}
                                </Field>
                                <Field>
                                    <Label>Пароль</Label>
                                    <div className={styles.passwordField}>
                                        <Input
                                            register={{
                                                ...register('password', {
                                                    required: 'Введите пароль.',
                                                }),
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
                                    {errors?.password && (
                                        <ErrorLabel>{errors?.password?.message?.toString()}</ErrorLabel>
                                    )}
                                </Field>
                            </div>
                            {isError && (
                                <ErrorLabel style={{ marginTop: '8px' }}>
                                    Неверный адрес электронной почты или пароль.
                                </ErrorLabel>
                            )}
                        </section>
                        <section className={styles.submit}>
                            <Button
                                isLoading={isLoading}
                                disabled={!isOnline || isLoading}
                                variant="filled"
                                type="submit"
                            >
                                Войти
                            </Button>
                        </section>
                    </form>
                    <div className={styles.socials__separator}>Или</div>
                    <section className={styles.social__buttons}>
                        <GoogleButton onClick={() => loginGoogle()} />
                    </section>
                </section>
            </CardLayout>
        </Canvas>
    );
};

export default LoginPage;
