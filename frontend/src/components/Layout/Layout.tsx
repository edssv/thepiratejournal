import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout: FC = () => {
    return (
        <>
            <Header />
            <main>
                <div className="container-fluid">
                    <Outlet />
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
};
