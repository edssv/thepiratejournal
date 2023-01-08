import { FC } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
    container: boolean;
}

export const Layout: FC<LayoutProps> = ({ container }) => {
    const { user, isLoading } = useAuth();

    const isLaptop = useMediaPredicate('(max-width: 990.98px)');

    return (
        <>
            <Header />
            <main
                style={{
                    paddingTop: isLaptop ? '55px' : 'unset',
                    // height: 'calc(100vh - 120px)',
                    // overflowY: 'scroll',
                }}>
                <div className={container === true ? 'container-fluid' : ''}>
                    <Outlet />
                </div>
            </main>
            {!isLoading && !user && <Footer />}
        </>
    );
};
