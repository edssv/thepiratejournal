import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas, CardLayout, VisibilityToggle } from '../../components';

import googleIcon from '../../assets/img/social/google.svg';
import facebookIcon from '../../assets/img/social/f_logo_RGB-Blue_58.png';

import styles from './Signup.module.scss';
import { useSignupMutation } from '../../redux/services/auth';
import { Button, ProgressCircle } from '@adobe/react-spectrum';
import { useDocTitle, useNetworkStatus } from '../../hooks';

const Signup = () => {
    const [doctitle, setDocTitle] = useDocTitle('Зарегистрироваться');
    const { isOnline } = useNetworkStatus();
    const navigate = useNavigate();
    const [signup, { isLoading, isError, error }] = useSignupMutation();

    const {
        register,
        formState: { errors, isValidating, isValid, isDirty },
        handleSubmit,
    } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await signup(data).unwrap();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const [passwordEye, setPasswordEye] = useState(false);

    const isValidArrow =
        "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='12' width='12'%3E%3Cpath d='M4.5 10a1.023 1.023 0 0 1-.8-.384l-2.488-3a1 1 0 0 1 1.577-1.233L4.5 7.376l4.712-5.991a1 1 0 1 1 1.576 1.23l-5.511 7A.977.977 0 0 1 4.5 10z' fill='%23268e6c'/%3E%3C/svg%3E";

    return (
        <CardLayout headline="Создать учетную запись" toaster={isOnline ? false : true}>
            <div className={styles.root}>
                <section className={styles.social__buttons}>
                    <Link to="#" className={styles.social__button}>
                        <img
                            className={styles.googleIcon}
                            src={googleIcon}
                            alt="Google social"
                            width="54px"
                            height="54px"
                        />
                    </Link>
                    <Link to="#" className={styles.social__button}>
                        <img src={facebookIcon} alt="Facebook social" width="54px" height="54px" />
                    </Link>
                </section>
                <div className={styles.socials__separator}>Или</div>
                <div className={styles.instructions}>
                    <p style={{ fontWeight: 700 }}>Зарегистрируйтесь с помощью электронной почты</p>
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
                                    minLength: {
                                        value: 4,
                                        message: 'Минимум 4 символа.',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'Максимум 16 символов.',
                                    },
                                })}
                                disabled={isLoading ? true : false}
                                type="text"
                                className={`text-field ${errors?.username && `is-invalid`}`}
                            />
                            {errors?.username && (
                                <label className="field-label error-label">
                                    {errors?.username?.message}
                                </label>
                            )}
                        </div>
                        {/* <div className={styles.name}>
                                
                                <div className={styles.field}>
                                    <label className="field-label">Имя</label>
                                    <input
                                        {...register('firstName', {
                                            required: 'Введите имя.',
                                            minLength: {
                                                value: 3,
                                                message: 'Минимум 3 символа.',
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: 'Максимум 12 символов',
                                            },
                                        })}
                                        type="text"
                                        className={`text-field ${
                                            errors?.firstName && `is-invalid`
                                        }`}
                                    />
                                    {errors?.firstName && (
                                        <label className="field-label error-label">
                                            {errors?.firstName?.message}
                                        </label>
                                    )}
                                </div>
                                
                                <div className={styles.field}>
                                    <label className="field-label">Фамилия</label>
                                    <input
                                        {...register('lastName', {
                                            required: 'Введите фамилию.',
                                            minLength: {
                                                value: 3,
                                                message: 'Минимум 3 символа.',
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: 'Максимум 20 символов',
                                            },
                                        })}
                                        type="text"
                                        className={`text-field ${errors?.lastName && `is-invalid`}`}
                                    />
                                    {errors?.lastName && (
                                        <label className="field-label error-label">
                                            {errors?.lastName?.message}
                                        </label>
                                    )}
                                </div>
                            </div> */}
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
                                disabled={isLoading ? true : false}
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
                                                'Должен содержать как строчные (a-z), так и прописные буквы (A-Z), хотя бы одну цифру (0-9) или символ.',
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Минимум 8 символов.',
                                        },
                                        maxLength: {
                                            value: 20,
                                        },
                                    })}
                                    disabled={isLoading ? true : false}
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
                        {isLoading ? (
                            <Button isDisabled={true} variant="cta">
                                <ProgressCircle
                                    size="S"
                                    isIndeterminate
                                    marginEnd={6}
                                    variant="overBackground"
                                    aria-label="Loading…"
                                />
                                Создать
                            </Button>
                        ) : (
                            <Button isDisabled={isValid ? false : true} type="submit" variant="cta">
                                Создать
                            </Button>
                        )}
                    </section>
                </form>
            </div>
        </CardLayout>
    );
};

export default Signup;
