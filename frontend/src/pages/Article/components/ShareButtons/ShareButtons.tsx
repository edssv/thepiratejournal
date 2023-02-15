import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '@material/web/button/filled-button.js';

import { Button } from '../../../../components';
import { selectArticle } from '../../../../redux';

import styles from './ShareButtons.module.scss';

export const ShareButtons = () => {
    const navigate = useNavigate();
    const article = useSelector(selectArticle);

    return (
        <div className={styles.root}>
            <Button
                href={`https://twitter.com/intent/tweet?text=${article.title}&url=${process.env.REACT_APP_CLIENT_URL}/articles/${article._id}`}
                target="_blank"
                className={styles.link}
                variant="filledTonal"
                aria-label="share on Twitter"
                as="a"
            >
                <svg
                    fill="#000000"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M17.6,8.8c0,0.1,0,0.2,0,0.4
	c0,3.8-2.9,8.2-8.2,8.2c-1.6,0-3.1-0.5-4.4-1.3c0.2,0,0.5,0,0.7,0c1.3,0,2.6-0.5,3.6-1.2c-1.3,0-2.3-0.9-2.7-2C6.8,12.9,7,13,7.1,13
	c0.3,0,0.5,0,0.8-0.1c-1.3-0.3-2.3-1.4-2.3-2.8l0,0c0.4,0.2,0.8,0.3,1.3,0.4C6.1,9.8,5.6,9,5.6,8c0-0.5,0.1-1,0.4-1.4
	c1.4,1.7,3.5,2.9,5.9,3c0-0.2-0.1-0.4-0.1-0.7c0-1.6,1.3-2.9,2.9-2.9c0.8,0,1.6,0.3,2.1,0.9c0.7-0.1,1.3-0.4,1.8-0.7
	c-0.2,0.7-0.7,1.2-1.3,1.6c0.6-0.1,1.1-0.2,1.7-0.5C18.6,7.9,18.1,8.4,17.6,8.8z"
                    />
                    <rect width="24" height="24" />
                </svg>
                Tweet
            </Button>
            <Button
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_CLIENT_URL}/articles/${article._id}`}
                target="_blank"
                className={styles.link}
                variant="filledTonal"
                aria-label="share on Facebook"
                as="a"
            >
                <svg
                    fill="#000000"
                    width="28px"
                    height="28px"
                    viewBox="-5.5 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>facebook</title>
                    <path d="M1.188 5.594h18.438c0.625 0 1.188 0.563 1.188 1.188v18.438c0 0.625-0.563 1.188-1.188 1.188h-18.438c-0.625 0-1.188-0.563-1.188-1.188v-18.438c0-0.625 0.563-1.188 1.188-1.188zM14.781 17.281h2.875l0.125-2.75h-3v-2.031c0-0.781 0.156-1.219 1.156-1.219h1.75l0.063-2.563s-0.781-0.125-1.906-0.125c-2.75 0-3.969 1.719-3.969 3.563v2.375h-2.031v2.75h2.031v7.625h2.906v-7.625z"></path>
                </svg>
                Post
            </Button>
        </div>
    );
};
