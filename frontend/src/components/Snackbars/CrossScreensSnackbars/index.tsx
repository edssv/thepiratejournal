import React, { lazy, Suspense } from 'react';

const CrossScreenModals = lazy(
    () => import(/* webpackChunkName: "cross-screens-modals", webpackPrefetch: true */ './Component')
);

const Component: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <CrossScreenModals />
        </Suspense>
    );
};

export default Component;
