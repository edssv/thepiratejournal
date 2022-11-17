import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

interface LayoutProps {
    container: boolean;
}

export const Layout: FC<LayoutProps> = ({ container }) => {
    return (
        <>
            <Header />
            <main>
                <div className={container === true ? 'container' : ''}>
                    <Outlet />
                </div>
            </main>
        </>
    );
};
