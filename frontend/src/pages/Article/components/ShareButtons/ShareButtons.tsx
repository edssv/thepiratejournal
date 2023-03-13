import { useSelector } from 'react-redux';

import { Button } from '../../../../components';
import { articleDataSelector } from '../../../../redux';

import styles from './ShareButtons.module.scss';

export const ShareButtons = () => {
    const article = useSelector(articleDataSelector);

    return (
        <div className={styles.root}>
            <Button
                href={`https://vk.com/share.php?url=${process.env.REACT_APP_CLIENT_URL}/articles/${article._id}`}
                target="_blank"
                className={styles.link}
                variant="filledTonal"
                aria-label="share on VK"
                as="a"
            >
                <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="21px"
                    height="21px"
                    viewBox="0 0 94.00 94.00"
                    stroke="#000000"
                    strokeWidth="1.9739999999999998"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#CCCCCC"
                        strokeWidth="0.564"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {' '}
                        <g>
                            {' '}
                            <path d="M89,0H5C2.238,0,0,2.239,0,5v84c0,2.761,2.238,5,5,5h84c2.762,0,5-2.239,5-5V5C94,2.239,91.762,0,89,0z M74.869,52.943 c2.562,2.5,5.271,4.854,7.572,7.617c1.018,1.22,1.978,2.48,2.709,3.899c1.041,2.024,0.101,4.247-1.713,4.366l-11.256-0.003 c-2.906,0.239-5.22-0.931-7.172-2.918c-1.555-1.585-3.001-3.277-4.5-4.914c-0.611-0.673-1.259-1.306-2.025-1.806 c-1.534-0.996-2.867-0.692-3.748,0.909c-0.896,1.63-1.103,3.438-1.185,5.255c-0.125,2.655-0.925,3.348-3.588,3.471 c-5.69,0.268-11.091-0.596-16.108-3.463c-4.429-2.53-7.854-6.104-10.838-10.146c-5.816-7.883-10.27-16.536-14.27-25.437 c-0.901-2.005-0.242-3.078,1.967-3.119c3.676-0.073,7.351-0.063,11.022-0.004c1.496,0.023,2.485,0.879,3.058,2.289 c1.985,4.885,4.421,9.533,7.471,13.843c0.813,1.147,1.643,2.292,2.823,3.103c1.304,0.896,2.298,0.601,2.913-0.854 c0.393-0.928,0.563-1.914,0.647-2.906c0.292-3.396,0.327-6.792-0.177-10.175c-0.315-2.116-1.507-3.483-3.617-3.883 c-1.074-0.204-0.917-0.602-0.395-1.215c0.906-1.062,1.76-1.718,3.456-1.718l12.721-0.002c2.006,0.392,2.452,1.292,2.725,3.311 l0.012,14.133c-0.021,0.782,0.391,3.098,1.795,3.61c1.123,0.371,1.868-0.53,2.54-1.244c3.048-3.235,5.22-7.056,7.167-11.009 c0.857-1.743,1.6-3.549,2.32-5.356c0.533-1.337,1.367-1.995,2.875-1.971l12.246,0.013c0.36,0,0.729,0.004,1.086,0.063 c2.062,0.355,2.627,1.243,1.99,3.257c-1.004,3.163-2.959,5.799-4.871,8.441c-2.043,2.825-4.224,5.557-6.252,8.396 C72.411,49.38,72.561,50.688,74.869,52.943z"></path>{' '}
                        </g>{' '}
                    </g>
                </svg>
                Репост
            </Button>
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
                Твит
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
                    width="30px"
                    height="30px"
                    viewBox="-5.5 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>facebook</title>
                    <path d="M1.188 5.594h18.438c0.625 0 1.188 0.563 1.188 1.188v18.438c0 0.625-0.563 1.188-1.188 1.188h-18.438c-0.625 0-1.188-0.563-1.188-1.188v-18.438c0-0.625 0.563-1.188 1.188-1.188zM14.781 17.281h2.875l0.125-2.75h-3v-2.031c0-0.781 0.156-1.219 1.156-1.219h1.75l0.063-2.563s-0.781-0.125-1.906-0.125c-2.75 0-3.969 1.719-3.969 3.563v2.375h-2.031v2.75h2.031v7.625h2.906v-7.625z"></path>
                </svg>
                Пост
            </Button>
        </div>
    );
};
