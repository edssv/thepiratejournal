import dynamic from 'next/dynamic';

const AcceptCookies = dynamic(() => import('../AcceptCookies/AcceptCookies'), { ssr: false });
const Alert = dynamic(() => import('../Alert/Alert'), { ssr: false });

const CrossScreensSnackbars = () => {
    return (
        <>
            <AcceptCookies />
            <Alert />
        </>
    );
};

export default CrossScreensSnackbars;
