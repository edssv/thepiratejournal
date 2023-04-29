import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loader: React.FC<{ color?: string }> = ({ color = 'var(--md-sys-color-primary)' }) => {
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

  return <LoadingBar ref={ref} color={color} shadow={false} transitionTime={50} />;
};

export default Loader;
