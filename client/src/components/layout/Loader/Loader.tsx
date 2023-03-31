import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

const Loader = () => {
    const ref = useRef<any>(null);

    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            ref?.current?.continuousStart();
        });
        router.events.on('routeChangeComplete', () => {
            ref?.current?.complete();
        });
    });

    return <LoadingBar ref={ref} color="var(--md-sys-color-primary)" shadow={false} transitionTime={50} />;
};

export default Loader;
