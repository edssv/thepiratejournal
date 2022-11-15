import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VisibilityToggle } from '../../components/Buttons/VisibilityToggle';
import Canvas from '../../components/Canvas';
import CardLayout from '../../components/CardLayout';
import { useLoginMutation } from '../../redux/services/auth';

import styles from './EmailPage.module.scss';
import { BsFacebook } from 'react-icons/bs';
import { Toaster } from '../../components/Toaster';
import { useAuth } from '../../hooks/useAuth';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { Button, ProgressCircle } from '@adobe/react-spectrum';
import { useDocTitle } from '../../hooks/useDocTitle';

const EmailPage = () => {
    const [doctitle, setDocTitle] = useDocTitle('Войти');
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const { isOnline } = useNetworkStatus();

    const fromPage = location.state?.from?.pathname || '/';

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });
    const [login, { isError, isLoading }] = useLoginMutation();

    const onSubmit = async (formData) => {
        try {
            await login(formData).unwrap();
            navigate(fromPage);
        } catch (error) {
            console.log(error);
        }
    };

    const [passwordEye, setPasswordEye] = useState(false);

    return (
        <Canvas>
            <CardLayout headline="Войти" toaster={isOnline ? false : true}>
                <section className={styles.root}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.emailForm}>
                        <section className={styles.emailField}>
                            <p className={styles.instructions}>
                                Новый пользователь? <Link to="/signup">Создать учетную запись</Link>
                            </p>
                            <div className={styles.fields}>
                                <div className={styles.field}>
                                    <label className="field-label">Адрес электронной почты</label>
                                    <input
                                        {...register('email', {
                                            required: 'Введите адрес электронной почты.',
                                        })}
                                        className={`text-field  ${
                                            errors?.password && `is-invalid`
                                        }`}
                                    />
                                    {errors?.email && (
                                        <label className="field-label error-label">
                                            {errors?.email?.message}
                                        </label>
                                    )}
                                </div>
                                <div className={styles.field}>
                                    <label className="field-label">Пароль</label>
                                    <div className={styles.password__field}>
                                        <input
                                            {...register('password', {
                                                required: 'Введите пароль.',
                                            })}
                                            className={`text-field  ${
                                                errors?.password && `is-invalid`
                                            }`}
                                            type={passwordEye === true ? 'text' : 'password'}
                                        />

                                        <VisibilityToggle
                                            style={errors?.password ? { right: 20 } : { right: 0 }}
                                            passwordEye={passwordEye}
                                            setPasswordEye={setPasswordEye}
                                        />
                                    </div>{' '}
                                    {errors?.password && (
                                        <label className="field-label error-label">
                                            {errors?.password?.message}
                                        </label>
                                    )}
                                </div>
                            </div>
                            {isError && (
                                <label
                                    className="field-label error-label "
                                    style={{ marginTop: '8px' }}>
                                    Неверный адрес электронной почты или пароль.
                                </label>
                            )}
                        </section>
                        <section className={styles.submit}>
                            {isLoading ? (
                                <Button isDisabled={true} variant="cta">
                                    <ProgressCircle
                                        size="S"
                                        isIndeterminate
                                        marginEnd={6}
                                        variant="overBackground"
                                        aria-label="Loading…"
                                    />
                                    Войти
                                </Button>
                            ) : (
                                <Button
                                    isDisabled={isOnline ? false : true}
                                    type="submit"
                                    variant="cta">
                                    Войти
                                </Button>
                            )}
                        </section>
                    </form>
                    <div className={styles.socials__separator}>Или</div>
                    <section className={styles.social__buttons}>
                        <Link to="#" className={styles.social__button}>
                            <svg
                                viewBox="0 0 1152 1152"
                                focusable="false"
                                aria-hidden="true"
                                role="img"
                                data-social-button-type="icon">
                                <path
                                    d="M1055.994 594.42a559.973 559.973 0 0 0-8.86-99.684h-458.99V683.25h262.28c-11.298 60.918-45.633 112.532-97.248 147.089v122.279h157.501c92.152-84.842 145.317-209.78 145.317-358.198z"
                                    fill="#4285f4"></path>
                                <path
                                    d="M588.144 1070.688c131.583 0 241.9-43.64 322.533-118.07l-157.5-122.28c-43.64 29.241-99.463 46.52-165.033 46.52-126.931 0-234.368-85.728-272.691-200.919H152.636v126.267c80.19 159.273 245 268.482 435.508 268.482z"
                                    fill="#34a853"></path>
                                <path
                                    d="M315.453 675.94a288.113 288.113 0 0 1 0-185.191V364.482H152.636a487.96 487.96 0 0 0 0 437.724z"
                                    fill="#fbbc05"></path>
                                <path
                                    d="M588.144 289.83c71.551 0 135.792 24.589 186.298 72.88l139.78-139.779C829.821 144.291 719.504 96 588.143 96c-190.507 0-355.318 109.21-435.508 268.482L315.453 490.75c38.323-115.19 145.76-200.919 272.691-200.919z"
                                    fill="#ea4335"></path>
                            </svg>
                            <span>Продолжить с Google</span>
                        </Link>

                        <Link to="#" className={styles.social__button}>
                            <BsFacebook color="#1472e6" /> <span>Продолжить с Facebook</span>
                        </Link>
                    </section>
                </section>
            </CardLayout>
        </Canvas>
    );
};

export default EmailPage;
