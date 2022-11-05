import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BtnLeftFixed.module.scss';

export const BtnLeftFixed = () => {
    const navigate = useNavigate();

    const BtnBack = (
        <button onClick={() => navigate(-1)} className={styles.root}>
            <div className={`${styles.icon} icon-center`}>
                <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.88 18.12a1.25 1.25 0 0 1-1.76 1.76l-7-7a1.25 1.25 0 0 1 0-1.76l7-7a1.25 1.25 0 0 1 1.76 1.76L9.77 12z"
                        fill="currentColor"></path>
                </svg>
                Назад
            </div>
        </button>
    );
    const BtnUp = (
        <button onClick={() => window.scrollTo(0, 0)} className={styles.root}>
            <div className="icon-center">
                <svg
                    fill="none"
                    height="28"
                    viewBox="0 0 28 28"
                    width="28"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.35 16.76a1 1 0 1 0 1.3-1.52l-7-6a1 1 0 0 0-1.3 0l-7 6a1 1 0 0 0 1.3 1.52L14 11.32z"
                        fill="currentColor"></path>
                </svg>
            </div>
        </button>
    );

    const [button, setButton] = React.useState(BtnBack);

    const listenScrollEvent = async () => {
        window.scrollY > 0 ? setButton(BtnUp) : setButton(BtnBack);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
    });

    return button;
};
