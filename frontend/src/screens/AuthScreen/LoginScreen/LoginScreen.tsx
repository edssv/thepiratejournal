import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useNetworkStatus } from '@/hooks';
import { AuthService, useGoogleloginMutation, useLoginMutation } from '@/store';
import Button from '@/components/Buttons/Button/Button';
import { ErrorLabel, Field, Input, Label } from '../components/Field';
import { VisibilityToggle } from '../components/VisibilityToggle/VisibilityToggle';
import GoogleButton from '../components/GoogleButton/GoogleButton';

import styles from './LoginPage.module.scss';
import { AxiosError } from 'axios';

type FormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const { isOnline } = useNetworkStatus();
    const [passwordEye, setPasswordEye] = useState(false);
    const { replace } = useRouter();

    const { mutate, isLoading, isError, error } = useMutation<{}, Error>({ mutationFn: AuthService.login });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>({
        mode: 'all',
    });

    const onSubmit = handleSubmit(async (formData: FormValues) => {
        mutate(formData);
        replace('/');
    });

    return (
        <section className={styles.root}>
            <form onSubmit={onSubmit} className={styles.emailForm}>
                <section className={styles.emailField}>
                    <p className={styles.instructions}>
                        Новый пользователь? <Link href="/signup">Создать учетную запись</Link>
                    </p>
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
                            {errors?.password && <ErrorLabel>{errors?.password?.message?.toString()}</ErrorLabel>}
                        </Field>
                    </div>
                    {isError && <ErrorLabel style={{ marginTop: '8px' }}>{error.message}</ErrorLabel>}
                </section>
                <section className={styles.submit}>
                    <Button isLoading={isLoading} disabled={!isOnline || isLoading} variant="filled" type="submit">
                        Войти
                    </Button>
                </section>
            </form>
            <div className={styles.socials__separator}>Или</div>
            <section className={styles.social__buttons}>
                <GoogleButton onClick={() => signIn('google')} />
                {/* <Link
             to="#"
             className={styles.social__button}
             style={{
                 backgroundColor: 'var(--spectrum-accent-background-color-default)',
                 color: '#ffffff',
                 border: 'none',
             }}
         >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                 <path
                     id="new_facebook_logo"
                     data-name="new facebook logo"
                     d="M16,8.049A8,8,0,1,0,6.75,16V10.376H4.719V8.049H6.75V6.276A2.832,2.832,0,0,1,9.772,3.144a12.235,12.235,0,0,1,1.791.157V5.282H10.554A1.16,1.16,0,0,0,9.25,6.54V8.049h2.219l-.355,2.327H9.25V16A8.036,8.036,0,0,0,16,8.049Z"
                     fill="#fff"
                 />
             </svg>{' '}
             <span>Продолжить с Facebook</span>
         </Link> */}
            </section>
        </section>
    );
};

export default LoginPage;
