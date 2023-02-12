import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '../../components';

import { LoginRequest, useLoginMutation } from '../../redux';

import styles from './Login.module.scss';

const Login = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState<LoginRequest>({ login: '', password: '' });

    const [login, { isLoading, isError }] = useLoginMutation();

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <TextField
                    onChange={handleChange}
                    value={formState.login}
                    name="login"
                    variant="filled"
                    type="text"
                    placeholder="Логин"
                />
                <TextField
                    onChange={handleChange}
                    value={formState.password}
                    name="password"
                    variant="filled"
                    type="password"
                    placeholder="Пароль"
                />
                <Button
                    onClick={async () => {
                        try {
                            await login(formState).unwrap();
                            navigate('/');
                        } catch (err) {
                            <h3>Неверные данные</h3>;
                        }
                    }}
                    disabled={isLoading || !(formState.login && formState.password)}
                    variant="filled"
                >
                    {isLoading ? 'Секунду' : 'Войти'}
                </Button>
                {isError && <span className={styles.errorMessage}>Неверные данные для входа</span>}
            </div>
        </div>
    );
};

export default Login;
