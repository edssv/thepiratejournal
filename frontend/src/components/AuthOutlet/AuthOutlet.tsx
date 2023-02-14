import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Canvas, Overlay } from '..';
import { useAuth } from '../../hooks/useAuth';

export const AuthOutlet = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = <Navigate to="/" state={{ from: location }} />;

    if (isLoading) return <Overlay />;

    return user ? (
        navigate
    ) : (
        <Canvas>
            <Outlet />
        </Canvas>
    );
};
