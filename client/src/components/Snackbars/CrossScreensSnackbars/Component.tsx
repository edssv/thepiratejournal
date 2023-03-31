import dynamic from 'next/dynamic';

const AcceptCookies = dynamic(() => import('../AcceptCookies/AcceptCookies'), { ssr: false });
const PublishArticle = dynamic(() => import('../PublishArticle/PublishArticle'), { ssr: false });

const CrossScreensSnackbars = () => {
    return (
        <>
            <AcceptCookies />
            <PublishArticle />
        </>
    );
};

export default CrossScreensSnackbars;
