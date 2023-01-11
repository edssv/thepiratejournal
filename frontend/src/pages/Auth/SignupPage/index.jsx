import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../../redux';
import { useDocTitle, useNetworkStatus } from '../../../hooks';
import { Button, CardLayout, VisibilityToggle } from '../../../components';

import styles from './Signup.module.scss';

const Signup = () => {
    useDocTitle('Зарегистрироваться');
    const { isOnline } = useNetworkStatus();
    const navigate = useNavigate();
    const [signup, { isLoading, isError, error }] = useSignupMutation();

    const {
        register,
        formState: { errors, isValidating },
        handleSubmit,
    } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = async (data) => {
        try {
            await signup(data).unwrap();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const [passwordEye, setPasswordEye] = useState(false);

    return (
        <CardLayout>
            <div className={styles.root}>
                <div className={styles.instructions}>
                    {/* <p style={{ fontWeight: 700 }}>Зарегистрируйтесь с помощью электронной почты</p> */}
                    <p>
                        У вас уже есть учетная запись? <Link to="/login">Войти</Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.emailForm}>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <label className="field-label">Имя пользователя</label>
                            <input
                                {...register('username', {
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
                                })}
                                disabled={isLoading}
                                type="text"
                                className={`text-field ${errors?.username && `is-invalid`}`}
                            />
                            {errors?.username && (
                                <label className="field-label error-label">
                                    {errors?.username?.message}
                                </label>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label className="field-label">Адрес электронной почты</label>
                            <input
                                {...register('email', {
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
                                    },
                                })}
                                disabled={isLoading}
                                type="email"
                                className={`text-field  ${errors?.email && `is-invalid`}`}
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
                                        },
                                    })}
                                    disabled={isLoading}
                                    className={`text-field ${
                                        isValidating === true ? `is-valid` : ''
                                    } ${errors?.password && `is-invalid`}`}
                                    type={passwordEye === true ? 'text' : 'password'}
                                />
                                <VisibilityToggle
                                    style={errors?.password ? { right: 20 } : { right: 0 }}
                                    passwordEye={passwordEye}
                                    setPasswordEye={setPasswordEye}
                                />
                            </div>
                            {errors?.password && (
                                <label className="field-label error-label">
                                    {errors?.password?.message}
                                </label>
                            )}
                        </div>
                        {isError && (
                            <label className="field-label error-label ">{error.data.message}</label>
                        )}
                    </div>

                    <section className={styles.submit}>
                        <Button
                            isLoading={isLoading}
                            isDisabled={!isOnline || isLoading}
                            type="submit"
                            variant="filled">
                            Создать
                        </Button>
                    </section>
                </form>
            </div>
        </CardLayout>
    );
};

export default Signup;
