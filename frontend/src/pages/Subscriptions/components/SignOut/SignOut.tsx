import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../../../../components';

import styles from './SignOut.module.scss';

export const SignOut = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <span className={styles.icon}>
                    <svg
                        width="120px"
                        height="120px"
                        viewBox="0 0 24 24"
                        preserveAspectRatio="xMidYMid meet"
                        focusable="false"
                    >
                        <g>
                            <path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z"></path>
                        </g>
                    </svg>
                </span>
                <h2 className={styles.title}>Войди в аккаунт</h2>
                <p>Тогда здесь появится контент авторов, на которых ты подписан.</p>
                <Button
                    onClick={() =>
                        navigate('/login', {
                            state: { from: location },
                        })
                    }
                    icon
                    variant="outlined"
                >
                    <span className="material-symbols-outlined">account_circle</span>
                    Войти
                </Button>
            </div>
        </div>
    );
};
