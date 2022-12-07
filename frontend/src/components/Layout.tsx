import { FC } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

interface LayoutProps {
    container: boolean;
}

export const Layout: FC<LayoutProps> = ({ container }) => {
    const isLaptop = useMediaPredicate('(max-width: 990.98px)');

    return (
        <>
            <Header />
            <main style={{ paddingTop: isLaptop ? '55px' : 'unset' }}>
                <div className={container === true ? 'container' : ''}>
                    <Outlet />
                </div>
            </main>
        </>
    );
};
