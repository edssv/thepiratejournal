import { Link, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../../redux';
import { Button } from '../Buttons';

import logo from '../../assets/img/logotype.png';
import styles from './Header.module.scss';

export const Header = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    return (
        <header className={styles.root}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Link to="/" className={styles.logo}>
                        <img src={logo} alt="Логотип" /> <span>The Pirate Journal</span>
                    </Link>
                    <Button onClick={() => navigate('/blog/new')}>Добавить блог</Button>
                    <Button
                        onClick={async () => {
                            try {
                                await logout('').unwrap();
                                navigate('/login');
                            } catch (err) {}
                        }}
                    >
                        <span className="material-symbols-outlined">logout</span>Выйти
                    </Button>
                </div>
            </div>
        </header>
    );
};
